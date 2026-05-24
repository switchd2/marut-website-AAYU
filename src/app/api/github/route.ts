import { NextResponse } from 'next/server';

export const revalidate = 3600; // cache for 1 hour

interface GitHubRepoData {
  stargazers_count: number;
  forks_count: number;
}

interface GitHubContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'marut-website',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Fetch repo details
    const repoRes = await fetch('https://api.github.com/repos/lawslefthand/Marut_FCU', {
      headers,
      next: { revalidate: 3600 },
    });

    if (!repoRes.ok) {
      throw new Error(`GitHub repo API returned status ${repoRes.status}`);
    }
    const repoData = (await repoRes.json()) as GitHubRepoData;

    // Fetch contributors with pagination
    let contributors: GitHubContributor[] = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore && page <= 5) {
      const contribRes = await fetch(`https://api.github.com/repos/lawslefthand/Marut_FCU/contributors?per_page=100&page=${page}`, {
        headers,
        next: { revalidate: 3600 },
      });
      if (!contribRes.ok) {
        throw new Error(`GitHub contributors API returned status ${contribRes.status}`);
      }
      const pageData = await contribRes.json();
      if (!Array.isArray(pageData) || pageData.length === 0) {
        hasMore = false;
      } else {
        contributors = [...contributors, ...(pageData as GitHubContributor[])];
        if (pageData.length < 100) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }

    // Filter out bots
    const humanContributors = contributors.filter(
      (c) => c.type !== 'Bot' && !c.login.endsWith('[bot]')
    );

    const data = {
      stars: repoData.stargazers_count ?? 13,
      forks: repoData.forks_count ?? 2,
      contributorsCount: humanContributors.length || 5,
      contributors: humanContributors.map((c) => ({
        login: c.login,
        avatar_url: c.avatar_url,
        html_url: c.html_url,
      })),
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching GitHub data, returning fallback:', error);
    return NextResponse.json({
      stars: 13,
      forks: 2,
      contributorsCount: 5,
      contributors: [
        { login: 'lawslefthand', avatar_url: 'https://github.com/lawslefthand.png', html_url: 'https://github.com/lawslefthand' }
      ],
      isFallback: true,
    });
  }
}

import type { Metadata } from 'next'
import DocumentationClient from './DocumentationClient'

export const metadata: Metadata = {
  title: 'DOCUMENTATION | Marut FCU',
  description: 'Marut FCU documentation, setup guidance, and project reference material.',
}

export default function Page() {
  return <DocumentationClient />
}

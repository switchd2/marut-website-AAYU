import type { Metadata } from 'next'
import FirmwareClient from './FirmwareClient'

export const metadata: Metadata = {
  title: 'FIRMWARE SUITE | Marut FCU',
  description: 'Interactive firmware configurator and simulated Marut FCU build console.',
}

export default function Page() {
  return <FirmwareClient />
}

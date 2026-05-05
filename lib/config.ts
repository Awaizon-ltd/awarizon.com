export const SITE_CONFIG = {
  name: 'Awarizon',
  tagline: 'Technology Development & Distribution',
  description: 'Awarizon helps businesses adopt modern digital systems and builds consumer products that make technology useful in everyday life.',
  location: 'Nigeria, West Africa',
  email: 'hello@awarizon.com',
  twitter: '@awarizon',
  linkedin: 'awarizon',
  
  // System identity
  systemId: 'AWZ-PROD-001',
  systemVersion: 'v3.2.1',
  buildEnv: 'PRODUCTION',
  
  // Accent colors
  accent: '#FFE500',
  accentDim: '#B3A000',
  
  // Feature flags
  features: {
    animations: true,
    gridBackground: true,
    terminalMode: true,
    interactiveNodes: true,
  }
}

export type PageSection = {
  id: string
  label: string
  code: string
}

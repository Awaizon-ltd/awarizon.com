export const SITE_CONFIG = {
  name: 'Awarizon',
  tagline: 'Technology Development & Distribution',
  description: 'Awarizon helps businesses adopt modern digital systems and builds consumer products that make technology useful in everyday life.',
  location: 'Global',
  email: 'hello@awarizon.com',
  twitter: '@awarizon',
  linkedin: 'awarizon',
  
  // System identity
  systemId: 'AWZ-PROD-001',
  systemVersion: 'v3.2.1',
  buildEnv: 'PRODUCTION',
  
  // Accent colors
  accent: '#C8F13F',
  accentDim: '#8CA92C',
  
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

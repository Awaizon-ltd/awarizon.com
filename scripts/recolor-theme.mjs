#!/usr/bin/env node
// Recolors flat/line-art or shaded clip-art PNGs (e.g. from pngwing.com) into
// the site's black/chartreuse theme, so third-party graphics don't clash.
//
// Usage: node scripts/recolor-theme.mjs
//
// Two modes:
//   duotone — greyscale + tint, for shaded images (preserves per-face
//             lighting/depth, just recolors the hue). Good for 3D render clip-art.
//   flat    — recolors every opaque pixel to one solid colour, preserving
//             the original alpha mask exactly. Good for thin line-art/wireframes
//             where there's no shading to preserve.

import sharp from 'sharp'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')

const ACCENT     = { r: 0xC8, g: 0xF1, b: 0x3F } // --accent
const ACCENT_DIM = { r: 0x8C, g: 0xA9, b: 0x2C } // --accent-dim

async function duotone(file, color, outFile) {
  // .tint() greyscales internally — chaining an explicit .greyscale() first
  // collapses to a single channel and the tint becomes a no-op.
  await sharp(join(PUBLIC, file))
    .tint(color)
    .png()
    .toFile(join(PUBLIC, outFile))
  console.log(`  duotone  ${file} -> ${outFile}`)
}

async function flatRecolor(file, color, outFile) {
  const src = sharp(join(PUBLIC, file)).ensureAlpha()
  const { width, height } = await src.metadata()
  const alpha = await src.clone().extractChannel(3).raw().toBuffer()

  const flatColor = await sharp({
    create: { width, height, channels: 3, background: color },
  }).raw().toBuffer()

  await sharp(flatColor, { raw: { width, height, channels: 3 } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toFile(join(PUBLIC, outFile))
  console.log(`  flat     ${file} -> ${outFile}`)
}

console.log('Recoloring to theme…')
await duotone('infranstructure.png', ACCENT, 'infrastructure-theme.png')
await flatRecolor('mesh.png', ACCENT_DIM, 'mesh-theme.png')
await duotone('pngwing.com (5).png', ACCENT, 'blocks-theme.png')
console.log('Done.')

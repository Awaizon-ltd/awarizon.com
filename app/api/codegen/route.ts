import { NextRequest, NextResponse } from 'next/server'
import { adminAuth }               from '@/lib/firebase/admin'
import {
  generateContractClient,
  generateReactHooks,
  type AbiItem,
  type OutputLang,
} from '@/lib/codegen'

const MAX_ABI_ITEMS   = 500
const MAX_NAME_LENGTH = 64

// Sanitize a user-supplied name into a valid PascalCase JS identifier.
function sanitizeName(raw: string): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9_]/g, '')
  if (!cleaned) return 'Contract'
  const pascal = cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
  // If starts with a digit, prefix with "Contract"
  return /^[0-9]/.test(pascal) ? `Contract${pascal}` : pascal
}

// Validate an Ethereum address (checksum-optional, basic hex check)
function isAddress(s: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(s)
}

// ── POST /api/codegen ──────────────────────────────────────────────────────────
// Requires: x-id-token header (Firebase ID token)
// Body: { name: string, address: string, abi: AbiItem[] | { abi: AbiItem[] }, lang?: 'ts' | 'js' }
// Returns: { client: string, hooks: string }
export async function POST(req: NextRequest) {
  try {
    const idToken = req.headers.get('x-id-token')
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await adminAuth.verifyIdToken(idToken)
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { name?: unknown; address?: unknown; abi?: unknown; lang?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  // ── Validate name ────────────────────────────────────────────────────────────
  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 })
  }
  const contractName = sanitizeName(body.name.slice(0, MAX_NAME_LENGTH))

  // ── Validate address ─────────────────────────────────────────────────────────
  if (!body.address || typeof body.address !== 'string' || !isAddress(body.address)) {
    return NextResponse.json(
      { error: 'address must be a valid 0x Ethereum address (42 hex chars)' },
      { status: 400 },
    )
  }
  const address = body.address

  // ── Validate ABI ─────────────────────────────────────────────────────────────
  let abi: AbiItem[]
  if (Array.isArray(body.abi)) {
    abi = body.abi as AbiItem[]
  } else if (
    body.abi &&
    typeof body.abi === 'object' &&
    !Array.isArray(body.abi) &&
    Array.isArray((body.abi as Record<string, unknown>).abi)
  ) {
    abi = (body.abi as { abi: AbiItem[] }).abi
  } else {
    return NextResponse.json(
      { error: 'abi must be an array of ABI items (or an object with an abi array)' },
      { status: 400 },
    )
  }

  if (abi.length === 0) {
    return NextResponse.json({ error: 'ABI must not be empty' }, { status: 400 })
  }
  if (abi.length > MAX_ABI_ITEMS) {
    return NextResponse.json(
      { error: `ABI exceeds maximum of ${MAX_ABI_ITEMS} items` },
      { status: 400 },
    )
  }

  // ── Validate lang ────────────────────────────────────────────────────────────
  const lang: OutputLang = body.lang === 'js' ? 'js' : 'ts'

  // ── Generate ─────────────────────────────────────────────────────────────────
  try {
    const client = generateContractClient(contractName, address, abi, lang)
    const hooks  = generateReactHooks(contractName, address, abi, lang)
    return NextResponse.json({ client, hooks, contractName })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Code generation failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

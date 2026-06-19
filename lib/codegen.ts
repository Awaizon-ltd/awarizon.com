// Self-contained port of @awarizon/cli codegen — no monorepo dependencies.
// Used by /api/codegen to generate contract clients and React hooks server-side.

// ─── Types ────────────────────────────────────────────────────────────────────

export type OutputLang = 'ts' | 'js';

interface AbiParam {
  name?: string;
  type: string;
}

interface AbiFunction {
  type: 'function';
  name: string;
  stateMutability: 'view' | 'pure' | 'nonpayable' | 'payable';
  inputs?: AbiParam[];
  outputs?: AbiParam[];
}

interface AbiEvent {
  type: 'event';
  name: string;
  inputs?: AbiParam[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AbiItem = Record<string, any>;

interface ParsedABI {
  readFunctions:    AbiFunction[];
  writeFunctions:   AbiFunction[];
  payableFunctions: AbiFunction[];
  events:           AbiEvent[];
}

type FunctionKind = 'read' | 'write' | 'payable';

interface GeneratedMethod {
  name:      string;
  kind:      FunctionKind;
  signature: string;
  params:    Array<{ name: string; type: string }>;
}

// ─── ABI parsing ──────────────────────────────────────────────────────────────

function parseABI(abi: AbiItem[]): ParsedABI {
  const readFunctions:    AbiFunction[] = [];
  const writeFunctions:   AbiFunction[] = [];
  const payableFunctions: AbiFunction[] = [];
  const events:           AbiEvent[]    = [];

  for (const item of abi) {
    if (!item || typeof item !== 'object') continue;
    if (item.type === 'function') {
      const fn = item as AbiFunction;
      const sm = fn.stateMutability;
      if (sm === 'view' || sm === 'pure') {
        readFunctions.push(fn);
      } else if (sm === 'payable') {
        payableFunctions.push(fn);
        writeFunctions.push(fn);
      } else {
        writeFunctions.push(fn);
      }
    } else if (item.type === 'event') {
      events.push(item as AbiEvent);
    }
  }

  return { readFunctions, writeFunctions, payableFunctions, events };
}

// ─── Signature generation ─────────────────────────────────────────────────────

function solidityTypeToTS(abiType: string): string {
  if (abiType.endsWith('[]')) return `${solidityTypeToTS(abiType.slice(0, -2))}[]`;
  if (abiType.startsWith('uint') || abiType.startsWith('int')) return 'bigint';
  if (abiType === 'address')     return '`0x${string}`';
  if (abiType === 'bool')        return 'boolean';
  if (abiType.startsWith('bytes')) return '`0x${string}`';
  if (abiType === 'string')      return 'string';
  if (abiType === 'tuple')       return 'Record<string, unknown>';
  return 'unknown';
}

function generateMethodSignature(fn: AbiFunction): GeneratedMethod {
  const sm = fn.stateMutability;
  const kind: FunctionKind =
    sm === 'view' || sm === 'pure' ? 'read' : sm === 'payable' ? 'payable' : 'write';

  const params = (fn.inputs ?? []).map((p, i) => ({
    name: p.name || `arg${i}`,
    type: solidityTypeToTS(p.type),
  }));

  const outputs    = fn.outputs ?? [];
  let returnType: string;
  if (outputs.length === 0) {
    returnType = kind === 'read' ? 'void' : 'TransactionResult';
  } else if (outputs.length === 1) {
    returnType = solidityTypeToTS(outputs[0].type);
  } else {
    returnType = `[${outputs.map(o => solidityTypeToTS(o.type)).join(', ')}]`;
  }

  const paramStr    = params.map(p => `${p.name}: ${p.type}`).join(', ');
  const asyncReturn = kind === 'read' ? `Promise<${returnType}>` : 'Promise<TransactionResult>';
  const signature   = `${fn.name}(${paramStr}): ${asyncReturn}`;

  return { name: fn.name, kind, signature, params };
}

function generateAllMethodSignatures(parsed: ParsedABI): GeneratedMethod[] {
  return [...parsed.readFunctions, ...parsed.writeFunctions].map(generateMethodSignature);
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function paramList(params: Array<{ name: string; type: string }>, lang: OutputLang): string {
  return lang === 'ts'
    ? params.map(p => `${p.name}: ${p.type}`).join(', ')
    : params.map(p => p.name).join(', ');
}

function toJsDocType(tsType: string): string {
  return tsType
    .replace(/`0x\$\{string\}`/g, 'string')
    .replace(/Record<string, unknown>/g, 'Object');
}

function buildJsDocMethod(
  params: Array<{ name: string; type: string }>,
  returnType: string,
): string {
  if (params.length === 0) return '';
  const lines = params.map(p => `   * @param {${toJsDocType(p.type)}} ${p.name}`);
  return `  /**\n${lines.join('\n')}\n   * @returns {${toJsDocType(returnType)}}\n   */\n`;
}

// ─── generateContractClient ───────────────────────────────────────────────────

/**
 * Generate a typed contract client class from a name, address, ABI, and target language.
 * The output is a ready-to-use TypeScript or JavaScript file.
 */
export function generateContractClient(
  contractName: string,
  address: string,
  abi: AbiItem[],
  lang: OutputLang = 'ts',
): string {
  const parsed  = parseABI(abi);
  const methods = generateAllMethodSignatures(parsed);

  const methodImpls = methods.map(m => {
    const callArgs = m.params.map(p => p.name).join(', ');
    const pList    = paramList(m.params, lang);
    const jsdoc    = lang === 'js'
      ? buildJsDocMethod(
          m.params,
          m.kind !== 'read' ? 'Promise<TransactionResult>' : (m.signature.split(': ')[1] ?? 'Promise<unknown>'),
        )
      : '';
    return `${jsdoc}  async ${m.name}(${pList}) {\n    return this._contract.${m.name}(${callArgs});\n  }`;
  }).join('\n\n');

  const interfaceBlock = lang === 'ts'
    ? [
        '// ─── Typed interface ─────────────────────────────────────────────────────────',
        '',
        `export interface ${contractName}Contract {`,
        methods.map(m => {
          const tag = m.kind === 'read' ? '@read' : m.kind === 'payable' ? '@write @payable' : '@write';
          return `  /**\n   * ${tag}\n   * @signature ${m.signature}\n   */\n  ${m.signature};`;
        }).join('\n\n'),
        '',
        `  on(event: string, callback: (log: unknown) => void): () => void;`,
        `  estimateGas(method: string, ...args: unknown[]): Promise<bigint>;`,
        '}',
        '',
      ].join('\n')
    : '';

  const imports = lang === 'ts'
    ? `import { AwarizonWeb3 } from "@awarizon/web3";\nimport type { ContractInstance, TransactionResult } from "@awarizon/web3";`
    : `import { AwarizonWeb3 } from "@awarizon/web3";`;

  const abiConst  = `const ABI = ${JSON.stringify(abi, null, 2)}${lang === 'ts' ? ' as const' : ''};`;
  const addrConst = `const CONTRACT_ADDRESS = "${address}"${lang === 'ts' ? ' as const' : ''};`;

  const privateField = lang === 'ts'
    ? `  private _contract!: ContractInstance;\n\n  private constructor() {}`
    : `  constructor() {\n    /** @private */\n    this._contract = null;\n  }`;

  const createSig = lang === 'ts'
    ? `  static async create(awarizon: AwarizonWeb3): Promise<${contractName}Client>`
    : `  /** @param {AwarizonWeb3} awarizon @returns {Promise<${contractName}Client>} */\n  static async create(awarizon)`;

  const onMethod = lang === 'ts'
    ? `  on(event: string, callback: (log: unknown) => void) {\n    return this._contract.on(event, callback);\n  }`
    : `  /** @param {string} event @param {(log: unknown) => void} callback */\n  on(event, callback) {\n    return this._contract.on(event, callback);\n  }`;

  const estimateGasMethod = lang === 'ts'
    ? `  async estimateGas(method: string, ...args: unknown[]) {\n    return this._contract.estimateGas(method, ...args);\n  }`
    : `  /** @param {string} method @returns {Promise<bigint>} */\n  async estimateGas(method, ...args) {\n    return this._contract.estimateGas(method, ...args);\n  }`;

  return [
    `// Auto-generated by Awarizon Dashboard — do not edit manually`,
    `// Contract: ${contractName}`,
    `// Address:  ${address}`,
    `// Language: ${lang === 'ts' ? 'TypeScript' : 'JavaScript'}`,
    `// Generated: ${new Date().toISOString()}`,
    ``,
    imports,
    ``,
    addrConst,
    ``,
    abiConst,
    ``,
    interfaceBlock,
    `// ─── Client class ─────────────────────────────────────────────────────────────`,
    ``,
    `export class ${contractName}Client {`,
    privateField,
    ``,
    `${createSig} {`,
    `    const client = new ${contractName}Client();`,
    `    client._contract = await awarizon.contract({ address: CONTRACT_ADDRESS, abi: ABI });`,
    `    return client;`,
    `  }`,
    ``,
    methodImpls,
    ``,
    onMethod,
    ``,
    estimateGasMethod,
    `}`,
    ``,
  ].join('\n');
}

// ─── generateReactHooks ───────────────────────────────────────────────────────

/**
 * Generate a React hooks file for a contract.
 * Produces useRead<Name>, useWrite<Name>, and use<Name><Event>Event hooks.
 */
export function generateReactHooks(
  contractName: string,
  address: string,
  abi: AbiItem[],
  lang: OutputLang = 'ts',
): string {
  const parsed  = parseABI(abi);
  const methods = generateAllMethodSignatures(parsed);
  const abiVar  = `${contractName.toUpperCase()}_ABI`;

  const readHooks = parsed.readFunctions.map(fn => {
    const meta       = methods.find(m => m.name === fn.name)!;
    const pList      = paramList(meta.params, lang);
    const paramNames = meta.params.map(p => p.name).join(', ');
    const argsExpr   = paramNames ? `[${paramNames}]` : '[]';
    const abiArg     = lang === 'ts' ? `${abiVar} as any` : abiVar;
    const jsdoc      = lang === 'js'
      ? buildJsDocMethod(meta.params, 'ReturnType<typeof useReadContract>')
      : '';
    return (
      `${jsdoc}export function useRead${capitalize(fn.name)}(${pList}) {\n` +
      `  return useReadContract({\n` +
      `    address: "${address}",\n` +
      `    abi: ${abiArg},\n` +
      `    method: "${fn.name}",\n` +
      `    args: ${argsExpr},\n` +
      `  });\n` +
      `}`
    );
  }).join('\n\n');

  const writeHooks = parsed.writeFunctions.map(fn => {
    const abiArg    = lang === 'ts' ? `${abiVar} as any` : abiVar;
    const jsdocLine = lang === 'js'
      ? `/** Hook to call \`${fn.name}\` on ${contractName}. @returns {ReturnType<typeof useWriteContract>} */\n`
      : '';
    return (
      `${jsdocLine}export function useWrite${capitalize(fn.name)}() {\n` +
      `  return useWriteContract({\n` +
      `    address: "${address}",\n` +
      `    abi: ${abiArg},\n` +
      `    method: "${fn.name}",\n` +
      `  });\n` +
      `}`
    );
  }).join('\n\n');

  const eventHooks = parsed.events.map(ev => {
    const callbackParam = lang === 'ts' ? 'callback: (log: unknown) => void' : 'callback';
    const abiArg        = lang === 'ts' ? `${abiVar} as any` : abiVar;
    const jsdocLine     = lang === 'js'
      ? `/** Hook to subscribe to the \`${ev.name}\` event on ${contractName}.\n * @param {(log: unknown) => void} callback @param {boolean} [enabled=true] */\n`
      : '';
    return (
      `${jsdocLine}export function use${contractName}${capitalize(ev.name)}Event(\n` +
      `  ${callbackParam},\n` +
      `  enabled = true,\n` +
      `) {\n` +
      `  const { contract } = useContract({ address: "${address}", abi: ${abiArg} });\n` +
      `\n` +
      `  useEffect(() => {\n` +
      `    if (!enabled || !contract) return;\n` +
      `    const unsubscribe = contract.on("${ev.name}", callback);\n` +
      `    return unsubscribe;\n` +
      `  }, [contract, enabled, callback]);\n` +
      `}`
    );
  }).join('\n\n');

  const imports =
    lang === 'ts'
      ? `import { useEffect } from "react";\nimport {\n  useContract,\n  useReadContract,\n  useWriteContract,\n} from "@awarizon/react";`
      : `import { useEffect } from "react";\nimport { useContract, useReadContract, useWriteContract } from "@awarizon/react";`;

  const abiConst = `const ${abiVar} = ${JSON.stringify(abi, null, 2)}${lang === 'ts' ? ' as const' : ''};`;

  return [
    `// Auto-generated by Awarizon Dashboard — do not edit manually`,
    `// React hooks for: ${contractName}`,
    `// Language: ${lang === 'ts' ? 'TypeScript' : 'JavaScript'}`,
    `// Generated: ${new Date().toISOString()}`,
    ``,
    imports,
    ``,
    abiConst,
    ``,
    `// ─── Read hooks ───────────────────────────────────────────────────────────────`,
    ``,
    readHooks || '// No read (view/pure) functions found in this ABI',
    ``,
    `// ─── Write hooks ──────────────────────────────────────────────────────────────`,
    ``,
    writeHooks || '// No write (nonpayable/payable) functions found in this ABI',
    parsed.events.length > 0
      ? `\n// ─── Event hooks ──────────────────────────────────────────────────────────────\n\n${eventHooks}`
      : '',
    ``,
  ].join('\n');
}

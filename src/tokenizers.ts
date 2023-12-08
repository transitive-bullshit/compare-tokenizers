import * as gpt3Encoder from 'gpt-3-encoder'
import * as gptTokenizer from 'gpt-tokenizer'
import * as jsTiktoken from 'js-tiktoken'
import GPT3TokenizerImport from 'gpt3-tokenizer'
import { encoding_for_model } from 'tiktoken'
import TiktokenNode from 'tiktoken-node'

const GPT3Tokenizer: typeof GPT3TokenizerImport =
  typeof GPT3TokenizerImport === 'function'
    ? GPT3TokenizerImport
    : (GPT3TokenizerImport as any).default

export interface Tokenizer {
  label: string
  encode: (i: string) => number[] | Uint32Array
  decode: (i: number[] | Uint32Array) => string
}

const gpt3Tokenizer = new GPT3Tokenizer({ type: 'gpt3' })
const tiktokenWasm = encoding_for_model('gpt-3.5-turbo')
const tiktokenNode = TiktokenNode.encodingForModel('gpt-3.5-turbo')
const jsTiktokenTokenizer = jsTiktoken.getEncoding(
  jsTiktoken.getEncodingNameForModel('gpt-35-turbo')
)

export const tokenizers: Tokenizer[] = [
  {
    label: 'gpt3-tokenizer',
    encode: (i: string) => gpt3Tokenizer.encode(i).bpe,
    decode: (i: number[]) => gpt3Tokenizer.decode(i)
  },
  {
    label: 'gpt-3-encoder',
    encode: (i: string) => gpt3Encoder.encode(i),
    decode: (i: number[]) => gpt3Encoder.decode(i)
  },
  {
    label: 'js-tiktoken',
    encode: (i: string) => jsTiktokenTokenizer.encode(i),
    decode: (i: number[]) => jsTiktokenTokenizer.decode(i)
  },
  {
    label: 'gpt-tokenizer',
    encode: (i: string) => gptTokenizer.encode(i),
    decode: (i: number[]) => gptTokenizer.decode(i)
  },

  {
    label: 'tiktoken',
    encode: (i: string) => tiktokenWasm.encode(i),
    decode: (i: Uint32Array) => new TextDecoder().decode(tiktokenWasm.decode(i))
  },
  {
    label: 'tiktoken-node',
    encode: (i: string) => tiktokenNode.encode(i),
    decode: (i: number[]) => tiktokenNode.decode(i)
  }
]

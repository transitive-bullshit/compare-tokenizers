import * as gpt3Encoder from 'gpt-3-encoder'
import { encoding_for_model, get_encoding } from '@dqbd/tiktoken'
import GPT3TokenizerImport from 'gpt3-tokenizer'

import { fixtures } from './fixtures'

const GPT3Tokenizer: typeof GPT3TokenizerImport =
  typeof GPT3TokenizerImport === 'function'
    ? GPT3TokenizerImport
    : (GPT3TokenizerImport as any).default

interface Tokenizer {
  label: string
  encode: (i: string) => number[] | Uint32Array
  decode: (i: number[] | Uint32Array) => string
}

async function main() {
  const gpt3Tokenizer = new GPT3Tokenizer({ type: 'gpt3' })
  const tiktokenGpt2 = get_encoding('gpt2')
  const tiktokenTextDavinci003 = encoding_for_model('text-davinci-003')
  const tokenizers: Tokenizer[] = [
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
      label: '@dqbd/tiktoken gpt2',
      encode: (i: string) => tiktokenGpt2.encode(i),
      decode: (i: Uint32Array) =>
        new TextDecoder().decode(tiktokenGpt2.decode(i))
    },
    {
      label: '@dqbd/tiktoken text-davinci-003',
      encode: (i: string) => tiktokenTextDavinci003.encode(i),
      decode: (i: Uint32Array) =>
        new TextDecoder().decode(tiktokenTextDavinci003.decode(i))
    }
  ]

  for (let i = 0; i < fixtures.length; i++) {
    const fixture = fixtures[i].trim()
    const encoded = tokenizers.map((t) => t.encode(fixture))
    // const decoded = tokenizers.map((t, i) => t.decode(encoded[i]))

    console.log(
      `${i}) ${fixture.length} chars "${
        fixture.length > 20 ? fixture.substring(0, 20) + '...' : fixture
      }" ⇒`,
      tokenizers.reduce(
        (acc, t, i) => ({ ...acc, [t.label]: encoded[i].length }),
        {}
      )
    )
  }
}

main()

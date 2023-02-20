# Compare Tokenizers <!-- omit in toc -->

> A test suite comparing Node.js [BPE](https://en.wikipedia.org/wiki/Byte_pair_encoding) tokenizers for use with AI models.

[![Build Status](https://github.com/transitive-bullshit/compare-tokenizers/actions/workflows/test.yml/badge.svg)](https://github.com/transitive-bullshit/compare-tokenizers/actions/workflows/test.yml) [![MIT License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/transitive-bullshit/compare-tokenizers/blob/main/license) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

- [Intro](#intro)
- [Benchmark](#benchmark)
- [Tokenization Tests](#tokenization-tests)
- [License](#license)

## Intro

This repo contains a small test suite for comparing the results of different Node.js [BPE](https://en.wikipedia.org/wiki/Byte_pair_encoding) tokenizers for use with LLMs like GPT-3.

Check out OpenAI's [tiktoken](https://github.com/openai/tiktoken) Rust / Python lib for reference and [OpenAI's Tokenizer Playground](https://platform.openai.com/tokenizer) to experiment with different inputs.

This repo only tests tokenizers aimed at text, not code-specific tokenizers like the ones used by Codex.

## Benchmark

| Package / encoder                                                   | Average Time (ms) | Variance (ms) |
| ------------------------------------------------------------------- | ----------------- | ------------- |
| [gpt3-tokenizer](https://github.com/botisan-ai/gpt3-tokenizer)      | 56132             | 334621        |
| [gpt-3-encoder](https://github.com/latitudegames/GPT-3-Encoder)     | 31148             | 333120        |
| [@dqbd/tiktoken](https://github.com/dqbd/tiktoken) gpt2             | 9267              | 1490          |
| [@dqbd/tiktoken](https://github.com/dqbd/tiktoken) text-davinci-003 | 9078              | 733           |

_(lower times are better)_

`@dqbd/tiktoken` which is a wasm port of the official Rust `tiktoken` is **~3-6x faster than the JS variants** with significantly less memory overhead and variance. 🔥

To reproduce:

```
npx tsx src/bench.ts
# or
pnpm build
node build/bench.mjs
```

## Tokenization Tests

This maps over an array of test fixtures in different languages and prints the number of tokens generated for each of the tokenizers.

```
0) 5 chars "hello" ⇒ {
  'gpt3-tokenizer': 1,
  'gpt-3-encoder': 1,
  '@dqbd/tiktoken gpt2': 1,
  '@dqbd/tiktoken text-davinci-003': 1
}
1) 17 chars "hello 👋 world 🌍" ⇒ {
  'gpt3-tokenizer': 7,
  'gpt-3-encoder': 7,
  '@dqbd/tiktoken gpt2': 7,
  '@dqbd/tiktoken text-davinci-003': 7
}
2) 445 chars "Lorem ipsum dolor si..." ⇒ {
  'gpt3-tokenizer': 153,
  'gpt-3-encoder': 153,
  '@dqbd/tiktoken gpt2': 153,
  '@dqbd/tiktoken text-davinci-003': 153
}
3) 2636 chars "Lorem ipsum dolor si..." ⇒ {
  'gpt3-tokenizer': 939,
  'gpt-3-encoder': 939,
  '@dqbd/tiktoken gpt2': 939,
  '@dqbd/tiktoken text-davinci-003': 922
}
4) 246 chars "也称乱数假文或者哑元文本， 是印刷及排版..." ⇒ {
  'gpt3-tokenizer': 402,
  'gpt-3-encoder': 402,
  '@dqbd/tiktoken gpt2': 402,
  '@dqbd/tiktoken text-davinci-003': 402
}
5) 359 chars "利ヘオヒヲ特逆もか意書購サ米公え出主トほ..." ⇒ {
  'gpt3-tokenizer': 621,
  'gpt-3-encoder': 621,
  '@dqbd/tiktoken gpt2': 621,
  '@dqbd/tiktoken text-davinci-003': 621
}
6) 2799 chars "это текст-"рыба", ча..." ⇒ {
  'gpt3-tokenizer': 2813,
  'gpt-3-encoder': 2813,
  '@dqbd/tiktoken gpt2': 2813,
  '@dqbd/tiktoken text-davinci-003': 2811
}
7) 658 chars "If the dull substanc..." ⇒ {
  'gpt3-tokenizer': 175,
  'gpt-3-encoder': 175,
  '@dqbd/tiktoken gpt2': 175,
  '@dqbd/tiktoken text-davinci-003': 170
}
8) 3189 chars "Enter [two Players a..." ⇒ {
  'gpt3-tokenizer': 876,
  'gpt-3-encoder': 876,
  '@dqbd/tiktoken gpt2': 876,
  '@dqbd/tiktoken text-davinci-003': 872
}
9) 17170 chars "ANTONY. [To CAESAR] ..." ⇒ {
  'gpt3-tokenizer': 5801,
  'gpt-3-encoder': 5801,
  '@dqbd/tiktoken gpt2': 5801,
  '@dqbd/tiktoken text-davinci-003': 5306
}
```

To reproduce:

```
npx tsx src/index.ts
# or
pnpm build
node build/index.mjs
```

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

If you found this project interesting, please consider [sponsoring me](https://github.com/sponsors/transitive-bullshit) or <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>

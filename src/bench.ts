import { Bench } from 'tinybench'

import { fixtures } from './fixtures'
import { tokenizers } from './tokenizers'

async function main() {
  const bench = new Bench({ iterations: 25 })

  for (const tokenizer of tokenizers) {
    bench.add(tokenizer.label, () => {
      for (let i = 0; i < fixtures.length; i++) {
        const res = tokenizer.encode(fixtures[i])
      }
    })
  }

  console.log('running benchmarks (may take 10s)...')
  await bench.run()

  console.table(
    bench.tasks.map(({ name, result }) => ({
      'Task Name': name,
      'Average Time (ms)': Math.round(result?.mean * 1000),
      'Variance (ms)': Math.round(result?.variance * 1000)
    }))
  )

  // for (let i = 0; i < fixtures.length; i++) {
  //   const fixture = fixtures[i].trim()
  //   const encoded = tokenizers.map((t) => t.encode(fixture))
  //   // const decoded = tokenizers.map((t, i) => t.decode(encoded[i]))

  //   console.log(
  //     `${i}) ${fixture.length} chars "${
  //       fixture.length > 20 ? fixture.substring(0, 20) + '...' : fixture
  //     }" ⇒`,
  //     tokenizers.reduce(
  //       (acc, t, i) => ({ ...acc, [t.label]: encoded[i].length }),
  //       {}
  //     )
  //   )
  // }
}

main()

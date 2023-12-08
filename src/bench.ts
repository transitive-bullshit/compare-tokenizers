import { markdownTable } from 'markdown-table'
import { Bench } from 'tinybench'

import { fixtures } from './fixtures'
import { tokenizers } from './tokenizers'

async function main() {
  const bench = new Bench({ iterations: 2 })

  for (const tokenizer of tokenizers) {
    bench.add(tokenizer.label, () => {
      for (let i = 0; i < fixtures.length; i++) {
        const res = tokenizer.encode(fixtures[i])
      }
    })
  }

  console.log('running benchmarks (may take 10s)...')
  await bench.run()

  let bars = bench.tasks.map(({ name, result }) => {
    return '█'.repeat(Math.round(result?.mean / 10))
  })
  const maxBar = Math.max(...bars.map((b) => b.length))
  bars = bars.map((b) => b.padEnd(maxBar, ' '))

  const table = bench.tasks.map(({ name, result }, i) => ({
    'Task Name': name,
    'Average Time (ms)': (result?.mean).toFixed(0),
    bar: bars[i],
    'Variance (ms)': Math.round(result?.variance * 1000)
  }))
  const keys = Object.keys(table[0])
  console.log(
    markdownTable([
      keys,
      ...table.map((x) => Object.values(x) as [string, string])
    ])
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

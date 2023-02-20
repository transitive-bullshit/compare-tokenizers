import { fixtures } from './fixtures'
import { tokenizers } from './tokenizers'

async function main() {
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

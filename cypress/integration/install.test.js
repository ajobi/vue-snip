import plugin from '../../src/index.js'

describe('Plugin Install', () => {
  it('Does not expose the state without debugMode', () => {
    plugin.install({ directive: () => {} }, { debugMode: false })
    expect(window.__VueSnipState).equal(undefined)
  })

  it('Exposes the state on debugMode', () => {
    plugin.install({ directive: () => {} }, { debugMode: true })
    expect(window.__VueSnipState).not.equal(undefined)
  })
})

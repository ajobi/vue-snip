import { normalizeSnipMethod } from '../../instrumented/utils'

const getMockState = (snipMethod) => ({
  options: {
    snipMethod
  }
})

describe('normalizeSnipMethod', () => {
  it('returns js if CSS method is unsupported', () => {
    cy.stub(CSS, 'supports', () => false)

    expect(normalizeSnipMethod(getMockState('js'), 'css')).to.equal('js')
    expect(normalizeSnipMethod(getMockState('css'), 'js')).to.equal('js')
  })

  it('returns value of valid snip method', () => {
    expect(normalizeSnipMethod(getMockState('js'), 'css')).to.equal('css')
    expect(normalizeSnipMethod(getMockState('css'), 'js')).to.equal('js')
  })

  it('returns valid state value on invalid snip method', () => {
    expect(normalizeSnipMethod(getMockState('js'), 'invalid')).to.equal('js')
    expect(normalizeSnipMethod(getMockState('css'), 'invalid')).to.equal('css')
  })

  it('returns default value on invalid snip method and invalid state value', () => {
    expect(normalizeSnipMethod(getMockState('invalid'), 'invalid')).to.equal('css')
    expect(normalizeSnipMethod(getMockState('invalid'), 'invalid')).to.equal('css')
  })
})

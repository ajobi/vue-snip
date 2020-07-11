import { normalizeMaxLines, normalizeSnipMethod } from '../../../src/directive/directive.utils.js'

describe('normalizeMaxLines', () => {
  it('returns original integer values', () => {
    expect(normalizeMaxLines(0)).to.equal(0)
    expect(normalizeMaxLines(10)).to.equal(10)
    expect(normalizeMaxLines(-7)).to.equal(-7)
  })

  it('returns non decimal part of decimal values', () => {
    expect(normalizeMaxLines(0.22)).to.equal(0)
    expect(normalizeMaxLines(7.8)).to.equal(7)
    expect(normalizeMaxLines(-2.22)).to.equal(-2)
  })

  it('returns int parsed part of string values', () => {
    expect(normalizeMaxLines('12')).to.equal(12)
    expect(normalizeMaxLines('8.5')).to.equal(8)
    expect(normalizeMaxLines('2text')).to.equal(2)
    expect(normalizeMaxLines('3.7text')).to.equal(3)
  })

  it('returns zero on non-parseable values', () => {
    expect(normalizeMaxLines('text')).to.equal(0)
    expect(normalizeMaxLines('text123')).to.equal(0)
  })
})

const getMockState = (snipMethod) => ({
  options: {
    snipMethod
  }
})

describe('normalizeSnipMethod', () => {
  it('returns value of valid snip method', () => {
    expect(normalizeSnipMethod(getMockState('js'), 'css')).to.equal('css')
    expect(normalizeSnipMethod(getMockState('css'), 'js')).to.equal('js')
  })

  it('returns valid global value on invalid snip method', () => {
    expect(normalizeSnipMethod(getMockState('js'), 'invalid')).to.equal('js')
    expect(normalizeSnipMethod(getMockState('css'), 'invalid')).to.equal('css')
  })

  it('returns default value on invalid snip method and invalid global value', () => {
    expect(normalizeSnipMethod(getMockState('invalid'), 'invalid')).to.equal('css')
    expect(normalizeSnipMethod(getMockState('invalid'), 'invalid')).to.equal('css')
  })
})

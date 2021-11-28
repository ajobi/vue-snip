import { normalizeMaxLines } from '../../instrumented/utils'

const getMockState = (maxLines) => ({
  elementMap: new WeakMap(),
  options: {
    maxLines
  }
})

describe('normalizeMaxLines', () => {
  it('returns original integer values', () => {
    expect(normalizeMaxLines(null, 0)).to.equal(0)
    expect(normalizeMaxLines(null, 10)).to.equal(10)
    expect(normalizeMaxLines(null, -7)).to.equal(-7)
  })

  it('returns non decimal part of decimal values', () => {
    expect(normalizeMaxLines(null, 0.22)).to.equal(0)
    expect(normalizeMaxLines(null, 7.8)).to.equal(7)
    expect(normalizeMaxLines(null, -2.22)).to.equal(-2)
  })

  it('returns int parsed part of string values', () => {
    expect(normalizeMaxLines(null, '12')).to.equal(12)
    expect(normalizeMaxLines(null, '8.5')).to.equal(8)
    expect(normalizeMaxLines(null, '2text')).to.equal(2)
    expect(normalizeMaxLines(null, '3.7text')).to.equal(3)
  })

  it('returns global maxLines on non-parseable values', () => {
    expect(normalizeMaxLines(getMockState(22), 'text')).to.equal(22)
    expect(normalizeMaxLines(getMockState(22), 'text123')).to.equal(22)
  })

  it('returns default maxLines on non-parseable value and non-parseable global value', () => {
    expect(normalizeMaxLines(getMockState('text'), 'text')).to.equal(3)
  })
})

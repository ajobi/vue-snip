import { elementLines } from '../../src/element/element.lines.js'

const getMockStyles = (height, lineHeight, fontSize) => ({
  height: height || '100px',
  lineHeight: lineHeight || 'normal',
  fontSize: fontSize || '10px'
})

beforeEach(() => {
  cy.visit('/')
})

describe('elementLines', () => {
  describe('with implicit lineheight', () => {
    it('uses 1.2 effective lineheight', () => {
      window.getComputedStyle = () => getMockStyles('120px')
      expect(elementLines()).to.equal(10)
    })

    it('rounds the decimal result up', () => {
      window.getComputedStyle = () => getMockStyles('119px')
      expect(elementLines()).to.equal(10)

      window.getComputedStyle = () => getMockStyles('121px')
      expect(elementLines()).to.equal(11)
    })
  })

  describe('with explicit lineheight', () => {
    it('respects the explicit line-height', () => {
      window.getComputedStyle = () => getMockStyles('120px', '20px')
      expect(elementLines()).to.equal(6)

      window.getComputedStyle = () => getMockStyles('121px', '20px')
      expect(elementLines()).to.equal(7)
    })
  })
})

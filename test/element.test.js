import { elementLines } from '../src/element/element.lines.js'

const getImplicitStyles = (height) => ({
  lineHeight: 'normal',
  fontSize: '10px',
  height: height
})

describe('elementLines', () => {
  describe('with implicit lineheight', () => {
    test('uses 1.2 lineheight', () => {
      window.getComputedStyle = () => getImplicitStyles('120px')
      expect(elementLines()).toEqual(10)
    })

    test('rounds the decimal result up', () => {
      window.getComputedStyle = () => getImplicitStyles('119px')
      expect(elementLines()).toEqual(10)

      window.getComputedStyle = () => getImplicitStyles('121px')
      expect(elementLines()).toEqual(11)
    })
  })

  describe('with explicit lineheight', () => {})
})

describe('ElementSnipper', () => {

})

describe('getSnipText', () => {

})

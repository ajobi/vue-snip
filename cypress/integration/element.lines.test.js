import { elementLines } from '../../src/element/element.lines.js'

const getMockStyles = (height, lineHeight, fontSize) => ({
  height: height || '100px',
  lineHeight: lineHeight || 'normal',
  fontSize: fontSize || '10px'
})

let spy
beforeAll(() => {
  spy = jest.spyOn(window, 'getComputedStyle')
})

describe('elementLines', () => {
  describe('with implicit lineheight', () => {
    it('uses 1.2 effective lineheight', () => {
      spy.mockReturnValue(getMockStyles('120px'))
      expect(elementLines()).toEqual(10)
    })

    it('rounds the decimal result up', () => {
      spy.mockReturnValue(getMockStyles('119px'))
      expect(elementLines()).toEqual(10)

      spy.mockReturnValue(getMockStyles('121px'))
      expect(elementLines()).toEqual(11)
    })
  })

  describe('with explicit lineheight', () => {
    it('respects the explicit line-height', () => {
      spy.mockReturnValue(getMockStyles('120px', '20px'))
      expect(elementLines()).toEqual(6)

      spy.mockReturnValue(getMockStyles('121px', '20px'))
      expect(elementLines()).toEqual(7)
    })
  })
})

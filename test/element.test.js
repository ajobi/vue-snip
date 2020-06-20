import { elementLines } from '../src/element/element.lines.js'
import { getSnipText } from '../src/element'

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

const getMockState = (maxLines = 3, ellipsis = '...') => {
  const element = {
    innerText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias asperiores consectetur delectus dolore dolorem doloremque eveniet ex facilis fuga impedit itaque iure libero magnam necessitatibus, nemo nihil nostrum perspiciatis provident quae ratione rem saepe sunt tempora velit veritatis voluptatibus. Amet atque dolor ea excepturi hic maxime molestiae quam repellendus soluta tempora. Accusamus at ea eligendi, error facere in ipsa labore minima natus.'
  }

  const elementMap = new WeakMap()
  elementMap.set(element, {
    fullText: element.innerText,
    maxLines: maxLines
  })

  const mockState = {
    elementMap,
    options: {
      ellipsis
    }
  }

  return {
    element,
    mockState
  }
}

describe('snipText', () => {
  it('opts out on zero maxLines properly', () => {
    const { element, mockState } = getMockState(0)
    const snipText = getSnipText(mockState)

    snipText(element)

    expect(element.innerText).toEqual('')
  })

  it('opts out on negative maxLines properly', () => {
    const { element, mockState } = getMockState(-1)
    const snipText = getSnipText(mockState)

    snipText(element)

    expect(element.innerText).toEqual('')
  })

  it('opts out on within line range properly', () => {
    spy.mockReturnValue(getMockStyles())
    const { element, mockState } = getMockState(20)
    const snipText = getSnipText(mockState)
    const originalText = element.innerText

    snipText(element)

    expect(element.innerText).toEqual(originalText)
  })
})

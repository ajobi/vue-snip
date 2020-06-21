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

import { getSnipText } from '../src/element'

const getMockStyles = (height, lineHeight, fontSize) => ({
  height: height || '100px',
  lineHeight: lineHeight || 'normal',
  fontSize: fontSize || '10px'
})

let element
let spy
beforeAll(() => {
  document.body.innerHTML = `
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias asperiores consectetur delectus dolore dolorem doloremque eveniet ex facilis fuga impedit itaque iure libero magnam necessitatibus, nemo nihil nostrum perspiciatis provident quae ratione rem saepe sunt tempora velit veritatis voluptatibus. Amet atque dolor ea excepturi hic maxime molestiae quam repellendus soluta tempora. Accusamus at ea eligendi, error facere in ipsa labore minima natus.</p>
    `

  spy = jest.spyOn(window, 'getComputedStyle')
  element = document.querySelector('p')
})

const getMockState = (element, maxLines = 3, ellipsis = '...') => {
  const elementMap = new WeakMap()
  elementMap.set(element, {
    fullText: element.textContent,
    maxLines: maxLines
  })

  const mockState = {
    elementMap,
    options: {
      ellipsis
    }
  }

  return {
    mockState
  }
}

describe('snipText', () => {
  it('opts out on zero maxLines properly', () => {
    const { mockState } = getMockState(element, 0)
    const snipText = getSnipText(mockState)

    snipText(element)

    expect(element.textContent).toEqual('')
  })

  it('opts out on negative maxLines properly', () => {
    const { mockState } = getMockState(element, -1)
    const snipText = getSnipText(mockState)

    snipText(element)

    expect(element.textContent).toEqual('')
  })

  it('opts out on within line range properly', () => {
    spy.mockReturnValue(getMockStyles())
    const { mockState } = getMockState(element, 20)
    const snipText = getSnipText(mockState)
    const originalText = element.textContent

    snipText(element)

    expect(element.textContent).toEqual(originalText)
  })
})

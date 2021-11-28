import { elementLines } from '../../instrumented/element/element.lines'
import { snipByCSS } from '../../instrumented/method'
import { defaultOptions } from '../../instrumented/defaultOptions'

const getMockState = (element, maxLines = 3) => {
  const elementMap = new WeakMap()
  elementMap.set(element, {
    fullText: element.textContent,
    maxLines: maxLines
  })

  return {
    options: defaultOptions,
    elementMap
  }
}

describe('snipByCSS', () => {
  beforeEach(() => {
    cy.visit('./cypress/tests/paragraph-single.html')
  })

  it('Snips on negative max lines', () => {
    cy.get('[data-cy=paragraph]').then(($paragraph) => {
      const paragraph = $paragraph.get()[0]
      const oldLines = elementLines(paragraph)

      snipByCSS(getMockState(paragraph, -1), paragraph)

      expect(elementLines(paragraph)).to.equal(oldLines)
    })
  })

  it('Snips on zero max lines', () => {
    cy.get('[data-cy=paragraph]').then(($paragraph) => {
      const paragraph = $paragraph.get()[0]
      const oldLines = elementLines(paragraph)

      snipByCSS(getMockState(paragraph, 0), paragraph)

      expect(elementLines(paragraph)).to.equal(oldLines)
    })
  })

  it('Snips on 1 max lines', () => {
    cy.get('[data-cy=paragraph]').then(($paragraph) => {
      const paragraph = $paragraph.get()[0]
      snipByCSS(getMockState(paragraph, 1), paragraph)

      expect(elementLines(paragraph)).to.equal(1)
    })
  })

  it('Snips on 2 max lines', () => {
    cy.get('[data-cy=paragraph]').then(($paragraph) => {
      const paragraph = $paragraph.get()[0]
      snipByCSS(getMockState(paragraph, 2), paragraph)

      expect(elementLines(paragraph)).to.equal(2)
    })
  })

  it('Does not snip on 10 max lines', () => {
    cy.get('[data-cy=paragraph]').then(($paragraph) => {
      const paragraph = $paragraph.get()[0]
      const oldLines = elementLines(paragraph)

      snipByCSS(getMockState(paragraph, 10), paragraph)

      expect(elementLines(paragraph)).to.equal(oldLines)
    })
  })

  it('Maintains the original style attributes', () => {
    cy.get('[data-cy=paragraph]').then(($paragraph) => {
      const paragraph = $paragraph.get()[0]
      const originalColor = paragraph.style.color

      snipByCSS(getMockState(paragraph, 2), paragraph)

      expect(paragraph.style.color).to.equal(originalColor)
    })
  })
})

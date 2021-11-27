import { elementLines } from '../../instrumented/element/element.lines'
import { getInserted } from '../../instrumented/directive'
import { getSnipText } from '../../src/element/element.snip'

describe('Directive Inserted', () => {
  beforeEach(() => {
    cy.visit('./cypress/tests/directive.html')
  })

  it('Adds the element to the map', () => {
    cy.get('[data-cy=paragraph]').then(([paragraph]) => {
      const elementMap = new WeakMap()
      const state = { elementMap }

      const snipText = getSnipText(state)
      const inserted = getInserted(state, snipText)

      inserted(paragraph, { value: 3, arg: 'css' })

      expect(elementMap.has(paragraph)).to.equal(true)
    })
  })

  it('Snips the element', () => {
    cy.get('[data-cy=paragraph]').then(([paragraph]) => {
      const elementMap = new WeakMap()
      const state = { elementMap }

      const snipText = getSnipText(state)
      const inserted = getInserted(state, snipText)

      inserted(paragraph, { value: 3, arg: 'css' })

      expect(elementLines(paragraph)).equal(3)
    })
  })
})

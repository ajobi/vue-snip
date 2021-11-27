import { getUnbind } from '../../instrumented/directive'
import { defaultOptions } from '../../instrumented/defaultOptions'

describe('Directive Unbind', () => {
  beforeEach(() => {
    cy.visit('./cypress/tests/paragraph-single.html')
  })

  it('Removes the elements from the map', () => {
    cy.get('[data-cy=paragraph]').then(([paragraph]) => {
      const elementMap = new WeakMap()
      const state = { elementMap, options: defaultOptions }

      const unbind = getUnbind(state)

      elementMap.set(paragraph, {})
      unbind(paragraph)

      expect(elementMap.has(paragraph)).to.equal(false)
    })
  })
})

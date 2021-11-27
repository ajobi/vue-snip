import { getUnbind } from '../../instrumented/directive'

describe('Directive Unbind', () => {
  beforeEach(() => {
    cy.visit('./cypress/tests/directive.html')
  })

  it('Removes the elements from the map', () => {
    cy.get('[data-cy=paragraph]').then(([paragraph]) => {
      const elementMap = new WeakMap()
      const state = { elementMap }

      const unbind = getUnbind(state)

      elementMap.set(paragraph, {})
      unbind(paragraph)

      expect(elementMap.has(paragraph)).to.equal(false)
    })
  })
})

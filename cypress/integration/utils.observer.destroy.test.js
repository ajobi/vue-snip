import { addObserver, destroyObserver } from '../../instrumented/utils'

describe('addObserver', () => {
  beforeEach(() => {
    cy.visit('./cypress/tests/paragraph-single.html')
  })

  it('Removes the observer from the element state', () => {
    cy.get('[data-cy=paragraph]').then(([paragraph]) => {
      const elementMap = new WeakMap()
      elementMap.set(paragraph, {})

      const snipText = () => {}
      const state = { elementMap }

      addObserver(state, snipText, paragraph)
      destroyObserver(state, paragraph)

      expect(state.elementMap.get(paragraph).observer).eq(undefined)
      expect(state.elementMap.get(paragraph).observer).eq(undefined)
    })
  })
})

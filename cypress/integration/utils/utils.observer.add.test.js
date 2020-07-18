import { addObserver } from '../../../src/utils'

describe('addObserver', () => {
  beforeEach(() => {
    cy.visit('utils/observer')
  })

  it('Adds the observer to the element state', () => {
    cy.get('[data-cy=paragraph]').then(([el]) => {
      const elementMap = new WeakMap()
      elementMap.set(el, {})

      const snipText = () => {}
      const state = { elementMap }

      expect(state.elementMap.get(el).observer).eq(undefined)
      expect(state.elementMap.get(el).prevWidth).eq(undefined)

      addObserver(state, snipText, el)

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(10).then(() => {
        expect(state.elementMap.get(el).observer).not.eq(undefined)
        expect(state.elementMap.get(el).prevWidth).not.eq(undefined)
      })
    })
  })
})

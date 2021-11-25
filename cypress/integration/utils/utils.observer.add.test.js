import { addObserver } from '../../../instrumented/utils'

describe('addObserver', () => {
  beforeEach(() => {
    cy.visit('./cypress/tests/utils/observer/index.html')
  })

  it('Adds the observer to the element state', () => {
    cy.get('[data-cy=paragraph]').then(([el]) => {
      const elementMap = new WeakMap()
      elementMap.set(el, {})

      const snipText = () => {}
      const state = { elementMap }

      expect(state.elementMap.get(el).observer).eq(undefined)

      addObserver(state, snipText, el)

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      // cy.wait(10).then(() => {
      expect(state.elementMap.get(el).observer).not.eq(undefined)
      // })
    })
  })
})

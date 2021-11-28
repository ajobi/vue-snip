import { addObserver, destroyObserver } from '../../instrumented/utils'
import { defaultOptions } from '../../instrumented/defaultOptions'

describe('addObserver', () => {
  beforeEach(() => {
    cy.visit('./cypress/tests/paragraph-single.html')
  })

  it('Removes the observer from the element state', () => {
    cy.get('[data-cy=paragraph]').then(($paragraph) => {
      const paragraph = $paragraph.get()[0]
      const elementMap = new WeakMap()
      elementMap.set(paragraph, {})

      const snipText = cy.stub()
      const state = { elementMap, options: defaultOptions }

      addObserver(state, snipText, paragraph)
      destroyObserver(state, paragraph)

      expect(state.elementMap.get(paragraph).observer).eq(undefined)
      expect(state.elementMap.get(paragraph).observer).eq(undefined)
    })
  })
})

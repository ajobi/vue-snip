import { addObserver, destroyObserver } from '../../instrumented/utils'
import { defaultOptions } from '../../instrumented/defaultOptions'
import { getSnipText } from '../../instrumented/element/element.snip'

describe('addObserver', () => {
  beforeEach(() => {
    cy.visit('./cypress/tests/utils.observer.html')
  })

  it('Adds the observer to the element state', () => {
    cy.get('[data-cy=paragraph]').then(([el]) => {
      const elementMap = new WeakMap()
      const state = { elementMap, options: defaultOptions }

      elementMap.set(el, {})

      const snipText = getSnipText(state)
      expect(state.elementMap.get(el).observer).eq(undefined)

      addObserver(state, snipText, el)

      expect(state.elementMap.get(el).observer).not.eq(undefined)
      destroyObserver(state, el)
    })
  })

  it('Snips the element on resize', () => {
    cy.get('[data-cy=paragraph]').then(([el]) => {
      const elementMap = new WeakMap()
      const state = { elementMap, options: defaultOptions }
      elementMap.set(el, {})

      const snipText = cy.stub()
      addObserver(state, snipText, el)

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(20).then(() => {
        expect(snipText).to.have.callCount(1)

        el.style.width = '50%'

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(20).then(() => {
          expect(snipText).to.have.callCount(2)

          destroyObserver(state, el)
        })
      })
    })
  })

  it('Does not snip if the element dimensions did not change', () => {
    cy.get('[data-cy=paragraph]').then(([el]) => {
      const elementMap = new WeakMap()
      const state = { elementMap, options: defaultOptions }
      elementMap.set(el, {})

      const snipText = cy.stub()
      const elState = elementMap.get(el)
      elState.prevWidth = el.clientWidth
      elState.prevHeight = el.clientHeight
      addObserver(state, snipText, el)

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(20).then(() => {
        expect(snipText).to.have.callCount(0)
        destroyObserver(state, el)
      })
    })
  })
})

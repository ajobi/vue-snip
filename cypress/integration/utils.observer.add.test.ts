import { addObserver, destroyObserver } from '../../instrumented/utils'
import { defaultOptions } from '../../instrumented/defaultOptions'
import { getSnipText } from '../../instrumented/element/element.snip'

describe('addObserver', () => {
  beforeEach(() => {
    cy.visit('./cypress/tests/paragraph-single.html')
  })

  it('Adds the observer to the element state', () => {
    cy.get('[data-cy=paragraph]').then(($paragraph) => {
      const paragraph = $paragraph.get()[0]
      const elementMap = new WeakMap()
      const state = { elementMap, options: defaultOptions }

      elementMap.set(paragraph, {})

      const snipText = getSnipText(state)
      expect(state.elementMap.get(paragraph).observer).eq(undefined)

      addObserver(state, snipText, paragraph)

      expect(state.elementMap.get(paragraph).observer).not.eq(undefined)
      destroyObserver(state, paragraph)
    })
  })

  it('Snips the element on resize', () => {
    cy.get('[data-cy=paragraph]').then(($paragraph) => {
      const paragraph = $paragraph.get()[0]
      const elementMap = new WeakMap()
      const state = { elementMap, options: defaultOptions }
      elementMap.set(paragraph, {})

      const snipText = cy.stub()
      addObserver(state, snipText, paragraph)

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(20).then(() => {
        expect(snipText).to.have.callCount(1)

        paragraph.style.width = '50%'

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(20).then(() => {
          expect(snipText).to.have.callCount(2)

          destroyObserver(state, paragraph)
        })
      })
    })
  })

  it('Does not snip if the element dimensions did not change', () => {
    cy.get('[data-cy=paragraph]').then(($paragraph) => {
      const paragraph = $paragraph.get()[0]
      const elementMap = new WeakMap()
      const state = { elementMap, options: defaultOptions }
      elementMap.set(paragraph, {})

      const snipText = cy.stub()
      const elState = elementMap.get(paragraph)
      elState.prevWidth = paragraph.clientWidth
      elState.prevHeight = paragraph.clientHeight
      addObserver(state, snipText, paragraph)

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(20).then(() => {
        expect(snipText).to.have.callCount(0)
        destroyObserver(state, paragraph)
      })
    })
  })
})

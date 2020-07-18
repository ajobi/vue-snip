import { defaultOptions } from '../../src/defaultOptions'
import plugin from '../../src/index.js'

const { maxLines, snipMethod } = defaultOptions

describe('Vue Snip', () => {
  beforeEach(() => {
    cy.visit('/directive')
  })

  describe('Installation', () => {
    it('Does not expose the state without debugMode', () => {
      plugin.install({ directive: () => {} }, { debugMode: false })
      expect(window.__VueSnipState).equal(undefined)
    })

    it('Exposes the state on debugMode', () => {
      plugin.install({ directive: () => {} }, { debugMode: true })
      expect(window.__VueSnipState).not.equal(undefined)
    })
  })

  describe('Maxlines used', () => {
    it('Uses default max lines without explicit value', () => {
      cy.window().then(window => {
        cy.get('[data-cy=paragraph1]').then(([paragraph]) => {
          const elementState = window.__VueSnipState.elementMap.get(paragraph)

          expect(elementState.maxLines).to.equal(maxLines)

          cy.get('[data-cy=linesPlus]').click().then(() => {
            expect(elementState.maxLines).to.equal(maxLines)
          })
        })
      })
    })

    it('Uses explicit maxlines if given', () => {
      cy.window().then(window => {
        cy.get('[data-cy=paragraph2]').then(([paragraph]) => {
          const elementState = window.__VueSnipState.elementMap.get(paragraph)

          expect(elementState.maxLines).to.equal(maxLines)

          cy.get('[data-cy=linesPlus]').click().then(() => {
            expect(elementState.maxLines).to.equal(4)
          })
        })
      })
    })
  })

  describe('Method used', () => {
    it('Uses default method without explicit argument', () => {
      cy.window().then(window => {
        cy.get('[data-cy=paragraph1]').then(([paragraph]) => {
          const elementState = window.__VueSnipState.elementMap.get(paragraph)

          expect(elementState.snipMethod).to.equal(snipMethod)

          cy.get('[data-cy=methodToggle]').click().then(() => {
            expect(elementState.snipMethod).to.equal(snipMethod)
          })
        })
      })
    })

    it('Uses explicit method if given', () => {
      cy.window().then(window => {
        cy.get('[data-cy=paragraph3]').then(([paragraph]) => {
          const elementState = window.__VueSnipState.elementMap.get(paragraph)

          expect(elementState.snipMethod).to.equal(snipMethod)

          cy.get('[data-cy=methodToggle]').click().then(() => {
            expect(elementState.snipMethod).to.equal('js')
          })

          cy.get('[data-cy=methodToggle]').click().then(() => {
            expect(elementState.snipMethod).to.equal('css')
          })
        })
      })
    })

    it('Uses fallback method instead of default method', () => {
      cy.window().then(window => {
        window.CSS = undefined
        cy.get('[data-cy=visibilityToggle]').click().then(() => {
          cy.get('[data-cy=visibilityToggle]').click().then(() => {
            cy.get('[data-cy=paragraph1]').then(([paragraph]) => {
              const elementState = window.__VueSnipState.elementMap.get(paragraph)
              expect(elementState.snipMethod).to.equal('js')
            })
          })
        })
      })
    })

    it('Uses fallback method instead of the explicit method', () => {
      cy.window().then(window => {
        window.CSS = undefined
        cy.get('[data-cy=visibilityToggle]').click().then(() => {
          cy.get('[data-cy=visibilityToggle]').click().then(() => {
            cy.get('[data-cy=paragraph3]').then(([paragraph]) => {
              const elementState = window.__VueSnipState.elementMap.get(paragraph)
              expect(elementState.snipMethod).to.equal('js')

              cy.get('[data-cy=methodToggle]').click().then(() => {
                expect(elementState.snipMethod).to.equal('js')
              })
            })
          })
        })
      })
    })
  })
})

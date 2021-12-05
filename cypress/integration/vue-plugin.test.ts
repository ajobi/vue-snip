import { defaultOptions } from '../../instrumented/defaultOptions'
import plugin from '../../instrumented/index'

const { maxLines, snipMethod } = defaultOptions

const getMockVue = (version?, directive?) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const Vue = function () {}
  Vue.directive = directive || (() => ({}))
  Vue.version = version || '2.0.0'

  return Vue
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
describe('Vue Plugin', () => {
  beforeEach(() => {
    cy.visit('./cypress/tests/integration-v2.html')
  })

  describe('Installation', () => {
    describe('Debug mode', () => {
      it('Does not expose the state without debugMode', () => {
        // @ts-ignore
        plugin.install(getMockVue(), { debugMode: false })
        expect(window.__VueSnipState).equal(undefined)
      })

      it('Exposes the state on debugMode', () => {
        // @ts-ignore
        plugin.install(getMockVue(), { debugMode: true })
        expect(window.__VueSnipState).not.equal(undefined)
      })
    })

    describe('Snip function', () => {
      it('Does not expose the snip function without exposeSnipFunction', () => {
        const Vue = getMockVue()

        // @ts-ignore
        plugin.install(Vue, { exposeSnipFunction: false })

        expect(new Vue().$snipText).eq(undefined)
      })

      it('Exposes the snip function with exposeSnipFunction', () => {
        const Vue = getMockVue()

        // @ts-ignore
        plugin.install(Vue, { exposeSnipFunction: true })

        expect(new Vue()[`$${defaultOptions.snipFunctionName}`]).not.eq(undefined)
      })

      it('Uses the given snipFunctionName', () => {
        const Vue = getMockVue()
        const snipFunctionName = 'test'

        // @ts-ignore
        plugin.install(Vue, { exposeSnipFunction: true, snipFunctionName: snipFunctionName })

        expect(new Vue()[`$${snipFunctionName}`]).not.eq(undefined)
      })
    })
  })

  describe('Maxlines used', () => {
    it('Uses default max lines without explicit value', () => {
      cy.window().then((window) => {
        cy.get('[data-cy=paragraph1]').then(($paragraph) => {
          const elementState = window.__VueSnipState.elementMap.get($paragraph.get()[0])

          expect(elementState.maxLines).to.equal(maxLines)

          cy.get('[data-cy=linesPlus]')
            .click()
            .then(() => {
              expect(elementState.maxLines).to.equal(maxLines)
            })
        })
      })
    })

    it('Uses explicit maxlines if given', () => {
      cy.window().then((window) => {
        cy.get('[data-cy=paragraph2]').then(($paragraph) => {
          const elementState = window.__VueSnipState.elementMap.get($paragraph.get()[0])

          expect(elementState.maxLines).to.equal(maxLines)

          cy.get('[data-cy=linesPlus]')
            .click()
            .then(() => {
              expect(elementState.maxLines).to.equal(4)
            })
        })
      })
    })
  })

  describe('Method used', () => {
    it('Uses default method without explicit argument', () => {
      cy.window().then((window) => {
        cy.get('[data-cy=paragraph1]').then(($paragraph) => {
          const elementState = window.__VueSnipState.elementMap.get($paragraph.get()[0])

          expect(elementState.snipMethod).to.equal(snipMethod)

          cy.get('[data-cy=methodToggle]')
            .click()
            .then(() => {
              expect(elementState.snipMethod).to.equal(snipMethod)
            })
        })
      })
    })

    it('Uses explicit method if given', () => {
      cy.window().then((window) => {
        cy.get('[data-cy=paragraph3]').then(($paragraph) => {
          const elementState = window.__VueSnipState.elementMap.get($paragraph.get()[0])

          expect(elementState.snipMethod).to.equal(snipMethod)

          cy.get('[data-cy=methodToggle]')
            .click()
            .then(() => {
              expect(elementState.snipMethod).to.equal('js')
            })

          cy.get('[data-cy=methodToggle]')
            .click()
            .then(() => {
              expect(elementState.snipMethod).to.equal('css')
            })
        })
      })
    })

    it('Uses fallback method instead of default method', () => {
      cy.window().then((window) => {
        window.CSS = undefined
        cy.get('[data-cy=visibilityToggle]')
          .click()
          .then(() => {
            cy.get('[data-cy=visibilityToggle]')
              .click()
              .then(() => {
                cy.get('[data-cy=paragraph1]').then(($paragraph) => {
                  const elementState = window.__VueSnipState.elementMap.get($paragraph.get()[0])
                  expect(elementState.snipMethod).to.equal('js')
                })
              })
          })
      })
    })

    it('Uses fallback method instead of the explicit method', () => {
      cy.window().then((window) => {
        window.CSS = undefined
        cy.get('[data-cy=visibilityToggle]')
          .click()
          .then(() => {
            cy.get('[data-cy=visibilityToggle]')
              .click()
              .then(() => {
                cy.get('[data-cy=paragraph3]').then(($paragraph) => {
                  const elementState = window.__VueSnipState.elementMap.get($paragraph.get()[0])
                  expect(elementState.snipMethod).to.equal('js')

                  cy.get('[data-cy=methodToggle]')
                    .click()
                    .then(() => {
                      expect(elementState.snipMethod).to.equal('js')
                    })
                })
              })
          })
      })
    })
  })

  describe('Compatibility', () => {
    it('Handles Vue 2', () => {
      let directiveResult = null

      plugin.install(
        // @ts-ignore
        getMockVue('2.0.0', (directiveName, directiveOptions) => {
          directiveResult = directiveOptions
        })
      )

      expect(directiveResult.mounted).equal(undefined)
      expect(directiveResult.updated).equal(undefined)
      expect(directiveResult.unmounted).equal(undefined)
      expect(directiveResult.inserted).not.equal(undefined)
      expect(directiveResult.update).not.equal(undefined)
      expect(directiveResult.unbind).not.equal(undefined)
    })

    it('Handles Vue 3', () => {
      let directiveResult = null

      plugin.install(
        // @ts-ignore
        getMockVue('3.0.0', (directiveName, directiveOptions) => {
          directiveResult = directiveOptions
        })
      )

      expect(directiveResult.mounted).not.equal(undefined)
      expect(directiveResult.updated).not.equal(undefined)
      expect(directiveResult.unmounted).not.equal(undefined)
      expect(directiveResult.inserted).equal(undefined)
      expect(directiveResult.update).equal(undefined)
      expect(directiveResult.unbind).equal(undefined)
    })
  })
})

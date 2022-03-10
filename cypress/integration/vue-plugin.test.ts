import plugin from '../../instrumented/index'

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

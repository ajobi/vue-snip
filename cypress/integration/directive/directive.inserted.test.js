import { elementLines } from '../../../instrumented/element/element.lines'

describe('Directive Inserted', () => {
  beforeEach(() => {
    cy.visit('./cypress/tests/directive/index.html')
  })

  it('Adds the element to the map', () => {
    cy.window().then(window => {
      const { elementMap } = window.__VueSnipState
      cy.get('[data-cy=paragraph1]').then(([paragraph]) => {
        expect(elementMap.has(paragraph)).to.equal(true)
      })
    })
  })

  it('Snips the element', () => {
    cy.get('[data-cy=paragraph1]').then(([paragraph]) => {
      expect(elementLines(paragraph)).equal(3)
    })
  })
})

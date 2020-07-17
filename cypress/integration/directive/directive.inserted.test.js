describe('Directive Inserted', () => {
  beforeEach(() => {
    cy.visit('/directive')
  })

  it('Adds the element to the map', () => {
    cy.window().then(window => {
      const { elementMap } = window.__VueSnipState
      cy.get('[data-cy=paragraph1]').then(([paragraph]) => {
        expect(elementMap.has(paragraph)).to.equal(true)
      })
    })
  })
})

describe('Directive Unbind', () => {
  beforeEach(() => {
    cy.visit('/directive')
  })

  it('Removes the elements from the map', () => {
    cy.window().then(window => {
      const { elementMap } = window.__VueSnipState

      let paragraph1 = null
      let paragraph2 = null
      let paragraph3 = null
      let paragraph4 = null

      cy.get('[data-cy=paragraph1]').then(([paragraph]) => {
        expect(elementMap.has(paragraph)).to.equal(true)
        paragraph1 = paragraph
      })

      cy.get('[data-cy=paragraph2]').then(([paragraph]) => {
        paragraph2 = paragraph
        expect(elementMap.has(paragraph)).to.equal(true)
      })

      cy.get('[data-cy=paragraph3]').then(([paragraph]) => {
        paragraph3 = paragraph
        expect(elementMap.has(paragraph)).to.equal(true)
      })

      cy.get('[data-cy=paragraph4]').then(([paragraph]) => {
        paragraph4 = paragraph
        expect(elementMap.has(paragraph)).to.equal(true)
      })

      cy.get('[data-cy=visibilityToggle]').click().then(() => {
        expect(elementMap.has(paragraph1)).to.equal(false)
        expect(elementMap.has(paragraph2)).to.equal(false)
        expect(elementMap.has(paragraph3)).to.equal(false)
        expect(elementMap.has(paragraph4)).to.equal(false)
      })
    })
  })
})

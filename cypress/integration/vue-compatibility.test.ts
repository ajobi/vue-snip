import { getLines } from 'js-snip'

describe('Vue compatibility', () => {
  it('Works with Vue 2', () => {
    cy.visit('./cypress/tests/integration-v2.html')
    expect(true).to.equal(true)

    cy.get('[data-cy=paragraph4]').should(($paragraph) => {
      expect(getLines($paragraph.get()[0])).to.equal(3)
    })
  })

  it('Works with Vue 3', () => {
    cy.visit('./cypress/tests/integration-v3.html')
    expect(true).to.equal(true)

    cy.get('[data-cy=paragraph4]').should(($paragraph) => {
      expect(getLines($paragraph.get()[0])).to.equal(3)
    })
  })
})

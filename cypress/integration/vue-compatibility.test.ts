import { elementLines } from '../../instrumented/element/element.lines'

describe('Vue compatibility', () => {
  it('Works with Vue 2', () => {
    cy.visit('./cypress/tests/integration-v2.html')
    expect(true).to.equal(true)

    cy.get('[data-cy=paragraph4]').then(($paragraph) => {
      expect(elementLines($paragraph.get()[0])).to.equal(3)
    })
  })

  it('Works with Vue 3', () => {
    cy.visit('./cypress/tests/integration-v3.html')
    expect(true).to.equal(true)

    cy.get('[data-cy=paragraph4]').then(($paragraph) => {
      expect(elementLines($paragraph.get()[0])).to.equal(3)
    })
  })
})

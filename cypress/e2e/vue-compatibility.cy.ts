import { getLines } from 'js-snip'

describe('Vue compatibility', () => {
  describe('Vue 2', () => {
    beforeEach(() => {
      cy.visit('./cypress/tests/integration-v2.html')
    })

    it('Works in CSS mode', () => {
      cy.get('[data-cy=paragraph1]').should(($paragraph) => {
        expect(getLines($paragraph.get()[0])).to.equal(2)
      })
    })

    it('Works in JS mode', () => {
      cy.get('[data-cy=paragraph2]').should(($paragraph) => {
        expect(getLines($paragraph.get()[0])).to.equal(2)
      })
    })
  })

  describe('Vue 3', () => {
    beforeEach(() => {
      cy.visit('./cypress/tests/integration-v3.html')
    })

    it('Works in CSS mode', () => {
      cy.get('[data-cy=paragraph1]').should(($paragraph) => {
        expect(getLines($paragraph.get()[0])).to.equal(2)
      })
    })

    it('Works in JS mode', () => {
      cy.get('[data-cy=paragraph2]').should(($paragraph) => {
        expect(getLines($paragraph.get()[0])).to.equal(2)
      })
    })
  })
})

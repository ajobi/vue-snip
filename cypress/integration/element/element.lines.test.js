import { elementLines } from '../../../instrumented/element/element.lines'

describe('elementLines', () => {
  describe('with implicit lineheight', () => {
    beforeEach(() => {
      cy.visit('./cypress/tests/element/lines/index.html')
    })

    it('returns 0 on empty text', () => {
      cy.get('[data-cy=paragraph1]').then(([paragraph]) => {
        expect(elementLines(paragraph)).to.equal(0)
      })
    })

    it('returns correct values on wrapping texts', () => {
      cy.get('[data-cy=paragraph2]').then(([paragraph]) => {
        expect(elementLines(paragraph)).to.equal(1)
      })

      cy.get('[data-cy=paragraph3]').then(([paragraph]) => {
        expect(elementLines(paragraph)).to.equal(2)
      })

      cy.get('[data-cy=paragraph4]').then(([paragraph]) => {
        expect(elementLines(paragraph)).to.equal(3)
      })

      cy.get('[data-cy=paragraph5]').then(([paragraph]) => {
        expect(elementLines(paragraph)).to.equal(4)
      })
    })
  })

  describe('with explicit lineheight', () => {
    describe('with higher than fontsize lineheight', () => {
      beforeEach(() => {
        cy.visit('./cypress/tests/element/lines/index.html')
        cy.get('p').invoke('attr', 'style', 'line-height: 3rem')
      })

      it('returns 0 on empty text', () => {
        cy.get('[data-cy=paragraph1]').then(([paragraph]) => {
          expect(elementLines(paragraph)).to.equal(0)
        })
      })

      it('returns correct values on wrapping texts', () => {
        cy.get('[data-cy=paragraph2]').then(([paragraph]) => {
          expect(elementLines(paragraph)).to.equal(1)
        })

        cy.get('[data-cy=paragraph3]').then(([paragraph]) => {
          expect(elementLines(paragraph)).to.equal(2)
        })

        cy.get('[data-cy=paragraph4]').then(([paragraph]) => {
          expect(elementLines(paragraph)).to.equal(3)
        })

        cy.get('[data-cy=paragraph5]').then(([paragraph]) => {
          expect(elementLines(paragraph)).to.equal(4)
        })
      })
    })

    describe('with smaller than fontsize lineheight', () => {
      beforeEach(() => {
        cy.visit('./cypress/tests/element/lines/index.html')
        cy.get('p').invoke('attr', 'style', 'line-height: 0.1rem')
      })

      it('returns 0 on empty text', () => {
        cy.get('[data-cy=paragraph1]').then(([paragraph]) => {
          expect(elementLines(paragraph)).to.equal(0)
        })
      })

      it('returns correct values on wrapping texts', () => {
        cy.get('[data-cy=paragraph2]').then(([paragraph]) => {
          expect(elementLines(paragraph)).to.equal(1)
        })

        cy.get('[data-cy=paragraph3]').then(([paragraph]) => {
          expect(elementLines(paragraph)).to.equal(2)
        })

        cy.get('[data-cy=paragraph4]').then(([paragraph]) => {
          expect(elementLines(paragraph)).to.equal(3)
        })

        cy.get('[data-cy=paragraph5]').then(([paragraph]) => {
          expect(elementLines(paragraph)).to.equal(4)
        })
      })
    })

    describe('with 0 lineheight', () => {
      beforeEach(() => {
        cy.visit('./cypress/tests/element/lines/index.html')
        cy.get('p').invoke('attr', 'style', 'line-height: 0')
      })

      it('returns 0 on each text', () => {
        cy.get('[data-cy=paragraph1]').then(([paragraph]) => {
          expect(elementLines(paragraph)).to.equal(0)
        })

        cy.get('[data-cy=paragraph2]').then(([paragraph]) => {
          expect(elementLines(paragraph)).to.equal(0)
        })

        cy.get('[data-cy=paragraph3]').then(([paragraph]) => {
          expect(elementLines(paragraph)).to.equal(0)
        })

        cy.get('[data-cy=paragraph4]').then(([paragraph]) => {
          expect(elementLines(paragraph)).to.equal(0)
        })

        cy.get('[data-cy=paragraph5]').then(([paragraph]) => {
          expect(elementLines(paragraph)).to.equal(0)
        })
      })
    })
  })
})

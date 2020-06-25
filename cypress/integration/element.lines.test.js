import { elementLines } from '../../src/element/element.lines'

describe('elementLines', () => {
  beforeEach(() => {
    cy.visit('/lines')
  })

  describe('with implicit lineheight', () => {
    it('returns 0 on empty text', () => {
      cy.get('p').then(paragraphs => {
        expect(elementLines(paragraphs[0])).to.equal(0)
      })
    })

    it('returns correct values on wrapping text', () => {
      cy.get('p').then(paragraphs => {
        expect(elementLines(paragraphs[1])).to.equal(1)
        expect(elementLines(paragraphs[2])).to.equal(2)
        expect(elementLines(paragraphs[3])).to.equal(3)
        expect(elementLines(paragraphs[4])).to.equal(4)
      })
    })
  })

  describe('with explicit lineheight', () => {
    before(() => {
      cy.get('p').invoke('attr', 'style', 'line-height: 3rem')
    })

    it('returns 0 on empty text', () => {
      cy.get('p').then(paragraphs => {
        expect(elementLines(paragraphs[0])).to.equal(0)
      })
    })

    it('returns correct values on wrapping text', () => {
      cy.get('p').then(paragraphs => {
        expect(elementLines(paragraphs[1])).to.equal(1)
        expect(elementLines(paragraphs[2])).to.equal(2)
        expect(elementLines(paragraphs[3])).to.equal(3)
        expect(elementLines(paragraphs[4])).to.equal(4)
      })
    })
  })
})

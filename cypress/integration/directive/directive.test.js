// import { defaultOptions } from '../../../src/defaultOptions'
//
// const { maxLines, snipMethod } = defaultOptions
//
// describe('Directive', () => {
//   beforeEach(() => {
//     cy.visit('/directive')
//   })
//
//   describe('Paragraph without value and parameters', () => {
//     it('Does always use default maxLines', () => {
//       cy.window().then(window => {
//         cy.get('[data-cy=paragraphOne]').then(([parOne]) => {
//           const elementState = window.__VueSnipState.elementMap.get(parOne)
//
//           expect(elementState.maxLines).to.equal(maxLines)
//
//           cy.get('[data-cy=linesPlus]').click().then(() => {
//             expect(elementState.maxLines).to.equal(maxLines)
//           })
//         })
//       })
//     })
//
//     it('Does always use default snipping method', () => {
//       cy.window().then(window => {
//         cy.get('[data-cy=paragraphOne]').then(([parOne]) => {
//           const elementState = window.__VueSnipState.elementMap.get(parOne)
//
//           expect(elementState.snipMethod).to.equal(snipMethod)
//
//           cy.get('[data-cy=methodToggle]').click().then(() => {
//             expect(elementState.snipMethod).to.equal(snipMethod)
//           })
//         })
//       })
//     })
//   })
//
//   describe('Paragraph with value and without parameters', () => {
//     it('Reflects the directive value changes', () => {
//       cy.window().then(window => {
//         cy.get('[data-cy=paragraphTwo]').then(([parTwo]) => {
//           const elementState = window.__VueSnipState.elementMap.get(parTwo)
//
//           expect(elementState.maxLines).to.equal(maxLines)
//
//           cy.get('[data-cy=linesPlus]').click().then(() => {
//             expect(elementState.maxLines).to.equal(4)
//           })
//         })
//       })
//     })
//
//     it('Does always use default snipping method', () => {
//       cy.window().then(window => {
//         cy.get('[data-cy=paragraphTwo]').then(([parTwo]) => {
//           const elementState = window.__VueSnipState.elementMap.get(parTwo)
//
//           expect(elementState.snipMethod).to.equal(snipMethod)
//
//           cy.get('[data-cy=methodToggle]').click().then(() => {
//             expect(elementState.snipMethod).to.equal(snipMethod)
//           })
//         })
//       })
//     })
//   })
// })

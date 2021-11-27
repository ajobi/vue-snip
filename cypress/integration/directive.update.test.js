import { getSnipText } from '../../instrumented/element/element.snip'
import { getUpdate } from '../../instrumented/directive'
import { defaultOptions } from '../../instrumented/defaultOptions'

describe('Directive Update', () => {
  beforeEach(() => {
    cy.visit('./cypress/tests/directive.html')
  })

  it('Updates the map record of the element', () => {
    cy.get('[data-cy=paragraph]').then(([paragraph]) => {
      const elementMap = new WeakMap()
      const state = { elementMap, options: defaultOptions }

      const snipText = getSnipText(state)
      const update = getUpdate(state, snipText)
      elementMap.set(paragraph, {})

      update(paragraph, { value: 3, arg: 'css' })

      expect(elementMap.get(paragraph).maxLines).to.equal(3)
      expect(elementMap.get(paragraph).snipMethod).to.equal('css')

      update(paragraph, { value: 2, arg: 'js' })

      expect(elementMap.get(paragraph).maxLines).to.equal(2)
      expect(elementMap.get(paragraph).snipMethod).to.equal('js')
    })
  })

  // it('Snips the element', () => {
  //   cy.get('[data-cy=paragraph4]').then(([paragraph]) => {
  //     expect(elementLines(paragraph)).equal(3)
  //
  //     cy.get('[data-cy=linesPlus]').click().then(() => {
  //       expect(elementLines(paragraph)).equal(4)
  //     })
  //   })
  // })
})

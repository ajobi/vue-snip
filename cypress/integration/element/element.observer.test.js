import { getResizeObserver } from '../../../src/element/element.observer'
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer'

const optionsWithPolyfill = {
  resizeObserverPolyfill: ResizeObserverPolyfill
}

describe('ResizeObserver polyfill', () => {
  beforeEach(() => {
    cy.visit('element/observer')
  })

  it('returns native observer if available', () => {
    expect(window.ResizeObserver).to.not.equal(undefined)
    expect(getResizeObserver()).to.equal(window.ResizeObserver)
  })

  it('returns polyfill if native observer is unavailable', () => {
    window.ResizeObserver = undefined
    expect(getResizeObserver(optionsWithPolyfill)).to.equal(ResizeObserverPolyfill)
  })
})

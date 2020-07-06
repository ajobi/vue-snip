import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer'

export const getResizeObserver = () => window.ResizeObserver || ResizeObserverPolyfill

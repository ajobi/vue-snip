import { DirectiveHook } from 'vue'
import { SnipOptions, OnSnipped } from 'js-snip'

export interface VueSnipOptions extends SnipOptions {
  onSnipped: OnSnipped
}

export type VueSnipDirectiveHook = DirectiveHook<HTMLElement, null, Partial<VueSnipOptions>>

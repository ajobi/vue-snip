import { defaultOptions } from './defaultOptions'
import { getInserted, getUpdate, getUnbind } from './directive'
import { SnipOptions } from './types'
import { Plugin } from 'vue'

export default ((): Plugin => ({
  install (Vue, options: SnipOptions) {
    options = {
      ...defaultOptions,
      ...options
    }

    const inserted = getInserted()
    const update = getUpdate()
    const unbind = getUnbind()

    const isVue3 = parseFloat(Vue.version[0]) > 2

    Vue.directive(options.directiveName, {
      [isVue3 ? 'mounted' : 'inserted']: inserted,
      [isVue3 ? 'updated' : 'update']: update,
      [isVue3 ? 'unmounted' : 'unbind']: unbind
    })
  }
}))()

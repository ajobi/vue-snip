# vue-snip

[![Build Status](https://travis-ci.org/ajobi/vue-snip.svg?branch=master)](https://travis-ci.org/ajobi/vue-snip)
![Coveralls github](https://img.shields.io/coveralls/github/ajobi/vue-snip)
![GitHub issues](https://img.shields.io/github/issues/ajobi/vue-snip)
![GitHub](https://img.shields.io/github/license/ajobi/vue-snip)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/vue-snip)

Vue.js directive that clamps the content of a text element if it exceeds the specified number of lines.

#### Key features:
* no need to specify line heights
* no dependencies (small and fast)
* two snipping approaches (CSS / JavaScript) picked on a per-element basis
* re-snipping on element resize and reactive data change

![](assets/illustration.png)

To get a hands-on experience try the [Interactive Demo](https://ajobi.github.io/vue-snip/).

## Installation

``` bash
# install with npm
npm install vue-snip

# or with yarn
yarn add vue-snip
```

``` javascript
import Vue from 'vue'
import VueSnip from 'vue-snip'

Vue.use(VueSnip)
```

## Usage

The most basic usage looks like this:

``` html
<template>
  <p v-snip> ... </p>
</template>
```

Most of the time, you probably need to pass in the `maxLines` value:

``` html
<template>
  <p v-snip="3"> ... </p>
</template>
```

You can also pass in the snipping `method` argument:

``` html
<template>
  <p v-snip:js="3"> ... </p>
</template>
```

Both of these are reactive so you can do even this:

``` html
<template>
  <p v-snip:[method]="maxLines"> ... </p>
</template>

<script>
  export default {
    data () {
      return {
        method: 'js',
        maxLines: 3
      }
    }
  }
</script>
```

Elements are automatically re-snipped when they get resized or when reactive data changes. If you need to re-snip an element in some different case, you can expose the snipping function to your Vue instances via the `exposeSnipFunction` options property and snip the element manually as needed:

``` html
<template>
  <p v-snip:js="3" :class={ 'big-font-size': bigFontSize } ref="paragraph"> ... </p>
</template>

<script>
  export default {
    data () {
      return {
        bigFontSize: false,
      }
    }
    mounted () {
      setTimeout(() => {
        this.bigFontSize = true
        this.$nextTick(() => this.$snipText(this.$refs.paragraph))
      }, 2000)
    }
  }
</script>
```

## Options

Your options will get merged with the defaults, so just define what you want to change (no need to redefine all properties).

``` javascript
import Vue from 'vue'
import VueSnip from 'vue-snip'

const options = {
  // your setup
}

Vue.use(VueSnip, options)
```

#### The options object:

| Property | Default | Description |
| --- | --- | --- |
| directiveName | `'snip'` | The name of the directive in your templates. Gets prefixed with `v-` (f.e. `v-snip`). |
| snipMethod | `'css'` | Global snipping approach. Will be used for the element if no explicit `method` argument is passed in for that element. Should equal `'css'` or `'js'`. |
| maxLines | `3` | Global max lines. Will be used for the element if no explicit `maxLines` value is passed in for that element. |
| separators | `['. ', ', ', ' ', '']` | Used internally to split the `innerText` of the element into chunks and find the snipped text in an effective way. *Note: Property only applies to the JS approach.* |
| ellipsis | `'.\u200A.\u200A.'` | A character or a group of characters displayed at the end of the snipped text. *Note: Property only applies to the JS approach. You cannot change the ellipsis when using the CSS method.* |
| debugMode | `false` | Exposes directive state as the `window.__VueSnipState` |
| exposeSnipFunction | `false` | Exposes the internal snip function ((el: Element) => void) as the instance property via `Vue.prototype`. |
| snipFunctionName | `'snipText'` | The name of the exposed instance property. Gets prefixed with `$` (f.e. `this.$snipText`). |

## How it works

- **CSS** approach is based on the `-webkit-line-clamp`.
- **JavaScript** approach is based on the progressive cutting of the element's `innerText` in a loop.

*Note: CSS approach is faster (preferred), but does not work in older browsers / in all situations (f.e. does not work in IE11, when you need the text to flow around a floated element, or when you want a custom ellipsis). The idea is to allow you to freely pick the approach on a per-element basis.*

### Caveats

#### Element style attribute

The directive internally operates on the element's `style` attribute. You should not modify the `style` attribute of elements you are snipping. Use classes instead.

#### Element height

For the directive to be able to determine the number of lines / hide the text-overflow properly, the height of the element should be the same as the height of the text. Be wary of any CSS steps that will affect the height of the element. Some of the common examples:
* vertical paddings
* fixed height / fixed min-height
* making the element a flex-item (flex container's `align-items` defaults to `stretch`)
* making the element height grow with the `flex-grow` in the column flex layout.

*Note: You can still use the directive with flexbox, just make sure to change the default `align-items` / `align-self` value to `flex-start` or whatever fits your case.*

## IE11 Support

IE11 does not support `-webkit-line-clamp` (falls back to the JS method), and the `ResizeObserver API`. This API needs to be polyfilled if you want to re-snip the elements on the resize in IE11 (they would still get snipped when inserted / on data change without the polyfill). Recommended: [@juggle/resize-observer](https://www.npmjs.com/package/@juggle/resize-observer)

``` javascript
import { ResizeObserver as Polyfill } from '@juggle/resize-observer';
 
window.ResizeObserver = window.ResizeObserver || Polyfill;
```

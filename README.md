# vue-snip

[![Build Status](https://travis-ci.org/ajobi/vue-snip.svg?branch=master)](https://travis-ci.org/ajobi/vue-snip)
![Coveralls github](https://img.shields.io/coveralls/github/ajobi/vue-snip)
![GitHub issues](https://img.shields.io/github/issues/ajobi/vue-snip)
![GitHub](https://img.shields.io/github/license/ajobi/vue-snip)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/vue-snip)

Vue.js directive that clamps the content of a text element if it exceeds specified number of lines.

#### Key features:
* no need to specify line heights
* no dependencies (small and fast)
* two snipping approaches (CSS / JavaScript) (on a per-element basis)
* re-snipping on element resize and reactive data change

![](assets/illustration.png)

## How it works

#### Two snipping approaches:
- **CSS** approach based on the `-webkit-line-clamp`.
- **JavaScript** approach based on the progressive cutting of element's `innerText` in a loop.

*Note: CSS approach is faster (preferred), but does not work in older browsers / in all situations (f.e. does not work in IE11, or when you need the text to flow around a floated element).*

Global default is the CSS approach (falls back to the JavaScript for the non-supporting browsers), but you can freely switch snipping approach on a per-element basis as needed.

#### Element snipping:
Directive uses the selected snipping approach to snip elements in several scenarios:

* when inserted into the document
* when horizontally resized (detected via the `ResizeObserver API` - needs polyfill for IE11)
* when directive's reactive data change

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

Most of the time, you would probably pass in the explicit `maxLines` value:

``` html
<template>
  <p v-snip="3"> ... </p>
</template>
```

On top of that, you can pass in the snipping `method` too:

``` html
<template>
  <p v-snip:js="3"> ... </p>
</template>
```

Both of these are reactive, so you can do even this:

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

## Options

Passing options is not required. If you don't pass in any options, the default options are used. If you pass options, they get merged with the defaults, so just define what you want to change (no need to redefine all properties).

``` javascript
import Vue from 'vue'
import VueSnip from 'vue-snip'

const options = {
  // your setup
}

Vue.use(VueSnip, options)
```

The options object can have the following properties:

| Property | Default | Description |
| --- | --- | --- |
| **directiveName** | `'snip'` | The name of the directive in your templates (v-`directiveName`) |
| **snipMethod** | `'css'` | Global snipping method. Will be used for the element if no explicit `method` argument is passed in for that element. Should equal `'css'` or `'js'`. |
| **maxLines** | `3` | Global max lines. Will be used for the element if no explicit `maxLines` value is passed in for that element. |
| **separators** | `['. ', ', ', ' ', '']` | Used internally to split the `innerText` into chunks and find the snipped text in an effective way. *Note: Only applies to js approach.* |
| **ellipsis** | `'.\u200A.\u200A.'` | A character or a group of characters displayed at the end of the snipped text. *Note: Only applies to js approach. You cannot change the ellipsis when using CSS method.* |
| **resizeObserverPolyfill** | `null` | Resize observer polyfill object. Used as a fallback when `window.ResizeObserver` is `undefined`. |
| **debugMode** | `false` | Exposes directive state as the `window.__VueSnipState` |

## IE11 Support

IE11 does not support `-webkit-line-clamp` (falls back to the JS method), and the `ResizeObserver API`. This API needs to be polyfilled (recommended: https://www.npmjs.com/package/@juggle/resize-observer)

``` javascript
import Vue from 'vue'
import VueSnip from 'vue-snip'
import { ResizeObserver } from '@juggle/resize-observer'

const options = {
  resizeObserverPolyfill: ResizeObserver
}

Vue.use(VueSnip, options)
```


## Caveats

### Element style attribute

The directive internally operates on the element's `style` attribute. You should not modify the `style` attribute of elements you are snipping. Use classes instead.

### Element height

For the directive to be able to properly determine the number of lines at any given time, the height of the element should reflect the height of the text. Be wary of any CSS steps that will affect the height of the element. Some of the common examples:
* vertical paddings
* fixed height / fixed min height
* making the element a flex-item (`align-items` defaults to `stretch`)

*Note: You can use the directive with flexbox, just make sure to change the default `align-items` / `align-self` value to `flex-start` or whatever fits your case.*

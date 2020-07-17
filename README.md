# vue-snip

[![Build Status](https://travis-ci.org/ajobi/vue-snip.svg?branch=master)](https://travis-ci.org/ajobi/vue-snip)
![Coveralls github](https://img.shields.io/coveralls/github/ajobi/vue-snip)
![GitHub issues](https://img.shields.io/github/issues/ajobi/vue-snip)
![GitHub](https://img.shields.io/github/license/ajobi/vue-snip)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/vue-snip)

Vue.js directive that clamps the content of a text element if it exceeds specified number of lines.

![](assets/illustration.png)


## How it works

This library offers two snipping approaches:
- **CSS method** based on the `-webkit-line-clamp`
- **JavaScript method** that is snipping the `innerText` until it does not exceed given number of lines

Global default is the CSS method (automatically falls back to the JavaScript method for non-supporting browsers), but you can freely switch snipping methods on a per-element basis as needed. 

Each element is also immediately re-snipped when horizontally resized. This is detected via the `ResizeObserver`. 

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

Passing options is not required. If you don't pass in any options, default options are used. 

``` javascript
import Vue from 'vue'
import VueSnip from 'vue-snip'

const options = {
  debugMode: true
}

Vue.use(VueSnip, options)
```

The options object can have the following properties:

| Property | Default | Description |
| --- | --- | --- |
| **directiveName** | `'snip'` | The name of the directive in your templates (v-`directiveName`) |
| **snipMethod** | `'css'` | Global snipping method. Will be used for the element if no explicit `method` argument is passed in for that element. Should equal `css` or `js`. |
| **maxLines** | `3` | Global max lines. Will be used for the element if no explicit `maxLines` value is passed in for that element. |
| **separators** | `['. ', ', ', ' ', '']` | Used internally to split the `innerText` into chunks and find the snipped text in an effective way. *Note: Only applies to js approach.* |
| **ellipsis** | `'.\u200A.\u200A.'` | A character or a group of characters displayed at the end of the snipped text. *Note: Only applies to js approach. You cannot change the ellipsis when using CSS method.* |
| **resizeObserverPolyfill** | `null` | Resize observer polyfill object. Used as a fallback when `window.ResizeObserver` is `undefined`. |
| **debugMode** | `false` | Exposes directive state as the `window.__VueSnipState` |

## Caveats

### Element style attribute

The directive internally operates on the element's `style` attribute. You should not modify the `style` attribute of elements you are snipping. Use classes instead.

### Element height

For the directive to be able to properly determine the number of lines at any given time, the height of the element should reflect the height of the text. Be wary of any CSS steps that will affect the height of the element. Some of the common examples:
* vertical paddings
* fixed height / fixed min height
* making the element a `flex-item` (default for align-items is stretch)

*Note: You can use the directive with flexbox, just make sure to change the default `align-items` / `align-self` value to `flex-start` or whatever fits your case.*

## IE11 Support

IE11 does not support `-webkit-line-clamp` (automatically falls back to the JS method), and `ResizeObserver API`. Therefore you need to include the polyfill (https://www.npmjs.com/package/@juggle/resize-observer is recommended)

``` javascript
import Vue from 'vue'
import VueSnip from 'vue-snip'
import { ResizeObserver } from '@juggle/resize-observer'

const options = {
  resizeObserver: ResizeObserver
}

Vue.use(VueSnip, options)
```

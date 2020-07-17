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

``` javascript
import Vue from 'vue'
import VueSnip from 'vue-snip'

const options = {
  debugMode: true
}

Vue.use(VueSnip, options)
```

If you don't pass in any options, default options are used. Any option passed will override the default value.

| Parameter | Default | Description |
| --- | --- | --- |
| **directiveName** | `'snip'` | The name of the directive in your templates (v-`directiveName`) |
| **snipMethod** | `'css'` | Global snipping method. Will be used for the element if no explicit `method` argument is passed in for that element. Should equal `css` or `js`. |
| **maxLines** | `3` | Global max lines. Will be used for the element if no explicit `maxLines` value is passed in for that element. |
| **separators** | `['. ', ', ', ' ', '']` | Used internally to split the `innerText` into chunks and find the snipped text in an effective way. *Note: Only applies to js approach.* |
| **ellipsis** | `'.\u200A.\u200A.'` | A character or a group of characters displayed at the end of the snipped text. *Note: Only applies to js approach. You cannot change the ellipsis when using CSS method.* |
| **resizeObserverPolyfill** | `null` | Resize observer polyfill object. Used as a fallback when `window.ResizeObserver` is `undefined`. |
| **debugMode** | `false` | Exposes directive state as the `window.__VueSnipState` |

## Caveats

TODO: Document flexbox...

TODO: Document style attribute... 

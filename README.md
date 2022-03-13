# vue-snip

[![Build Status](https://travis-ci.org/ajobi/vue-snip.svg?branch=master)](https://travis-ci.org/ajobi/vue-snip)
![Coveralls github](https://img.shields.io/coveralls/github/ajobi/vue-snip)
![GitHub issues](https://img.shields.io/github/issues/ajobi/vue-snip)
![GitHub](https://img.shields.io/github/license/ajobi/vue-snip)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/vue-snip)

Vue.js directive that clamps the content of a text element if it exceeds the specified number of lines.

#### Key features:
* two snipping approaches (CSS / JavaScript) picked on a per-element basis
* no need to specify line heights
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

### Vue 2

``` javascript
import Vue from 'vue'
import VueSnip from 'vue-snip'
import App from './App'

Vue.use(VueSnip)

new Vue({ render: h => h(App) }).$mount('#app')
```

### Vue 3

```javascript
import { createApp } from 'vue'
import VueSnip from 'vue-snip'
import App from './App'

createApp(App).use(VueSnip).mount('#app')
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

## How it works

The library uses [js-snip](https://www.npmjs.com/package/js-snip) under the hood. You can find more about how snipping works in its [documentation](https://github.com/ajobi/js-snip#how-it-works).

## Change Log
All changes are documented in the [change log](https://github.com/ajobi/vue-snip/blob/master/CHANGELOG.md).

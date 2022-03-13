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

```vue
<!-- minimal example -->
<template>
  <p v-snip> ... </p>
</template>
```

```vue
<!-- with options -->
<template>
  <p v-snip="{ lines: 3 }"> ... </p>
</template>
```

```vue
<!-- with several options -->
<template>
  <p v-snip="{ lines: 3, mode: 'js', midWord: false }"> ... </p>
</template>
```

```vue
<!-- with options and callback -->
<template>
  <p v-snip="{ lines: 3, onSnipped }"> ... </p>
</template>

<script>
export default {
  data () {
    return {
      hasEllipsis: false,
    }
  },
  methods: {
    onSnipped (newState) {
      this.hasEllipsis = newState.hasEllipsis
    }
  }
}
</script>
```

## How it works

The library uses [js-snip](https://www.npmjs.com/package/js-snip) under the hood. You can find more about the options and how snipping works in its [documentation](https://github.com/ajobi/js-snip#how-it-works).

## Change Log
All changes are documented in the [change log](https://github.com/ajobi/vue-snip/blob/master/CHANGELOG.md).

# vue-snip

[![Build Status](https://travis-ci.org/ajobi/vue-snip.svg?branch=master)](https://travis-ci.org/ajobi/vue-snip)
![Coveralls github](https://img.shields.io/coveralls/github/ajobi/vue-snip)
![GitHub issues](https://img.shields.io/github/issues/ajobi/vue-snip)
![GitHub](https://img.shields.io/github/license/ajobi/vue-snip)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/vue-snip)

Vue.js directive that clamps the content of a text element if it exceeds specified number of lines.

![](assets/illustration.png)


### How it works

This library offers two snipping methods:
- `CSS` method based on the `-webkit-line-clamp`
- `JavaScript` method that is snipping the `innerText` until it does not exceed given number of lines

Global default is the CSS method (automatically falls back to the JavaScript method for non-supporting browsers), but you can freely switch snipping methods on a per-element basis as needed. 

Each element is also immediately re-snipped when horizontally resized. This is detected via the `ResizeObserver`. 

## Installation

````
npm install vue-snip
````
````
yarn add vue-snip
````

Before you start your app:

````
import Vue from 'vue'
import VueSnip from 'vue-snip'

Vue.use(VueSnip)
````


## Usage

The most basic usage looks like this:

````
<template>
  <p v-snip> ... </p>
</template>
````

Most of the time, you would probably pass in at least the `maxLines` value:

````
<template>
  <p v-snip="3"> ... </p>
</template>
````

If that's not enough, you can pass in the `method` too:

````
<template>
  <p v-snip:js="3"> ... </p>
</template>
````

Both of these are also reactive, so you can do this:

````
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
````

## Options

In preparation...

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).VueSnip=t()}(this,(function(){"use strict";function e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function t(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function n(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?t(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t);if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function l(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,u=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return u=e.done,e},e:function(e){s=!0,l=e},f:function(){try{u||null==n.return||n.return()}finally{if(s)throw l}}}}var u=function(e){var t=window.getComputedStyle(e),n=parseFloat(t.height),r="normal"===t.lineHeight?1.2*parseFloat(t.fontSize):parseFloat(t.lineHeight);return 0===n&&0===r?0:Math.ceil(n/r)},s=new WeakMap,c=function(e){return s.get(e)},a=function(e,t){s.set(e,t)},f=function(e){return{hasEllipsis:c(e).hasEllipsis}},p=function(e){var t=n({},c(e));(null==t?void 0:t.observer)&&(null==t||t.observer.disconnect()),(null==t?void 0:t.observer)&&(null==t||delete t.prevWidth),(null==t?void 0:t.observer)&&(null==t||delete t.prevHeight),(null==t?void 0:t.observer)&&(null==t||delete t.observer),a(e,t)},d={mode:"css",lines:3,ellipsis:". . .",midWord:!0,textContent:null},v=function(e){if("number"==typeof e)return parseInt(e.toString());if("string"==typeof e){var t=parseInt(e);if(!isNaN(t))return t}return d.lines},y=function(e){return"undefined"!=typeof CSS&&CSS.supports("display","-webkit-box")&&CSS.supports("-webkit-line-clamp","3")&&CSS.supports("-webkit-box-orient","vertical")?"css"===e||"js"===e?e:d.mode:"js"},b=function(e){return"string"==typeof e?e:"number"==typeof e?e.toString():d.ellipsis},m=function(e){return"boolean"==typeof e?e:d.midWord},h=function(e){return"string"==typeof e?e:"number"==typeof e?e.toString():d.textContent},g=function(e){var t,n=c(e);e.textContent=null!==(t=null==n?void 0:n.fullText)&&void 0!==t?t:e.textContent,e.style.display="",e.style.webkitLineClamp="",e.style.webkitBoxOrient="",e.style.overflow=""},w=function(e){g(e),p(e),function(e){s.delete(e)}(e)},S=function(e,t,o){var i=!function(e){return s.has(e)}(e),w=c(e),S=function(e){if("object"!==r(e)||null===e)return d;var t=e,n=t.mode,o=t.lines,i=t.ellipsis,l=t.midWord,u=t.textContent;return{mode:y(n),lines:v(o),ellipsis:b(i),midWord:m(l),textContent:h(u)}}(t);a(e,n(n(n({},w),S),{},{hasEllipsis:!i&&(null==w?void 0:w.hasEllipsis),fullText:S.textContent?S.textContent:i?e.textContent:null==w?void 0:w.fullText}));var x=function(){var t=f(e),r=c(e);g(e);var i=u(e);if("css"===r.mode&&function(e,t){var n=t.lines,r=t.fullText;e.textContent=r,e.style.display="-webkit-box",e.style.webkitLineClamp=n.toString(),e.style.webkitBoxOrient="vertical",e.style.overflow="hidden"}(e,r),"js"===r.mode&&function(e,t){var n=t.lines,r=t.midWord,o=t.fullText,i=t.ellipsis,s=r?[". ",", "," ",""]:[". ",", "," "];if(e.textContent=o,e.style.display="",e.style.webkitLineClamp="",e.style.webkitBoxOrient="",e.style.overflow="",!(n<=0||u(e)<=n)){var c={unprocessed:o,processed:""};s.forEach((function(t){var r,o=l(c.unprocessed.split(t));try{for(o.s();!(r=o.n()).done;){var s=r.value;if(e.textContent="".concat(c.processed).concat(s).concat(t).concat(i),u(e)>n){c.unprocessed=s;break}c.processed="".concat(c.processed).concat(s).concat(t)}}catch(e){o.e(e)}finally{o.f()}})),e.textContent="".concat(c.processed.trim()).concat(i)}}(e,r),a(e,n(n({},r),{},{hasEllipsis:u(e)<i})),o){var s=f(e);o(s,t)}};if("undefined"!=typeof ResizeObserver)return p(e),void function(e,t){var r=c(e),o=r.observer||new ResizeObserver((function(){var r=c(e);if(e.clientWidth!==r.prevWidth||e.clientHeight!==r.prevHeight){t();var o=n({},r);o.prevWidth=e.clientWidth,o.prevHeight=e.clientHeight,a(e,o)}}));o.observe(e),a(e,n(n({},r),{},{observer:o}))}(e,x);x()},x=function(e,t){var n=t.value,r=n.lines,o=n.mode,i=n.midWord,l=n.ellipsis,u=n.onSnipped;S(e,{lines:r,mode:o,midWord:i,ellipsis:l},u)},O=function(e,t,n){var r,o,i,l=t.value;w(e);var u=null==n||null===(r=n.children)||void 0===r||null===(o=r[0])||void 0===o||null===(i=o.el)||void 0===i?void 0:i.textContent;void 0!==u&&(e.textContent=u);var s=l.lines,c=l.mode,a=l.midWord,f=l.ellipsis,p=l.onSnipped;S(e,{lines:s,mode:c,midWord:a,ellipsis:f},p)},C=function(e){w(e)};return{install:function(t){var n,r=parseFloat(t.version[0])>2;t.directive("snip",(e(n={},r?"mounted":"inserted",x),e(n,r?"updated":"update",O),e(n,r?"unmounted":"unbind",C),n))}}}));

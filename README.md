<p align="center">
  <a href="https://baianat.github.io/hooper/" target="_blank">
    <img width="400" alt="leaps logo" src="https://github.com/baianat/hooper/blob/master/hooper.svg">
  </a>
</p>

<p align="center">
  <a href="http://isitmaintained.com/project/baianat/hooper"><img src="http://isitmaintained.com/badge/resolution/baianat/hooper.svg" alt="Average time to resolve an issue"/></a>
  <a href="http://isitmaintained.com/project/baianat/hooper"><img src="http://isitmaintained.com/badge/open/baianat/hooper.svg" alt="Percentage of issues still open"/></a>
  <a href="https://npm-stat.com/charts.html?package=hooper"><img src="https://img.shields.io/npm/dm/hooper.svg" alt="npm"/></a>
  <a href="https://www.npmjs.com/package/hooper"><img src="https://img.shields.io/npm/v/hooper.svg" alt="npm"/></a>
</p>


# Hooper

Vue.js carousal component, optimized to work with Vue.

## Browser Support
| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
| --- | --- | --- | --- | --- | --- |
| Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |

## Getting started

### Installation

First step is to install it using `yarn` or `npm`:

```bash
npm install hooper

# or use yarn
yarn add hooper
```

## Features

* Touch support
* Keyboard support
* Mouse wheel support
* Responsive breakpoints
* Auto play
* Vertical scroll
* Infinite scroll
* Two way control carousels (sync)
* Fully customizable using addons
* And even more...

## Use Hooper

```vue
<template>
  <hooper>
    <slide>
      slide 1
    </slide>
    <slide>
      slide 2
    </slide>
    ...
  </hooper>
<template>

<script>
  import { Hooper, Slide } form 'hooper';

  export default {
    name: 'App',
    components: {
      Hooper,
      Slide
    }
  }
</script>
```

more info at [Documentation](https://baianat.github.io/hooper/)

## Available Props

|Prop             |Default |Description|
|-----------------|-----|-----------|
|`itemsToShow`    |1    |count of items to showed per view  (can be a fraction).|
|`itemsToSlide`   |1    |count of items to slide when use navigation buttons|
|`infiniteScroll` |false|enable infinite scrolling mode.|
|`centerMode`     |false|enable center mode|
|`vertical`       |false|enable vertical sliding mode|
|`rtl`            |false|enable rtl mode|
|`mouseDrag`      |true |toggle mouse dragging|
|`touchDrag`      |true |toggle touch dragging|
|`wheelControl`   |false|toggle mouse wheel sliding|
|`keysControl`    |false|toggle keyboard control|
|`shortDrag`      |true |enable any move to commit a slide|
|`autoPlay`       |false|enable auto sliding to carousal|
|`playSpeed`      |3000 |speed of auto play to trigger slide in ms|
|`transition`     |300  |sliding transition time in ms|
|`sync`           |''   |sync two carousels to slide together|
|`settings`       |{ }  |an object to pass all settings|
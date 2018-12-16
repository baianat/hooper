# Getting started

## Installation

First step is to install it using `yarn` or `npm`:

```bash
npm install hooper

# or use yarn
yarn add hooper
```

## Use Hooper

```vue
<template>
  <hooper>
    <div class="hooper-slide">
      slide 1
    </div>
    <div class="hooper-slide">
      slide 2
    </div>
    ...

    <!-- optional elements -->
    <span slot="hooper-next">next</span>
    <span slot="hooper-prev">prev</span>
  </hooper>
<template>

<script>
  import { Hooper } from '../dist/hooper.js'

  export default {
    name: 'App',
    components: {
      Hooper
    }
  }
</script>
```

## Configuring carousal

you can configure the carousal using the available [props](/api.html#props)

```vue {2}
<template>
  <hooper :itemsToShow="3" :centerMode="true" pagination="no">
    <div class="hooper-slide">
      slide 1
    </div>
    <div class="hooper-slide">
      slide 2
    </div>
    ...

  </hooper>
<template>
```

you can combine all settings in one object and pass it using `setting` prop

```vue {2,24-27}
<template>
  <hooper :settings="hooperSettings">
    <div class="hooper-slide">
      slide 1
    </div>
    <div class="hooper-slide">
      slide 2
    </div>
    ...

  </hooper>
<template>

<script>
  import { Hooper } from '../dist/hooper.js'

  export default {
    name: 'App',
    components: {
      Hooper
    },
    data () {
      return {
        hooperSettings: {
          itemsToShow: 2,
          centerMode: true
        }
      }
    }
  }
</script>
```

## Breakpoints

you can pass an array of breaking points to the carousal settings, to specify a custom settings for different viewport sizes, else it will fall to default settings

```vue {2,24-27}
<template>
  <hooper :settings="hooperSettings">
    <div class="hooper-slide">
      slide 1
    </div>
    <div class="hooper-slide">
      slide 2
    </div>
    ...

  </hooper>
<template>

<script>
  import { Hooper } from '../dist/hooper.js'

  export default {
    name: 'App',
    components: {
      Hooper
    },
    data () {
      return {
        hooperSettings: {
          itemsToShow: 2,
          centerMode: true,
          breakpoints: {
            800: {
              centerMode: false,
              itemsToShow: 3
            },
            1000: {
              itemsToShow: 6,
              pagination: 'fraction'
            }
          }
        }
      }
    }
  }
</script>
```

## RTL

by default the carousal will automatically display according to the current document direction, unless you have explicitly set the direction throw the `rtl` prop

```vue {2}
<template>
  <hooper :rtl="true">
    <div class="hooper-slide">
      slide 1
    </div>
    <div class="hooper-slide">
      slide 2
    </div>
    ...

  </hooper>
<template>
```
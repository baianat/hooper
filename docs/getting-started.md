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
  import { Hooper, Slide } from 'hooper';
  import 'hooper/dist/hooper.css';

  export default {
    name: 'App',
    components: {
      Hooper,
      Slide
    }
  }
</script>
```

## Configuring carousel

you can configure the carousel using the available [props](/api.html#props)

```vue {1}
<hooper :itemsToShow="3" :centerMode="true" pagination="no">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  ...

</hooper>
```

you can combine all settings in one object and pass it using `setting` prop

```vue {2,24-27}
<template>
  <hooper :settings="hooperSettings">
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
  import { Hooper, Slide } from 'hooper';

  export default {
    name: 'App',
    components: {
      Hooper,
      Slide
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

you can pass an array of breaking points to the carousel settings, to specify a custom settings for different viewport sizes, else it will fall to default settings

```vue
<template>
  <hooper :settings="hooperSettings">
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
  import { Hooper, Slide } from 'hooper';

  export default {
    name: 'App',
    components: {
      Hooper,
      Slide
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

by default the carousel will automatically display according to the current document direction, unless you have explicitly set the direction throw the `rtl` prop

```vue {1}
<hooper :rtl="true">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  ...

</hooper>
```

## Sync

you can sync tow carousels to control each other, tow way control.
to achieve this you have to pass to one of them the `ref` name of the other carousel.

::: tip note
The two carousel should be at the same scope
:::

```vue
<hooper sync="hooper2">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
</hooper>

<hooper ref="hooper2">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
</hooper>
```

## Addons

Hooper shipped with addons component, that add extra features to carousel

Available Addons:
* Navigation
* Pagination
* Progress

### Work with Addons

```vue {11-13}
<template>
  <hooper :settings="hooperSettings">
    <slide>
      slide 1
    </slide>
    <slide>
      slide 2
    </slide>
    ...

    <hooper-navigation slot="hooper-addons"></hooper-navigation>
    <hooper-pagination slot="hooper-addons"></hooper-pagination>
    <hooper-progress slot="hooper-addons"></hooper-progress>
  </hooper>
<template>

<script>
  import { 
    Hooper,
    Slide,
    Progress as HooperProgress,
    Pagination as HooperPagination,
    Navigation as HooperNavigation
    } from 'hooper';

  export default {
    name: 'App',
    components: {
      Hooper,
      Slide,
      HooperProgress,
      HooperPagination,
      HooperNavigation
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

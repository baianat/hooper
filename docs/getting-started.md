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
</template>

<script>
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
  name: 'App',
  components: {
    Hooper,
    Slide
  }
};
</script>
```

:::tip
If you are using [PurgeCSS](https://www.purgecss.com/), make sure to whitelist hooper css When importing `hooper/dist/hooper.css`.
:::

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
</template>

<script>
import { Hooper, Slide } from 'hooper';

export default {
  name: 'App',
  components: {
    Hooper,
    Slide
  },
  data() {
    return {
      hooperSettings: {
        itemsToShow: 2,
        centerMode: true
      }
    };
  }
};
</script>
```

## Dynamic slides

::: tip note
When you work with dynamic slides, it's recommended to provide the slide index.
:::

```vue {1}
<hooper :itemsToShow="3" :centerMode="true" pagination="no">
  <slide v-for="(slide, indx) in slides" :key="indx" :index="indx">
    {{ slide }}
  </slide>
  ...

</hooper>
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
</template>

<script>
import { Hooper, Slide } from 'hooper';

export default {
  name: 'App',
  components: {
    Hooper,
    Slide
  },
  data() {
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
    };
  }
};
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

## Carousel Groups

you can group multiple carousels to slide together, sliding can be initiated from any carousel in the group, all carousels will try to slide to the same index as the carousel that initiated the sliding event.

```vue
<hooper group="group1">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
</hooper>

<hooper group="group1">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
</hooper>
```

::: tip Note!
Grouped carousels nested inside other components will still be synced, so be careful to give deterministic group names to your carousels. You can use `v-bind` to assign a dynamic carousel group as well.
:::

## Addons

Hooper shipped with addons component, that add extra features to carousel

Available Addons:

- Navigation
- Pagination
- Progress

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
</template>

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
  data() {
    return {
      hooperSettings: {
        itemsToShow: 2,
        centerMode: true
      }
    };
  }
};
</script>
```

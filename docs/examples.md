# Examples

## Default Example

<hooper xmlns:v-slot='http://www.w3.org/1999/XSL/Transform'>
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>
</hooper>

```vue
<hooper>
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

</hooper>
```

## Navigation Component

<hooper>
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-navigation />
  </template>
</hooper>

```vue
<template>
  <hooper>
    <slide>
      slide 1
    </slide>
    <slide>
      slide 2
    </slide>
    <slide>
      slide 3
    </slide>
    <slide>
      slide 4
    </slide>
    <slide>
      slide 5
    </slide>
    <slide>
      slide 6
    </slide>

    <template v-slot:hooper-addons>
      <hooper-navigation />
    </template>
  </hooper>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';

export default {
  components: {
    Hooper,
    Slide,
    HooperNavigation
  }
};
</script>
```

## Progress Component

<hooper>
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-progress />
  </template>
</hooper>

```vue
<template>
  <hooper>
    <slide>
      slide 1
    </slide>
    <slide>
      slide 2
    </slide>
    <slide>
      slide 3
    </slide>
    <slide>
      slide 4
    </slide>
    <slide>
      slide 5
    </slide>
    <slide>
      slide 6
    </slide>

    <template v-slot:hooper-addons>
      <hooper-progress />
    </template>
  </hooper>
</template>

<script>
import { Hooper, Slide, Progress as HooperProgress } from 'hooper';

export default {
  components: {
    Hooper,
    Slide,
    HooperProgress
  }
};
</script>
```

## Indicator Pagination

<hooper>
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-pagination />
  </template>
</hooper>

```vue
<template>
  <hooper>
    <slide>
      slide 1
    </slide>
    <slide>
      slide 2
    </slide>
    <slide>
      slide 3
    </slide>
    <slide>
      slide 4
    </slide>
    <slide>
      slide 5
    </slide>
    <slide>
      slide 6
    </slide>

    <template v-slot:hooper-addons>
      <hooper-pagination />
    </template>
  </hooper>
</template>

<script>
import { Hooper, Slide, Pagination as HooperPagination } from 'hooper';

export default {
  components: {
    Hooper,
    Slide,
    HooperPagination
  }
};
</script>
```

## Fraction Pagination

<hooper>
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-pagination mode="fraction" style="color: white;" />
  </template>
</hooper>

```vue
<template>
  <hooper>
    <slide>
      slide 1
    </slide>
    <slide>
      slide 2
    </slide>
    <slide>
      slide 3
    </slide>
    <slide>
      slide 4
    </slide>
    <slide>
      slide 5
    </slide>
    <slide>
      slide 6
    </slide>

    <template v-slot:hooper-addons>
      <hooper-pagination mode="fraction" style="color: white;" />
    </template>
  </hooper>
</template>

<script>
import { Hooper, Slide, Pagination as HooperPagination } from 'hooper';

export default {
  components: {
    Hooper,
    Slide,
    HooperPagination
  }
};
</script>
```

## Show Multiple Items

<hooper :itemsToShow="3">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-navigation />
  </template>
</hooper>

```vue
<hooper :itemsToShow="3">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-navigation />
  </template>
</hooper>
```

## Slide Multiple Items

<hooper :itemsToSlide="3" :itemsToShow="3">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-navigation />
  </template>
</hooper>

```vue
<hooper :itemsToSlide="3">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-navigation />
  </template>
</hooper>
```

## Infinite Scrolling

<hooper :infiniteScroll="true" :itemsToShow="3">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-navigation />
  </template>
</hooper>

```vue
<hooper :infiniteScroll="true">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-navigation />
  </template>
</hooper>
```

## Center Mode

<hooper id="centerMode" :itemsToShow="1.25" :centerMode="true">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-navigation />
  </template>
</hooper>

```vue
<hooper :itemsToShow="1.25" :centerMode="true">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-navigation />
  </template>
</hooper>
```

```css
.hooper-slide.is-current {
  transform: scale(1.2);
}
```

## Auto Playing

<hooper :progress="true" :autoPlay="true" :playSpeed="2000" :hoverPause="true">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>
</hooper>

```vue
<hooper :progress="true" :autoPlay="true" :playSpeed="2000" :hoverPause="true">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>
</hooper>
```

## Auto Playing with per slide duration for a fullscreen display

<hooper :autoPlay="true" :playSpeed="2000">
 <slide :duration="1000">
  slide 1 - custom duration of 1000ms 
 </slide>
 <slide>
  slide 2 - default duration of 2000ms
</slide>
</hooper>

```vue
<hooper :autoPlay="true" :playSpeed="2000">
 <slide :duration="1000">
  slide 1 - custom duration of 1000ms 
 </slide>
 <slide>
  slide 2 - default duration of 2000ms
</slide>
</hooper>
```

## Vertical Sliding

<hooper :vertical="true" style="height: 400px" :itemsToShow="1.5" :centerMode="true">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-navigation />
  </template>
</hooper>

```vue
<hooper :vertical="true" style="height: 400px" :itemsToShow="1.5" :centerMode="true">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-navigation />
  </template>
</hooper>
```

## Group

<hooper group="group1" :transition="600">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>
</hooper>

<hooper group="group1" :itemsToShow="3" :centerMode="true">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-navigation />
    <hooper-pagination />
  </template>
</hooper>

```vue
<hooper group="group1">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>
</hooper>

<hooper group="group1" :itemsToShow="3" :centerMode="true">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>

  <template v-slot:hooper-addons>
    <hooper-navigation />
    <hooper-pagination />
  </template>
</hooper>
```

## Custom Controllers

<a href="" @click.prevent="$refs.customControlCarousel.slidePrev">prev</a>
<input v-model="myCarouselData" type="number" min="0" max="5">
<a href="" @click.prevent="$refs.customControlCarousel.slideNext">next</a>

<hooper ref="customControlCarousel" :itemsToShow="1.5" :centerMode="true" v-on:slide="updateCarousel">
  <slide>
    slide 1
  </slide>
  <slide>
    slide 2
  </slide>
  <slide>
    slide 3
  </slide>
  <slide>
    slide 4
  </slide>
  <slide>
    slide 5
  </slide>
  <slide>
    slide 6
  </slide>
</hooper>

```vue
<template>
  <button @click.prevent="$refs.customControlCarousel.slidePrev">prev</button>
  <input v-model="carouselData" type="number" min="0" max="5" />
  <button @click.prevent="$refs.customControlCarousel.slideNext">next</button>

  <hooper ref="customControlCarousel">
    <slide>
      slide 1
    </slide>
    <slide>
      slide 2
    </slide>
    <slide>
      slide 3
    </slide>
    <slide>
      slide 4
    </slide>
    <slide>
      slide 5
    </slide>
    <slide>
      slide 6
    </slide>
  </hooper>
</template>
```

## Dynamic Slides

Hooper plays well with dynamic slides as well.

<input type="text" v-model="body">
<a href="#" @click.prevent="addSlide">Add</a>
<hooper ref="dynamicSlidesCarousel">
    <slide v-for="slide in slides">
      {{ slide.body }}
    </slide>

  <template v-slot:hooper-addons>
    <hooper-navigation />
    <hooper-pagination />
  </template>

</hooper>

```vue
<template>
  <input type="text" v-model="body" />
  <a href="#" @click.prevent="addSlide">Add</a>
  <hooper ref="dynamicSlidesCarousel">
    <slide v-for="slide in slides">
      {{ slide.body }}
    </slide>

    <template v-slot:hooper-addons>
      <hooper-navigation />
      <hooper-pagination />
    </template>
  </hooper>
</template>

<script>
export default {
  data() {
    return {
      myCarouselData: 0,
      slides: [],
      body: 'New Slide'
    };
  },
  methods: {
    addSlide() {
      this.slides.push({ body: this.body || 'New Slide' });
      this.body = 'New Slide ' + this.slides.length;
    }
  }
};
</script>
```

<script>
export default {
  data () {
    return {
      myCarouselData: 0,
      slides: [],
      body: 'New Slide'
    }
  },
  methods: {
    addSlide () {
      this.slides.push({ body: this.body || 'New Slide' });
      this.body = 'New Slide ' + this.slides.length;
    }
  }
}
</script>

<style>
  .hooper {
    height: 200px;
  }
  .hooper-slide {
    background-color: #62CAAA;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    border: 2px solid #fff;
    font-size: 30px;
    border-radius: 10px;
  }
  .is-active {
    background-color: rgb(71, 218, 127);
  }
  #centerMode .hooper-slide.is-current {
    transform: scale(1.2);
   }
</style>

# Examples

## Default Example

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

  <hooper-navigation slot="hooper-addons"></hooper-navigation>
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

    <hooper-navigation slot="hooper-addons"></hooper-navigation>
  </hooper>
</template>

<script>
import {
  Hooper,
  Slide,
  Navigation as HooperNavigation
  } from 'hooper';

export default {
  components: {
    Hooper,
    Slide,
    HooperNavigation
  }
}
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

  <hooper-progress slot="hooper-addons"></hooper-progress>
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

    <hooper-navigation slot="hooper-addons"></hooper-navigation>
  </hooper>
</template>

<script>
import {
  Hooper,
  Slide,
  Progress as HooperProgress
  } from 'hooper';

export default {
  components: {
    Hooper,
    Slide,
    HooperProgress
  }
}
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

  <hooper-pagination slot="hooper-addons"></hooper-pagination>
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

    <hooper-pagination slot="hooper-addons"></hooper-pagination>
  </hooper>
</template>

<script>
import {
  Hooper,
  Slide,
  Pagination as HooperPagination
  } from 'hooper';

export default {
  components: {
    Hooper,
    Slide,
    HooperPagination
  }
}
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

  <hooper-pagination slot="hooper-addons" mode="fraction"></hooper-pagination>
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

    <hooper-pagination slot="hooper-addons" mode="fraction"></hooper-pagination>
  </hooper>
</template>

<script>
import {
  Hooper,
  Slide,
  Pagination as HooperPagination
  } from 'hooper';

export default {
  components: {
    Hooper,
    Slide,
    HooperPagination
  }
}
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

  <hooper-navigation slot="hooper-addons"></hooper-navigation>
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
  <hooper-navigation slot="hooper-addons"></hooper-navigation>
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

  <hooper-navigation slot="hooper-addons"></hooper-navigation>
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

  <hooper-navigation slot="hooper-addons"></hooper-navigation>
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
</hooper>
```

```css
.hooper-slide.is-current {
  transform: scale(1.2);
}
```

## Auto Playing

<hooper :progress="true" :autoPlay="true" :playSpeed="2000">
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

  <hooper-navigation slot="hooper-addons"></hooper-navigation>
  <hooper-progress slot="hooper-addons"></hooper-progress>
</hooper>

```vue
<hooper :progress="true" :autoPlay="true" :playSpeed="2000">
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

  <hooper-navigation slot="hooper-addons"></hooper-navigation>
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

  <hooper-navigation slot="hooper-addons"></hooper-navigation>
  <hooper-pagination slot="hooper-addons"></hooper-pagination>
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

  <hooper-navigation slot="hooper-addons"></hooper-navigation>
  <hooper-pagination slot="hooper-addons"></hooper-pagination>
</hooper>
```

## Custom Controllers

<template>
<a href="" @click.prevent="slidePrev">prev</a>
<input v-model="myCarouselData" type="number" min="0" max="5">
<a href="" @click.prevent="slideNext">next</a>
</template>

<hooper ref="myCarousel" :itemsToShow="1.5" :centerMode="true" v-on:slide="updateCarousel">
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
  <button @click.prevent="slidePrev">prev</button>
  <input v-model="carouselData" type="number" min="0" max="5">
  <button @click.prevent="slideNext">next</button>

  <hooper ref="carousel" @slide="updateCarousel">
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

<script>
export default {
  data () {
    return {
      carouselData: 0
    }
  },
  watch: {
    carouselData () {
      this.$refs.carousel.slideTo(this.carouselData);
    }
  },
  methods: {
    slidePrev() {
      this.$refs.carousel.slidePrev();
    },
    slideNext() {
      this.$refs.carousel.slideNext();
    },
    updateCarousel(payload) {
      this.myCarouselData = payload.currentSlide;
    }
  }
}
</script>
```

## Dynamic Slides

Hooper plays well with dynamic slides as well.

<template>
  <input type="text" v-model="body">
  <a href="#" @click.prevent="addSlide">Add</a>
  <hooper>
    <slide v-for="slide in slides">
      {{ slide.body }}
    </slide>

    <hooper-navigation slot="hooper-addons"></hooper-navigation>
  </hooper>
</template>

```vue
<template>
  <div>
    <input type="text" v-model="body">
    <a href="#" @click.prevent="addSlide">Add</a>
    <hooper>
      <slide v-for="slide in slides">
        {{ slide.body }}
      </slide>

      <hooper-navigation slot="hooper-addons"></hooper-navigation>
    </hooper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slides: [],
      body: 'New Slide 1'
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
  watch: {
    myCarouselData () {
      this.$refs.myCarousel.slideTo(this.myCarouselData);
    }
  },
  methods: {
    addSlide () {
      this.slides.push({ body: this.body || 'New Slide' });
      this.body = 'New Slide ' + this.slides.length;
    },
    slidePrev() {
      this.$refs.myCarousel.slidePrev();
    },
    slideNext() {
      this.$refs.myCarousel.slideNext();
    },
    updateCarousel(payload) {
      this.myCarouselData = payload.currentSlide;
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
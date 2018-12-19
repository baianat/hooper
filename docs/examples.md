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
</scirpt>
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
</scirpt>
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
</scirpt>
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
</scirpt>
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

## Sync

<hooper sync="myCarousel2" :transition="600">
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

<hooper ref="myCarousel2" :itemsToShow="3" :centerMode="true">
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
<hooper sync="myCarousel2">
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

<hooper ref="myCarousel2" :itemsToShow="3" :centerMode="true">
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
<input v-model="myCarousalData" type="number" min="0" max="5">
<a href="" @click.prevent="slideNext">next</a>
</template>

<hooper ref="myCarousal" :itemsToShow="1.5" :centerMode="true" v-on:slide="updateCarousel">
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
  <input v-model="carousalData" type="number" min="0" max="5">
  <button @click.prevent="slideNext">next</button>
  
  <hooper ref="carousal" @slide="updateCarousel">
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
      carousalData: 0
    }
  },
  watch: {
    carousalData () {
      this.$refs.carousal.slideTo(this.carousalData);
    }
  },
  methods: {
    slidePrev() {
      this.$refs.carousal.slidePrev();
    },
    slideNext() {
      this.$refs.carousal.slideNext();
    },
    updateCarousel(payload) {
      this.myCarousalData = payload.currentSlide;
    }
  }
}
</script>
```

<script>
export default {
  data () {
    return {
      myCarousalData: 0
    }
  },
  watch: {
    myCarousalData () {
      this.$refs.myCarousal.slideTo(this.myCarousalData);
    }
  },
  methods: {
    slidePrev() {
      this.$refs.myCarousal.slidePrev();
    },
    slideNext() {
      this.$refs.myCarousal.slideNext();
    },
    updateCarousel(payload) {
      this.myCarousalData = payload.currentSlide;
    }
  }
}
</script>

<style>
  .hooper-slide {
    height: 200px;
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
</style>
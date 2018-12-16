# Hooper

Vue.js carousal component

## Getting started

### Installation

First step is to install it using `yarn` or `npm`:

```bash
npm install hooper

# or use yarn
yarn add hooper
```

### Use Carousel

```html
  <hooper :settings="hooper">
    <div class="hooper-slide">
      slide 1
    </div>
    <div class="hooper-slide">
      slide 2
    </div>
    <div class="hooper-slide">
      slide 3
    </div>
    <div class="hooper-slide">
      slide 4
    </div>
    <div class="hooper-slide">
      slide 5
    </div>
    <div class="hooper-slide">
      slide 6
    </div>


    <!-- optional elements -->
    <span slot="hooper-next">next</span>
    <span slot="hooper-prev">prev</span>
  </hooper>
  <script>
    import { Hooper } from '../dist/hooper.js'

    export default {
      name: 'App',
      components: {
        Hooper
      },
      data () {
        return {
          hooper: {
            itemsToShow: 2,
            centerMode: true,
            progress: false,
            autoPlay: false,
            infiniteScroll: true,
            rtl: false,
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

### Available Props

|Prop             |Default |Description|
|-----------------|-----|-----------|
|`itemsToShow`    |1    |count of items to showed per view.|
|`itemsToSlide`   |1    |count of items to slide when use navigation buttons|
|`infiniteScroll` |false|control infinite scrolling mode.|
|`centerMode`     |false|control center mode|
|`vertical`       |false|control vertical sliding mode|
|`rtl`            |false|control rtl mode|
|`progress`       |false|control progress slider visibility|
|`mouseDrag`      |true |control mouse dragging to slide|
|`shortDrag`      |false|enable any move to commit a slide|
|`autoPlay`       |false|enable auto sliding to carousal|
|`playSpeed`      |3000 |speed of auto play to trigger slide in ms|
|`transition`     |300  |sliding transition time in ms|
|`pagination`     |'indicator'|the type of pagination indicator or fraction|
|`settings`       |null|an object to pass all settings|
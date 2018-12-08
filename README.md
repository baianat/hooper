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

```js
import Hooper from '../dist/hooper.js'

export default {
  components: {
    Hooper
  }
}
```

```html
  <hooper>
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


    <!-- optionaly elements -->
    <span slot="hooper-next">>></span>
    <span slot="hooper-prev"><<</span>
  </hooper>
```

# Addons

Hooper offers a flexible way to add addons to the Hooper component, for example you may want to display a progress bar, or a slide indicator button for each slide. 

Hooper addons are just simple Vue components with access to the `hooper` component instance.

## Creating an addon

We will be creating an addon that adds a button for each slide to make navigation between slides easier.

First you need to import the addon mixin and add it to your component, this mixin allows you to use `hooper` identifier inside your addon template and `this.hooper` inside your component code.

```js
import { addonMixin } from 'hooper';

export default {
  name: 'NavAddon',
  // ...
  mixins: [
    addonMixin,
    // ...
  ],
  // ...
};
```

We will use `hooper.slidesCount` and `hooper.currentSlide` reactive data properties to render our buttons, and on click we would like to change the slide to one that its associated button got clicked.

```html
<ol class="hooper-pagination">
  <li v-for="n in hooper.slidesCount" :key="n">
    <button
      @click="hooper.slideTo(n - 1)"
      class="hooper-indicator"
      :class="{ 'is-active': hooper.currentSlide === n - 1 }"
    ></button>
  </li>
</ol>
```

Lets add some css to our buttons:

```css
.hooper-pagination {
  position: absolute;
  margin: 0;
  padding: 5px 10px;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  display: flex;
  list-style: none;
}

.hooper-indicator {
  margin: 0 2px;
  width: 12px;
  height: 4px;
  border-radius: 2px;
  border: none;
  padding: 0;
  background-color: #fff;
  cursor: pointer;
}
.hooper-indicator:hover,
.hooper-indicator.is-active {
  background-color: #4285f4;
}
```

Using the addon is straightforward, you need to place the addon component inside the `addons` slot.

```html
<hooper>
  <div class="hooper-slide">slide 1</div>
  <div class="hooper-slide">slide 2</div>
  <div class="hooper-slide">slide 3</div>
  <div class="hooper-slide">slide 4</div>
  <template slot="addons">
    <nav-addon slot="addons"></nav-addon>
  </template>
</hooper>
```

## Included Addons

We've created some common addons that you can use out of the box for your hooper components:

- [Progress](./examples.md#progress)
- [Indicator](./examples.md#slide-indicator)
- [Fraction](./examples.md#fraction)


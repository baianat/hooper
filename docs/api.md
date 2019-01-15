# API

## Props

|Prop             |Default |Description|
|-----------------|-----|-----------|
|`itemsToShow`    |1    |count of items to showed per view  (can be a fraction).|
|`itemsToSlide`   |1    |count of items to slide when use navigation buttons.|
|`initialSlide`   |0    |index number of initial slide.|
|`infiniteScroll` |false|enable infinite scrolling mode.|
|`centerMode`     |false|enable center mode.|
|`vertical`       |false|enable vertical sliding mode.|
|`rtl`            |false|enable rtl mode.|
|`mouseDrag`      |true |toggle mouse dragging.|
|`touchDrag`      |true |toggle touch dragging.|
|`wheelControl`   |false|toggle mouse wheel sliding.|
|`keysControl`    |false|toggle keyboard control.|
|`shortDrag`      |true |enable any move to commit a slide.|
|`autoPlay`       |false|enable auto sliding to carousal.|
|`playSpeed`      |3000 |speed of auto play to trigger slide in ms.|
|`transition`     |300  |sliding transition time in ms.|
|`sync`           |''   |sync two carousels to slide together.|
|`settings`       |{ }  |an object to pass all settings.|

## Slots

Hooper accept two different slots, default slots for slides items, `addons` slot for addons components.

### default slot
```vue
<hooper vertical="true" style="height: 400px" :itemsToShow="1.5" :centerMode="true">
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

### addon slot
```vue
<hooper>
  ...
  <hooper-navigation slot="hooper-addons"></hooper-navigation>
  <hooper-progress slot="hooper-addons"></hooper-progress>
  <hooper-pagination slot="hooper-addons"></hooper-pagination>
</hooper>
```

## Events

::: tip info
Coming soon
:::

## Methods

::: tip info
Coming soon
:::
# API

## Props

|Prop             |Default |Description|
|-----------------|-----|-----------|
|`itemsToShow`    |1    |count of items to showed per view  (can be a fraction).|
|`itemsToSlide`   |1    |count of items to slide when use navigation buttons|
|`infiniteScroll` |false|control infinite scrolling mode.|
|`centerMode`     |false|control center mode|
|`vertical`       |false|control vertical sliding mode|
|`rtl`            |false|control rtl mode|
|`progress`       |false|control progress slider visibility|
|`mouseDrag`      |true |control mouse dragging to slide|
|`shortDrag`      |true |enable any move to commit a slide|
|`autoPlay`       |false|enable auto sliding to carousal|
|`playSpeed`      |3000 |speed of auto play to trigger slide in ms|
|`transition`     |300  |sliding transition time in ms|
|`pagination`     |'indicator'|the type of pagination indicator, fraction or no|
|`settings`       |{ }|an object to pass all settings|

## Slots

Hooper accept two different slots, default slots for slider items, named slots (`hooper-next`, `hooper-prev`) for navigation arrows icons.

### default slots
```vue
<hooper vertical="true" style="height: 400px" :itemsToShow="1.5" :centerMode="true">
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

  <svg width="24" height="24" viewBox="0 0 24 24" class="icon-keyboard-arrow-down" slot="hooper-next">
    <title>keyboard arrow down</title>
    <path d="M11.29,15.71l-6-6A1,1,0,0,1,6.71,8.29L12,13.59l5.29-5.3a1,1,0,0,1,1.42,1.42l-6,6a1,1,0,0,1-1.42,0Z" />
  </svg>
  <svg width="24" height="24" viewBox="0 0 20 20" class="icon-keyboard-arrow-up" slot="hooper-prev">
    <title>keyboard arrow up</title>
    <path d="M5.29,15.71a1,1,0,0,1,0-1.42l6-6a1,1,0,0,1,1.42,0l6,6a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,10.41l-5.29,5.3A1,1,0,0,1,5.29,15.71Z" />
  </svg>
</hooper>
```

### named slots
```vue
<hooper>
  ...
  <svg width="24" height="24" viewBox="0 0 24 24" slot="hooper-next">
    <title>keyboard arrow right</title>
    <path d="M8.29,17.29,13.59,12,8.29,6.71A1,1,0,0,1,9.71,5.29l6,6a1,1,0,0,1,0,1.42l-6,6a1,1,0,0,1-1.42,0A1,1,0,0,1,8.29,17.29Z" />
  </svg>
  <svg width="24" height="24" viewBox="0 0 24 24"  slot="hooper-prev">
    <title>keyboard arrow left</title>
    <path d="M15.71,6.71,10.41,12l5.3,5.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-6-6a1,1,0,0,1,0-1.42l6-6a1,1,0,1,1,1.42,1.42Z" />
  </svg>
  </svg>
</hooper>
```

## Events

::: tip info
Coming soon
:::

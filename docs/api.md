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
|`rtl`            |null |enable rtl mode.|
|`mouseDrag`      |true |toggle mouse dragging.|
|`touchDrag`      |true |toggle touch dragging.|
|`wheelControl`   |true |toggle mouse wheel sliding.|
|`keysControl`    |true |toggle keyboard control.|
|`shortDrag`      |true |enable any move to commit a slide.|
|`autoPlay`       |false|enable auto sliding to carousel.|
|`playSpeed`      |2000 |speed of auto play to trigger slide in ms.|
|`transition`     |300  |sliding transition time in ms.|
|`group`          |null   | Carousels with the same group name will slide together to the same index if possible.|
|`hoverPause`     |true |pause autoPlay if the mouse enters the slide.|
|`trimWhiteSpace` |false|limit carousel to slide only when there will be no completely empty slide-space.|
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

## Methods

### hooper.slideTo(index)

* `index`: index number of slide

Go to slide with index number equal to 'index' parameter passed to the function.

### hooper.slideNext()

Go to next slide.

### hooper.slidePrev()

Go to previous slide.

### hooper.update()

This method responsible update all the slide and configurations computations, it calls typically after each view-port size change.

You should call it after you add/remove slides manually, or after you hide/show it, or do any custom DOM modifications with Hooper element.

This method calls the following methods which you can use separately:

* [`updateWidth`](#hooper-updatewidth)
* [`updateBreakpoints`](#hooper-updatebreakpoints)

### hooper.updateWidth()

Recalculate size of Hooper container, and its slides elements.

### ~~hooper.updateSlidesStatus()~~`decprecated in v0.1.0`

~~Update active classes on slides, and aria-hidden attribute.~~

### hooper.updateBreakpoints()

Recalculate breakpoints configurations.

### hooper.restart()

Restart hooper's slides.

### hooper.restartTimer()

Restart auto-play timer.

## Events

### @beforeSlide

Emits before sliding start occurring.

payload:
`currentSlide`: the current slide index
`slideTo`: the slide index, that will go to

### @slide

Emits after sliding occur.

payload:
`currentSlide`: the current slide index
`slideFrom`: the slide index, that carousel slide from


### @afterSlide

Emits after sliding and transition finished, and `isSliding` flag set to false.

payload:
`currentSlide`: the current slide index


### @updated

Emits after update functions finished.
payload:

`containerWidth`: current carousel width
`containerHeight`: current carousel height
`slideWidth`: current slide width
`slideHeight`: current slide height
`settings`: current settings object

## States

Hooper slide will add state classes to each slide, you can use these classes to apply a specific style to the slide, or make a complex action.

|Class         |Description|
|--------------|-----------|
|`.is-active`  |added to the currently visible/active slides|
|`.is-prev`    |added to all slides previous the active ones|
|`.is-next`    |added to all slides next the active ones|
|`.is-current` |added to the current slide|
|`.is-clone`   |added to the cloned slides|

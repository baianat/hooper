# Examples

## Default Example

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
</hooper>

```vue
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
</hooper>
```

## Use Navigation Arrows

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

  <svg width="24" height="24" viewBox="0 0 24 24" class="icon-keyboard-arrow-down" slot="hooper-next">
    <title>keyboard arrow right</title>
    <path d="M8.29,17.29,13.59,12,8.29,6.71A1,1,0,0,1,9.71,5.29l6,6a1,1,0,0,1,0,1.42l-6,6a1,1,0,0,1-1.42,0A1,1,0,0,1,8.29,17.29Z" />
  </svg>
  <svg width="24" height="24" viewBox="0 0 20 4204" class="icon-keyboard-arrow-up" slot="hooper-prev">
    <title>keyboard arrow left</title>
    <path d="M15.71,6.71,10.41,12l5.3,5.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-6-6a1,1,0,0,1,0-1.42l6-6a1,1,0,1,1,1.42,1.42Z" />
  </svg>
</hooper>

```vue
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

  <svg viewBox="0 0 24 24" slot="hooper-next">
    <path d="..." />
  </svg>
  <svg viewBox="0 0 20 4204" slot="hooper-prev">
    <path d="..." />
  </svg>
</hooper>
```

## Show Multiple Items

<hooper :itemsToShow="3">
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
    <title>keyboard arrow right</title>
    <path d="M8.29,17.29,13.59,12,8.29,6.71A1,1,0,0,1,9.71,5.29l6,6a1,1,0,0,1,0,1.42l-6,6a1,1,0,0,1-1.42,0A1,1,0,0,1,8.29,17.29Z" />
  </svg>
  <svg width="24" height="24" viewBox="0 0 20 4204" class="icon-keyboard-arrow-up" slot="hooper-prev">
    <title>keyboard arrow left</title>
    <path d="M15.71,6.71,10.41,12l5.3,5.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-6-6a1,1,0,0,1,0-1.42l6-6a1,1,0,1,1,1.42,1.42Z" />
  </svg>
</hooper>

```vue
<hooper :itemsToShow="3">
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

  <svg viewBox="0 0 24 24" slot="hooper-next">
    <path d="..." />
  </svg>
  <svg viewBox="0 0 20 4204" slot="hooper-prev">
    <path d="..." />
  </svg>
</hooper>
```

## Slide Multiple Items

<hooper :itemsToSlide="3" :itemsToShow="3">
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
    <title>keyboard arrow right</title>
    <path d="M8.29,17.29,13.59,12,8.29,6.71A1,1,0,0,1,9.71,5.29l6,6a1,1,0,0,1,0,1.42l-6,6a1,1,0,0,1-1.42,0A1,1,0,0,1,8.29,17.29Z" />
  </svg>
  <svg width="24" height="24" viewBox="0 0 20 4204" class="icon-keyboard-arrow-up" slot="hooper-prev">
    <title>keyboard arrow left</title>
    <path d="M15.71,6.71,10.41,12l5.3,5.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-6-6a1,1,0,0,1,0-1.42l6-6a1,1,0,1,1,1.42,1.42Z" />
  </svg>
</hooper>

```vue
<hooper :itemsToSlide="3">
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

  <svg viewBox="0 0 24 24" slot="hooper-next">
    <path d="..." />
  </svg>
  <svg viewBox="0 0 20 4204" slot="hooper-prev">
    <path d="..." />
  </svg>
</hooper>
```

## Infinite Scrolling

<hooper :infiniteScroll="true" :itemsToShow="3">
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
    <title>keyboard arrow right</title>
    <path d="M8.29,17.29,13.59,12,8.29,6.71A1,1,0,0,1,9.71,5.29l6,6a1,1,0,0,1,0,1.42l-6,6a1,1,0,0,1-1.42,0A1,1,0,0,1,8.29,17.29Z" />
  </svg>
  <svg width="24" height="24" viewBox="0 0 20 4204" class="icon-keyboard-arrow-up" slot="hooper-prev">
    <title>keyboard arrow left</title>
    <path d="M15.71,6.71,10.41,12l5.3,5.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-6-6a1,1,0,0,1,0-1.42l6-6a1,1,0,1,1,1.42,1.42Z" />
  </svg>
</hooper>

```vue
<hooper :infiniteScroll="true">
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

  <svg viewBox="0 0 24 24" slot="hooper-next">
    <path d="..." />
  </svg>
  <svg viewBox="0 0 20 4204" slot="hooper-prev">
    <path d="..." />
  </svg>
</hooper>
```

## Center Mode

<hooper :itemsToShow="1.25" :centerMode="true">
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
    <title>keyboard arrow right</title>
    <path d="M8.29,17.29,13.59,12,8.29,6.71A1,1,0,0,1,9.71,5.29l6,6a1,1,0,0,1,0,1.42l-6,6a1,1,0,0,1-1.42,0A1,1,0,0,1,8.29,17.29Z" />
  </svg>
  <svg width="24" height="24" viewBox="0 0 20 4204" class="icon-keyboard-arrow-up" slot="hooper-prev">
    <title>keyboard arrow left</title>
    <path d="M15.71,6.71,10.41,12l5.3,5.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-6-6a1,1,0,0,1,0-1.42l6-6a1,1,0,1,1,1.42,1.42Z" />
  </svg>
</hooper>

```vue
<hooper :itemsToShow="1.25" :centerMode="true">
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

  <svg viewBox="0 0 24 24" slot="hooper-next">
    <path d="..." />
  </svg>
  <svg viewBox="0 0 20 4204" slot="hooper-prev">
    <path d="..." />
  </svg>
</hooper>
```

## Fraction Pagination

<hooper pagination="fraction">
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
    <title>keyboard arrow right</title>
    <path d="M8.29,17.29,13.59,12,8.29,6.71A1,1,0,0,1,9.71,5.29l6,6a1,1,0,0,1,0,1.42l-6,6a1,1,0,0,1-1.42,0A1,1,0,0,1,8.29,17.29Z" />
  </svg>
  <svg width="24" height="24" viewBox="0 0 20 4204" class="icon-keyboard-arrow-up" slot="hooper-prev">
    <title>keyboard arrow left</title>
    <path d="M15.71,6.71,10.41,12l5.3,5.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-6-6a1,1,0,0,1,0-1.42l6-6a1,1,0,1,1,1.42,1.42Z" />
  </svg>
</hooper>

```vue
<hooper pagination="fraction">
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

  <svg viewBox="0 0 24 24" slot="hooper-next">
    <path d="..." />
  </svg>
  <svg viewBox="0 0 20 4204" slot="hooper-prev">
    <path d="..." />
  </svg>
</hooper>
```

## No Pagination

<hooper pagination="no">
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
    <title>keyboard arrow right</title>
    <path d="M8.29,17.29,13.59,12,8.29,6.71A1,1,0,0,1,9.71,5.29l6,6a1,1,0,0,1,0,1.42l-6,6a1,1,0,0,1-1.42,0A1,1,0,0,1,8.29,17.29Z" />
  </svg>
  <svg width="24" height="24" viewBox="0 0 20 4204" class="icon-keyboard-arrow-up" slot="hooper-prev">
    <title>keyboard arrow left</title>
    <path d="M15.71,6.71,10.41,12l5.3,5.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-6-6a1,1,0,0,1,0-1.42l6-6a1,1,0,1,1,1.42,1.42Z" />
  </svg>
</hooper>

```vue
<hooper pagination="no">
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

  <svg viewBox="0 0 24 24" slot="hooper-next">
    <path d="..." />
  </svg>
  <svg viewBox="0 0 20 4204" slot="hooper-prev">
    <path d="..." />
  </svg>
</hooper>
```

## Progress

<hooper :progress="true">
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

  <svg width="24" height="24" viewBox="0 0 24 24" slot="hooper-next">
    <title>keyboard arrow right</title>
    <path d="M8.29,17.29,13.59,12,8.29,6.71A1,1,0,0,1,9.71,5.29l6,6a1,1,0,0,1,0,1.42l-6,6a1,1,0,0,1-1.42,0A1,1,0,0,1,8.29,17.29Z" />
  </svg>
  <svg width="24" height="24" viewBox="0 0 24 24" slot="hooper-prev">
    <title>keyboard arrow left</title>
    <path d="M15.71,6.71,10.41,12l5.3,5.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-6-6a1,1,0,0,1,0-1.42l6-6a1,1,0,1,1,1.42,1.42Z" />
  </svg>
</hooper>

```vue
<hooper :progress="true">
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

  <svg viewBox="0 0 24 24" slot="hooper-next">
    <path d="..." />
  </svg>
  <svg viewBox="0 0 20 4204" slot="hooper-prev">
    <path d="..." />
  </svg>
</hooper>
```

## Auto Playing

<hooper :progress="true" :autoPlay="true" :playSpeed="2000">
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
    <title>keyboard arrow right</title>
    <path d="M8.29,17.29,13.59,12,8.29,6.71A1,1,0,0,1,9.71,5.29l6,6a1,1,0,0,1,0,1.42l-6,6a1,1,0,0,1-1.42,0A1,1,0,0,1,8.29,17.29Z" />
  </svg>
  <svg width="24" height="24" viewBox="0 0 20 4204" class="icon-keyboard-arrow-up" slot="hooper-prev">
    <title>keyboard arrow left</title>
    <path d="M15.71,6.71,10.41,12l5.3,5.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-6-6a1,1,0,0,1,0-1.42l6-6a1,1,0,1,1,1.42,1.42Z" />
  </svg>
</hooper>

```vue
<hooper :progress="true" :autoPlay="true" :playSpeed="2000">
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

  <svg viewBox="0 0 24 24" slot="hooper-next">
    <path d="..." />
  </svg>
  <svg viewBox="0 0 20 4204" slot="hooper-prev">
    <path d="..." />
  </svg>
</hooper>
```

## Vertical Sliding

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
  <svg width="24" height="24" viewBox="0 0 20 4204" class="icon-keyboard-arrow-up" slot="hooper-prev">
    <title>keyboard arrow up</title>
    <path d="M5.29,15.71a1,1,0,0,1,0-1.42l6-6a1,1,0,0,1,1.42,0l6,6a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,10.41l-5.29,5.3A1,1,0,0,1,5.29,15.71Z" />
  </svg>
</hooper>

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

  <svg viewBox="0 0 24 24" slot="hooper-next">
    <path d="..." />
  </svg>
  <svg viewBox="0 0 20 4204" slot="hooper-prev">
    <path d="..." />
  </svg>
</hooper>
```

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
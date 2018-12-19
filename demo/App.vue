<template>

<div class="wrapper">
  <hooper :settings="hooper">
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
    <!-- optional elements -->
    <hooper-progress slot="hooper-addons"></hooper-progress>
    <hooper-pagination slot="hooper-addons"></hooper-pagination>
    <hooper-navigation slot="hooper-addons">
      <svg height="24" viewBox="0 0 24 24" class="icon-keyboard-arrow-right" slot="hooper-next">
        <title>keyboard arrow right</title>
        <path d="M8.29,17.29,13.59,12,8.29,6.71A1,1,0,0,1,9.71,5.29l6,6a1,1,0,0,1,0,1.42l-6,6a1,1,0,0,1-1.42,0A1,1,0,0,1,8.29,17.29Z" />
      </svg>
      <svg width="24" height="24" viewBox="0 0 20 20" class="icon-keyboard-arrow-left" slot="hooper-prev">
        <path d="M15.71,6.71,10.41,12l5.3,5.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-6-6a1,1,0,0,1,0-1.42l6-6a1,1,0,1,1,1.42,1.42Z" />
      </svg>
    </hooper-navigation>
  </hooper>

  <div style="direction: rtl">
    <hooper ref="hooper2">
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
      
      <!-- optionaly elements -->
      <svg height="24" viewBox="0 0 24 24" class="icon-keyboard-arrow-right" slot="hooper-prev">
        <title>keyboard arrow right</title>
        <path d="M8.29,17.29,13.59,12,8.29,6.71A1,1,0,0,1,9.71,5.29l6,6a1,1,0,0,1,0,1.42l-6,6a1,1,0,0,1-1.42,0A1,1,0,0,1,8.29,17.29Z" />
      </svg>
      <svg width="24" height="24" viewBox="0 0 20 20" class="icon-keyboard-arrow-left" slot="hooper-next">
        <path d="M15.71,6.71,10.41,12l5.3,5.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-6-6a1,1,0,0,1,0-1.42l6-6a1,1,0,1,1,1.42,1.42Z" />
      </svg>
    </hooper>
  </div>
  <hooper :settings="hooperVertical" style="height: 400px">
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
    <!-- optionaly elements -->
    <svg height="24" viewBox="0 0 24 24" class="icon-keyboard-arrow-down" slot="hooper-next">
      <title>keyboard arrow right</title>
      <path d="M11.29,15.71l-6-6A1,1,0,0,1,6.71,8.29L12,13.59l5.29-5.3a1,1,0,0,1,1.42,1.42l-6,6a1,1,0,0,1-1.42,0Z" />
    </svg>
    <svg width="24" height="24" viewBox="0 0 20 20" class="icon-keyboard-arrow-up" slot="hooper-prev">
      <path d="M5.29,15.71a1,1,0,0,1,0-1.42l6-6a1,1,0,0,1,1.42,0l6,6a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,10.41l-5.29,5.3A1,1,0,0,1,5.29,15.71Z" />
    </svg>

  </hooper>

</div>

</template>

<script>
import {
  Hooper,
  Slide,
  Progress as HooperProgress,
  Pagination as HooperPagination,
  Navigation as HooperNavigation 
  } from '../src/index.js'

export default {
  name: 'App',
  components: {
    Hooper,
    Slide,
    HooperProgress,
    HooperPagination,
    HooperNavigation
  },
  data () {
    return {
      hooper: {
        itemsToShow: 3,
        shortDrag: true,
        sync: 'hooper2',
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
      },
      hooperRTL: {
        itemsToShow: 2,
        centerMode: true,
        progress: true,
        autoPlay: false,
        infiniteScroll: true,
        rtl: true,
      },
      hooperVertical: {
        itemsToShow: 2,
        infiniteScroll: false,
        centerMode: true,
        vertical: true
      },
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


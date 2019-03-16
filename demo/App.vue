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
    <slide @click.native="click">
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
  methods: {
    click() {
      console.log('dde');
    }
  },
  data () {
    return {
      hooper: {
        itemsToShow: 2,
        shortDrag: false,
        centerMode: false,
        infiniteScroll: true,
        vertical: false
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
  .is-clone,
  .hooper-clone { 
    background-color: rgb(71, 218, 127);
  }
</style>


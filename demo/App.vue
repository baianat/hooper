<template>

<div class="wrapper">
  <hooper :settings="hooper" ref="hooper1">
    <slide v-for="(slide, indx) in slides" :key="indx">
      {{slide}}
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
  <button @click="click">button</button>
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
      this.slides.push('slide' + this.index);
      this.index++;
      this.$refs.hooper1.restart();
    }
  },
  data () {
    return {
      slides: ['slide1', 'slide2', 'slide3'],
      index: 4,
      hooper: {
        itemsToShow: 3,
        shortDrag: false,
        centerMode: true,
        infiniteScroll: false,
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


<template>

<div class="wrapper">
  <hooper :settings="hooperSettings">
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
    <svg height="24" viewBox="0 0 24 24" class="icon-keyboard-arrow-right" slot="hooper-next">
      <title>keyboard arrow right</title>
      <path d="M8.29,17.29,13.59,12,8.29,6.71A1,1,0,0,1,9.71,5.29l6,6a1,1,0,0,1,0,1.42l-6,6a1,1,0,0,1-1.42,0A1,1,0,0,1,8.29,17.29Z" />
    </svg>
    <svg width="24" height="24" viewBox="0 0 20 20" class="icon-keyboard-arrow-left" slot="hooper-prev">
      <path d="M15.71,6.71,10.41,12l5.3,5.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-6-6a1,1,0,0,1,0-1.42l6-6a1,1,0,1,1,1.42,1.42Z" />
    </svg>

  </hooper>
</div>

</template>

<script>
import { Hooper } from '../dist/hooper.js'

export default {
  name: 'App',
  components: {
    Hooper
  },
  data () {
    return {
      hooperSettings: {
        itemsToShow: 2,
        centerMode: true
      }
    }
  }
}
</script>

<style>

  .is-current { 
    background: green;
  }
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
</style>


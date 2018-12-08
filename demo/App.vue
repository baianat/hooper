<template>

<div class="wrapper">
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
</div>

</template>

<script>
import { Hooper } from '../dist/hooper.js'

export default {
  name: 'App',
  components: {
    Hooper
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


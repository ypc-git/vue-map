<template>
  <div id="app">
    <PointMap msg=""/>
  </div>
</template>

<script>
import PointMap from './components/PointMap.vue'

export default {
  name: 'app',
  components: {
    PointMap
  }
}
</script>

<style>
	body, html{
		width: 100%;
		height: 100%;
		overflow: hidden;
		margin:0;
	}
	#app,#allmap {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		width: 100%;
		height: 100%;
	}
</style>

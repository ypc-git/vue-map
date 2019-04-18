<template>
	<div class="point-map">
		<div id="allmap"></div>
	</div>
</template>

<script>
	import BMap from 'BMap'
	import axios from 'axios'
	export default {
		name: 'PointMap',
		data() {
			return {
				pointLng:null,
				pointLat:null,
			}
		},
		props: {
			msg: String
		},
		methods: {
			createMap:function () {
				var _this = this;
				var map = new BMap.Map("allmap")
				var point = new BMap.Point(116.331398,39.897445);
				map.centerAndZoom(point,18);
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r){
					if(this.getStatus() == BMAP_STATUS_SUCCESS){
						var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(20,25));
						var mk = new BMap.Marker(r.point,{icon:myIcon});
						map.addOverlay(mk);
						mk.setAnimation(BMAP_ANIMATION_BOUNCE);
						map.panTo(r.point);
						debugger
						_this.pointLng = r.point.lng;
						_this.pointLat = r.point.lat;
						console.log('您的位置：'+r.point.lng+','+r.point.lat);
						_this.$options.methods.getMapPoint();
					} else {
						console.log('failed:'+this.getStatus());
					}        
				},{enableHighAccuracy: true})
				//开启鼠标滚轮缩放
				map.enableScrollWheelZoom(true)
			},
			setMapPoint:function () {
			  axios.post('http://127.0.0.1:11008/mapDemo/getAllMapPoint.ypc', {
					pointLng: this.pointLng,
					pointLat: this.pointLat
				}).then(function (response) {
					console.log(response);
				}).catch(function (error) {
					console.log(error);
				});
			},
			getMapPoint:function () {
			  axios.get('http://127.0.0.1:11008/mapDemo/getAllMapPoint.ypc', {
					params: {
						ID: 1
					}
				}).then(function (response) {
					console.log(response);
				}).catch(function (error) {
					console.log(error);
				});
			}
		},
		mounted () {
			this.createMap()
		}
	}
</script>
<style scoped>
.point-map{
	height: 100%;
}
</style>



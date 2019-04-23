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
				points:null,
				map:null
			}
		},
		props: {
			msg: String
		},
		methods: {
			createMap:function () {
				var _this = this;
				this.map = new BMap.Map("allmap")
				let _map = this.map;
				var point = new BMap.Point(116.331398,39.897445);
				_map.centerAndZoom(point,18);
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r){
					if(this.getStatus() == BMAP_STATUS_SUCCESS){
						var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(20,25));

						var mk = new BMap.Marker(r.point,{icon:myIcon});
						_map.addOverlay(mk);
						mk.setAnimation(BMAP_ANIMATION_BOUNCE);
						_map.panTo(r.point);
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
			  axios.post('http://140.143.193.163:8080/mapDemo/getAllMapPoint.ypc', {
					pointLng: this.pointLng,
					pointLat: this.pointLat
				}).then(function (response) {
					console.log(response);
				}).catch(function (error) {
					console.log(error);
				});
			},
			getMapPoint:function () {
				var _this = this;
			  axios.get('/api/allPoints', {
					//axios.get('http://140.143.193.163:8080/mapDemo/getAllMapPoint.ypc', {
					params: {ID: 1}
				}).then(function (res) {
					debugger
					_this.points=res.data.data;
          for(let i=0;i<_this.points.length;i++){
            var mk = new BMap.Marker({lat:_this.points[i].pointLat,lng:_this.points[i].pointLng});
						_this.map.addOverlay(mk);
						mk.setAnimation(BMAP_ANIMATION_BOUNCE);
						_this.map.panTo(r.point);
					}  

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



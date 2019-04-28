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
				id:null,
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
				let _this = this;
				this.map = new BMap.Map("allmap")
				let _map = this.map;
				let point = new BMap.Point(116.331398,39.897445);
				let geolocation = new BMap.Geolocation();
				let maxL = 10;
				geolocation.getCurrentPosition(function(r){
					if(this.getStatus() == BMAP_STATUS_SUCCESS){
						let myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(20,25));
						let mk = new BMap.Marker(r.point,{icon:myIcon});
						debugger
						_this.pointLng = r.point.lng;
						_this.pointLat = r.point.lat;
						//_this.$options.methods.setMapPoint();
						axios.get('/api/allPoints', {}).then(function (res) {
						_this.points=res.data.data;
						for(let i=0;i<_this.points.length;i++){
							let _point = new BMap.Point(_this.points[i].pointLat,_this.points[i].pointLng);
							let mk1 = new BMap.Marker(_point);
							_map.addOverlay(mk1);
							mk1.setAnimation(BMAP_ANIMATION_BOUNCE);
							_map.panTo(_point);
							debugger
							let _maxL = map.getDistance({
								lat:parseInt(_this.points[i].pointLat),
								lng:parseInt(_this.points[i].pointLng)
							},{
								lat:parseInt(_this.points[i+1].pointLat),
								lng:parseInt(_this.points[i+1].pointLng)
							});
						}
						}).catch(function (error) {
							console.log(error);
						});
						_map.centerAndZoom(point,maxL);
						//_this.$options.methods.getMapPoint();
					} else {
						console.log('failed:'+this.getStatus());
					}        
				},{enableHighAccuracy: true})
				//开启鼠标滚轮缩放
				_map.enableScrollWheelZoom(true)
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
			delMapPoint:function () {
				axios.post('http://140.143.193.163:8080/mapDemo/delMapPoint.ypc', {
					id: this.id,
				}).then(function (response) {
					console.log(response);
				}).catch(function (error) {
					console.log(error);
				});
			},
			destroyed: function () {
				axios.post('http://140.143.193.163:8080/mapDemo/delMapPoint.ypc', {
					id: this.id,
				}).then(function (response) {
					console.log(response);
				}).catch(function (error) {
					console.log(error);
				});
                console.log("我已经离开了！");
				this.stopTimer();
			},
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



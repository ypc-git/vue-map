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
				map:null,
				pointName:null
			}
		},
		props: {
			msg: String
		},
		methods: {
			getMapPoint:function () {
				let _this = this;
			  axios.get('/api2/mapDemo/getAllMapPoint.ypc', {}).then(function (res) {
				if(res.data.code == 1){
					_this.points=JSON.parse(res.data.data);
					for(let i=0;i<_this.points.length;i++){
						var _point = new BMap.Point(_this.points[i].pointLng,_this.points[i].pointLat);
						var mk1 = new BMap.Marker(_point);
						_this.map.addOverlay(mk1);
						mk1.setAnimation(BMAP_ANIMATION_BOUNCE);
					}
				}
				}).catch(function (error) {
					console.log(error);
				});
			},
			createMap:function () {
				var _this = this;
				_this.map = new BMap.Map("allmap");
				var point = new BMap.Point(116.404, 39.915);
				_this.map.centerAndZoom(point,15);
				_this.map.enableScrollWheelZoom(true);
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r){
					if(this.getStatus() == BMAP_STATUS_SUCCESS){
						var myIcon = new BMap.Icon("dtqq.png", new BMap.Size(20,25));
						var mk = new BMap.Marker(r.point,{icon:myIcon});
						_this.pointLng = r.point.lng;
						_this.pointLat = r.point.lat;
						var point = new BMap.Point(_this.pointLng,_this.pointLat);
						var mk = new BMap.Marker(point);
						_this.map.addOverlay(mk);
						mk.setAnimation(BMAP_ANIMATION_BOUNCE);
						_this.map.panTo(point);
						_this.$options.methods.setMapPoint(r.point.lng,r.point.lat);
						//_this.$options.methods.getMapPoint();
					} else {
						console.log('failed:'+this.getStatus());
					}
				},{enableHighAccuracy: true});
			},
			setMapPoint:function (pointLng,pointLat) {
				axios.post('/api2/mapDemo/setMapPoint.ypc?pointLng='+pointLng+'&pointLat='+pointLat,
				).then(function (res) {
					if(res.data.code == 1){
						this.id = res.data.data;
					}
					console.log("res:"+res);
				}).catch(function (error) {
					console.log(error);
				});
			},
			delMapPoint:function () {
				axios.post('/api2/mapDemo/delMapPoint.ypc?id='+this.id,
				).then(function (res) {
					console.log(res.data);
				}).catch(function (error) {
					console.log(error);
				});
			},
			destroyed: function () {
				axios.post('/api2/mapDemo/delMapPoint.ypc?id='+this.id,
				).then(function (res) {
					console.log(res.data);
				}).catch(function (error) {
					console.log(error);
				});
        console.log("我已经离开了！");
				this.stopTimer();
			},
		},
		created() {
			this.getMapPoint();
		},
		beforeMount() {
			//this.getMapPoint();
		},
		mounted () {
			//this.getMapPoint();
			this.createMap();
		},
	}
</script>
<style scoped>
.point-map{
	height: 100%;
}
</style>



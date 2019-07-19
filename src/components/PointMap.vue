<template>
	<div class="point-map">
		<div id="allmap"></div>
	</div>
</template>

<script>
	import BMap from 'BMap'
	import axios from 'axios'
	import iconDtqq from '../assets/icons/hqq1.png'
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
			  axios.get('/api3/mapDemo/getAllMapPoint.ypc', {}).then(function (res) {
				if(res.data.code == 1){
					_this.points=JSON.parse(res.data.data);
					var allOverlay = _this.map.getOverlays();
					for (var i = 0; i < allOverlay.length -1; i++){
						_this.map.removeOverlay(allOverlay[i]);
					}
					for(let i=0;i<_this.points.length;i++){
						var _point = new BMap.Point(_this.points[i].pointLng,_this.points[i].pointLat);
						var myIcon = new BMap.Icon(iconDtqq, new BMap.Size(25,25));
						var mk1 = new BMap.Marker(_point,{icon:myIcon});
						var label = new BMap.Label(_this.points[i].name,{offset:new BMap.Size(30,0)});
						label.setStyle({ color : "#2c3e50", fontSize : "12px",border:"#616b75",background:"#ffcaca"});
						mk1.setLabel(label);
						_this.map.addOverlay(mk1);
						if(_this.id == _this.points[i].id){
              _this.map.panTo(_point);
						}
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
						_this.pointLng = r.point.lng;
						_this.pointLat = r.point.lat;
						var myIcon = new BMap.Icon(iconDtqq, new BMap.Size(25,25));
						var label = new BMap.Label(_this.pointName,{offset:new BMap.Size(30,0)});
						label.setStyle({ color : "#2c3e50", fontSize : "12px",border:"#616b75",background:"#ffcaca"});
						var point = new BMap.Point(_this.pointLng,_this.pointLat);
						var mk = new BMap.Marker(point,{icon:myIcon});
						mk.setLabel(label);
						_this.map.addOverlay(mk);
						_this.map.panTo(point);
						_this.setMapPoint(r.point.lng,r.point.lat);
						//_this.$options.methods.getMapPoint();
					} else {
						console.log('failed:'+this.getStatus());
					}
				},{enableHighAccuracy: true});
			},
			setMapPoint:function (pointLng,pointLat) {
				axios.post('/api3/mapDemo/setMapPoint.ypc?pointLng='+pointLng+'&pointLat='+pointLat+'&id='+this.id,
				).then((res) => {
					if(res.data.code == 1){
						this.id = res.data.data.id;
						this.pointName = res.data.data.name;
					}
				}).catch((error) => {
					console.log(error);
				});
			},
			delMapPointById:function () {
				axios.post('/api3/mapDemo/delMapPointById.ypc?id='+this.id,
				).then((res) => {
					console.log(res.data);
				}).catch((error) => {
					console.log(error);
				});
			},
			destroyed: function () {
				axios.post('/api3/mapDemo/delMapPointById.ypc?id='+this.id,
				).then((res) => {
					console.log(res.data);
				}).catch((error) => {
					console.log(error);
				});
                alert("我已经离开了！");
				this.stopTimer();
			},
		},
		beforeMount() {
			//this.getMapPoint();
		},
		mounted () {
			this.createMap();
			this.getMapPoint();
			window.addEventListener( 'beforeunload', e => this.delMapPointById() );
			setInterval(this.getMapPoint, 20000);
		},
	}
</script>
<style scoped>
.point-map{
	height: 100%;
}
</style>



<template>
	<view>
		<view class="kong"></view>
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index==TabCur?'z-color cur':'text-gray'" v-for="(item,index) in tablist" :key="index" @tap="tabSelect" :data-id="index">
				{{item.name}}
			</view>
		</scroll-view>
		<view  class="card-view">
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
		</view>
	</view>
</template>
<script> 
	var _self;
	var canvaLineA=null;
	export default {
		data() {
			return {
				TabCur:0,
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				tablist:[{
					name:'近一周'
				},{
					name:'近一月'
				}]
			}
		}, 
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getServerData(){
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data:{
					},
					success: function(res) {
						console.log(res.data.data)
						let LineA={categories:[],series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						LineA.categories=res.data.data.LineA.categories;
						LineA.series=res.data.data.LineA.series;
						_self.showLineA("canvasLineA",LineA);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
			showLineA(canvasId,chartData){
				canvaLineA=new this.uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					legend:{show:true},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#FFF',
						gridType:'solid',
						dashLength:8
					},
					yAxis: {
						gridType:'solid',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						min:10,
						max:180, 
						format:(val)=>{return val.toFixed(0)}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
				
			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			}
		},
		onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(650);
			this.cHeight=uni.upx2px(600);
			this.getServerData();
		},
	}
</script>

<style>
	
.card-view {
	width: 695upx;
	background-color: #ffffff;
	border-radius: 18upx;
	border: solid 1upx #e5e5e5;
	margin: auto;
	margin-top: 30upx;
	overflow: hidden;
	height: 706rpx;
	padding: 50upx 0upx;
	 
}
.charts{
	width:650upx;
	height: 600upx;
	margin: auto;
}
.nav .cu-item { 
    margin: 0  50upx; 
}
</style>

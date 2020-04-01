<template>
	<view>
		<view class="kong"></view>
		<view class="card-view">
			<view class="cu-list grid col-4 no-border rmen-list">
				<view class="cu-item" v-for="(item, index) in tablsit" :key="index" @tap="tpinfo" :data-url="item.url">
					<view>  
						<image class="c-icon" :src="item.img"></image> 
					</view>
					<text>{{ item.title }}</text> 
				</view>
			</view>
			
			<view>
				<view>
					
				</view>
			</view>
			
		</view> 
		
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			tablsit:[
				{
					icon:'',
					img:'/static/pushicon/icon-text.png',
					imgcur:'/static/pushicon/icon-textcar.png',
					title:"查文字"
				},
				{
					icon:'',
					img:'/static/pushicon/icon-tu.png',
					imgcur:'/static/pushicon/icon-tucar.png',
					title:"插图片"
				},
				{
					icon:'',
					img:'/static/pushicon/icon-ad.png',
					imgcur:'/static/pushicon/icon-adcar.png',
					title:"插音频"
				},
				{
					icon:'',
					img:'/static/pushicon/icon-video.png',
					imgcur:'/static/pushicon/icon-videocar.png',
					title:"插视频"
				}
			]
		};
	},
	methods: {}
};
</script>
<style>
.card-view {
	width: 693rpx;
	background-color: #ffffff;
	box-shadow: 0rpx 3rpx 16rpx 0rpx rgba(204, 204, 204, 0.41);
	border-radius: 12rpx;
	border: solid 1rpx #eeeeee;
	overflow: hidden;
	margin: auto;
	margin-top: 25upx;
}
.c-icon{
	width: 40upx;
	height: 40upx;
}
</style>

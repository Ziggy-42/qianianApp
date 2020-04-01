<template>
	<view>
		<view class=" audio-view ">
			<image class="playicon" src="/static/icon/audio-j.png"></image>
			<view class="jindu" >
				<view class="cu-progress round" style="	height: 8upx;" ><view class="bg-green" :style="[{ width: loading ? '80%' : '' }]"></view></view>
			</view>
			<view>30:10</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.audio-view {
	display: flex;
	align-items: center;
	height: 100upx;
	padding: 0upx 50upx;
	font-size: 24upx;
	color: #727272;
	margin-top: 20upx;
}

.audio-view .playicon {
	width: 61upx;
	height: 61upx;
}
.audio-view  .jindu{
	width: 400upx;
	margin-right: 15upx; 
	display: flex;
	align-items: center;
}
</style>

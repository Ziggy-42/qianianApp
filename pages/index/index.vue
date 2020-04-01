<template>
	<view>
		<goodsIndex v-if="PageCur == 'index'"></goodsIndex>
		<liveBroad v-if="PageCur == 'live'"></liveBroad>
		<material v-if="PageCur == 'quan'"></material>
		<mine v-if="PageCur == 'mine'"></mine>
		<view class="cu-bar tabbar bg-white shadow foot solids-top ">
			<view class="action" @click="NavChange" data-cur="index">
				<view class="cuIcon-cu-image"><image :src="'/static/tab/index' + [PageCur == 'index' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'index' ? 'cur1' : 'text-gray'">商城</view>
			</view>
			<view class="action" @click="NavChange" data-cur="live">
				<view class="cuIcon-cu-image"><image :src="'/static/tab/live' + [PageCur == 'live' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'live' ? 'cur1' : 'text-gray'">直播</view>
			</view>
			<view class="action" @click="NavChange" data-cur="quan">
				<view class="cuIcon-cu-image"><image :src="'/static/tab/quan' + [PageCur == 'quan' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'quan' ? 'cur1' : 'text-gray'">发圈</view>
			</view>
			<view class="action" @click="NavChange" data-cur="mine">
				<view class="cuIcon-cu-image"><image :src="'/static/tab/mine' + [PageCur == 'mine' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'mine' ? 'cur1' : 'text-gray'">我的</view>
			</view>
		</view> 
	</view>
</template>

<script>
let that; 
export default {
	data() {
		return {
			PageCur: 'index'
		};
	},
	methods: {
		NavChange: function(e) {
			this.PageCur = e.currentTarget.dataset.cur;
		}
	},
	onLoad() { 
	}
};
</script>

<style>
page {
	background: #f4f4f4;
}
.cur1 {
	color: #e11b01;
}
</style>

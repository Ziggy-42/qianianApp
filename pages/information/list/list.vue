<template>
	<view>
		<view class="kong" ></view>
		<view class="dymlist">
			<block v-for="(item, index) in list" :key="index">
				<view class="dymview">
					<view class="dymleft">
						<view class="dy-title">{{ item.title }}</view>
						<view class="dy-subtit">{{ item.subtit }}</view>
						<view class="dydoen">
							<view>{{ item.upusername }}</view>
							<view>{{ item.uptime }}</view>
							<view>{{ item.zan }}</view>
						</view>
					</view>
					<view class="dymright"><image class="image" :src="item.pric" mode="aspectFill"></image></view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
var that;
import data from '../data.js';
export default {
	data() {
		return {};
	},
	methods: {},
	onLoad() {
		that=this;
		that.list=data.list
	}
};
</script>

<style></style>

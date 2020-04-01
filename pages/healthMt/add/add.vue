<template>
	<view>
		<view class="kong"></view>
		<view class="cu-form-group">
			<view class="title">日期选择</view>
			<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
				<view class="picker">{{ date }}</view>
			</picker>
		</view>
		<view class="kong"></view>

		<view style="height: 20upx;"></view>
		<view class="card-view">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-title text-orange"></text>
					<text class="text-biao ">高压</text>
				</view>
				<view class="action text-gray">mmHg</view>
			</view>
			<view style="padding: 20upx 40upx 40upx ;"><input class="text-center" style="width: 100%; height: 150upx;font-size: 40rpx; " placeholder="请输入..." placeholder-class="plclass" /></view>
		</view>
		<view class="card-view">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-title text-orange"></text>
					<text class=" text-biao">低压</text>
				</view>
				<view class="action text-gray">mmHg</view>
			</view>
			<view style="padding: 20upx 40upx 40upx ;"><input class="text-center" style="width: 100%; height: 150upx;font-size: 40rpx; " placeholder="请输入..." placeholder-class="plclass" /></view>
		</view>

		<view class="seven-btn">保存</view>

		<chunLei-modal v-model="show" :mData="data" :type="type" @onConfirm="onConfirm" @cancel="cancel" navMask></chunLei-modal>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			data: { title: '提示', content: '这是一个模态弹窗', cancelText: 'cancel', confirmColor: '#3CC51F' },
			type: 'notify',
			show: false,
			phone: '',
			info: {},
			date: '2020-01-10'
		};
	},
	methods: {
		onConfirm(e) {
			console.log(e);
		},
		cancel(e) {
			console.log(e);
		},
		click(e) {
			this.tabMask.show(300);
		},
		getinput(e) {
			let value = e.currentTarget.dataset.value;
			let name = e.currentTarget.dataset.name;
			that.info[name] = value;
		}
	},
	onLoad() {
		that = this;
	}
};
</script>

<style>
page {
	background: #fff;
}
.card-view {
	width: 695rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	border: solid 1rpx #e5e5e5;
	overflow: hidden;
	margin: auto;
	margin-bottom: 25upx;
}
.card-view .title {
	width: 618rpx;
	height: 118upx;
	line-height: 118upx;
	margin: auto;
	font-size: 30rpx;
	color: #2c2c2c;
}
.plclass {
	font-size: 40rpx;
	color: #d5d5d5;
}

.pradio {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 28rpx;
	color: #878787;
	height: 80upx;
}
.pradio radio {
	transform: scale(0.8);
}
.seven-btn {
	position: fixed;
	bottom: 0;
	width: 750rpx;
	height: 100rpx;
	background-color: #e11b01;
	text-align: center;
	line-height: 100upx;
	color: #fff;
	font-size: 30rpx;
}
.text-biao{
	font-size: 34upx;
}
</style>

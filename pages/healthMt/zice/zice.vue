<template>
	<view>
		<view class="kong"></view>
		 
		<view class="card-view">
			<view class="title">1.您今日的血糖指数是多少？？</view>
			<view style="padding: 40upx;">
				<radio-group style="width: 100%;">
					<view class="pradio">
						<view>是</view>
						<radio></radio>
					</view>
					<view class="pradio">
						<view>否</view>
						<radio></radio>
					</view>
				</radio-group>
			</view>
		</view>
		<view class="card-view">
			<view class="title">3.您的门店是哪一类？</view>
			<view style="padding: 40upx;">
				<radio-group style="width: 100%;">
					<view class="pradio">
						<view>是</view>
						<radio></radio>
					</view>
					<view class="pradio">
						<view>否</view>
						<radio></radio>
					</view>
				</radio-group>
			</view>
		</view>

		 
		<view class="text-center padding-bottom padding-top"><button class="zcolor-btn cu-btn " @tap="seven" >提交自测</button></view>

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
			info: {}
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
		seven(){
			uni.navigateTo({
				url:'../echart/echart'
			})
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
	margin-top: 25upx;
}
.card-view .title {
	width: 618rpx;
	height: 118upx;
	line-height: 118upx;
	margin: auto;
	font-size: 30rpx;
	color: #2c2c2c;
	border-bottom: solid #e5e5e5 1upx;
}
.plclass {
	font-size: 28rpx;
	color: #b5b5b5;
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
</style>

<template>
	<view>
		<view class="kong"></view>
		<view class="form-group ">
			<view class="title">
				<view class="must">*</view>
				姓名
			</view>
			<view class="right"><input placeholder="请输入姓名" data-name="name" @input="getinput"  placeholder-class="phclass" /></view>
		</view>
		<view class="form-group ">
			<view class="title">
				<view class="must"></view>
				性别
			</view>
			<view class="right text-gray ">
				<radio-group class="block flex align-center ">
					<view class="margin-right-xl">
						<radio class="red"></radio>
						男
					</view>
					<view>
						<radio class="red"></radio>
						女
					</view>
				</radio-group>
			</view>
		</view>

		<view class="form-group ">
			<view class="title">
				<view class="must">*</view>
				联系电话
			</view>
			<view class="right"><input placeholder="请输入您的手机号"  data-name="phone" @input="getinput" placeholder-class="phclass" /></view>
			<view class="sendCode"><sendCode :phone="info.phone"></sendCode></view>
		</view>
		<view class="form-group ">
			<view class="title">
				<view class="must">*</view>
			验证码
			</view>
			<view class="right"><input placeholder="请输入您的验证码"  data-name="code" @input="getinput" placeholder-class="phclass" /></view>
		</view>
		<view style="height: 160upx;"></view>

		<view class="text-center"><button class="cu-btn zcolor-btn" @tap="click">下一步</button></view>

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
			info:{}
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
		getinput(e){
			let value=e.currentTarget.dataset.value;
			let name=e.currentTarget.dataset.name;
			that.info[name]=value;
		}
	},
	onLoad() {
		that=this; 
	}
};
</script>

<style>
page {
	background: #fff;
}
.sendCode {
	width: 158rpx;
	height: 52rpx;
	background-color: #e8f4ff;
	border-radius: 8rpx;
	text-align: center;
	line-height: 52upx;
	color: #0088fe;
}
</style>

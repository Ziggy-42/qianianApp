<template>
	<view>
		<view class="form-view">
			<view class="title">
				<text class="text-red">*</text>
				姓名
			</view>
			<view class="dview"><input placeholder="请输入您的手机号" placeholder-class="plclass" /></view>
		</view>
		<view class="form-view">
			<view class="title">
				<text class="text-red">*</text>
				联系电话
			</view>
			<view class="dview"><input placeholder="请输入您的手机号" placeholder-class="plclass" /></view>
		</view>
		<view class="form-view">
			<view class="title">性别</view>
			<view class="dview">
				<picker class=" flex  flex-sub " style="display: flex; justify-content: space-between;  " >
					<input placeholder="请选择您的性别" disabled="true" placeholder-class="plclass" />
					<view class="prick-btn"><view class="cuIcon-unfold"></view></view>
				</picker>
			</view>
		</view>
		<view class="form-view">
			<view class="title">
				<text class="text-red">*</text>
				身份的等级
			</view>
			<view class="dview">
				<picker class=" flex  flex-sub " style="display: flex;" >
					<input placeholder="请选择您的性别" disabled="true" placeholder-class="plclass" />
					<view class="prick-btn"><view class="cuIcon-unfold"></view></view>
				</picker>
			</view>
		</view>
		<view class="margin-top-xl text-center"><button class="cu-btn bg-blue ">确定</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style>
page {
	background: #fff;
}
.form-view {
	width: 655rpx;
	margin: auto;
}
.form-view .title {
	font-size: 30rpx;
	font-weight: normal;
	letter-spacing: 0rpx;
	color: #2f2f2f;
	height: 100upx;
	line-height: 100upx;
}
.plclass {
	font-size: 28rpx;
	color: #b5b5b5;
}
.dview {
	display: flex;
	height: 80rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	border: solid 2rpx #dcdcdc;
	position: relative;
}
.dview input {
	flex: 1;
	height: 100%;
	padding: 0upx 20upx;
}
.prick-btn {
	width: 81rpx;
	height: 76rpx;
	background-color: #f3f3f3;
	border-radius: 0rpx 8rpx 8rpx 0rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 0upx;
	top: 0;
}
</style>

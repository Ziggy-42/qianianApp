<template>
	<view>
		<view class="text-center ">
			<view class="" style="font-size: 150upx; margin-bottom: 30upx;"><text class="cuIcon-roundcheckfill text-blue "></text></view>
			<view class="" style="margin-bottom: 30upx;" >您参加的XXX会务已成功报名！</view>
		</view>

		<view class="list-view">
			<view class="title">会务信息</view>
			<view class="v-view">
				<view class="li-view">
					<label>会务名称</label>
					<view>XXX会务</view>
				</view>
				<view class="li-view">
					<label>会务时间</label>
					<view>2020-02-07 15:30</view>
				</view>
				<view class="li-view">
					<label>会务地址</label>
					<view>上海市闵行区红米额南路124号</view>
				</view>
			</view>
		</view>
		
		<view class="list-view">
			<view class="title">其他信息</view>
			<view class="v-view">
				<view class="li-view">
					<label>所属上级</label>
					<view>高规格</view>
				</view>
				<view class="li-view">
					<label>上级电话</label>
					<view>15537839542</view>
				</view>
				<view class="li-view">
					<label>客服电话</label>
					<view>400-0542-11542</view>
				</view>
			</view>
		</view>
		
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
.list-view {
	width: 698upx;
	margin: auto;
}
.list-view .title {
	height: 85upx;
	line-height: 85upx;
	font-size: 25upx;
	color: #afafaf;
	padding-left: 10upx;
}
.v-view {
	width: 100%;
	background: #fff;
	border-radius: 14upx;
	overflow: hidden;
}
.v-view .li-view {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 104upx;
	font-size: 27upx;
	color: #858585;
	border-bottom: solid #eeeeee 1upx;
}
</style>

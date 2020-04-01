<template>
	<view>
		<view class="bg-yanhong">
			<view :style="{ height: CustomBar + 'px' }"></view>
			<cu-custom bgColor="" :tubei="false" :isBack="true"><text slot="content" style="color: #FFF;">健康管理</text></cu-custom>
			<view style="height: 250upx;"></view>
		</view>

		<view class="card-view user-view ">
			<view class="top-user">
				<view class="flex align-center">
					<view class="cu-avatar  "></view>
					<view class="flex">
						<view>姓名</view>
						<view class="sex">女</view>
					</view>
				</view>
				<button class="cu-btn bjben ">
					<image src="/static/mine/icon1.png" style="width: 25upx;height: 25upx;margin-right: 15upx;"></image>
					编辑
				</button>
			</view>
			<view class="tu-view">
				<label>出生年月</label>
				<picker class="right" mode="date" value="1990-01-01"><input disabled="true" placeholder="请选择出生年月" placeholder-class="phclass" /></picker>
			</view>
			<view class="tu-view">
				<label>身高</label>
				<view class="right"><input type="digit" placeholder="请填写身高(cm)" placeholder-class="phclass" /></view>
			</view>
			<view class="tu-view " style="border: none;">
				<label>体重</label>
				<view class="right"><input type="digit" placeholder="请填写体重(kg)" placeholder-class="phclass" /></view>
			</view>

			<view class=" text-center "><button class="cu-btn seven-btn ">保存</button></view>
		</view>

		<view class="card-view  test-view ">
			<view class="title">
				<view class="flex align-center">
					<view class="title-text">血压</view>
					<view class="qr-text" style="margin-left: 40upx;">2020.03.30</view>
				</view>
				<view class="r-btnview ">
					<image src="/static/icon/icon-09.png"></image>
					<image src="/static/icon/icon-10.png" @tap="tuadd" ></image>
				</view>
			</view>
			<view>
				<view class="jieguo">
					<view class="jgview" :class="[xueya.max < 90 ? 'justify-start' : '', 134 > xueya.max > 90 ? 'justify-center' : '', 134 < xueya.max ? 'justify-end' : '']">
						<block v-if="xueya.max">
							<view class="name">高压：</view>
							<view class="num">{{ xueya.max }}</view>
							<view class="dwei">mmHg</view>
							<view class="biao"></view>
						</block>
						<block v-else><view class="name">--暂时没有记录</view></block>
					</view>
				</view>
				<view class="biaozhun">
					<view class="bcolorview">
						<view class="bz-color-view-min"><90.0</view>
						<view class="text">低于正常范围</view>
					</view>
					<view class="bcolorview">
						<view class="bz-color-view-cenre">90-134</view>
						<view class="text">低于正常范围</view>
					</view>
					<view class="bcolorview">
						<view class="bz-color-view-max">> 134.0</view>
						<view class="text">低于正常范围</view>
					</view>
				</view>
			</view>

			<view>
				<view class="jieguo">
					<view class="jgview " :class="[xueya.min < 60 ? 'justify-start' : '', 84 > xueya.min > 60 ? 'justify-center' : '', 84 < xueya.min ? 'justify-end' : '']">
						<block v-if="xueya.min">
							<view class="name">低压：</view>
							<view class="num">{{ xueya.min }}</view>
							<view class="dwei">mmHg</view>
							<view class="biao"></view>
						</block>
						<block v-else><view class="name">--暂时没有记录</view></block>
					</view>
				</view>
				<view class="biaozhun">
					<view class="bcolorview">
						<view class="bz-color-view-min"><60.0</view>
						<view class="text">低于正常范围</view>
					</view>
					<view class="bcolorview">
						<view class="bz-color-view-cenre">60-84</view>
						<view class="text">低于正常范围</view>
					</view>
					<view class="bcolorview">
						<view class="bz-color-view-max">> 84.0</view>
						<view class="text">低于正常范围</view>
					</view>
				</view>
			</view>
		</view>

		<view class="card-view  test-view ">
			<view class="title">
				<view class="flex align-center">
					<view class="title-text">血糖</view>
					<view class="qr-text" style="margin-left: 40upx;">2020.03.30</view>
				</view>
				<view class="r-btnview ">
					<image src="/static/icon/icon-09.png"></image>
					<image src="/static/icon/icon-10.png" @tap="tuadd" ></image>
				</view>
			</view>
			<view>
				<view class="jieguo">
					<view class="jgview" :class="[xueya.max < 90 ? 'justify-start' : '', 134 > xueya.max > 90 ? 'justify-center' : '', 134 < xueya.max ? 'justify-end' : '']">
						<block v-if="xueya.max">
							<view class="name">高压：</view>
							<view class="num">{{ xueya.max }}</view>
							<view class="dwei">mmHg</view>
							<view class="biao"></view>
						</block>
						<block v-else><view class="name">--暂时没有记录</view></block>
					</view>
				</view>
				<view class="biaozhun">
					<view class="bcolorview">
						<view class="bz-color-view-min"><90.0</view>
						<view class="text">低于正常范围</view>
					</view>
					<view class="bcolorview">
						<view class="bz-color-view-cenre">90-134</view>
						<view class="text">低于正常范围</view>
					</view>
					<view class="bcolorview">
						<view class="bz-color-view-max">> 134.0</view>
						<view class="text">低于正常范围</view>
					</view>
				</view>
			</view>
		</view>

		<view class=" text-center"><image src="/static/icon/组-3@2x.png" style="height: 175upx; width: 100%;width: 695upx; " mode="widthFix"></image></view>

		<view class="" style="height: 20upx;"></view>

		<block v-for="(item, index) in zclist" :key="index">
			<view class=" card-view " @tap="tozice" :data-type="item.type">
				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-title text-orange" :class="item.color" ></text>
						<text class="text-xl text-bold">{{item.name}}</text>
					</view>
					<view class="action  cuIcon-right text-gray "></view>
				</view>
			</view>
		</block>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			CustomBar: this.CustomBar,
			xueya: {
				min: 100,
				max: 100
			},
			xuetang: '',
			zclist: [
				{
					color: 'text-orange',
					name: '血糖自测',
					type: 1
				},
				{
					color: 'text-blue',
					name: '血压自测',
					type: 2
				},
				{
					color: 'text-green',
					name: '心率自测',
					type: 3
				}
			]
		};
	},
	methods: {
		tozice() {
			uni.navigateTo({
				url: '../zice/zice?type=1'
			});
		},
		tuadd(){
			uni.navigateTo({
				url: '../add/add'
			});
		}
	}
};
</script>

<style>
page {
	background-color: #fff;
}
.card-view {
	width: 695upx;
	background-color: #ffffff;
	border-radius: 18upx;
	border: solid 1upx #e5e5e5;
	margin: auto;
	margin-bottom: 20upx;
	overflow: hidden;
}
.user-view {
	margin-top: -250upx;
	padding: 35upx;
}
.top-user .cu-avatar {
	width: 104upx;
	height: 104upx;
	border: solid 3upx #ffffff;
	border-radius: 100upx;
	box-shadow: 0 0 10upx rgba(0, 0, 0, 0.3);
	margin-right: 20upx;
}
.top-user {
	display: flex;
	align-items: center;
	font-size: 28upx;
	justify-content: space-between;
}
.sex {
	margin-left: 20upx;
}
.bjben {
	padding: 0upx 20upx;
	height: 45upx;
	background-image: linear-gradient(98deg, #f52618 0%, #ff895a 100%);
	border-radius: 23upx;
	font-size: 24upx;
	color: #ffffff;
}
.tu-view {
	height: 96upx;
	padding: 0upx 14upx;
	border-bottom: solid #eeeeee 1upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.tu-view .right {
	flex: 1;
}
.tu-view .right input {
	width: 100%;
	text-align: right;
}
.seven-btn {
	width: 516upx;
	height: 64upx;
	background-color: #f52618;
	border-radius: 32upx;
	color: #ffffff;
	margin-top: 30upx;
}

.test-view {
	padding: 25upx 20upx;
}

.title {
	font-size: 32upx;
	color: #2b2b2b;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 20upx;
}
.title .qr-text {
	font-size: 24upx;
	color: #adadad;
}

.r-btnview image {
	width: 77upx;
	height: 77upx;
	border-radius: 1000upx;
	border: solid 1upx #f5f5f5;
	background-image: linear-gradient(0deg, #fffafa 0%, #ffffff 100%);
	/* box-shadow: 0upx 5upx 8upx 1upx rgba(204, 204, 204, 0.64); */
	margin-left: 40upx;
}

.biaozhun {
	display: flex;
}
.biaozhun .bcolorview {
	flex: 1;
	text-align: center;
}

.biaozhun .bz-color-view-min {
	width: 98%;
	height: 34upx;
	background-color: #ffa63c;
	border-radius: 17upx 0upx 0upx 17upx;
	margin: auto;
	font-size: 25upx;
	color: #ffffff;
	line-height: 34upx;
}
.biaozhun .bz-color-view-cenre {
	width: 98%;
	height: 34upx;
	background-color: #4ac372;
	margin: auto;
	font-size: 25upx;
	color: #ffffff;
	line-height: 34upx;
}
.biaozhun .bz-color-view-max {
	width: 98%;
	height: 34upx;
	background-color: #ff4d4d;
	border-radius: 0upx 17upx 17upx 0upx;
	margin: auto;
	font-size: 25upx;
	color: #ffffff;
	line-height: 34upx;
}
.biaozhun .text {
	font-size: 24upx;
	line-height: 70upx;
	color: #adadad;
}
.jieguo {
	height: 135upx;
	display: flex;
	align-items: center;
}
.jieguo .jgview {
	height: 73upx;
	background-color: #eef4ff;
	border-radius: 37upx;
	display: flex;
	align-items: center;
	padding: 0upx 25upx;
	color: #2c7bff;
	position: relative;
}
.jieguo .jgview .name {
	font-size: 26upx;
}
.jieguo .jgview .num {
	font-size: 36upx;
	margin-right: 10upx;
}
.jieguo .jgview .dwei {
	font-size: 30upx;
}
.jieguo .jgview .biao {
	width: 34upx;
	height: 34upx;
	background-color: #eef4ff;
	transform: rotate(45deg);
	position: absolute;
	bottom: -17upx;
	left: 0;
	right: 0;
	margin: auto;
}
.cu-bar {
	height: 120upx;
	font-size: 34upx;
}
</style>

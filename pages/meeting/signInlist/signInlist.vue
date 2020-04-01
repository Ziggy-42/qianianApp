<template>
	<view>
		<view class="header">
			<scroll-view scroll-x class="nav guo-nav">
				<view class="flex text-center">
					<view
						class="cu-item flex-sub"
						:class="index == TabCur ? 'text-blue action ' : ''"
						v-for="(item, index) in tabList"
						:key="index"
						@tap="tabSelect"
						:data-id="index"
					>
						{{ item.name }}
						<view class="after"></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view style="height: 120upx;"></view>
		<view class="list-view">
			<block v-for="(item, index) in list" :key="index">
				<view class="li-view" @tap="tpinfo" :data-id="item.id">
					<view class=" flex-sub flex-wrap  justify-between flex " style="height:180upx;">
						<view class="title-view text-cut">{{ item.name }}</view>
						<view class="text-view">时间：2020-03-10 15:20</view>
						<view class="text-view">地址：上海市闵行区虹梅南路124号</view>
					</view>
					<view class="rigcode" v-if="TabCur==0" >
						<image src="/static/logo.png"></image> 
						<view>签到二维码</view>
					</view>
					<view class="rigcode"  style="height: 150upx;" v-else >
						<view style="margin-bottom: 15upx;">
							<text class="text-blue" v-if="item.status == 0">未开始</text>
							<text class="text-green" v-if="item.status == 1">进行中</text>
							<text class="text-orange" v-if="item.status == 2">已结束</text>
						</view>
						<image src="/static/logo.png"></image>
					</view>
				</view>
			</block>
		</view>

		<uni-load-more status="loading" v-if="loading"></uni-load-more>
	</view>
</template>

<script>
var that;
export default {
	components: {},
	data() {
		return {
			TabCur: 1,
			tabList: [{ id: 0, name: '线上' }, { id: 1, name: '线下' }],
			scrollLeft: 0,
			list: [
				{
					id:1,
					pic: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
					name: 'XXX会务',
					tag: '线上',
					status: 0
				},
				{
					id:1,
					pic: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
					name: 'XXX会务',
					tag: '线上',
					status: 1
				},
				{
					id:1,
					pic: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
					name: 'XXX会务',
					tag: '线上',
					status: 2
				}
			],
			page: 1,
			nolist: false,
			loading: false,
			downList: [
				{
					url: '/pages/meeting/index/index',
					name: '会务报名'
				},
				{
					url: '/pages/meeting/mine/mine',
					name: '我的'
				}
			]
		};
	},
	methods: {
		tabSelect(e) {
			that.TabCur = e.currentTarget.dataset.id;
			that.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		tpinfo(e){
			let id=e.currentTarget.dataset.id;
			let url=that.TabCur==1?('./info/info?id='+id):('./info/info1?id='+id)
			uni.navigateTo({
				url
			})
		},
		getlist(e) {
			let page = that.page;
			that.loading = true;
			// that.$request
			// 	.request({
			// 		url: that.api.live.list,
			// 		data: {
			// 			keyword: that.keyword,
			// 			page: page,
			// 		}
			// 	})
			// 	.then(res => {
			// 		let list = res.list;
			// 		if (list.length > 0) {
			// 			that.list = that.list.concat(list);
			// 			that.page++;
			// 			that.nolist = false
			// 		} else {
			// 			that.nolist = true;
			// 		}
			// 		console.log(res);
			// 		uni.hideLoading();
			// 		uni.stopPullDownRefresh();
			// 		that.loading = false;
			// 	});
		}
	},
	onLoad() {
		that = this;
	}
};
</script>

<style>
page {
	background: #f3f3f3;
}
.header {
	position: fixed;
	width: 100%;
}

.list-view {
	padding: 0upx 25upx;
}
.list-view .li-view {
	align-items: center;
	display: flex;
	padding: 32upx;
	background: #fff;
	margin-bottom: 22upx;
}
.list-view .li-view .image {
	width: 180upx;
	height: 180upx;
	margin-right: 20upx;
	border-radius: 10upx;
}
.title-view {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 30upx;
	color: #2f2f2f;
}
.title-view .cu-tag {
	margin-right: 15upx;
	font-size: 24upx;
}
.text-view {
	width: 100%;
	font-size: 24upx;
	color: #898989;
	display: flex;
	align-items: center;
}
.text-view .icon {
	width: 30upx;
	height: 30upx;
	margin-right: 15upx;
}

.rigcode {
	width: 170upx;
	text-align: center;
	font-size: 22upx;
	line-height: 31upx;
	color: #4f74ff;
}
.rigcode image {
	width: 96upx;
	height: 96upx;
	margin-bottom: 10upx;
}
</style>

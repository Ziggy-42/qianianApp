<template>
	<view>
		<view class="header">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index == TabCur ? 'text-blue' : ''" v-for="(item, index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
						{{ item.name }}
					</view>
				</view>
			</scroll-view>
			<view class="tab2-view">
				<block v-for="(item, index) in tabtype" :key="index">
					<view class=" tab-btn  " :class="typeCur == item.id ? 'action' : ''" @tap="typeSelect" :data-id="item.id">{{ item.name }}</view>
				</block>
			</view>
		</view>
		<view style="height: 200upx;"></view>

		<view class="list-view">
			<block v-for="(item, index) in list" :key="index">
				<view class="li-view">
					<image class="image" lazy-load="true" :src="item.pic" mode="aspectFill"></image>
					<view class=" flex-sub flex-wrap  justify-between flex " style="height:180upx;">
						<view class="title-view">
							<view class="flex align-center ">
								<view class="cu-tag bg-blue radius">{{ item.tag }}</view>
								<view class="text-cut">{{ item.name }}</view>
							</view>
							<view class=" text-gray ">已结束</view>
						</view>
						<view class="text-view">
							<image class="icon" src="/static/icon/icon-time.png" mode="widthFix"></image>
							<text>2020-20-15 13:11</text>
						</view>
						<view class="text-view">
							<image class="icon" src="/static/icon/icon-time.png" mode="widthFix"></image>
							<text>上海市啊卡仕达卡仕达卡的</text>
						</view>
					</view>
				</view>
			</block>
		</view>
		
		<uni-load-more status="loading" v-if="loading" ></uni-load-more>
		
		<!--  -->
		<tabview :tablist="downList"  ></tabview>
	</view>
</template>

<script>
var that;
export default {
	components: {},
	data() {
		return {
			TabCur: 1,
			typeCur: 1,
			tabList: [{ id: 0, name: '未开始' }, { id: 1, name: '已结束' }],
			tabtype: [{ id: 0, name: '全部' }, { id: 1, name: '线上' }, { id: 2, name: '线下' }],
			scrollLeft: 0,
			list: [
				{
					pic: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
					name: 'XXX会务',
					tag: '线上'
				}
			],
			page:1,
			nolist:false,
			loading:false,
			downList:[{
				url:'/pages/meeting/index/index',
				name:'会务报名'
			},{
				url:'/pages/meeting/mine/mine',
				name:'我的'
			}]
		};
	},
	methods: {
		tabSelect(e) {
			that.TabCur = e.currentTarget.dataset.id;
			that.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		typeSelect(e) {
			that.typeCur = e.currentTarget.dataset.id;
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
		},
	},
	onLoad() {
		that = this;
	}
};
</script>

<style>
.header {
	position: fixed;
	width: 100%;
}
.tab2-view {
	display: flex;
	padding: 0upx 135upx;
	justify-content: space-between;
	height: 100upx;
	align-items: center;
}
.tab2-view .tab-btn {
	width: 123upx;
	height: 52upx;
	border-radius: 26upx;
	font-size: 28upx;
	line-height: 52upx;
	text-align: center;
	color: #9e9e9e;
}
.tab2-view .action {
	background-color: #d2eaff;
	color: #0088fe;
}
.list-view {
	padding: 0upx 25upx;
}
.list-view .li-view {
	align-items: flex-start;
	display: flex;
	padding: 32upx;
	background: #fff;
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
	font-size: 28upx;
}
.title-view .cu-tag {
	margin-right: 15upx;
	font-size: 24upx;
}
.text-view {
	width: 100%;
	font-size: 24upx;
	color: #535353;
	display: flex;
	align-items: center;
}
.text-view .icon {
	width: 30upx;
	height: 30upx;
	margin-right: 15upx;
}
</style>

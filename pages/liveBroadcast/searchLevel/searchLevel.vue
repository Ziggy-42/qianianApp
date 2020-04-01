<template>
	<view> 
		<view class="cu-bar search bg-white fixed">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索直播间ID或房间号" :value="keyword" confirm-type="search" @input="getsearch" @confirm="search"></input>
			</view>
			<view class="action"><button class="cu-btn  shadow-blur round zcolor-btn" @tap="search">搜索</button></view>
		</view>

		<view style="height: 130upx;"></view>
		<!-- 历史记录 -->
		<view class="search-local  margin-top "  v-if="localshow">
			<block v-if="local.length>0" >
				<view class="flex justify-between padding-sm ">
					<view>历史记录</view>
					<view @tap="del">
						<text class="cuIcon-delete"></text>
					</view>
				</view>
				<view class=" flex flex-wrap  ">
					<view class="s-local" v-for="(item, index) in local" :key="index" @click="searchList(index)">{{ local[index] }}</view>
				  
				</view>
			</block>
		</view>
		<block v-else >
			<block v-if="list.length>0" >
			<view class="list">
				<block v-for="(item, index) in list" :key="index">
					<view class="list-view" @tap="tpinfo" :data-index="index" :data-id="item.id" :data-status="item.status">
						<image class="list-viewbg" :src="item.cover" mode="aspectFill"></image>
						<view class="ven-view ">
							<view class="cu-capsule round ">
								<view class="cu-tag bg-poporetopo ">
									<text v-if="item.status == 0">未知</text>
									<text v-if="item.status == 1">直播中</text>
									<text v-if="item.status == 2">预告中</text>
									<text v-if="item.status == 3">关闭</text>
								</view>
								<view class="cu-tag bg-lokong" v-if="item.status == 1">{{ item.total_online ? item.total_online : '0' }}观看</view>
							</view>
							<view style="height: 300upx;"></view>
							<view class="text-cut text-white" style="margin-bottom: 30upx;font-size: 26upx;">{{ item.title }}</view>
			
							<view class="ven-down justify-between">
								<view class="flex align-center">
									<view class="ven-down-avatar  cu-avatar round" :style="[{ backgroundImage: 'url(' + item.anchor.avatar + ')' }]"></view>
									<view class="ven-down-name text-cut ">{{ item.anchor.name }}</view>
								</view> 
								<view  class="flex align-center">
									<view class="ven-down-xin"><image src="/static/liveBroadcast/dianzan.png" mode="widthFix"></image></view>
									<view class="ven-down-num">{{ item.like }}</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			</block>
		</block> 

		<uni-load-more status="loading" v-if="loading" ></uni-load-more>
		<nolist type="1" :text="'没有搜索到关于“' + keyword + '”的直播'" v-if="nolist && keyword"></nolist>
 
	</view>
</template>

<script>
var that;
var arr = [];
export default {
	data() {
		return {
			loading:'',//loading,more,noMore
			CustomBar: this.CustomBar,
			page: 1,
			list: [],
			keyword: '',
			nolist: false,
			local: [],
			localshow: true,
			modal: false,
			page_count:'',
			row_count:''
		};
	},
	methods: { 
		getlist(e) {
			let page = that.page;
			that.loading = true;
			that.$request
				.request({
					url: that.api.live.list, 
					data: { 
						keyword: that.keyword,
						page: page, 
					}
				})
				.then(res => {
					let list = res.list; 
					if (list.length > 0) {
						that.list = that.list.concat(list);
						that.page++; 
						that.nolist = false
					} else {
						that.nolist = true;
					} 
					console.log(res);
					uni.hideLoading();
					uni.stopPullDownRefresh();
					that.loading = false;
				});
		},
		del() {
			that.local = [];
			uni.setStorageSync('locallevel', that.local); 
		}, 
		//获取显示历史记录
		fo() {
			var local = uni.getStorageSync('locallevel');
			// 历史记录倒序
			if (local) {
				local.reverse();
				that.local = local;
				that.localshow = true;
			} else {
				uni.setStorageSync('locallevel', []);
			}
		},
		searchList(e) {
			//console.log(this.local[e])
			that.keyword = that.local[e];
			that.page = 1;
			that.list = [];
			that.getlist();
			that.nolist = false;
			// 隐藏历史记录
			that.localshow = false;
		},
		getsearch(e) {
			that.keyword = e.detail.value;
			that.nolist=false;
			if (that.keyword.length == 0){
				that.localshow = true;
				that.fo();
			}
		},
		search(e) {
			that.page = 1;
			that.list = [];
			that.nolist = false;
			that.getlist();  
			that.localshow = false;
			var val =that.keyword; 
			val = val?val.trim():val;
			if (val!= '') {
				if (uni.getStorageSync('locallevel') != []) {
					arr = uni.getStorageSync('locallevel');
					// 不重复添加值
					if (arr.indexOf(val) == -1) {
						arr.push(val);
					}
					//最多显示15条历史记录
					if (arr.length > 15) {
						arr.shift();
					}
				} else {
					// 不重复添加值
					if (arr.indexOf(val) == -1) {
						arr.push(val);
					}
				}
			}
			uni.setStorageSync('locallevel', arr);
			that.local=arr; 
		},
		tpinfo(e) {
			let id = e.currentTarget.dataset.id;
			let status = e.currentTarget.dataset.status;
			let url = '';
			status == 2 ? (url = '/pages/liveBroadcast/yugaoInfo/yugaoInfo?id=' + id) : (url = '/pages/liveBroadcast/livePLayer/player/player?id=' + id);
			uni.navigateTo({
				url: url
			});
		},
	},

	onLoad() {
		that = this;
		// 显示历史记录
		that.fo();
	},
	onReachBottom() {
		that.getlist();
	}
};
</script>

<style>
page {
	background: #F0F0F0;
}

.text-cut {
	-o-text-overflow: ellipsis;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.list {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 30upx;
}
.list-view {
	width: 335upx;
	height: 510upx;
	background-color: #eeeeee;
	border-radius: 16upx;
	overflow: hidden;
	position: relative;
	margin-bottom: 20upx;
}
.ven-view {
	position: absolute;
	top: 0upx;
	width: 100%;
	height: 100%;
	padding: 15upx;
	background: rgba(0, 0, 0, 0.1);
}
.list-viewbg {
	width: 100%;
	height: 100%;
}
.ven-view .cu-capsule {
	font-size: 21upx;
}
.ven-down {
	display: flex;
	align-items: center;
}
.ven-down-avatar {
	width: 64upx;
	height: 64upx;
	margin-right: 10upx;
}
.ven-down-name {
	width: 100upx;
	font-size: 24upx;
	color: #fffefe;
	/* border: solid #000 1upx; */
}
.ven-down-xin {
	width: 40upx;
	height: 40upx;
	margin-right: 10upx;
}
.ven-down-num {
	width: 60upx;
	font-size: 23upx;
	color: #fffefe;
	/* border: solid #000 1upx; */
} 
.s-local { 
	line-height: 46upx;
	font-size: 26upx;
	height: 46upx;
	margin: 15upx;
	padding: 0 15upx;
	border-radius: 10upx;
	background: #ddd;
	
}

.zhan {
	clear: both;
}
</style>

<template>
	<view>
		<view class="goodslist1">
			<block v-for="(item, index) in list" :key="index">
				<view class="goods-view" @tap="tpinfo" :data-id="item.id" :data-index="index" >
					<view class="goods-img"><image :src="item.cover" style="width: 100%; height: 100%;" mode="aspectFill"></image></view>
					<view class="goods-right">
						<view class="goods-top-view text-cut">
							<view class="title-view text-cut">{{ item.title }}</view>
							<view @tap.stop="del" :data-id="item.id" :data-index="index" class="cuIcon-delete"></view>
						</view>
						<view class="zb-time">直播时间：{{ item.time }}</view>
						<view class="down-view">
							倒计时：
							<uni-countdown color="#FFFFFF" background-color="#b701e5" border-color="#00B26A" :timestamp="item.play_time" :show-day="true"></uni-countdown>
						</view>
					</view>
				</view>
			</block>
			<nomore v-if="nomore"></nomore>
			<nolist type="0" text="暂无直播预告" v-if="nolist"></nolist>
		</view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			list: [],
			nomore: false,
			nolist: false,
			type: 0,
			page: 1
		};
	},
	methods: {
		del(e) {
			let id = e.currentTarget.dataset.id; 
			let index=e.currentTarget.dataset.index;
			uni.showModal({
				title: '提示',
				content: '确定要删除',
				cancelText: '取消',
				confirmText: '确定',
				success(res) {
					if (res.confirm) {
						that.$request
							.request({
								url: that.api.live.del_notice_live,
								data: {
									id: id
								},
								Toast:'请稍等...',
								method:"get"
							})
							.then(res => { 
								that.list.splice(index,1)
								that.$alertok("删除成功！");
								
							});
					}
				}
			});
		},
		getlist() {
			var that = this;
			that.$request
				.request({
					url: that.api.live.my_live_notice,
					method: 'GET',
					data: {
						page: that.page
					}
				})
				.then(res => { 
					if (res.list.length) {
						for (var i = 0; i < res.list.length; i++) {
							var time = res.list[i].play_time;
							var newDate = new Date(time);
							var newDateTime = that.happenTimeFun(newDate);
							res.list[i].time = newDateTime;
						}
					}
					console.log(res);
					if (that.page == 1) {
						that.list = res.list;
						that.page = that.page + 1;
					}else{
						if (res.list.length > 0) {
							if (that.page != 1) {
								that.list = that.list.concat(res.list);
							}
							that.page = that.page + 1;
						} else {
							if (that.page != 1) {
								if (!that.nomore) {
									that.nomore = true;
								}
							} else {
								that.nolist = true;
							}
						}
					}
					
				});
		},
		happenTimeFun(num) {
			//时间戳数据处理
			var num = num * 1000;
			let date = new Date(num);
			//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			let y = date.getFullYear();
			let MM = date.getMonth() + 1;
			MM = MM < 10 ? '0' + MM : MM; //月补0
			let d = date.getDate();
			d = d < 10 ? '0' + d : d; //天补0
			let h = date.getHours();
			h = h < 10 ? '0' + h : h; //小时补0
			let m = date.getMinutes();
			m = m < 10 ? '0' + m : m; //分钟补0
			let s = date.getSeconds();
			s = s < 10 ? '0' + s : s; //秒补0
			return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
		},
		tpinfo(e) { 
			uni.navigateTo({
				url: '../yugaoInfo/yugaoInfo?id=' + e.currentTarget.dataset.id
			});
		}
	},
	onLoad() {
	 that = this;
		that.getlist();
	}, 
	onReachBottom() { 
		that.getlist();
	},
	onPullDownRefresh() {
		that.page=1;
		that.list=[];
		that.getlist();
	}
};
</script>

<style> 

.goodslist1 .goods-view {
	padding: 40upx 35upx 40upx 25upx;
}

.goodslist1 .goods-img {
	width: 160upx;
	height: 160upx;
	border-radius: 10upx;
	overflow: hidden;
	margin-right: 25upx;
}

.goods-top-view {
	width: 450upx;
	display: flex;
	justify-content: space-between;
}

.goods-top-view .cuIcon-delete {
	font-size: 42upx;
}

.goods-top-view .title-view {
	font-size: 28upx;
	color: #313131;
}

.down-view {
	display: flex;
	align-items: center;
	font-size: 25upx;
	color: #828282;
}

.zb-time {
	font-size: 25upx;
	color: #828282;
	margin: 20rpx 0rpx;
}
</style>

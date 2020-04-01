<template>
	<view class="page bg-img" :style="[{ backgroundImage: 'url(' + bg_img + ')' }]">
		<scroll-view style="height: 100%; width: 100%; background-color: rgba(0, 0, 0, 0.2)" scroll-y="true">
			<form @submit="formSubmit" @reset="formReset">
				<view class="w-bg">
					<cu-custom bgColor="bg-kong" :isBack="true"><block slot="content">创建直播间</block></cu-custom>
					<view style="height: 50upx;"></view>
					<view>
						<view class="fm-view flex align-center" :style="[{ backgroundImage: 'url(' + upfm + ')' }]">
							<view @tap="ViewImage" :data-url="cover" v-if="cover" style="width: 100%;height: 100%;position: relative;">
								<image :src="cover" mode="aspectFill" style="width: 100%;height: 100%;"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" data-name="cover" style="position: absolute;right: 0;"><text class="cuIcon-close"></text></view>
							</view>
							<view @tap="ChooseImage" data-name="cover" v-if="!cover" style="width: 100%;">
								<view class="cuIcon-add"></view>
								<view class="">封面</view>
							</view>
						</view>
					</view>
					<view class="live-title"><input type="text" name="title" placeholder="直播标题" placeholder-class="liveTplder " /></view>
					<view style="height: 170upx;"></view>
					<view class="" v-if="!teaser">
						<view class="w-view" @tap="toadd">
							<view>添加商品</view>
							<view>
								{{ anchor_goods.length + goods.length }}件商品
								<text class="cuIcon-right"></text>
							</view>
						</view>
						<view class="w-view">
							<picker style="width: 100%;" @change="bindPickerChange" :value="index" :range="styles" range-key="name">
								<view class=" flex justify-between align-center ">
									<view>选择播放方式</view>
									<view>
										{{ styles[index] ? styles[index].name : '请选择' }}
										<text class="cuIcon-right"></text>
									</view>
								</view>
							</picker>
						</view>

						<view class="w-view" v-if="print">
							<picker style="width: 100%;" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class=" flex justify-between align-center ">
									<view>选择直播日期</view>
									<view>
										{{ date ? date : '请选择' }}
										<text class="cuIcon-right"></text>
									</view>
								</view>
							</picker>
						</view>

						<view class="w-view" v-if="print">
							<picker style="width: 100%;" mode="time" :start="startTime" @change="bindTimeChange" :value="time">
								<view class=" flex justify-between align-center ">
									<view>选择直播时间</view>
									<view>
										{{ time ? time : '请选择' }}
										<text class="cuIcon-right"></text>
									</view>
								</view>
							</picker>
						</view>

						<view class="p-view">
							<view class="flex align-center" @click="printl" :data-type="print == true ? 'false' : 'true'">
								<text class="cuIcon-roundcheckfill" v-if="print"></text>
								<view class="radio" v-else></view>
								<text style="margin-left: 20upx;">创建预告</text>
							</view>
						</view>
					</view>

					<!-- 预告创建成功后 -->
					<block v-if="teaser">
						<view class="">
							<view class="text-center text-white flex align-center justify-center" style="margin-bottom: 43upx;">
								<image src="/static/liveBroadcast/clock.png" style="width: 38upx;height: 42upx;margin-right: 20upx;font-size: 30upx;"></image>
								<view>{{ showtime }}</view>
							</view>
							<view class="text-center text-white flex align-center justify-center" style="margin-bottom: 200upx;">
								<view style="margin-right: 20upx;font-size: 30upx;">距离直播开始还剩</view>
								<uni-countdown color="#212121" background-color="#fff" splitorColor="#FFF" :timestamp="datetime" :show-day="true"></uni-countdown>
							</view>
						</view>
						<view class="cbtn"><button class="cu-btn" @tap="topush">开始直播</button></view>
						<view v-if="teaser" class="cbtn"><button class="cu-btn" @tap="delteaser">删除预约</button></view>
					</block>
					<block v-else>
						<view class="cbtn">
							<button class="cu-btn" form-type="submit">
								<block v-if="print">创建预约</block>
								<block v-else>开始直播</block>
							</button>
						</view>
					</block>
					<view style=" height:100upx;"></view>
				</view>
			</form>
		</scroll-view>
	</view>
</template>

<script>
let that;
export default {
	data() {
		return {
			bg_img: 'https://qf.huamais.com/addons/zjhj_mall/core/web/uploads/image/store_1/7bf76c1a5a6710e2400b539d409054901afab1f1.jpg',
			upfm: '',
			print: false,
			cover: '',
			styles: [
				{
					type: 'vertical',
					name: '竖屏'
				},
				{
					type: 'horizontal',
					name: '横屏'
				}
			],
			index: 0,
			time: '',
			date: '',
			teaser: false,
			datetime: '',
			showtime: '',
			anchor_goods: [],
			goods: [],
			id: '',
			printdayTime: '',
			startDate: '',
			endDate: '',
			startTime: ''
		};
	},
	methods: {
		delteaser(e) {
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
									id: that.id
								},
								Toast: '请稍等...',
								method: 'get'
							})
							.then(res => {
								that.$alertok('删除成功！');
								that.teaser = '';
							});
					}
				}
			});
		},
		bindTimeChange: function(e) {
			this.time = e.target.value;
		},
		// 上传图片
		async ChooseImage(e) {
			let name = e.currentTarget.dataset.name;
			let uploader = new this.$Uploader();
			let path_arr = await uploader.choose_and_upload(1);
			console.log('图片', path_arr);
			that[name] = path_arr[0];
			// this.imgList = this.imgList.concat(path_arr);
		},
		DelImg(e) {
			let name = e.currentTarget.dataset.name;
			uni.showModal({
				title: '提示',
				content: '确定要删除该图片吗？',
				cancelText: '取消',
				confirmText: '确定',
				success(res) {
					if (res.confirm) {
						that[name] = '';
					}
				}
			});
		},
		printl(e) {
			if (e.currentTarget.dataset.type === 'false') {
				that.print = false;
			} else if (e.currentTarget.dataset.type === 'true') {
				that.print = true;
			}
			console.log(that.print);
		},
		bindPickerChange(e) {
			var that = this;
			console.log(e.detail.value);
			that.index = e.target.value;
			console.log(that.index);
		},
		bindDateChange(e) {
			this.date = e.target.value;
			that.printdayTime = Date.parse(new Date(e.target.value));
			let startDate = Date.parse(new Date(that.startDate));
			if (that.printdayTime == startDate) {
				let d = that.$zax.formatDate(new Date());
				let hour = d.hour < 10 ? '0' + d.hour : d.hour;
				let minute = d.minute < 10 ? '0' + d.minute : d.minute;
				that.startTime = hour + ':' + minute;
			} else if (that.printdayTime == startDate) {
			} else {
				that.startTime = '00:00';
			}
			console.log(that.startTime);
		},
		toadd() {
			uni.navigateTo({
				url: '/pages/anchor/goods/storeroom/addlive/addlive'
			});
		},
		formSubmit(e) {
			var title = e.detail.value.title;
			var cover = that.cover;
			var print = that.print;
			var index = that.index;
			var goods = that.goods;
			var anchor_goods = that.anchor_goods;
			goods = goods.join();
			anchor_goods = anchor_goods.join();
			if (!cover) {
				that.$alert('请上传封面');
				return false;
			}
			if (!title) {
				that.$alert('请填写直播标题');
				return false;
			}
			if (print) {
				if (that.date == '') {
					that.$alert('请选择直播日期');
					return false;
				} else if (that.time == '') {
					that.$alert('请选择直播时间');
					return false;
				}
				that.teaser = true;
				var time = that.time;
				var date = that.date;
				var datetime = date + ' ' + time;
				that.showtime = date + ' ' + time;
				 // datetime=JSON.toString(datetime);
				console.log("创建时间：",datetime)
				console.log(new Date(datetime.replace(/-/g, "/")).getTime());
				var datetime1 = new Date(datetime.replace(/-/g, "/")).getTime();
				that.datetime = datetime1 / 1000;
				console.log(that.datetime);
			}
			that.$request
				.request({
					url: that.api.live.post,
					method: 'post',
					data: {
						title: title,
						cover: cover,
						type: print ? 2 : 1,
						orientation: that.styles[that.index].type,
						goods: goods,
						anchor_goods: anchor_goods,
						play_time: that.datetime
					},
					Toast: '正在提交'
				})
				.then(res => {
					console.log(res);
					that.id = res.id;
					if (!print) {
						that.topush();
					}
					uni.removeStorageSync('goods');
					uni.removeStorageSync('anchor_goods');
					uni.hideLoading();
				});
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			if (type === 'start') {
				year = year;
			} else if (type === 'end') {
				day = year + 7;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		topush() {
			uni.redirectTo({
				url: '/pages/liveBroadcast/livePusher/pusher/pusher?id=' + that.id
			});
			that.$zax.startLive(that.id);
		}
	},
	onLoad() {
		that = this;
		that.startDate = that.getDate('start');
		that.endDate = that.getDate('end');
	},
	onShow() {
		var that = this;
		that.anchor_goods = uni.getStorageSync('anchor_goods') ? uni.getStorageSync('anchor_goods') : [];
		that.goods = uni.getStorageSync('goods') ? uni.getStorageSync('goods') : [];
	}
};
</script>

<style>
.page {
	height: 100vh;
}

.w-bg {
	min-height: 100%;
	background-color: rgba(0, 0, 0, 0.2);
}

.fm-view {
	width: 268upx;
	height: 268upx;
	background-color: rgba(255, 255, 255, 0.4);
	border-radius: 14upx;
	margin: auto;
	text-align: center;
	color: #fff;
	/* padding-top: 80upx; */
	font-size: 32upx;
}

.fm-view .cuIcon-add {
	font-size: 70upx;
	font-weight: 550;
	margin-bottom: 20upx;
}

.live-title {
	width: 426rpx;
	height: 80rpx;
	border-radius: 1rpx;
	margin: auto;
	border-bottom: solid 1upx #fff;
	color: #fff;
	display: flex;
	align-items: center;
	margin-top: 20upx;
}

.live-title input {
	width: 100%;
	font-size: 34rpx;
	text-align: center;
}

.liveTplder {
	font-size: 34rpx;
	color: #c5c5c5;
	text-align: center;
}

.w-view {
	width: 532rpx;
	height: 82rpx;
	background-color: rgba(255, 255, 255, 0.4);
	border-radius: 41rpx;
	margin: auto;
	padding: 35upx;
	display: flex;
	align-items: center;
	font-size: 28rpx;
	color: #ffffff;
	justify-content: space-between;
	margin-bottom: 25upx;
}

.p-view {
	display: flex;
	align-items: center;
	line-height: 90upx;
	font-size: 28rpx;
	color: #ffffff;
	width: 532rpx;
	margin: auto;
	padding: 0upx 24upx;
}

.p-view .cuIcon-roundcheckfill {
	font-size: 37upx;
}

.p-view .radio {
	border-radius: 100upx;
	width: 30rpx;
	height: 30rpx;
	border: solid 2rpx #ffffff;
}

.cbtn {
	text-align: center;
	margin-top: 50upx;
}

.cbtn .cu-btn {
	width: 342rpx;
	height: 72rpx;
	background-color: #b701e5;
	border-radius: 36rpx;
	font-size: 28rpx;
	color: #ffffff;
}

.fonttime {
	color: #212121;
	padding: 7upx 5upx;
	font-size: 22upx;
}
</style>

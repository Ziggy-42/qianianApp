<template>
	<view>
		<view style="position: relative;">
			<image :src="info.detail.cover" mode="widthFix" style="width: 100%;"></image>
			<image class="share-wicon" @tap="showModel" data-name="share" src="/static/icon/icon-share.png" mode="widthFix"></image>
		</view>
		<view class="title-view">
			<view class="flex justify-between">
				<view class="v-title">{{ info.detail.title }}</view>
			</view>
			<view class="v-time" style="margin-top: 25upx;">直播时间：{{ timestamp }}</view>
		</view>
		<view class="kong"></view> 
		<view class="kong"></view>
		<view class="padding-air bg-white" style="padding: 20upx 0upx;">
			<view class="flex justify-center align-center ">
				<text class="lain"></text>
				<view style="font-size: 28upx;">直播商品</view>
				<text class="lain"></text>
			</view>
		</view>

		<view class="goodslist3">
			<block v-for="(item, index) in anchor_goods" :key="index">
				<view class="goods-view" @tap="tpinfo" :data-id="item.id" data-type="0">
					<view class="goods-img"><image :src="item.pic_url ? item.pic_url : item.cover" mode="aspectFill" lazy-load="true"></image></view>
					<view class="goods-down text-left">
						<view class="goodsr">
							<view class="goods-name text-cut2">{{ item.name }}</view>
						</view>
						<view class="goods-dview ">
							<view class="goods-price" style="color: #a500d3 !important;">￥{{ item.price }}</view>
							<view><button class="cu-btn buy-btn">查看详情</button></view>
						</view>
					</view>
				</view>
			</block>
			<block v-for="(item, index) in goods" :key="index">
				<view class="goods-view" @tap="tpinfo" :data-id="item.id" data-type="1">
					<view class="goods-img"><image :src="item.pic_url ? item.pic_url : item.cover_pic" mode="aspectFill" lazy-load="true"></image></view>
					<view class="goods-down text-left">
						<view class="goodsr">
							<view class="goods-name text-cut2">{{ item.name }}</view>
						</view>
						<view class="goods-dview ">
							<view class="goods-price" style="color: #a500d3 !important;">￥{{ item.price }}</view>
							<view><button class="cu-btn buy-btn">查看详情</button></view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view style="height: 120upx;"></view>
		<view class="foot justify-between ">
			<view class="flex align-center " >
				距离直播开始还剩：
				<uni-countdown color="#FFFFFF" background-color="#b701e5" splitorColor="#b701e5" border-color="#00B26A" sty="width:35rpx;height:35rpx;line-height:35rpx" :timestamp="info.detail.play_time" :show-day="true"></uni-countdown>
			</view>
			<view class="" v-if="userinfo.id==info.detail.user_id" >
				<button class="cu-btn zcolor-btn " @tap="action" >开始</button>
			</view>
		</view>

		<view class="cu-modal bottom-modal" :class="modalName == 'share' ? 'show' : ''" @tap="hidden">
			<view class="cu-dialog" @tap.stop="">
				<view class="share-d-view">
					<button class="share-btn" plain="true" open-type="share">
						<image src="/static/liveBroadcast/icon-wx.png" mode="widthFix"></image>
						<view>分享微信好友</view>
					</button>
					<button class="share-btn" plain="true" @tap="hua" data-name="sharehb">
						<image src="/static/liveBroadcast/icon-pot.png" mode="widthFix"></image>
						<view>生成海报</view>
					</button>
				</view>
			</view>
		</view>

		<view class="cu-modal Modal" :class="modalName == 'sharehb' ? 'show' : ''" @tap="hidden">
			<view class="cu-dialog haibao" @tap.stop="">
				<view class="card-view ">
					<view class="text-center"><image class="bg-img" :src="bgimg"></image></view>
					<view class="card-view-down">
						<view class="flex align-center">
							<view class="cu-avatar round" :style="[{ backgroundImage: 'url(' + info.detail.anchor.avatar + ')' }]"></view>
							<view class=" text-left ">
								<view class="flex align-center  " style="font-size: 30upx;color: #2f2f2f;">
									{{ info.detail.anchor.name }}
									<view class="zcolor-btn  tar-view ">
										<text v-if="info.detail.status == 0">未知</text>
										<text v-if="info.detail.status == 1">直播中</text>
										<text v-if="info.detail.status == 2">预告中</text>
										<text v-if="info.detail.status == 3">关闭</text>
									</view>
								</view>
								<view style="font-size: 25upx; color: #a6a6a6; margin-top: 20upx;">ID：{{ info.detail.anchor.user_id }}</view>
							</view>
						</view>
						<view><image class="qrcode" :src="info.detail.share_qrcode"></image></view>
					</view>
					<view>
						<button class="cu-btn zcolor-btn sevenhb " @tap="downloadFile">
							<block v-if="downimg">保存图片</block>
							<block v-else>正在生成...</block>
						</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="canvas-view"><canvas style="width:330px; height: 420px;margin: auto;" canvas-id="firstCanvas"></canvas></view>
	</view>
</template>

<script>
var that;
let time;
export default {
	data() {
		return {
			bg: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg',
			list: [],
			id: '',
			info: '',
			anchor_goods: [],
			goods: [],
			timestamp: '', 
			modalName: '',
			path: {
				avatar: '',
				qrQrcode: '',
				bgimg: ''
			},
			num: 0,
			bgimg: '',
			qrQrcode: '',
			downimg:'',
			userinfo:''
		};
	},
	methods: { 
		action(){
			uni.redirectTo({
				url: '/pages/liveBroadcast/livePusher/pusher/pusher?id=' +that.id
			});
			that.$zax.startLive(that.id);
		},
		hidden() {
			that.modalName = '';
		},
		showModel(e) {
			that.modalName = e.currentTarget.dataset.name;
		},
		tpinfo(e) {
			let id = e.currentTarget.dataset.id;
			let type = e.currentTarget.dataset.type;
			if (type == 0) {
				uni.navigateTo({
					url: '/pages/anchor/goods/goodsInfo/goodsInfo?id=' + id + '&room_id=' + that.info.detail.id + '&anchor_id=' + that.info.detail.anchor.user_id
				});
			} else {
				uni.navigateTo({
					url: '/pages/goods/goodsInfo/goodsInfo?gid=' + id + '&room_id=' + that.info.detail.id + '&anchor_id=' + that.info.detail.anchor.user_id
				});
			}
		},
		getdetail() {
			that.$request
				.request({
					url: that.api.live.detail,
					data: {
						id: that.id
					}
				})
				.then(res => {
					console.log(res);
					that.info = res;
					that.goods = res.goods;
					that.anchor_goods = res.anchor_goods;
					let time = that.$zax.formatDate(res.detail.play_time * 1000);
					that.timestamp = time.year + '-' + time.month + '-' + time.date + ' ' + time.hour + ':' + time.date + ':' + time.minute;
					console.log(time);
					console.log(that.timestamp);
					that.thaibao();
				});
		},

		getImageInfo(name, img) {
			uni.getImageInfo({
				src: img,
				success: function(res) {
					console.log(res.path);
					that.path[name] = res.path;
					that.num++;
				},
				fail(res) {
					console.log('失败：' + name, res);
				}
			});
		},
		
		thaibao() {
			that.bgimg = that.info.detail.cover;
			that.$zax.qrQrcode().then(res => {
				that.qrQrcode = res;
				that.getImageInfo('avatar', that.info.detail.anchor.avatar);
				that.getImageInfo('qrQrcode', that.info.detail.share_qrcode);
				that.getImageInfo('bgimg', that.bgimg);
				// that.hua();
			});
		},
		hua() {
			time = setInterval(function() {
				if (that.num == 3) {
					console.log('画');
					that.toDrawCanvas();
					clearInterval(time);
				}
			}, 100);
			that.modalName = 'sharehb';
		},
		toDrawCanvas() {
			clearInterval(time);
			console.log('开始绘图');
			let rem = that.rem;
			var context = uni.createCanvasContext('firstCanvas');
		
			//上半部分背景
			that.drawRoundedRect(context, 0, 0, 330, 421, 12, false, false);
			that.drawRoundedRect(context, 163, 342, 45, 17, 9, true, false);
			context.font = '11px bold 黑体';
			context.fillStyle = '#FFF';
			context.fillStyle = '#FFF';
			context.textBaseline = 'middle';
			let status = that.info.detail.status;
			let title = '';
			if (status == 0) {
				title = '未知';
			} else if (status == 1) {
				title = '直播中';
			} else if (status == 3) {
				title = '预告中';
			} else if (status == 4) {
				title = '关闭';
			}
			context.textAlign = 'center';
			context.fillText(title, 163 + 45 / 2, 352);
			context.drawImage(that.path.bgimg, 15, 17, 300, 300);
			// 圆形头像
			context.textAlign = 'left';
			context.save();
			context.beginPath(); //开始绘制
			//先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
			context.arc(60 / 2 + 25, 60 / 2 + 339, 60 / 2, 0, Math.PI * 2, false);
			context.strokeStyle = 'rgba(255, 255, 255, 0)';
			context.stroke();
			context.clip();
			context.drawImage(that.path.avatar, 25, 339, 60, 60);
			context.restore();
			context.beginPath();
			// 用户名
			context.font = '15px bold 黑体';
			context.fillStyle = '#2f2f2f';
			context.textBaseline = 'middle';
			context.fillText(that.info.detail.anchor.name, 97, 354);
			// 推荐码
			context.font = '13px bold 黑体';
			context.fillStyle = '#a6a6a6';
			context.textBaseline = 'middle';
			context.fillText('ID：' + that.info.detail.anchor.user_id, 97, 382);
			// 二维码
			context.drawImage(that.path.qrQrcode, 236, 341, 61, 61); 
			context.fill(); 
			context.draw(
				true,
				setTimeout(() => {
					that.toclick();
				}, 3000)
			);
		},

		drawText(context, t, x, y, w, color, size) {
			var chr = t.split('');
			var temp = '';
			var row = [];
			context.font = size ? '19px  bold 黑体' : '15px  bold 黑体';
			context.fillStyle = color ? color : '#e80408';
			context.textBaseline = 'middle';

			for (var a = 0; a < chr.length; a++) {
				if (context.measureText(temp).width < w && context.measureText(temp + chr[a]).width <= w) {
					temp += chr[a];
				} else {
					row.push(temp);
					temp = chr[a];
				}
			}
			row.push(temp);

			for (var b = 0; b < row.length; b++) {
				context.fillText(row[b], x, y + (b + 1) * 24);
			}
		},
		drawRoundedRect(ctx, x, y, width, height, r, fill, stroke) {
			ctx.save();
			ctx.beginPath(); // draw top and top right corner
			ctx.moveTo(x + r, y);
			ctx.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner
			ctx.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner
			ctx.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner
			ctx.arcTo(x, y, x + r, y, r);
			if (fill) {
				ctx.fillStyle = 'rgba(255, 255, 255, 0)';
				ctx.fill();
			} else {
				ctx.fillStyle = 'white';
				ctx.fill();
			}
			if (stroke) {
				ctx.stroke();
			}
			ctx.restore();
		},
		toclick() {
			uni.canvasToTempFilePath({
				canvasId: 'firstCanvas',
				success: function(res) {
					console.log(res);
					that.downimg = res.tempFilePath;
					uni.setStorageSync('shareImg', that.downimg);
				},
				fail(res) {
					console.log(res);
				}
			});
		},
		downloadFile() {
			if (!that.downimg) {
				return;
			}
			uni.showLoading({
				title: '正在保存！',
				mask: true
			});
			uni.saveImageToPhotosAlbum({
				filePath: that.downimg,
				success: function() {
					uni.showToast({
						title: '保存成功！'
					});
				},
				fail() {
					uni.hideLoading();
				}
			});
		}
	},
	onLoad(option) {
		that = this;
		console.log(option.id);
		that.id = option.id ? option.id : 59;
		that.userinfo=uni.getStorageSync("userinfo")
		that.getdetail();
	},
	onShareAppMessage() {
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target);
		}
		return {
			title: '自定义转发标题',
			imageUrl: '',
			path: '/page/user?id=123'
		};
	}
};
</script>

<style> 
.video {
	width: 100%;
	height: 768upx;
}

.title-view {
	padding: 40upx;
	background: #fff;
}

.vip-view {
	width: 698upx;
	height: 121upx;
	background-image: linear-gradient(86deg, #9421cf 0%, #9f78ee 100%);
	border-radius: 14upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: auto;
	font-size: 28upx;
	padding: 0upx 35upx;
	color: #fff;
}

.vip-view .cu-btn {
	width: 160upx;
	height: 51upx;
	background-color: #ffffff;
	border-radius: 26upx;
	font-size: 25upx;
	color: #a500d3;
}

.foot {
	width: 100%;
	position: fixed;
	bottom: 0;
	height: 100upx;
	display: flex;
	background: #fff;
	align-items: center;
	padding: 0upx 40upx;
	border-top: solid #EEE 1upx;
}

.foot .cu-btn {  
	width: auto;
	font-size: 28upx;
	height: 65rpx;
	background-image: linear-gradient(-60deg, #9329ff 0%, #b000dd 100%);
	border-radius: 38upx;
	color: #fff; 
}

.list {
	height: 195upx;
	padding: 0upx 50upx 0upx 30upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #fffefe;
	border-bottom: solid #eeeeee 1upx;
}

.list-left {
	display: flex;
	align-items: center;
}

.list-img {
	width: 244upx;
	height: 131upx;
	background-color: #eeeeee;
	border-radius: 12upx;
	overflow: hidden;
	margin-right: 27upx;
}

.list-img image {
	width: 100%;
	height: 100%;
}

.list-right {
	font-size: 28upx;
	color: #a500d3;
}

.list-c {
	width: 400upx;
	font-size: 27upx;
	color: #292929;
}

.time {
	font-size: 24upx;
	color: #a8a8a8;
	margin-left: 24upx;
}

.list-name {
	margin-top: 38upx;
}

.goodslist3 {
	padding: 0upx;
	background: #fff;
}
.goods-name {
	font-size: 28upx;
	color: #2c2c2c;
}
.goodsr {
	height: 100upx;
}
.price-color {
	font-size: 29upx;
}
.goodslist3 .goods-view {
	margin-bottom: 0upx;
}
.buy-btn {
	height: 54upx;
	background-image: linear-gradient(-60deg, #a44cff 0%, #c51cf0 100%);
	border-radius: 27upx;
	font-size: 25upx;
	color: #ffffff;
}
.goods-down {
	width: 500upx;
}
.goods-dview {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.share-wicon {
	width: 60upx;
	height: 60upx;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 100upx;
	position: absolute;
	right: 38upx;
	top: 32upx;
}
.share-wicon image {
	width: 100%;
	height: 100%;
}
.vtitle {
	font-size: 32upx;
	color: #1f1f1f;
	font-weight: 550;
}
.v-time {
	font-size: 28upx;
	color: #7c7c7c;
}
 
</style>

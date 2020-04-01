<template>
	<view>
		<!-- <canvas style="width:330px; height: 420px;margin: auto;" canvas-id="firstCanvas"></canvas> -->
		<view class="canvas-view">
			<canvas style="width:330px; height: 420px;margin: auto;" canvas-id="firstCanvas"></canvas>
		</view>

		<view class="card-view">
			<view class="text-center"><image class="bg-img" :src="bgimg"></image></view>
			<view class="card-view-down">
				<view class="flex align-center">
					<view class="cu-avatar round" :style="[{ backgroundImage: 'url(' + userinfo.avatar_url + ')' }]"></view>
					<view>
						<view style="font-size: 30rpx;color: #2f2f2f;" >{{ userinfo.nickname }}</view>
						<!-- <view style="font-size: 25rpx; color: #a6a6a6; margin-top: 20rpx;">推荐码：{{ userinfo.id }}</view> -->
					</view>
				</view>
				<view><image class="qrcode" :src="qrQrcode"></image></view>
			</view>
		</view>

		<view class="text-center">
			<button class="cu-btn zcolor-btn" @click="downloadFile">
				<block v-if="downimg">保存图片</block>
				<block v-else>正在生成...</block>
			</button>
			<button class="cu-btn zcolor-btn" open-type="share">分享微信好友</button>
		</view>
	</view>
</template>

<script>
var that;
var time;
export default {
	data() {
		return {
			url: '',
			userinfo: {},
			qrQrcode: '',
			bgimg: '',
			path: {
				avatar: '',
				qrQrcode: '',
				bgimg: ''
			},
			rem: '',
			downimg: '',
			num: 0
		};
	},
	onLoad() {
		that = this;
		that.userinfo = uni.getStorageSync('userinfo'); 
		that.bgimg = uni.getStorageSync('config').share_cover; 
		that.$zax.qrQrcode().then(res => {
		that.qrQrcode = res; 
		that.getImageInfo('avatar', that.userinfo.avatar_url);
			that.getImageInfo('qrQrcode', that.qrQrcode);
			that.getImageInfo('bgimg', that.bgimg);
			that.hua();
		});
	},
	onShow() {
		that.downimg = uni.getStorageSync('shareImg');
	},
	onShareAppMessage() {
		return {
			title: '我是',
			path: '/pages/index/index?parent_id=' + that.userinfo.id,
			imageUrl: that.bgimg,
			success: function(res) {
				console.log('成功', res);
			}
		};
	},
	methods: { 
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
		hua() {
			time = setInterval(function() {
				if (that.num == 3) {
					console.log('画');
					that.toDrawCanvas();
					clearInterval(time);
				}
			}, 100);
		},
		getuserInfo() {
			that.$zax.userinfo();
		},
		toclass() {
			uni.switchTab({
				url: '/pages/classify/classify'
			});
		},
		toDrawCanvas() {
			clearInterval(time);
			console.log('开始绘图');
			let rem = that.rem;
			var context = uni.createCanvasContext('firstCanvas');

			//上半部分背景
			that.drawRoundedRect(context, 0, 0, 330, 421, 12, false, false);
			context.drawImage(that.path.bgimg, 15, 17, 300, 300);
			// 圆形头像

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
			context.fillText(that.userinfo.nickname, 97, 370);
			// context.fillText(that.userinfo.nickname, 97, 354);
			// 推荐码
			context.font = '13px bold 黑体';
			context.fillStyle = '#a6a6a6';
			context.textBaseline = 'middle';
			// context.fillText('推荐码：' + that.userinfo.id, 97, 382);

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
	}
};
</script>

<style>
page {
	background-color: #f6f6f6;
}
.canvas-view {
	width: 100%;
	height: 100vh;
	text-align: center;
	position: fixed;
	top: -100%;
	background: rgba(0, 0, 0, 0.3);
	z-index: 999;
}
.cu-btn {
	width: 493rpx;
	height: 72rpx;
	background-color: #b701e5;
	border-radius: 36rpx;
	font-size: 28rpx;
	color: #ffffff;
	margin-bottom: 32rpx;
}
.card-view {
	width: 659rpx;
	height: 842rpx;
	background-color: #ffffff;
	border-radius: 24rpx;
	margin: auto;
	margin-top: 40rpx;
	margin-bottom: 60rpx;
}
.bg-img {
	width: 600rpx;
	height: 600rpx;
	margin-top: 34rpx;
}
.card-view-down {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0rpx 60rpx 0rpx 50rpx;
	height: 200rpx;
}
.qrcode {
	width: 120rpx;
	height: 120rpx;
}
.cu-avatar {
	width: 120rpx;
	height: 120rpx;
	margin-right: 20rpx;
}


</style>

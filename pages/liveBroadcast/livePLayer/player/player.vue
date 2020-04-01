<template>
	<view style="height: 100%;">
		<!-- #ifndef H5 -->
		<live-player class="play" :orientation="f1" :src="playurl" autoplay @statechange="statechange" @error="error" />
		<!-- #endif -->
		<view v-if="loading" class="flex align-center justify-center " style="position: fixed; top: 0;left: 0;width: 100%;height: 100%; ">
			<view style="color: #cacaca;">{{ loadingtext }}</view>
		</view>
		<view class=" vai-view " :style="{ paddingTop: '' + StatusBar + 'px' }">
			<view class="flex justify-between">
				<view class="flex justify-between  align-center " :style="{ height: '' + CustomBar + 'px' }">
					<view class=" flex align-center " @tap="back" style="width: 50upx;">
						<text class="cuIcon-home" v-if="home"></text>
						<text class="cuIcon-back" v-else></text>
					</view>
					<view class="user-view " v-if="detail" @tap="touserinfo">
						<view class="user-avatar cu-avatar round" :style="[{ backgroundImage: 'url(' + detail.anchor.avatar + ')' }]"></view>
						<view>
							<view class="user-name text-cut " v-if="detail.anchor.name">{{ detail.anchor.name }}</view>
							<view class="user-id" v-if="detail.stream_name">ID:{{ detail.stream_name }}</view>
						</view>
						<view>
							<button class="cu-btn ubtn" @tap.stop="tofollow">
								<block v-if="info.is_follow">已关注</block>
								<block v-else>关注</block>
							</button>
						</view>
					</view>
				</view>

				<view class="flex" :style="{ paddingTop: '' + CustomBar - StatusBar + 'px' }">
					<view class="qin-view flex align-center">
						亲密度：
						<view style="color: #b701e5;">{{ info.intimacy ? info.intimacy : '0' }}</view>
					</view>
				</view>
			</view>
			<view class="dm-view">
				<scroll-view class="" :scroll-into-view="thismsg" scroll-y="true">
					<view class="flex" style="margin-bottom: 10upx;" v-for="(item, index) in MessageList" :key="index">
						<view class="danmu-text-t1">
							<text>{{ item.nick }}:{{ item.payload.text }}</text>
						</view>
					</view>
					<view id="cthis"></view>
				</scroll-view>
			</view>
			<view class=" dowview ">
				<view class="d-goods" data-name="goods" @tap="showModel">
					<view class="d-goods-image"><image src="/static/liveBroadcast/icon-tj.png" mode="widthFix"></image></view>
					<view class="d-goods-num">{{ goods_num }}件商品</view>
				</view>
				<view class="input-view" @tap="showModel" data-name="focus">
					<!-- @input="getinput" @confirm="sendMessage" -->
					<input placeholder="跟主播聊点什么?" disabled="true" :value="payloadtext" placeholder-style="color:#FFF;" />
				</view>
				<view class=" r-btn-view flex">
					<!-- @tap="getMessageList" -->
					<view class="r-btn-icon" @tap="toreport" :data-id="detail.id">
						<view class="r-btn-top"></view>
						<view class="r-btn-icon"><image src="/static/liveBroadcast/icon-jb.png" mode="widthFix"></image></view>
						<view class="r-btn-title">举报</view>
					</view>
					<view class="r-btn-icon" @tap="showModel" data-name="share">
						<view class="r-btn-top"></view>
						<view class="r-btn-icon"><image src="/static/liveBroadcast/icon-share.png" mode="widthFix"></image></view>
						<view class="r-btn-title">分享</view>
					</view>
					<praise class="r-btn-icon" @tap="updateCounter('like')">
						<view class="r-btn-icon" slot="view">
							<view class="r-btn-top">
								<text class="cu-tag bg-mauve round" v-if="info.detail.like">{{ info.detail.like ? info.detail.like : '0' }}</text>
							</view>
							<view class="r-btn-icon">
								<image class="logo" v-if="like" src="/static/liveBroadcast/icon-xi-cur.png" mode="widthFix"></image>
								<image class="logo" v-else src="/static/liveBroadcast/icon-xi.png" mode="widthFix"></image>
							</view>
							<!--  :class="like?'price-color':''" -->
							<view class="r-btn-title">点赞</view>
						</view>
					</praise>
				</view>
			</view>

			<view class="cu-modal bottom-modal" :class="modalName == 'focus' ? 'show' : ''" @tap="hidden" style="background: rgba(0,0,0,0);">
				<view class="cu-dialog " @tap.stop="">
					<view class="cu-bar input" style="height: 100upx;">
						<input
							class="solid-bottom"
							:focus="modalName == 'focus'"
							style="color: #000; text-align: left;"
							maxlength="300"
							cursor-spacing="10"
							:value="payloadtext"
							@input="getinput"
							@confirm="sendMessage"
						/>
						<button class="cu-btn shadow-blur zcolor-btn " @tap="sendMessage">发送</button>
					</view>
				</view>
			</view>

			<view class="cu-modal bottom-modal" :class="modalName == 'goods' ? 'show' : ''" @tap="hidden">
				<view class="cu-dialog" @tap.stop="">
					<scroll-view scroll-y="true" style="width: 100%; max-height: 600upx; ">
						<view class="goodslist3">
							<block v-for="(item, index) in anchor_goods" :key="index">
								<view class="goods-view" @tap="tpinfo" :data-id="item.id" data-type="0">
									<view class="goods-img"><image :src="item.cover ? item.cover : ''" mode="aspectFill" lazy-load="true"></image></view>
									<view class="goods-down text-left">
										<view class="goodsr">
											<view class="goods-name text-cut2">{{ item.name }}</view>
										</view>
										<view class="goods-dview  ">
											<view class="goods-price " style="color: #a500d3 !important;">￥{{ item.price }}</view>
											<view><button class="cu-btn buy-btn">购买</button></view>
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
											<view><button class="cu-btn buy-btn">购买</button></view>
										</view>
									</view>
								</view>
							</block>
						</view>
					</scroll-view>
				</view>
			</view>

			<!-- 分享 -->
			<view class="cu-modal bottom-modal" :class="modalName == 'share' ? 'show' : ''" @tap="hidden">
				<view class="cu-dialog" @tap.stop="">
					<view class="share-d-view">
						<button class="share-btn" plain="true" open-type="share">
							<image src="/static/liveBroadcast/icon-wx.png" mode="widthFix"></image>
							<view>分享微信好友</view>
						</button>
						<button class="share-btn" plain="true" @tap="hua">
							<image src="/static/liveBroadcast/icon-pot.png" mode="widthFix"></image>
							<view>生成海报</view>
						</button>
					</view>
				</view>
			</view>

			<!-- 海报 -->
			<view class="cu-modal Modal" :class="modalName == 'sharehb' ? 'show' : ''" @tap="hidden">
				<view class="cu-dialog haibao" style="overflow: visible;" @tap.stop="">
					<view style="background: #FFF;padding: 40upx 0upx;border-radius: 10upx;">
						<view class="card-view " style=" margin-top: 0; margin-bottom: 0; ">
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
										<view style="font-size: 25upx; color: #a6a6a6; margin-top: 20upx;">ID：{{ info.detail.stream_name }}</view>
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
					<view @tap="hidden" style="width: 74upx;height: 74upx; position: absolute; margin: auto; left: 0;right: 0; margin-top: 30upx; ">
						<image src="/static/icon/icon-close.png" style="width: 100%; height: 100%; "></image>
					</view>
				</view>
			</view>

			<view class="canvas-view"><canvas style="width:330px; height: 420px;margin: auto;" canvas-id="firstCanvas"></canvas></view>
		</view>
	</view>
</template>

<script>
var that;
var context;
var time;
export default {
	data() {
		return {
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			groupID: '',
			payloadtext: '',
			conversationID: '', //会话id
			MessageList: [],
			modalName: '',
			detail: '',
			playurl: '',
			thismsg: '',
			info: '',
			anchor_goods: [],
			goods: [],
			goods_num: 0,
			path: {
				avatar: '',
				qrQrcode: '',
				bgimg: ''
			},
			num: 0,
			bgimg: '',
			qrQrcode: '',
			downimg: '',
			focus: false,
			like: '',
			imlogin: false,
			loading: true,
			home: false,
			loadingtext: '正在加载...'
		};
	},
	methods: {
		focusinp() {
			that.focus = true;
		},
		touserinfo() {
			uni.navigateTo({
				url: '/pages/serve/attention/info/info?id=' + that.detail.anchor.user_id
			});
		},
		tpinfo(e) {
			let id = e.currentTarget.dataset.id;
			let type = e.currentTarget.dataset.type;
			that.updateCounter('click_goods_total');
			if (type == 0) {
				uni.navigateTo({
					url: '/pages/anchor/goods/goodsInfo/goodsInfo?id=' + id + '&room_id=' + that.detail.id + '&anchor_id=' + that.detail.anchor.user_id
				});
			} else {
				uni.navigateTo({
					url: '/pages/goods/goodsInfo/goodsInfo?gid=' + id + '&room_id=' + that.detail.id + '&anchor_id=' + that.detail.anchor.user_id
				});
			}
		},
		back() {
			if (that.home) {
				uni.switchTab({
					url: '/pages/tab/liveBroad/liveBroad'
				});
			} else {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		hidden() {
			that.modalName = '';
		},
		showModel(e) {
			let name = e.currentTarget.dataset.name;
			if (name == 'focus' && !uni.getStorageSync('access_token')) {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			} else {
				that.modalName = name;
			}
		},
		statechange(e) {
			// 直播状态监听
			console.log('live-player code:', e.detail.code);
			let code = e.detail.code;
			if (code) {
			}
			switch (code) {
				case 2007:
					that.loading = true;
					that.loadingtext = '正在加载...';
					break;
				case 2008:
					that.loading = false;
					that.loadingtext = '正在加载...';
					break;
				case -2301:
					that.loading = true;
					that.loadingtext = '主播暂时离开';
					break;
			}
		},
		error(e) {
			console.error('live-player error:', e.detail.errMsg);
		},
		start() {
			// 开始
			context.start({
				success(res) {
					console.log('推流成功' + JSON.stringify(res));
					that.play = true;
				},
				fail(res) {
					console.log('推流失败' + JSON.stringify(res));
				},
				complete: function() {
					console.log('start push complete!');
				}
			});
		},
		getinput(e) {
			that.payloadtext = e.detail.value;
		},
		// 获取直播间信息
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
					that.detailid = res.detail.anchor.user_id;
					that.detail = res.detail;
					that.playurl = res.detail.play_url;
					that.groupID = res.detail.anchor.group_id;
					that.conversationID = 'GROUP' + that.groupID;
					that.anchor_goods = res.anchor_goods;
					that.goods = res.goods;
					that.goods_num = res.anchor_goods.length + res.goods.length;
					that.thaibao();
					that.timLogin();
					// that.joinGroup();
				});
		},
		tofollow() {
			console.log(this.detailid);
			if (uni.getStorageSync('access_token')) {
				that.$request
					.request({
						url: that.api.live.follow,
						data: {
							user_id: that.detail.anchor.user_id
						}
					})
					.then(res => {
						console.log(res);
						that.info.is_follow = !that.info.is_follow;
					});
			} else {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		},
		//举报
		toreport(e) {
			uni.navigateTo({
				url: '/pages/liveBroadcast/report/report?id=' + that.id
			});
		},
		// 直播间tim聊天登录
		timLogin() {
			let TimID = uni.getStorageSync('TimID');
			if (TimID) {
				that.tim
					.login({ userID: TimID.account, userSig: TimID.usersign })
					.then(function(imResponse) {
						console.log('登录成功！');
						that.joinGroup();
						that.imlogin = true;
					})
					.catch(function(imError) {
						console.warn('login error:', imError);
					});
			} else {
				that.joinGroup();
			}
		},
		//加入直播间聊天室
		joinGroup() {
			that.tim
				.joinGroup({ groupID: that.groupID })
				.then(function(imResponse) {
					that.sendMessage({ gtype: true });
				})
				.catch(function(imError) {
					console.warn('login error:', imError);
				});
		},
		// 发送信息
		sendMessage(e) {
			let message = that.tim.createTextMessage({
				to: that.groupID,
				conversationType: 'GROUP',
				payload: {
					text: e.gtype ? '加入直播间' : that.payloadtext
				}
			});
			console.log(message);
			that.tim
				.sendMessage(message)
				.then(function(res) {
					if (!e.gtype) {
						that.hidden();
					}
					console.log('发送信息成功：', res);
					let msg = res.data.message;
					let userid = msg.from;
					let userIDList = [];
					userIDList.push(userid);
					that.tim
						.getGroupMemberProfile({
							groupID: that.groupID,
							userIDList: userIDList
						})
						.then(function(imResponse) {
							msg['nick'] = imResponse.data.memberList[0].nick;
							that.MessageList.push(JSON.parse(JSON.stringify(msg)));
						});
					that.payloadtext = '';
					that.thismsg = 'cthis';
					setTimeout(function() {
						that.thismsg = '';
					}, 1000);
					that.updateCounter('common_total');
				})
				.catch(function(imError) {
					console.warn('sendMessage error:', imError);
				});
		},
		// 获取聊天记录
		upMsgList(res) {
			let list = [];
			let thismessage;
			for (let i in res) {
				if (res[i].conversationID == that.conversationID) {
					console.log('信息', res[i]);
					thismessage = res[i];
					if (thismessage.type == 'TIMTextElem') {
						that.MessageList.push(JSON.parse(JSON.stringify(thismessage)));
						console.log('新的hou会话列表MessageList--------', that.MessageList);
					}
				}
			}
			that.thismsg = 'cthis';
			setTimeout(function() {
				that.thismsg = '';
			}, 100);
		},
		updateCounter(type) {
			that.$zax.updateCounter({ id: that.id, field: type }).then(res => {
				if (type == 'like') {
					that.like = true;
					that.info.detail.like = that.info.detail.like + 1;
					that.$forceUpdate();
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
			that.drawRoundedRect(context, 163, 344, 45, 17, 9, true, false);
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
			context.fillText(title, 163 + 45 / 2, 353);
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
			context.fillText('ID：' + that.info.detail.stream_name, 97, 382);
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
			ctx.beginPath();
			ctx.moveTo(x + r, y);
			ctx.arcTo(x + width, y, x + width, y + r, r);
			ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
			ctx.arcTo(x, y + height, x, y + height - r, r);
			ctx.arcTo(x, y, x + r, y, r);
			if (fill) {
				ctx.fillStyle = '#b701e5';
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
		}
	},
	onLoad(option) {
		that = this;
		let id = option.id;
		if (id) {
			that.id = id;
			that.getdetail();
		}
		let page = getCurrentPages();
		that.home = page.length == 1 ? true : false;
	},
	onShareAppMessage(res) {
		that.updateCounter('share_total');
		if (res.from === 'button') {
		}
		return {
			title: that.info.detail.title,
			imageUrl: that.info.detail.cover,
			path: '/pages/liveBroadcast/livePLayer/player/player?id=' + that.info.detail.id
		};
	},
	onShow() {
		//#ifndef H5
		if (!that.imlogin && uni.getStorageSync('TimID') && that.info) {
			that.timLogin();
		}
		//#endif
	},
	onReady() {
		//#ifndef H5
		context = uni.createLivePlayerContext('livePusher');
		that.play = true;
		uni.setKeepScreenOn({
			keepScreenOn: true
		});
		//#endif
	},
	onUnload() {
		//#ifndef H5
		// that.closeLive();
		//#endif
		that.tim.logout();
	}
};
</script>

<style> 
page {
	width: 100%;
	height: 100vh;
	overflow: hidden;
}
.play {
	width: 100%;
	height: 100%;
}

.vai-view {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	color: #fff;
	padding: 30upx;
	/* background-color: #d6d5d5; */
}

.user-view {
	width: 332upx;
	height: 94upx;
	background-color: rgba(0, 0, 0, 0.4);
	border-radius: 47upx;
	padding: 15upx;
	display: flex;
	align-items: center;
}
.user-view .user-avatar {
	width: 66upx;
	height: 66upx;
	margin-right: 13upx;
}
.user-view .user-name {
	width: 120upx;
	font-size: 27upx;
	margin-bottom: 10upx;
}
.user-view .user-id {
	font-size: 23upx;
}
.user-view .ubtn {
	height: 49upx;
	padding: 0upx 15upx;
	font-size: 23upx;
	background-color: #fff;
	color: #b701e5;
	border-radius: 1000upx;
}
.qin-view {
	width: 191upx;
	height: 57upx;
	background-color: rgba(0, 0, 0, 0.4);
	border-radius: 29upx;
	font-size: 23upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.dm-view {
	width: 400upx;
	height: 300upx;
	/* border: solid #FFFEFE 1upx; */
	position: absolute;
	bottom: 250upx;
}
.dm-view scroll-view {
	width: 100%;
	height: 100%;
	font-size: 25upx;
	padding-top: 10upx;
}
.danmu-text-t1 {
	background: rgba(0, 0, 0, 0.4);
	font-size: 25upx;
	padding: 10upx 30upx;
	border-radius: 100upx;
}

.dowview {
	display: flex;
	width: 100%;
	position: absolute;
	bottom: 35upx;
}
.d-goods {
	text-align: center;
}
.d-goods-image image {
	width: 99upx;
	height: 99upx;
	margin-bottom: 10upx;
}
.d-goods-num {
	color: #fff;
	width: 141upx;
	height: 40upx;
	font-size: 25upx;
	line-height: 40upx;
	border-radius: 10upx;
	background-color: rgba(0, 0, 0, 0.4);
}
.dowview .input-view {
	width: 260upx;
	margin-left: 20upx;
	color: #fff;
	padding-top: 80upx;
}
.dowview .input-view input {
	font-size: 28upx;
	color: #ffffff;
	border-bottom: solid #fff 1upx;
	padding: 0upx 20upx;
	height: 65upx;
	width: 100%;
}

.r-btn-icon {
	height: 50upx;
	text-align: center;
}
.r-btn-icon image {
	width: 47upx;
	height: 39upx;
}
.r-btn-view {
	width: 250upx;
	display: flex;
	justify-content: space-between;
	margin-left: 20upx;
}
.r-btn-view .r-btn-top {
	height: 60upx;
}

.goodslist3 {
	padding: 20upx 0upx;
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
	width: 132upx;
	height: 54upx;
	background-image: linear-gradient(-60deg, #a44cff 0%, #c51cf0 100%);
	border-radius: 27upx;
	font-size: 25upx;
	color: #ffffff;
}

/* 分享 */
.share-d-view {
	width: 750upx;
	height: 200upx;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	padding-top: 20upx;
}
.share-d-view .share-btn {
	font-size: 25upx;
	color: #2e2e2e;
	border: none;
}
.share-d-view .share-btn image {
	width: 66upx;
	height: 66upx;
}
.goods-down {
	width: 500upx;
}
.goods-dview {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>

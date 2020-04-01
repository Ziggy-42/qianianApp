<template>
	<view class="page" style="height: 100vh;">
		<!-- #ifndef H5 -->
		<live-pusher
			class="plary"
			id="livePusher"
			:url="urls"
			:mode="mode[modeIndex]"
			:muted="false"
			:enable-camera="true"
			:auto-focus="true"
			:beauty="beauty"
			autopush="true"
			:whiteness="beauty"
			aspect="9:16"
			@statechange="statechange"
			@netstatus="netstatus"
			@error="error"
		></live-pusher>
		<!-- #endif -->
		<view class=" vai-view " :style="{ paddingTop: '' + StatusBar + 'px' }">
			<view class="flex justify-between " style="padding-top: 50upx;">
				<view class="user-view ">
					<view class="user-avatar cu-avatar round" :style="[{ backgroundImage: 'url(' + info.detail.anchor.avatar + ')' }]"></view>
					<view>
						<view class="user-name text-cut ">{{ info.detail.anchor.name ? info.detail.anchor.name : '' }}</view>
						<view class="user-id" v-if="info.detail.stream_name">ID:{{ info.detail.stream_name }}</view>
					</view>
				</view>
				<view class="flex align-center justify-between " :style="{ paddingTop: '' + StatusBar + 'px' }" style="flex: 1;">
					<view class="text-center" style="font-size: 50upx; margin-left: 40upx; width: 80upx;">
						<!-- 暂停&继续 -->
						<view class="r-btn-icon" @tap="pause" v-if="play"><text class="cuIcon-stop "></text></view>
						<view class="r-btn-icon" @tap="resume" v-else><text class="cuIcon-playfill "></text></view>
					</view>
					<view class="text-center" style=" width: 80upx;font-size: 50upx; ">
						<!-- 旋转摄像头 -->
						<view class="r-btn-icon" @tap="switchCamera">
							<view class="r-btn-icon"><image src="/static/liveBroadcast/icon-poto.png" mode="widthFix"></image></view>
							<!-- <text class="cuIcon-camera"></text> -->
						</view>
					</view>
					<view @tap="stop" style=" width: 80upx;">
						<!-- <text class="cuIcon-close" style=" font-size: 40upx; "></text> -->
						<view class="r-btn-icon"><image src="/static/liveBroadcast/icon-close.png" mode="widthFix"></image></view>
					</view>
				</view>
			</view>

			<!-- <view class="qx-view" @tap="setmodalName" :data-name="modalName == 'qx' ? '' : 'qx'">
				<view class="showqx">{{ mode[modeIndex].name }}</view>
				<view class="priceqx" v-if="modalName == 'qx'">
					<view v-for="(item, index) in mode" :key="index" @tap.stop="printqx" :data-index="index">{{ item.name }}</view>
				</view>
			</view> -->

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
					<input placeholder="跟粉丝聊点什么?" :disabled="true" placeholder-style="color:#FFF;" :value="payloadtext" @input="getinput" @confirm="sendMessage" />
				</view>
				<view class=" r-btn-view flex">
					<view class="r-btn-icon" @tap="showModel" data-name="beauty">
						<view class="r-btn-top"></view>
						<view class="r-btn-icon"><image src="/static/liveBroadcast/icon-meiyan.png" mode="widthFix"></image></view>
						<view class="r-btn-title">美颜</view>
					</view>
					<view class="r-btn-icon" @tap="showModel" data-name="share">
						<view class="r-btn-top"></view>
						<view class="r-btn-icon"><image src="/static/liveBroadcast/icon-share.png" mode="widthFix"></image></view>
						<view class="r-btn-title">分享</view>
					</view>
					<!-- <view class="r-btn-icon">
						<view class="r-btn-top"></view> 
						<praise class="r-btn-icon">
							<image class="logo" src="/static/liveBroadcast/icon-xin.png" mode="widthFix"></image>
						</praise>
						<view class="r-btn-title">点赞</view>
					</view> -->
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

			<!-- 美颜 -->
			<view class="cu-modal bottom-modal" :class="modalName == 'beauty' ? 'show' : ''" @tap="hidden" style="background: rgba(0,0,0,0);">
				<view class="cu-dialog" @tap.stop="" style="background: rgba(0, 0, 0, 0.6);">
					<view class="model-title">美颜</view>
					<view class="beauty-view">
						<slider value="0" @change="beautyChange" min="0" max="10" block-color="#a329c5" backgroundColor="#FFF" activeColor="#a329c5" block-size="18" />
					</view>
				</view>
			</view>

			<view class="cu-modal bottom-modal" :class="modalName == 'goods' ? 'show' : ''" @tap="hidden">
				<view class="cu-dialog  padding-top" @tap.stop="" style="background-color: #FFF;">
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

			<view class="cu-modal Modal" :class="modalName == 'sharehb' ? 'show' : ''" @tap="hidden">
				<view class="cu-dialog haibao" style="overflow: visible;" @tap.stop="">
					<view style="background: #FFF;padding: 40upx 0upx;border-radius: 10upx;">
						<view class="card-view " style=" margin-top: 0; margin-bottom: 0; ">
							<view class="text-center"><image class="bg-img" :src="bgimg"></image></view>
							<view class="card-view-down">
								<view class="flex align-center">
									<view class="cu-avatar round" :style="[{ backgroundImage: 'url(' + mylive.detail.anchor.avatar + ')' }]"></view>
									<view class=" text-left ">
										<view class="flex align-center  " style="font-size: 30upx;color: #2f2f2f;">
											{{ mylive.detail.anchor.name }}
											<view class="zcolor-btn  tar-view ">
												<text v-if="mylive.detail.status == 0">未知</text>
												<text v-if="mylive.detail.status == 1">直播中</text>
												<text v-if="mylive.detail.status == 2">预告中</text>
												<text v-if="mylive.detail.status == 3">关闭</text>
											</view>
										</view>
										<view style="font-size: 25upx; color: #a6a6a6; margin-top: 20upx;">ID：{{ mylive.detail.stream_name }}</view>
									</view>
								</view>
								<view><image class="qrcode" :src="mylive.detail.share_qrcode"></image></view>
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
var context;
var that;
var time;
export default {
	data() {
		return {
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			fil: true,
			urls: '',
			play: false,
			userinfo: '',
			messageList: [],
			modalName: '',
			beauty: '',
			videoFPS: '',
			mode: [
				{
					mode: 'SD',
					name: '标清'
				},
				{
					mode: 'HD',
					name: '高清'
				},
				{
					mode: 'FHD',
					name: '超清'
				}
			],
			modeIndex: 0,
			mylive: '',
			id: '',
			MessageList: [],
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
			payloadtext: '',
			info: {},
			thismsg: ''
		};
	},
	methods: {
		tpinfo(e) {
			let id = e.currentTarget.dataset.id;
			let type = e.currentTarget.dataset.type;
			if (type == 0) {
				uni.navigateTo({
					url: '/pages/anchor/goods/goodsInfo/goodsInfo?id=' + id
				});
			} else {
				uni.navigateTo({
					url: '/pages/goods/goodsInfo/goodsInfo?gid=' + id
				});
			}
		},
		hidden() {
			that.modalName = '';
		},
		showModel(e) {
			let name = e.currentTarget.dataset.name;
			console.log(name);
			that.modalName = name;
		},
		printqx(e) {
			that.modeIndex = e.currentTarget.dataset.index;
			that.hidden();
		},
		beautyChange(e) {
			that.beauty = e.detail.value;
		},
		statechange(e) {
			console.log('statechange:' + JSON.stringify(e));
			console.log('statechange:', e);
		},
		netstatus(e) {
			console.log('netstatus:' + JSON.stringify(e));
			console.log('网络状态变化:', e.detail.info);
			that.videoFPS = e.detail.videoFPS;
		},
		error(e) {
			console.log('错误:', e);
		},
		start() {
			// 开始推流
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
		close() {
			context.close({
				success: a => {
					console.log('livePusher.close:' + JSON.stringify(a));
				},
				fail(res) {
					console.log('推流失败' + JSON.stringify(res));
				}
			});
		},
		snapshot() {
			// 快照
			context.snapshot({
				success: e => {
					console.log(JSON.stringify(e));
				},
				fail(res) {
					console.log('推流失败' + JSON.stringify(res));
				}
			});
		},
		resume() {
			// 恢复推流
			context.resume({
				success(a) {
					console.log('livePusher.resume:' + JSON.stringify(a));
					that.play = true;
					that.$alert('直播继续');
				},
				fail(res) {
					console.log('推流失败' + JSON.stringify(res));
				}
			});
		},
		pause() {
			// 暂停推流
			context.pause({
				success: a => {
					console.log('livePusher.pause:' + JSON.stringify(a));
					that.play = false;
					that.$alert('直播暂停');
				},
				fail(res) {
					console.log('推流失败' + JSON.stringify(res));
				}
			});
		},
		stop() {
			// 停止推流
			uni.showModal({
				title: '提示',
				content: '确定要结束直播吗',
				success(res) {
					if (res.confirm) {
						context.stop({
							success(res) {
								console.log('停止直播');
								that.closeLive();
								uni.navigateBack({
									delta: 1
								});
							},
							fail(res) {
								console.log('停止失败' + JSON.stringify(res));
							}
						});
					}
				}
			});
		},
		switchCamera(a) {
			// 切换前后摄像头
			context.switchCamera({
				success(a) {
					console.log('livePusher.switchCamera:' + JSON.stringify(a));
				},
				fail(res) {
					console.log('推流失败' + JSON.stringify(res));
				}
			});
		},
		startPreview() {
			context.startPreview({
				success: a => {
					console.log('livePusher.startPreview:' + JSON.stringify(a));
				},
				fail(res) {
					console.log('推流失败' + JSON.stringify(res));
				}
			});
		},
		stopPreview: function() {
			context.stopPreview({
				success: a => {
					console.log('livePusher.stopPreview:' + JSON.stringify(a));
				},
				fail(res) {
					console.log('推流失败' + JSON.stringify(res));
				}
			});
		},
		closeLive() {
			that.$request
				.request({
					url: that.api.live.close_live,
					data: {
						id: that.id
					}
				})
				.then(res => {});
		},
		// 直播间tim聊天登录
		timLogin() {
			let TimID = uni.getStorageSync('TimID');
			console.log('登录！', TimID);
			that.tim
				.login({ userID: TimID.account, userSig: TimID.usersign })
				.then(function(imResponse) {
					console.log('登录成功！');
					that.joinGroup();
				})
				.catch(function(imError) {
					console.warn('login error:', imError);
				});
		},
		//加入直播间聊天室
		joinGroup() {
			that.tim
				.joinGroup({ groupID: that.groupID })
				.then(function(imResponse) {
					console.log('加入', imResponse);
					console.log('jiaru:', imResponse.data.status);
				})
				.catch(function(imError) {
					console.warn('login error:', imError);
				});
		},
		// 发送信息
		sendMessage() {
			let message = that.tim.createTextMessage({
				to: that.groupID,
				conversationType: 'GROUP',
				payload: {
					text: that.payloadtext
				}
			});
			that.tim
				.sendMessage(message)
				.then(function(res) {
					that.hidden();
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
				})
				.catch(function(imError) {
					// 发送失败
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
						that.thismsg = 'cthis';
						setTimeout(function() {
							that.thismsg = '';
						}, 1000);
					}
				}
			}
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
				that.getImageInfo('avatar', that.mylive.detail.anchor.avatar);
				that.getImageInfo('qrQrcode', that.mylive.detail.share_qrcode);
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
			hat.drawRoundedRect(context, 0, 0, 330, 421, 12, false, false);
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
			context.fillText(that.mylive.detail.anchor.name, 97, 354);
			// 推荐码
			context.font = '13px bold 黑体';
			context.fillStyle = '#a6a6a6';
			context.textBaseline = 'middle';
			context.fillText('ID：' + that.mylive.detail.stream_name, 97, 382);
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
					that.urls = res.detail.push_url;
					that.groupID = res.detail.anchor.group_id;
					that.conversationID = 'GROUP' + that.groupID;
					that.anchor_goods = res.anchor_goods;
					that.goods = res.goods;
					that.goods_num = res.anchor_goods.length + res.goods.length;
					that.thaibao();
				});
		}
	},
	onLoad(option) {
		that = this;
		that.userinfo = uni.getStorageSync('userinfo');
		that.mylive = uni.getStorageSync('mylive');
		let id = option.id;
		if (id) {
			that.id = id;
			that.getdetail();
		}
		that.timLogin();
	},
	onReady() {
		//#ifndef H5
		context = uni.createLivePusherContext('livePusher');
		that.play = true;
		uni.setKeepScreenOn({
			keepScreenOn: true
		});
		//#endif
	},
	onPush: function(ret) {
		if (ret.detail.code == 1002) {
			console.log('推流成功了', ret);
		}
	},
	onHide() {
		that.pause();
	},
	onShow() {
		if (context) {
			that.resume();
		}
	},
	onUnload() {
		// that.closeLive();
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
		}
		return {
			title: that.info.detail.title,
			imageUrl: that.info.detail.cover,
			path: '/pages/liveBroadcast/livePLayer/player/player?id=' + that.info.detail.id
		};
	}
};
</script>

<style> 

page {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.page {
	overflow: hidden;
}
.plary {
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
	width: 280upx;
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
	width: 345upx;
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
}
.r-btn-icon image {
	width: 47upx;
	height: 39upx;
}
.r-btn-view {
	width: 170upx;
	display: flex;
	justify-content: space-between;
	margin-left: 20upx;
}
.r-btn-view .r-btn-top {
	height: 60upx;
}

.cu-dialog {
	background: rgba(0, 0, 0, 0.1);
}
.model-title {
	height: 60upx;
	line-height: 60upx;
	color: #fff;
}

.beauty-view {
	width: 100%;
	height: 90upx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 90upx;
}

.beauty-view slider {
	width: 500upx;
}
.qx-view {
	width: 90upx;
	height: 60upx;
	background: rgba(0, 0, 0, 0.4);
	color: #fff;
	text-align: center;
	line-height: 60upx;
	margin-top: 40upx;
	border-radius: 10upx;
	font-size: 28upx;
}
.priceqx {
	margin-top: 10upx;
	background: rgba(0, 0, 0, 0.4);
	border-radius: 10upx;
}
.priceqx view {
	border-bottom: #fff 1upx solid;
}
.priceqx view:last-child {
	border: none;
}

.goodslist3 {
	padding: 0upx;
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

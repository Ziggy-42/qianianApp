<template>
	<view>
		<view class="kong"></view>
		<form>
			<view class="form-group">
				<label>姓名</label>
				<view class="right">
					<input name="name" type="text" @input="getinput" :value="info.name" data-name="name" placeholder="请输入姓名" placeholder-class="placeholder" />
				</view>
			</view>
			<view class="form-group">
				<label>联系方式</label>
				<view class="right">
					<input
						type="number"
						name="contact"
						:value="info.contact"
						@input="getinput"
						data-name="contact"
						placeholder="请输入电话或手机号"
						placeholder-class="placeholder"
					/>
				</view>
			</view>
			<view class="form-group">
				<label>电子邮箱</label>
				<view class="right">
					<input name="email" @input="getinput" :value="info.email" data-name="email" placeholder="请输入电子邮箱" placeholder-class="placeholder" />
				</view>
			</view>
			<view class="form-group">
				<label>地址</label>
				<view class="right">
					<input name="address" @input="getinput" :value="info.address" data-name="address" placeholder="请填写详细地址" placeholder-class="placeholder" />
				</view>
			</view>
			<view class="kong"></view>

			<view class="upimg-view">
				<view class="cu-bar bg-white "><view class="action">身份证件(身份证正面)</view></view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" @tap="ViewImage" :data-url="info.front_img" v-if="info.front_img">
							<image :src="info.front_img" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" data-name="front_img"><text class="cuIcon-close"></text></view>
						</view>
						<view class="solids" @tap="ChooseImage" data-name="front_img" v-if="!info.front_img"><text class="cuIcon-add"></text></view>
					</view>
				</view>
			</view>
			<view class="upimg-view">
				<view class="cu-bar bg-white "><view class="action">身份证件(身份证背面)</view></view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" @tap="ViewImage" :data-url="info.back_img" v-if="info.back_img">
							<image :src="info.back_img" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" data-name="back_img"><text class="cuIcon-close"></text></view>
						</view>
						<view class="solids" @tap="ChooseImage" data-name="back_img" v-if="!info.back_img"><text class="cuIcon-add"></text></view>
					</view>
				</view>
			</view>
			<view class="xieyi-view">
				<view class="print" @tap="printxy">
					<image src="/static/icon/print-cur.png" v-if="print"></image>
					<image src="/static/icon/print.png" v-else></image>
				</view>
				<view class="r-text" @tap="tpxy">
					我已阅读并同意
					<view class="" style="color: #b000dd;">《入驻协议》</view>
				</view>
			</view>
			<view class="text-center margin-bottom">
				<block v-if="anchor && anchor.is_pay == 2">
					<button class="cu-btn zcolor-btn" formType="submit" style="margin-bottom: 32rpx;margin-top: 0" v-if="anchor.status == 3" @tap="formSubmit">重新提交</button>
					<button @tap="showApplyResult" class="block-button cu-btn zcolor-btn " style="margin-top: 32rpx">查看审核结果</button>
				</block>
				<button v-else class="cu-btn zcolor-btn" @tap="formSubmit">提交￥{{ live_join_price }}</button>
			</view>
		</form>

		<view class="apply-result" v-if="anchor && anchor.is_pay == 2" :class="show_result ? 'show' : ''">
			<view style="margin-bottom: 140upx;">
				<block v-if="info.status == 1">
					<view><text class="cuIcon-form text-gray" style="font-size: 150upx;"></text></view>
				</block>
				<block v-if="info.status == 2">
					<view><text class="cuIcon-roundcheckfill text-green" style="font-size: 150upx;"></text></view>
				</block>
				<block v-if="info.status == 3">
					<view><text class="cuIcon-roundclosefill text-red" style="font-size: 150upx;"></text></view>
				</block>
			</view>
			<view class="review-status " :class="'status-' + info.review_status">{{ info.review_status_text }}</view>
			<view class="review-result" v-if="info.status == 1">您的信息已提交，请耐心等待审核。</view>
			<view class="review-result" v-if="info.status == 2">认证已通过</view>
			<!-- <view class="review-result" v-if="info.status == 3"></view> -->
			<view class="review-result" v-if="info.status == 3">
				<text>
					认证信息被驳回 \n
					驳回原因：{{ anchor.reason }}</text>
			</view>
			<button @tap="hideApplyResult" class="submit-btn cu-btn zcolor-btn " v-if="info.status == 3">重新提交</button>
			<block v-else>
				<button @tap="hideApplyResult" class="block-button  cu-btn zcolor-btn " style="border:0upx solid #ffffff" v-if="info.status == 0 || info.status == 1">
					查看提交内容
				</button>
			</block>
		</view>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			imgList: [],
			info: {},
			live_join_price: '',
			print: true,
			is_form_show: !1,
			show_result: '',
			show_entry_rules: '',
			agree_entry_rules: '',
			anchor: ''
		};
	},
	methods: {
		printxy() {
			that.print = !that.print;
		},
		hideApplyResult: function() {
			(that.show_result = !1), (that.is_form_show = !0);
		},
		showApplyResult: function() {
			that.show_result = !0;
		},
		showEntryRules: function() {
			that.show_entry_rules = !0;
		},
		disagreeEntryRules: function() {
			that.agree_entry_rules = !1;
			that.show_entry_rules = !1;
		},
		agreeEntryRules: function() {
			that.agree_entry_rules = !0;
			that.show_entry_rules = !1;
		},
		async ChooseImage(e) {
			let name = e.currentTarget.dataset.name;
			let uploader = new this.$Uploader();
			let path_arr = await uploader.choose_and_upload(1);
			console.log('图片', path_arr);
			that.info[name] = path_arr[0];
			uni.setStorageSync('liveEnter', that.info);
			that.$forceUpdate();
		},
		getinput(e) {
			let name = e.currentTarget.dataset.name;
			let value = e.detail.value;
			that.info[name] = value;
			uni.setStorageSync('liveEnter', that.info);
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
						that.info[name] = '';
					}
				}
			});
		},
		formSubmit(e) {
			let info = that.info;
			if (!that.print) {
				that.$showModal('您需要同意入驻协议才能申请');
				return;
			}
			let request = true;
			let title = '';
			info.email ? (that.$form.isEmai(info.email) ? '' : (request = false), (title = '邮箱号码有误')) : ((request = false), (title = '请填写邮箱'));
			info.address ? '' : ((request = false), (title = '请填详细地址'));
			info.front_img ? '' : ((request = false), (title = '请上传身份证正面照'));
			info.back_img ? '' : ((request = false), (title = '请上传身份证背面照'));
			info.contact ? (that.$form.isPhone(info.contact) ? '' : (request = false), (title = '手机号码有误')) : ((request = false), (title = '请填写手机号码'));
			info.name ? '' : ((request = false), (title = '请填写名字'));
			if (!request) {
				that.$showModal(title);
				return;
			}
			that.$request
				.request({
					url: that.api.live.apply_anchor,
					method: 'post',
					data: {
						name: info.name,
						contact: info.contact,
						email: info.email,
						address: info.address,
						front_img: info.front_img,
						back_img: info.back_img
					}
				})
				.then(res => {
					if(that.info.is_pay!=2){
						that.$pay.zwxpay(res).then(res => {
							that.$zax.userinfo();
							uni.showToast({
								duration: 2000,
								title: '提交成功'
							});
							that.getuserinfo();
						});
					}else{
						uni.showToast({
							duration: 2000,
							title: '提交成功'
						});
						that.getuserinfo();
					} 
					that.$zax.subMesage();
				});
		},
		tpxy() {
			let config = uni.getStorageSync('config');
			uni.setStorageSync('text', config.live_join_treaty);
			uni.navigateTo({
				url: '/pages/serve/xieyi/xieyi?type="zhubo"'
			});
		},
		getuserinfo() {
			that.$zax.userinfo().then(res => {
				that.info = uni.getStorageSync('userinfo').anchor ? uni.getStorageSync('userinfo').anchor : uni.getStorageSync('liveEnter') ? uni.getStorageSync('liveEnter') : {};
				let anchor = uni.getStorageSync('userinfo').anchor;
				if (anchor && anchor.is_pay == 2) {
					that.anchor = anchor;
					that.show_result = !0;
				} else {
					that.is_form_show = !0;
				}
			});
		}
	},
	onLoad() {
		that = this;
		that.live_join_price = uni.getStorageSync('config').live_join_price;
		that.info = uni.getStorageSync('userinfo').anchor ? uni.getStorageSync('userinfo').anchor : uni.getStorageSync('liveEnter') ? uni.getStorageSync('liveEnter') : {};
		let anchor = uni.getStorageSync('userinfo').anchor;
		that.getuserinfo();
		if (anchor && anchor.is_pay == 2) {
			that.anchor = anchor;
			that.show_result = !0;
		} else {
			that.is_form_show = !0;
		}
	}
};
</script>

<style>
page {
	background: #ffffff;
}

.form-group {
	height: 112upx;
	padding: 0upx 58upx;
	display: flex;
	align-items: center;
	background: #ffffff;
	border-bottom: solid 1upx #ebebeb;
}

.form-group label {
	width: 150upx;
}

.form-group .right {
	flex: 1;
}

.form-group .right input {
	width: 100%;
	height: 100upx;
	font-size: 28upx;
}

.placeholder {
	font-size: 28upx;
	color: #c6c6c6;
}

.upimg-view {
	border-bottom: solid #eeeeee 1upx;
	padding: 0upx 20upx 10upx;
}

.xieyi-view {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 120upx;
	font-size: 25rpx;
	color: #2d2d2d;
}

.xieyi-view .print {
	height: 32upx;
}

.xieyi-view .print image {
	width: 32upx;
	height: 32upx;
	margin-right: 20upx;
}

.xieyi-view .r-text {
	display: flex;
}

.cu-btn {
	width: 547upx;
	height: 72upx;
	background: #b000dd;
	border-radius: 36upx;
	font-size: 30upx;
	color: #ffffff;
	background-color: #b000dd;
}

.apply-result {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
	transition: 200ms;
	background: #fff;
	display: none;
	text-align: center;
	padding: 150upx 95upx;
}

.apply-result.show {
	display: block;
}

.apply-result .review-status {
	margin-bottom: 12upx;
	font-size: 30upx;
}

.apply-result .status-1 {
	color: #1aa349;
}

.apply-result .review-result {
	margin-bottom: 64upx;
}
</style>

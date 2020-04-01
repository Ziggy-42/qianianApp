<template>
	<view>
		<view class="kong"></view>
		<form @submit="applySubmit" v-if="is_form_show">
			<view class="form-group">
				<label>联系人姓名</label>
				<view class="right">
					<input placeholder="请输入联系人姓名" :value="apply.realname" name="realname" @input="getinput" data-name="realname" placeholder-class="placeholder" />
				</view>
			</view>
			<view class="form-group">
				<label>联系电话</label>
				<view class="right">
					<input placeholder="请输入联系电话" :value="apply.tel" name="tel" @input="getinput" data-name="tel" type="number" placeholder-class="placeholder" />
				</view>
			</view>
			<view class="form-group">
				<label>微信号</label>
				<view class="right">
					<input
						placeholder="请输入微信号"
						:value="apply.wechat_name"
						name="wechat_name"
						@input="getinput"
						data-name="wechat_name"
						type="number"
						placeholder-class="placeholder"
					/>
				</view>
			</view>
			<view class="form-group">
				<label>店铺名称</label>
				<view class="right"><input placeholder="请输入店铺名称" :value="apply.name" name="name" @input="getinput" data-name="name" placeholder-class="placeholder" /></view>
			</view>
			<view class="form-group" @tap="chooseCity">
				<label>所在地区</label>
				<input class="c-fonts" style="flex: 1;" placeholder="请选择所在地区" :value="region.label" disabled="true" placeholder-class="placeholder" />
				<text class="cuIcon-right text-gray" style="color: #bfbfbf;"></text>
			</view>
			<view class="form-group">
				<label>地址</label>
				<view class="right">
					<input placeholder="请填写详细地址" :value="apply.address" name="address" @input="getinput" data-name="address" placeholder-class="placeholder" />
				</view>
			</view>
			<view class="form-group">
				<label>所售类目</label>
				<view class="right">
					<picker :range="mch_common_cat_list" @change="prinCat" range-key="name">
						<input placeholder="请选择所属类目" disabled="true" :value="apply.mch_common_cat_name" placeholder-class="placeholder" />
						<input name="mch_common_cat_id" disabled="true" :value="apply.mch_common_cat_id" style="display: none;" />
					</picker>
				</view>
				<text class="cuIcon-right text-gray" style="color: #bfbfbf;"></text>
			</view>
			<view class="kong"></view>
			<view class="upimg-view">
				<view class="cu-bar bg-white "><view class="action">营业执照</view></view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" @tap="ViewImage" :data-url="apply.card_3" v-if="apply.card_3">
							<image :src="apply.card_3" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" data-name="card_3"><text class="cuIcon-close"></text></view>
						</view>
						<view class="solids" @tap="ChooseImage" data-name="card_3" v-if="!apply.card_3"><text class="cuIcon-add"></text></view>
					</view>
				</view>
			</view>
			<view class="upimg-view">
				<view class="cu-bar bg-white "><view class="action">法人身份证件(身份证正面)</view></view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" @tap="ViewImage" :data-url="apply.card_1" v-if="apply.card_1">
							<image :src="apply.card_1" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" data-name="card_1"><text class="cuIcon-close"></text></view>
						</view>
						<view class="solids" @tap="ChooseImage" data-name="card_1" v-if="!apply.card_1"><text class="cuIcon-add"></text></view>
					</view>
				</view>
			</view>
			<view class="upimg-view">
				<view class="cu-bar bg-white "><view class="action">法人身份证件(身份证背面)</view></view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" @tap="ViewImage" :data-url="apply.card_2" v-if="apply.card_2">
							<image :src="apply.card_2" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" data-name="card_2"><text class="cuIcon-close"></text></view>
						</view>
						<view class="solids" @tap="ChooseImage" data-name="card_2" v-if="!apply.card_2"><text class="cuIcon-add"></text></view>
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
				<block v-if="applyl">
					<button class="cu-btn zcolor-btn" formType="submit" style="margin-bottom: 32rpx;margin-top: 0" v-if="apply.review_status == 2">重新提交</button>
					<button @tap="showApplyResult" class="block-button cu-btn zcolor-btn " style="margin-top: 32rpx">查看审核结果</button>
				</block>
				<button class="cu-btn zcolor-btn" form-type="submit" v-else>提交￥{{ price }}</button>
			</view>
		</form>

		<view class="apply-result" v-if="applyl" :class="show_result ? 'show' : ''">
			<view style="margin-bottom: 140upx;">
				<block v-if="apply.review_status == 0">
					<view><text class="cuIcon-form text-gray" style="font-size: 150upx;"></text></view>
				</block>
				<block v-if="apply.review_status == 1">
					<view><text class="cuIcon-roundcheckfill text-green" style="font-size: 150upx;"></text></view>
				</block>
				<block v-if="apply.review_status == 2">
					<view><text class="cuIcon-roundclosefill text-red" style="font-size: 150upx;"></text></view>
				</block>
			</view>
			<view class="review-status ">{{ apply.review_status_text }}</view>
			<view class="review-result" v-if="apply.review_status == 0">您的信息已提交，请耐心等待审核。</view>
			<view class="review-result" v-else>{{ apply.review_result }}</view>

			<view class="margin-bottom" v-if="apply.review_status == 1" style="line-height: 60upx; word-wrap:break-word">
				<view>后台地址</view>
				<view>{{ info.login_url }}</view>
				<view>帐号:{{ info.account }}</view>
				<view>密码:{{ info.default_pwd }}</view>
				<view class=" cu-btn zcolor-btn margin-top " @tap="copyinfo" :data-info="'后台地址:' + info.login_url + ' / 帐号:' + info.account + ' / 密码:' + info.default_pwd">
					一键复制
				</view>
			</view>
			<button @tap="hideApplyResult" class=" cu-btn zcolor-btn " v-if="apply.review_status == 2">重新提交</button>
			<block v-else>
				<button
					@tap="hideApplyResult"
					class="block-button  cu-btn zcolor-btn "
					style="border:0upx solid #ffffff"
					v-if="apply.review_status == 0 || apply.review_status == 1"
				>
					查看提交内容
				</button>
			</block>
		</view>
		<view class="entry-rules" v-if="show_entry_rules">
			<view class="rules-container">
				<view style="padding: 24upx">
					<scroll-view scrollY="true" style="max-height: 75vh">
						<text style="word-break: break-all">{{ entry_rules }}</text>
					</scroll-view>
				</view>
				<view class="flex flex-row">
					<view @tap="disagreeEntryRules" class="flex-grow-1 rules-btn" style="color:#888">拒绝</view>
					<view @tap="agreeEntryRules" class="flex-grow-1 rules-btn" style="color: #ff4544">同意</view>
				</view>
			</view>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
var that;
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
export default {
	components: {
		mpvueCityPicker
	},
	data() {
		return {
			imgList: [],
			isDefault: false,
			cityPickerValue: [0, 0, 0],
			themeColor: '#007AFF',
			region: { label: '', value: [], cityCode: '' },
			mch_common_cat_list: [],
			prindex: -1,
			apply: {},
			live_join_price: '',
			print: true,
			price: '',
			is_form_show: !1,
			show_result: '',
			show_entry_rules: '',
			agree_entry_rules: '',
			applyl: '',
			info: ''
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
			that.apply[name] = path_arr[0];
			that.$forceUpdate();
			uni.setStorageSync('mchEnter', that.apply);
		},
		copyinfo: function(e) {
			console.log(e.currentTarget.dataset.info);
			uni.setClipboardData({
				data: e.currentTarget.dataset.info,
				success: function(t) {
					uni.showToast({
						title: '复制成功！',
						icon: 'success',
						mask: 'true'
					});
				},
				fail(res) {
					console.log(res);
				}
			});
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
						that.apply[name] = '';
					}
				}
			});
		},
		onCancel(e) {
			console.log(e);
		},
		chooseCity() {
			console.log(this.$refs.mpvueCityPicker);
			this.$refs.mpvueCityPicker.show();
		},
		onConfirm(e) {
			console.log('地址：', e);
			this.region = e;
			this.cityPickerValue = e.value;
		},

		getinput(e) {
			let name = e.currentTarget.dataset.name;
			let value = e.detail.value;
			that.apply[name] = value;
			uni.setStorageSync('mchEnter', that.apply);
		},
		applySubmit: function(e) {
			var t = this;
			let apply = that.apply;
			if (!that.print) {
				that.$showModal('您需要同意入驻协议才能申请');
				return;
			}
			let request = true;
			let title = '';
			apply.card_3 ? '' : ((request = false), (title = '请上传营业执照'));
			apply.card_1 ? '' : ((request = false), (title = '请上传身份证正面照'));
			apply.card_2 ? '' : ((request = false), (title = '请上传身份证背面照'));
			apply.address ? '' : ((request = false), (title = '请填详细地址'));
			that.region.label ? '' : ((request = false), (title = '请选择所在地区'));
			apply.mch_common_cat_id ? '' : ((request = false), (title = '请选择所售类目'));
			apply.name ? '' : ((request = false), (title = '请填写店铺名称'));
			apply.wechat_name ? '' : ((request = false), (title = '请填写微信号码'));
			if (apply.tel) {
				if (!that.$form.isTel(apply.tel)) {
					(request = false), (title = '手机号码有误');
				}
			} else {
				(request = false), (title = '请填写手机号码');
			}
			apply.realname ? '' : ((request = false), (title = '请填写姓名'));
			if (!request) {
				that.$showModal(title);
				return;
			}
			that.$request
				.request({
					url: that.api.mch.apply_submit,
					method: 'post',
					data: {
						realname: apply.realname,
						tel: apply.tel,
						name: apply.name,
						province_id: that.region.cityCode.province_id,
						city_id: that.region.cityCode.city_id,
						district_id: that.region.cityCode.district_id,
						address: apply.address,
						mch_common_cat_id: apply.mch_common_cat_id,
						service_tel: apply.service_tel,
						wechat_name: apply.wechat_name,
						card_1: apply.card_1,
						card_2: apply.card_2,
						card_3: apply.card_3
					}
				})
				.then(res => {
					uni.hideLoading();
					if (that.apply.pay_status == 1) {
						that.$pay.zwxpay(res).then(res => {
							that.$zax.userinfo();
							that.getapply();
							uni.showToast({
								duration: 2000,
								title: '提交成功'
							});
						});
					} else if (that.apply.pay_status == 2) {
						uni.showToast({
							duration: 2000,
							title: '提交成功待审核！'
						});
						that.getapply();
					} else {
						that.$pay.zwxpay(res).then(res => {
							that.$zax.userinfo();
							uni.showToast({
								duration: 2000,
								title: '提交成功'
							});
							that.getapply();
						});
					}
				});
		},
		getapply() {
			that.$request
				.request({
					url: that.api.mch.apply
				})
				.then(res => {
					that.info = res;
					console.log(res);
					that.apply = res.apply;
					if (res.apply) {
						that.show_result = !0;
						that.applyl = res.apply;
					} else {
						that.is_form_show = !0;
					}
					that.mch_common_cat_list = res.mch_common_cat_list;
					if (res.apply) {
						let region = {
							label: res.edit_district.province.name + '-' + res.edit_district.city.name + '-' + res.edit_district.district.name,
							value: [0, 0, 0],
							cityCode: {
								province_id: res.apply.province_id,
								city_id: res.apply.city_id,
								district_id: res.apply.district_id
							}
						};
						that.region = region;
						console.log('地址：', region);
					}
					that.apply = res.apply ? res.apply : uni.getStorageSync('mchEnter') ? uni.getStorageSync('mchEnter') : {};
				});
		},
		prinCat(e) {
			let value = e.detail.value;
			console.log(value);
			that.prindex = value;
			that.apply['mch_common_cat_id'] = that.mch_common_cat_list[value].id;
			that.apply['mch_common_cat_name'] = that.mch_common_cat_list[value].name;
			that.$forceUpdate();
		},
		tpxy() {
			let config = uni.getStorageSync('config');
			uni.setStorageSync('text', config.mch_join_treaty);
			uni.navigateTo({
				url: '/pages/serve/xieyi/xieyi?type="shop"'
			});
		}
	},
	onLoad() {
		that = this;
		that.getapply();
		that.price = uni.getStorageSync('config').mch_setting.join_price;
	},
	onBackPress() {
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel();
			return true;
		}
	},
	onUnload() {
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel();
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
	width: 170upx;
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
	font-size: 25upx;
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
	background-color: #b000dd;
	border-radius: 36upx;
	font-size: 30upx;
	color: #ffffff;
	background: #b000dd;
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

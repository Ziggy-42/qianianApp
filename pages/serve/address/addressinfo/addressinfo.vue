<template>
	<view>
		<view class="kong"></view>
		<form @submit="formSubmit">
			<view class="cu-form-group">
				<view class="title c-fonts">收货人</view>
				<input class="c-fonts" placeholder="请输入收件人姓名" :value="name" name="name" placeholder-class="placeholder" />
			</view>
			<view class="cu-form-group">
				<view class="title c-fonts">电话</view>
				<input class="c-fonts" type="number" placeholder="请输入收货人电话"  :value="mobile" name="mobile" placeholder-class="placeholder" />
			</view>
			<view class="cu-form-group" @tap="chooseCity">
				<view class="title">地址</view>
				<input class="c-fonts" placeholder="请选择收货人地址" :value="region.label" disabled="true" placeholder-class="placeholder" />
				<text class="cuIcon-right text-gray" style="color: #bfbfbf;"></text>
			</view>
			<view class="cu-form-group">
				<view class="title c-fonts">详细地址</view>
				<input class="c-fonts" placeholder="请输入详细地址" :value="detail" name="detail" placeholder-class="placeholder" />
			</view>
			<view class="text-center margin-top"><button form-type="submit" class="cu-btn zcolor-btn">确定</button></view>
		</form>
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
			editType: 'edit',
			id: '',
			name: '',
			mobile: '',
			detailed: '',
			isDefault: false,
			cityPickerValue: [0, 0, 0],
			themeColor: '#007AFF',
			region: { label: '', value: [], cityCode: '' },
			address_id: '',
			detail: ''
		};
	},
	methods: {
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
		isDefaultChange(e) {
			this.isDefault = e.detail.value;
		},
		del() {
			uni.showModal({
				title: '删除提示',
				content: '你将删除这个收货地址',
				success: res => {
					if (res.confirm) {
						uni.setStorage({
							key: 'delAddress',
							data: { id: this.id },
							success() {
								uni.navigateBack();
							}
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		formSubmit(e) {
			var name = e.detail.value.name;
			var mobile = e.detail.value.mobile;
			var detail = e.detail.value.detail;
			var region = that.region;
			var province_id = that.region.cityCode.province_id;
			var city_id = that.region.cityCode.city_id;
			var district_id = that.region.cityCode.district_id;
			// return;
			if (!name) {
				uni.showToast({ title: '请输入收件人姓名', icon: 'none' });
				return;
			}
			if (!mobile) {
				uni.showToast({ title: '请输入收件人电话号码', icon: 'none' });
				return;
			}
			if (!/^1[3456789]\d{9}$/.test(mobile)) {
				uni.showToast({ title: '请输入正确手机号', icon: 'none' });
				return;
			}
			if (!detail) {
				uni.showToast({ title: '请输入收件人详细地址', icon: 'none' });
				return;
			}
			if (region.value.length == 0) {
				uni.showToast({ title: '请选择收件地址', icon: 'none' });
				return;
			}
			that.$request
				.request({
					url: that.api.user.address_save,
					data: {
						address_id: that.address_id,
						name: name,
						mobile: mobile,
						province_id: province_id,
						city_id: city_id,
						district_id: district_id,
						detail: detail,
					},
					method:'post',
					Toast: '正在提交...',
					success(res){
						that.$alertok('保存成功');
						uni.navigateBack({
							delta: 1
						});
					}
		 	}) 
		}
	},
	onLoad(e) {
		//获取传递过来的参数
		that = this;
		if (e.address) {
			var address = JSON.parse(e.address);
			console.log('地址：', address);
			that.name = address.name;
			that.address_id = address.id;
			that.mobile = address.mobile;
			that.detail = address.detail;
			console.log('啊是大家：', address.detail);
			var cityCode = {
				province_id: address.district_id,
				city_id: address.province_id,
				district_id: address.city_id
			};
			that.region = {
				label: address.province + '-' + address.city + '-' + address.district,
				value: [0, 0, 0],
				cityCode: cityCode
			};
		}
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
.c-fonts {
	font-size: 28upx;
	color: #333;
}
.b-width {
	width: 500upx;
	margin-left: 126upx;
}
.cu-btn {
	width: 547upx;
	height: 72upx;
	background-color: #b000dd;
	border-radius: 36upx;
	color: #ffffff;
}
.cu-form-group .title {
	width: 180upx;
	font-size: 28rpx;
	color: #373737;
}
.placeholder {
	font-size: 28upx;
	color: #b3b3b3;
}
</style>

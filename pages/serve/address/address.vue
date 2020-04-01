<template>
	<view>
		<view class="kong"></view>
		<navigator class="add-address" url="addressinfo/addressinfo">
			<view>+添加新地址</view>
			<view><text class="cuIcon-right" style="font-size: 40upx; color: #bfbfbf; "></text></view>
		</navigator>
		<view class="kong"></view>
		<view class="list">
			<view class="li bg-white" v-for="(item, index) in list" :key="index">
				<view class="flex">
					<view class="addres-icon"><text class="Guoicon-dingwei2 text-bold "></text></view>
					<view class="contents" @tap="print" :data-index="index">
						<view class="text-grey" style="font-size: 30upx;lixne-height: 48upx;color: #4b4b4b;">
							<text style="margin-right: 30upx;">{{ item.name }}</text>
							<text style="color: #919191;">{{ item.mobile }}</text>
						</view>
						<view class="flex">
							<view class="text" style="font-size: 26upx;line-height: 40upx;margin-top: 15upx;">
								{{ item.province }},{{ item.city }},{{ item.district }},{{ item.address }}
							</view>
						</view>
					</view>
				</view>
				<view class="right-view">
					<view class="bth-right"><text style="color: #ff9b0c;" @tap="setaddress" :data-index="index">编辑</text></view>
					<view class="bth-right"><text class="text-gray" @tap="deleteAddress" :data-id="item.id">删除</text></view>
				</view>
			</view>
		</view> 
		<view style="height: 120upx;"></view> 
		<noupxst type="1" text="您还没有添加地址" v-if="onlist"></noupxst>
		
		
		
		
		
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			c: true,
			checked: false,
			list: [],
			form: '',
			onlist: false,
			modal: false
		};
	},
	methods: {
		hideModal(i) {
			that.modal = !that.modal;
			if (i == 1) {
				that.delid = '';
			}
		},
		checkedclear(e) {
			this.checked = e.detail.value;
		},
		del(e) {
			that.delid = e.currentTarget.dataset.id;
			that.hideModal();
		},
		// 删除地址
		deleteAddress(e) {
			let id = e.currentTarget.dataset.id;
			uni.showModal({
				title: '提示',
				content: '确定要删除该地址吗？',
				success(res) {
					if (res.confirm) {
						that.$request
							.request({
								url: that.api.user.address_delete,
								data: {
									address_id: id
								},
								Toast: '正在删除'
							})
							.then(res => {
								that.$alertok('删除成功');
								that.getaddress();
							});
					}
				}
			});
		},
		getaddress() {
			that.onlist = false;
			this.$request.request({
				url: that.api.user.address_list,
				Toast: '正在加载...',
				success(res) {  
					uni.hideLoading()
					that.list = res.list;
					if (res.list.length == 0) {
						that.list = true;
					}
				}
			});
		},
		// 设置默认地址
		setDefaultAddress(e) {
			this.$request
				.request({
					url: that.api.user.address_set_default,
					data: {
						address_id: e.currentTarget.dataset.id
					}
				})
				.then(res => {
					that.$alert('设置成功');
					setTimeout(that.getaddress(), 1000);
				});
		},
		// 选择地址
		print(e) {
			if (that.form) {
				uni.setStorageSync('address', that.list[e.currentTarget.dataset.index]);
				uni.navigateBack({
					delta: 1
				});
			}
		},

		// 编辑
		setaddress(e) {
			var address = JSON.stringify(that.list[e.currentTarget.dataset.index]);
			// console.log(address);
			uni.navigateTo({
				url: 'addressinfo/addressinfo?address=' + address
			});
		}
	},
	onLoad(option) {
		that = this;
		that.form = option.form ? option.form : '';
	},
	onShow() {
		that.getaddress();
	}
};
</script>

<style>
page {
	background: #ffffff;
}

.li {
	padding: 40upx 0upx 30upx 52upx;
	border-bottom: 1upx solid #eeeeee;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.contents {
	width: 450upx;
}

.t-mar {
	margin-right: 41upx;
}

.add-address {
	width: 100%;
	height: 110upx;
	font-size: 32upx;
	background: #fff;
	padding: 0upx 50upx;
	font-size: 30upx;
	color: #2f2f2f;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.print {
	width: 40upx;
	height: 40upx;
}
.bth-right {
	font-size: 26rpx;
	width: 140rpx;
	height: 60rpx;
	text-align: center;
	line-height: 60rpx;
	border-left: solid #e5e5e5 1upx;
}
.addres-icon {
	font-size: 50rpx;
	color: #ff9b0c;
	margin-right: 30rpx;
}
</style>

<template>
	<view>
		<view class="kong"></view>
	
		<image class="topimg"  src="/static/icon/icon-logintop.png" mode="widthFix"></image>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			bg_img: 'https://qf.huamais.com/addons/zjhj_mall/core/web/uploads/image/store_1/7be565de526ef7f132cd524697944b285332994e.png',
		};
	},
	methods: {
		getUserInfo: function(o) {
			uni.login({
				success: function(e) {
					var t = e.code;
					uni.showLoading({
						mask: true,
						title: '正在登录...'
					});
					that.$zax
						.unionLogin({
							code: t,
							user_info: o.detail.rawData,
							encrypted_data: o.detail.encryptedData,
							iv: o.detail.iv,
							signature: o.detail.signature,
							parent_id: uni.getStorageSync('parent_id')
						})
						.then(res => { 
							that.$zax.userinfo().then(userindex => {
								let userinfo = userindex.user_info; 
								if (userinfo.is_distributor == 0) {
									that.$request.request({
										url: that.api.share.join,
										method: 'post'
									});
								}
							});
							that.$zax.getConfig();
							that.$zax.qrQrcode();
							that.$zax.getIM().then(res=>{
								uni.navigateBack({
									delta: 1
								}); 
							}); 
						});
				},
				fail: function(e) {}
			});
		}
	},
	onLoad(option) {
		that = this;
	}
};
</script>

<style>
page{
	height: 100%;
}
.logo {
	width: 300upx;
	height: 300upx;
	margin-top: 300upx;
	margin-bottom: 100upx;
}
.btn {
	width: 500upx;
	height: 70upx;
}
</style>

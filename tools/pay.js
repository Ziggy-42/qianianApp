import request from "./ajax.js";
import api from "./api.js";

function wxpay(order) {
	return new Promise(function(resolve, reject) {
		console.log("支付", order)
		request.request({
			url: api.order.pay_data,
			data: {
				order_id: order.order_id ? order.order_id : '',
				order_id_list: order.order_id_list ? order.order_id_list : '',
				order_type: order.order_type ? order.order_type : '',
				pay_type: "WECHAT_PAY",
			},
			Toast: '正在提交订单...',
			success(res) {
				console.log(res, 33333);
				// #ifdef APP-PLUS 
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: res, //微信单数据
					success: function(res) {
						console.log("支付成功")
						uni.showToast({
							title: "支付成功"
						})
						resolve(res)
					},
					fail: function(err) {
						console.log("支付失败")
						uni.showToast({
							title: "支付失败",
							icon: 'none'
						})
						reject(err)
					},
				});
				//#endif
				//#ifdef MP-WEIXIN
				console.log("支付参数：", res);
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: res.timeStamp,
					nonceStr: res.nonceStr,
					package: res.package,
					signType: res.signType,
					paySign: res.paySign,
					success: function(res) {
						console.log("支付成功")
						uni.showToast({
							title: "支付成功"
						})
						resolve(res)
					},
					fail: function(err) {
						console.log("支付失败")
						uni.showToast({
							title: "支付失败",
							icon: 'none'
						})
						reject(err)
					},
				});
				//#endif 
			}
		})
	})
}

function lqpay(order_id) {
	console.log("订单：", order_id);
	return new Promise(function(resolve, reject) {
		request.request({
			url: api.order.pay_data,
			data: {
				order_id: order_id,
				pay_type: "BALANCE_PAY",
			},
			success(res) {
				console.log(res, 33333);
				resolve(res)
			},
			fail(res) {
				reject(res)
			}
		})
	})
}

function jfpay(order_id) {
	return new Promise(function(resolve, reject) {
		request.request({
			url: 'index/order/payOrder',
			data: {
				order_id: order_id,
				pay_type: "BALANCE_PAY",
			},
			success(res) {
				console.log(res, 33333);
				resolve(res)
			},
			fail(res) {
				reject(res)
			}
		})
	})
}


// 直接支付
function zwxpay(orderinfo) {
	return new Promise(function(resolve, reject) {
		console.log(orderinfo);
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: orderinfo.timeStamp,
			nonceStr: orderinfo.nonceStr,
			package: orderinfo.package,
			signType: orderinfo.signType,
			paySign: orderinfo.paySign,
			success: function(res) {
				console.log("支付成功")
				uni.showToast({
					title: "支付成功"
				})
				resolve(res)
			},
			fail: function(err) {
				console.log("支付失败")
				uni.showToast({
					title: "支付失败",
					icon: 'none'
				})
				reject(err)
			},
		});
	})
}



function groupwxpay(order_id) {
	return new Promise(function(resolve, reject) {
		request.request({
			url: api.group.pay_data,
			data: {
				order_id: order_id,
				pay_type: "WECHAT_PAY",
				order_id_list: '',
				form_id: 'undefined',
				parent_user_id: 0,
				condition: 2,
			},
			success(res) {
				console.log(res, 33333);
				uni.showLoading({
					title: "正在调起支付!"
				})
				// #ifdef APP-PLUS 
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: res, //微信单数据
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						resolve(res)
					},
					fail: function(err) {
						var i = {
							code: 1,
							err
						}
						console.log('fail:', i);
						console.log("支付失败")
						resolve(i)
					},
					complete() {
						uni.hideLoading()
					}
				});
				//#endif
				//#ifdef MP-WEIXIN
				console.log("支付参数：", res);
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: res.data.timeStamp,
					nonceStr: res.data.nonceStr,
					package: res.data.package,
					signType: res.data.signType,
					paySign: res.data.paySign,
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						resolve(res)
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
						var i = {
							code: 1,
							err
						}
						console.log('fail:', i);
						console.log("支付失败")
						resolve(i)
					},
					complete() {
						uni.hideLoading()
					}
				});
				//#endif 
			}
		})
	})
}

function groupalpay(order_id) {
	return new Promise(function(resolve, reject) {
		request.request({
			url: api.group.pay_data,
			data: {
				order_id: order_id,
				pay_type: "ALIPAY",
				order_id_list: '',
				form_id: '',
				parent_user_id: 0,
				condition: 2,
			},
			success(res) {
				console.log(res, 33333);
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: res.data, //支付宝订单数据
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						resolve(res)
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
						var i = {
							code: 1,
							err
						}
						console.log('fail:', i);
						console.log("支付失败")
						resolve(i)
					}
				});
			}
		})
	})
}

function grouplqpay(order_id) {
	return new Promise(function(resolve, reject) {
		request.request({
			url: api.group.pay_data,
			data: {
				order_id: order_id,
				pay_type: "BALANCE_PAY",
				order_id_list: '',
				form_id: '',
				parent_user_id: 0,
				condition: 2,
			},
			success(res) {
				console.log(res, 33333);
				resolve(res)
			}
		})
	})
}

function vippay(data) {
	let that = this;
	return new Promise(function(resolve, reject) {
		uni.showLoading({
			title: '正在调起支付'
		});
		let access_token = uni.getStorageSync('access_token');
		var url = con.base_url + '/addons/zjhj_mall/core/web/index.php?_acid=' + con._acid +
			'&r=api/user/submit-member';
		let _platform = '';
		// #ifndef MP-WEIXIN
		_platform = 'app';
		// #endif
		// #ifdef MP-WEIXIN
		_platform = 'wx';
		// #endif
		uni.request({
			url: url,
			data: {
				_version: con._version,
				_platform: _platform,
				type: data.type,
				pay_type: data.pay_type,
				access_token: access_token
			},
			method: 'POST',
			type: 'json',
			header: {
				'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			success(res) {
				if (res.data.code == '1') {
					reject(res.data)
				} else {
					// #ifndef MP-WEIXIN 
					if (data.type == "WECHAT_PAY" || data.type == "ALIPAY") {
						uni.requestPayment({
							provider: data.type == "WECHAT_PAY" ? 'wxpay' : 'alipay',
							orderInfo: res.data,
							success: function(res1) {
								resolve(res1.data)
							},
							fail: function(err) {
								reject(err);
							}
						});
					}
					// #endif
					// #ifdef MP-WEIXIN
					var payinfo = res.data.data;
					console.log('支付参数：', payinfo);
					if (data.type == "WECHAT_PAY") {
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: payinfo.timeStamp,
							nonceStr: payinfo.nonceStr,
							package: payinfo.package,
							signType: payinfo.signType,
							paySign: payinfo.paySign,
							success: function(res1) {
								resolve(res1.data)
							},
							fail: function(err) {
								reject(err);
							}
						});
					}
					// #endif
					else {
						resolve(res.data)
					}
				}
			},
			fail() {
				uni.showToast({
					title: '服务器错误',
					icon: 'none'
				});
				// 失败回调
			},
			complete() {
				uni.hideLoading();
			}
		});

	})
}


export default {
	async pay(paytype, order_id) {
		if (paytype == "WECHAT_PAY") {
			// 微信支付
			return wxpay(order_id)
		}
		if (paytype == "ALIPAY") {
			// 支付宝支付
			return alpay(order_id)
		}
		if (paytype == "BALANCE_PAY") {
			// 零钱支付 
			return lqpay(order_id)
		}
	},
	async grouppay(paytype, order_id) {
		console.log("支付方式：", paytype);
		if (paytype == "WECHAT_PAY") {
			// 微信支付
			return groupwxpay(order_id)
		}
		if (paytype == "ALIPAY") {
			// 支付宝支付
			return groupalpay(order_id)
		}
		if (paytype == "BALANCE_PAY") {
			// 零钱支付 
			return grouplqpay(order_id)
		}
	},
	async zwxpay(orderinfo) {
		return zwxpay(orderinfo)
	}

}

/*
	2019-02-20 lane 封装wx-app请求 
*/
import config from "../config.js";

var utils = {}

utils.request = function(option) {
	let access_token = uni.getStorageSync('access_token') ? uni.getStorageSync('access_token') :
		'YDr9T5weMcOIuzbdBVKRg-anoY04c3ic';
	uni.setStorageSync("url", config.material_url);
	uni.setStorageSync("access_token", access_token); 
	option.data || (option.data = {});
	if (option.Toast) {
		uni.showLoading({
			title: option.Toast,
			mask:true
		})
	}
	option.data["access_token"] = access_token ? access_token : '';
	option.data._platform = config.platform;
	option.data._version = config._version;
	uni.request({
		url: option.url,
		data: option.data,
		method: option.method || "GET",
		dataType: option.dataType || "json",
		header: {
			"content-type": "application/x-www-form-urlencoded;charset=UTF-8"
		},
		success(res) {
			if (res.data.code == -1) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			} else if (res.data.code == 0) {
				option.success && option.success(res.data.data)
			} else {
				if (option.fail) {
					option.fail(res.data.data)
				} else {
					// uni.showModal({
					// 	title: "提示",
					// 	content: res.data.msg,
					// 	showCancel: false,
					// 	confirmText: "知道了",
					// 	success(res) { 
					// 	}
					// })
					uni.showToast({
						title: res.data.msg,
						image: "/static/icon/icon-warning.png"
					})
				} 
			}
		},
		fail(e) {
			if (console.warn("--- request fail >>>"), console.warn("--- " + option.url + " ---"), console.warn(e), console.warn(
					"<<< request fail ---"), option && option.noHandlerFail) "function" == typeof option.fail && option.fail(e.data);
			else {
				var t = getApp();
				t.is_on_launch ? (t.is_on_launch = !1, o.showModal({
					title: "网络请求出错",
					content: e.errMsg || "",
					showCancel: !1,
					success: function(e) {
						e.confirm && option.fail && option.fail(e)
					}
				})) : (uni.showToast({
					title: e.errMsg,
					image: "/static/icon/icon-warning.png"
				}), option.fail && option.fail(e))
			}
		},
		complete(t) {
			if (200 != t.statusCode && t.data && t.data.code && 500 == t.data.code) {
				var e = t.data.data.message;
				uni.showModal({
					title: "系统错误",
					content: e + ";\r\n请将错误内容复制发送给我们，以便进行问题追踪。",
					cancelText: "关闭",
					confirmText: "复制",
					success: function(e) {
						e.confirm && uni.setClipboardData({
							data: JSON.stringify({
								data: t.data.data,
								object: a
							})
						})
					}
				})
			}
			option.complete && option.complete(t)
			uni.hideLoading()
		}
	})

};

utils.hint = function(option) {
	uni.showModal({
		title: "提示",
		content: option.msg,
		showCancel: false,
		confirmText: option.confirm ? option.confirm : "知道了",
		confirmColor: "#0x1AA0",
		success(res) {
			option.success ? option.success(res) : ''
		}
	})
}
// 更新用户信息 
utils.getuserIndex = function(option) {
	utils.request({
		url: "api/user/index",
		success(res) {
			uni.setStorageSync("userInfo", res)
		}
	})
}

module.exports = utils;

import request from "./ajax.js";
import api from "./api.js";
// 倒计时
function Conversiontime(timestamp) {
	return new Promise(function(resolve, reject) {
		var timestamp = Number(timestamp);
		var date = new Date(timestamp);
		var time = {};
		var Y = date.getFullYear();
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
		var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
		var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours());
		var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
		var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
		resolve(Y);
	})
};
// 时间戳转换
function formatDate(time) {
	console.log("时间：", time)
	var now = new Date(time);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
	var hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
	var minute = now.getMinutes < 10 ? '0' + now.getMinutes() : now.getMinutes();
	var second = now.getSeconds < 10 ? '0' + now.getSeconds() : now.getSeconds();
	let data = {
		year,
		month,
		date,
		hour,
		minute,
		second
	}
	return data;
}

// formatDate(now) {
// 	now = new Date(now);
// 	var year = now.getFullYear();
// 	var month = now.getMonth() + 1;
// 	var date = now.getDate();
// 	return year + '-' + month + '-' + date;
// }, 

// 更新用户信息
function userinfo() {
	return new Promise(function(resolve, reject) {
		request.request({
			url: api.user.index,
			success(res) {
				console.log(res) 
				let userinfo = res.user_info;
				uni.setStorageSync("money", userinfo.money)
				uni.setStorageSync("userinfo", userinfo);
				uni.setStorageSync("pagemien", res);
				resolve(res)
			}
		});
	})
};
// 登录 
function unionLogin(e) {
	return new Promise(function(resolve, reject) {
		console.log(api.passport.login);
		request.request({
			url: api.passport.login,
			method: "POST",
			data: e,
		}).then(res => {
			uni.showToast({
				title: "登录成功",
			})
			uni.setStorageSync("access_token", res.access_token)
			uni.setStorageSync("userinfo", res);
			resolve(res)
		});
	})
}

// 判断是否登录
function yzlogin() {
	return new Promise(function(resolve, reject) {
		var openid = uni.getStorageSync("openid");
		if (!openid) {
			uni.navigateTo({
				url: "/pages/login/login"
			})
			reject(1)
		} else {
			resolve(2)
		}
	})
}

// 获取我的二维码 
function qrQrcode() {
	return new Promise(function(resolve, reject) {
		request.request({
			url: api.share.mini_qrcode,
			rejectType: 'true'
		}).then(res => {
			// console.log(res);
			uni.setStorageSync("qrQrcode", res);
			resolve(res)
		});
	})
}

// 获取零钱 
function getMoney() {
	return new Promise(function(resolve, reject) {
		request.request({
			url: 'index/user/userInfo'
		}).then(res => {
			// console.log(res)
			uni.setStorageSync("money", res.money)
			resolve(res.money)
		});
	})
};

// 获取城市
function getCity() {
	return new Promise(function(resolve, reject) {
		request.request({
			url: api.default.district,
			success(res){
				uni.setStorageSync("cityDataList", res)
			}
		});
	})
};

// 获取IM帐号
function getIM() {
	return new Promise(function(resolve, reject) {
		request.request({
			url: api.live.ImLogin,
			rejectType: 'true'
		}).then(res => {
			uni.setStorageSync("TimID", res)
			resolve(res)
		});
	})
}
// 获取配置文件
function getConfig() {
	return new Promise(function(resolve, reject) {
		request.request({
			url: api.default.config,
		}).then(res => {
			uni.setStorageSync("config", res)
		});
	})
}

// 直播数据统计
// field:{
// 	like点赞
// 	play_num播放
// 	common_total评论
// 	share_total分享
// 	click_goods_total点击商品
// }
function updateCounter(data) {
	return new Promise(function(resolve, reject) {
		request.request({
			url: api.live.update_counter,
			data: {
				id: data.id,
				field: data.field
			}
		}).then(res => {
			resolve(res)
		}).catch(res => {
			reject(res)
		});
	})
}

function subMesage() {
	return new Promise(function(resolve, reject) {
		let tmplIds = [];
		tmplIds.push(uni.getStorageSync("config").examine_tpl);
		console.log(tmplIds);
		uni.requestSubscribeMessage({
			tmplIds: tmplIds,
			success(res) {
				resolve(res)
				console.log(res)
			},
			fail(res) {
				reject(res)
				console.log(res)
			}
		})
	})
}
// 开始直播
function startLive(id) {
	request.request({
		url: api.live.start_live,
		data: {
			id: id,
		}
	})
}


export default {
	async Conversiontime(timestamp) {
		return Conversiontime(timestamp);
	},
	async userinfo() {
		return userinfo();
	},
	async yzlogin() {
		return yzlogin();
	},
	async qrQrcode() {
		return qrQrcode();
	},
	async getMoney() {
		return getMoney();
	},
	async unionLogin(option) {
		return unionLogin(option);
	},
	async getCity() {
		return getCity();
	},
	async getIM() {
		return getIM();
	},
	async updateCounter(data) {
		return updateCounter(data);
	},
	async getConfig() {
		return getConfig();
	},
	formatDate(data) {
		return formatDate(data);
	},
	async subMesage() {
		return subMesage();
	},
	startLive(id) {
		return startLive(id)
	}
}

import Vue from 'vue'
import App from './App'
import TIM from 'tim-js-sdk' 
//#ifndef MP-WEIXIN
import Vconsole from 'vconsole'
const vConsole = new Vconsole()
Vue.use(vConsole)
//#endif
let options = {
	SDKAppID: "1400329566" // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
};
// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
let tim = TIM.create(options); // SDK 实例通常用 tim 表示 
// 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
tim.setLogLevel(1); // 普通级别，日志量较多，接入时建议使用 
Vue.prototype.tim = tim;  
 
  
 
import config from './config.js' 
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)
 
import nolist from '@/components/nolist.vue'
Vue.component('nolist', nolist) 
 
 import tabview from '@/components/tabview.vue'
 Vue.component('tabview', tabview) 

import shear from '@/components/shear.vue'
Vue.component('shear', shear) 

import nomore from '@/components/nomore.vue'
Vue.component('nomore', nomore)

import sendCode from '@/components/sendCode.vue'
Vue.component('sendCode', sendCode)
 
import uniNoticeBar from '@/components/notice-bar/uni-notice-bar.vue'
Vue.component('uniNoticeBar', uniNoticeBar)  

import chunLeiModal from '@/components/chunLei-modal/chunLei-modal.vue'
Vue.component('chunLei-modal',chunLeiModal);

import goodslist from '@/components/goodslist.vue'
Vue.component('goodslist',goodslist);

import Skeleton from '@/components/J-skeleton/J-skeleton.vue'
Vue.component('Skeleton',Skeleton);   


// 下拉刷新
import scroll from '@/components/scroll/scroll.vue'
Vue.component('scroll',scroll);  

// 音频播放
import imtAudio from '@/components/imt-audio/imt-audio.vue'
Vue.component('imtAudio',imtAudio);  
// 音频播放
import gAudio from '@/components/gaudio.vue'
Vue.component('gAudio',gAudio);  


// 主页面
import material from './pages/tab/material/material.vue'
Vue.component('material',material)

import goodsIndex from './pages/tab/index/index.vue'
Vue.component('goodsIndex',goodsIndex)

import mine from './pages/tab/mine/mine.vue'
Vue.component('mine',mine)

import liveBroad from './pages/tab/liveBroad/liveBroad.vue'
Vue.component('liveBroad',liveBroad)
// end
 




import TabMask from '@/components/chunLei-modal/tabMask'
let tabMask = new TabMask({opacity:0.6})
 Vue.prototype.$tabMask = tabMask;
// 请求模块
import $request from "./tools/ajax.js";
Vue.prototype.$request = $request;
 
// 上传图片插件
import upload_img from "./tools/upload_img.js";
Vue.prototype.$Uploader = upload_img;
// 上传视频
import upload_video from "./tools/upload_video.js";
Vue.prototype.$Upvideo = upload_video;

// 支付
import $pay from "./tools/pay.js";
Vue.prototype.$pay = $pay; 

//杂项封装
import zax from "./tools/zax.js";
Vue.prototype.$zax = zax;

//表单验证 
import form from "./tools/form.js";
Vue.prototype.$form = form; 

//ucharts图表
import uCharts from "./js_sdk/u-charts/u-charts/u-charts.js";
Vue.prototype.uCharts = uCharts;

// 接口
import api from "./tools/api.js";
Vue.prototype.api= api;

// 弹窗
import tanchuang from './tools/model.js' 
Vue.prototype.tanchuang = tanchuang;

// 分享
import share from "@/tools/share1.js";
Vue.prototype.$share= share;
// 无状态提示信息
Vue.prototype.$alert = function(msg) {
	if (!msg) {
		return
	}
	uni.showToast({
		title: msg,
		icon: 'none'
	})
};
// 成功
Vue.prototype.$alertok = function(msg) {
	if (!msg) {
		return
	}
	uni.showToast({
		title: msg, 
	})
}; 
// 成功
Vue.prototype.$alertok = function(msg) {
	if (!msg) {
		return
	}
	uni.showToast({
		title: msg,
	})
};
// 强提示
Vue.prototype.$showModal = function(msg) {
	if (!msg) {
		return
	}
	uni.showModal({
		title: '提示',
		content:msg,
		showCancel:false,
		confirmText:'确定'
	})
};


// 通讯监听事件
tim.on(TIM.EVENT.SDK_READY, function(event) {
	// 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
	// event.name - TIM.EVENT.SDK_READY   
});


tim.on(TIM.EVENT.MESSAGE_RECEIVED, function(event) { 
	// 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
	// event.name - TIM.EVENT.MESSAGE_RECEIVED
	// event.data - 存储 Message 对象的数组 - [Message]
	var page = getCurrentPages();
	var thispage = page[page.length - 1]; 
	if(thispage.$vm.upMsgList){
		thispage.$vm.upMsgList(event.data)
	} 
});

tim.on(TIM.EVENT.MESSAGE_REVOKED, function(event) {
	// 收到消息被撤回的通知
	// event.name - TIM.EVENT.MESSAGE_REVOKED
	// event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
});

var test=[];

tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function(event) {  
	// var page = getCurrentPages(); 
	// var thispage = page[page.length - 1]; 
	// if(thispage.$vm.upMsgList){
	// 	thispage.$vm.upMsgList(event.data)
	// } 
});

tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function(event) {
	// 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
	// event.name - TIM.EVENT.GROUP_LIST_UPDATED
	// event.data - 存储 Group 对象的数组 - [Group]
});

tim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, function(event) {
	// 收到新的群系统通知
	// event.name - TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED
	// event.data.type - 群系统通知的类型，详情请参见 GroupSystemNoticePayload 的 operationType 枚举值说明
	// event.data.message - Message 对象，可将 event.data.message.content 渲染到到页面
});

tim.on(TIM.EVENT.PROFILE_UPDATED, function(event) {
	// 收到自己或好友的资料变更通知
	// event.name - TIM.EVENT.PROFILE_UPDATED
	// event.data - 存储 Profile 对象的数组 - [Profile]
});

tim.on(TIM.EVENT.BLACKLIST_UPDATED, function(event) {
	// 收到黑名单列表更新通知
	// event.name - TIM.EVENT.BLACKLIST_UPDATED
	// event.data - 存储 userID 的数组 - [userID]
});

tim.on(TIM.EVENT.ERROR, function(event) {
	// 收到 SDK 发生错误通知，可以获取错误码和错误信息
	// event.name - TIM.EVENT.ERROR
	// event.data.code - 错误码
	// event.data.message - 错误信息
});

tim.on(TIM.EVENT.SDK_NOT_READY, function(event) {
	// 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
	// event.name - TIM.EVENT.SDK_NOT_READY
});

tim.on(TIM.EVENT.KICKED_OUT, function(event) {
	// 收到被踢下线通知
	// event.name - TIM.EVENT.KICKED_OUT
	// event.data.type - 被踢下线的原因，例如:
	//    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
	//    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
	//    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢
});
// end

Vue.config.productionTip = false
 
Vue.prototype.$app = App; 

App.mpType = 'app'

const app = new Vue({ 
	...App
})
app.$mount()

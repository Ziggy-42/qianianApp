export default {
	// API地址
	base_url:'http://shop.qianniangy.net/',
	// 图片上传接口
	upload_img_url:'http://shop.qianniangy.net/addons/zjhj_mall/core/web/index.php?_acid=2&r=api/default/upload-image',
	// 视频上传
	upload_video_url:'api/common/upload', 
	debug:false,
	name: "小程序商城",
	uniacid: "1",
	acid: "2",
	multiid: "0",
	siteroot:"http://shop.qianniangy.net/app/index.php",
	apiroot: "http://shop.qianniangy.net/web/index.php?store_id=1&r=api/",
	design_method: "3",
	version:'2.8.9',
	// #ifdef MP-WEIXIN
	platform:'wx',
	// #endif
	// #ifndef MP-WEIXIN
	platform:'wx',
	// #endif
	_version:'2.8.9'
}
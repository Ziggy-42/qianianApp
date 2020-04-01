<script>
import Vue from 'vue';
import require from './tools/ajax.js';
export default {
	onLaunch: function(option) {
		if (!uni.getStorageSync('cityDataList')) {
			this.$zax.getCity();
		} 
		uni.getSystemInfo({
			success: function(e) {
				Vue.prototype.windowHeight = e.windowHeight;
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				}
				// #endif

				// #ifdef MP-WEIXIN
				Vue.prototype.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				Vue.prototype.Custom = custom;
				Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				// #endif

				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
			}
		});
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
@import 'colorui/main.css';
@import 'colorui/icon.css';
@import 'css/goods.css';
@import 'css/orderinfo.css';
@import 'css/video.css';
@import 'css/form.css';
@import 'css/dym.css';
@import 'css/goodsIcon.css';

page {
	background: #fff;
}

/* 抽屉分类样式 */
.cu-dialog {
	width: 350upx;
}
.rclass-li {
	height: 110upx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: #eeeeee 1upx solid;
	color: #000000;
}
/* end */

/* 顶部分类栏 */
.tclass-view {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 20upx;
	padding-left: 20upx;
	color: #fff;
}
.tclass-view .openclbtn {
	width: 149upx;
	height: 56upx;
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 28upx 0upx 0upx 28upx;
	text-align: center;
	line-height: 56upx;
}
.tclass-view .nav .cu-item {
	height: 80upx;
}
/* end */

.kong {
	width: 100%;
	height: 16upx;
	background-color: #f4f4f4;
}

.zcolor-btn {
	width: 658upx;
	height: 80upx;
	/* background-color: #f52618 !important; */
	border-radius: 40upx;
	color: #fff;
}

.smtext {
	display: flex;
	align-items: center;
	font-size: 27upx;
	color: #898989;
}
.smtext .icon {
	width: 30upx;
	height: 30upx;
	margin-right: 15upx;
}

.guo-nav .action {
	position: relative;
	color: #0088fe;
}
.guo-nav .action .after {
	width: 23upx;
	height: 8upx;
	background-color: #0088fe;
	border-radius: 4upx;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
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
	width: 210upx;
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

/* 带更多的标题 */
.more-title {
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0upx 47upx;
}
.more-title label {
	font-weight: 550;
	font-size: 30upx;
	color: #292929;
}
.more-title .more {
	font-size: 25upx;
	color: #a4a4a4;
}
/*  */
.lain {
	padding: 1upx 50upx;
	background: #e9e9e9;
	margin: 0upx 15upx;
}

.price-color {
	color: #ff0101;
}
.zcolor-btn {
	background-color: #f52618 !important;
	color: #fff;
}

/* 规格 */
.goods-bar {
	font-size: 24upx;
	color: #ff0101;
	background-color: #fdf4ff;
	border-radius: 6upx;
	padding: 10upx 15upx;
}

.click:active {
	opacity: 0.5;
}

/* 加减号 */
.add-del {
	width: 51upx;
	height: 51upx;
	background-color: #dcdcdc;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	border-radius: 51upx;
}

/* 条状商家 */
.let-mchView {
	display: flex;
	align-items: center;
	padding: 24upx 42upx;
	background: #fff;
}
.let-mchView .image {
	width: 116upx;
	height: 116upx;
	background-color: #eeeeee;
	border-radius: 10upx;
	margin-right: 18upx;
	overflow: hidden;
}
.let-mchView .image image {
	width: 116upx;
	height: 116upx;
	margin-right: 18upx;
}
.let-mchView .center {
	width: 400upx;
}
.let-mchView .mchName {
	font-size: 27upx;
	color: #2c2c2c;
	margin-top: 10upx;
}
.let-mchView .mchNum {
	font-size: 23upx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 38upx;
	letter-spacing: 0upx;
	color: #9b9b9b;
	margin-top: 20upx;
}
.let-mchView .cu-btn {
	width: 128upx;
	height: 54upx;
	background-color: #ffffff;
	border-radius: 27upx;
	border: solid 1upx #b601e5;
	font-size: 24upx;
	color: #b701e5;
}

.old-price {
	text-decoration: line-through;
	color: #a0a0a0;
}
/* 超出隐藏*/
.text-cut2 {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}

.no-border {
	border: none;
}

/* 左侧代竖 */
.title-xme {
	display: flex;
	align-items: center;
	padding-left: 40upx;
	background: #fff;
	height: 70upx;
	font-size: 28upx;
	color: #1f1f1f;
}
.title-xme .shu {
	width: 4upx;
	height: 28upx;
	background-color: #ff4c29;
	border-radius: 12upx;
	margin-right: 25upx;
}

/* 分享 */
.share-d-view {
	width: 750upx;
	height: 200upx;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	padding-top: 20upx;
}
.share-d-view .share-btn {
	font-size: 25upx;
	color: #2e2e2e;
	border: none;
}
.share-d-view .share-btn image {
	width: 66upx;
	height: 66upx;
}

.haibao .card-view {
	width: 659upx;
	height: 863upx;
	background-color: #ffffff;
	border-radius: 24upx;
	margin: auto;
	margin-top: 40upx;
	margin-bottom: 60upx;
}
.haibao .bg-img {
	width: 600upx;
	height: 600upx;
	margin-top: 0upx;
}
.haibao .card-view-down {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0upx 60upx 0upx 50upx;
	height: 200upx;
}
.haibao .qrcode {
	width: 120upx;
	height: 120upx;
}

.haibao .cu-avatar {
	width: 92upx;
	height: 92upx;
	margin-right: 20upx;
}
.haibao .tar-view {
	font-size: 21upx;
	color: #ffffff;
	background-image: linear-gradient(-60deg, #a44cff 0%, #c51cf0 100%);
	padding: 3upx 15upx;
	border-radius: 100upx;
	margin-left: 15upx;
}
.haibao .sevenhb {
	width: 425upx;
	height: 62upx;
	background-color: #b701e5;
	border-radius: 31upx;
}
/* 评论 */
.comment-view {
	padding: 10upx 45upx 30upx;
	background: #fff;
	border-bottom: solid #eee 1upx;
}
.comment-view .top-userInfo {
	display: flex;
	height: 120upx;
	align-items: center;
}
.comment-view .top-userInfo .cu-avatar {
	width: 62upx;
	height: 62upx;
	border-radius: 100upx;
	margin-right: 25upx;
}
.comment-view .top-userInfo .user-name {
	font-size: 26upx;
	line-height: 46upx;
	color: #494949;
}
.comment-view .top-userInfo .pl-time {
	font-size: 22upx;
	color: #b1b1b1;
}

.comment-view .comment-text {
	font-size: 26upx;
	line-height: 42upx;
	color: #818181;
	padding: 10upx 0upx 20upx;
}

/* 绘图 */
.canvas-view {
	position: fixed;
	top: -100%;
}

/*  */
.msgfoot {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}

/* 颜色 */
.zbg-red {
	background-color: #e11b01;
	color: #ffffff;
}
.z-color {
	color: #e11b01;
}
.bg-color-hong {
	background: #e11b01;
	color: #fff;
}
.tag-view {
	background-color: #ffe4df !important;
	color: #ff0101;
}
.bg-jhline {
	background-image: linear-gradient(98deg, #f52618 0%, #ff895a 100%);
	color: #fff;
}
.bg-lk {
	background-color: rgba(0, 0, 0, 0.5);
	color: #fff;
}
/*  */

/* 卡片轮播 */
.cardw-swiper {
	padding: 20upx 0upx;
}
.card-swiper {
	height: 425upx !important;
}
.card-swiper swiper-item {
	width: 345upx !important;
	border-radius: 16upx;
	overflow: inherit;
	padding: 0upx 0upx 0upx;
	height: 394upx !important ;
}
.card-swiper .swiper-item {
	box-shadow: 0upx 3upx 25upx 2upx rgba(186, 186, 186, 0.33);
}
.card-swiper .bg-img {
	height: 297upx;
	background-color: #dcdcdc;
	padding: 16upx;
}
.card-swiper .avatar {
	width: 56upx;
	height: 56upx;
	border-radius: 1000upx;
	margin-right: 20upx;
}
.card-swiper .down {
	display: flex;
	align-items: center;
	padding-left: 20upx;
	padding-top: 20upx;
	font-size: 26upx;
}

/*  */
.nav-view {
	white-space: nowrap;
}
.nav-view .zviewItem {
	display: inline-block;
}
.nav-view .jxView {
	width: 245upx;
	height: 364upx;
	background-color: #ffffff;
	box-shadow: 0upx 3upx 25upx 2upx rgba(186, 186, 186, 0.33);
	border-radius: 16upx;
	overflow: hidden;
	margin-left: 16upx;
}
.nav-view .jxView .image {
	width: 244upx;
	height: 244upx;
}
.nav-view .jxView .down {
	padding: 10upx 20upx;
	font-size: 25upx;
	line-height: 34upx;
	color: #212121 !important;
}
.nav-view .jxView .num {
	margin-top: 15upx;
	font-size: 22upx;
	color: #9d9d9d;
}

.pview {
	width: 100%;
	height: 220upx !important;
	margin: auto;
}
.pview .screen-swiper {
	height: 100%;
	min-height: 100%;
	width: 100% !important;
	border-radius: 0rpx !important;
	background-color: #fff;
}
.pview swiper-item {
	width: 460upx !important;
	height: 220upx !important;
	background: #fff;
}
.swiper-vai .pview navigator {
	width: 445upx;
	height: 100%;
	border-radius: 20upx;
	overflow: hidden;
}
</style>

<template>
	<view> 
		<view style="background-color: #f3f3f3;height: 21upx;width: 100%;"></view>

		<view class="order-top bg-white flex  justify-between  align-center ">
			<view>订单号:{{orderinfo.order_no?orderinfo.order_no:''}}</view>
			<view>{{orderinfo.addtime?orderinfo.addtime:''}}</view>
		</view> 

		<view class="list " v-for="(item,index) in orderinfo.goods_list" :key="index">
			<view class=" goods flex bg-white" :data-id="item.goods_id">
				<view class="cu-avatar lg goodsImg " :style="[{ backgroundImage: 'url(' + item.goods_pic + ')' }]"> </view>
				<view class="content" style="position: relative; width: 500upx;">
					<view class="">{{item.name?item.name:''}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut text-time" style="font-size: 22upx;color: #a8a8a8;line-height: 65upx;"> 
							<text v-for="(attr,attrindex) in item.attr" :key="attrindex" style="margin-right:10upx;">
								{{attr.attr_group_name?attr.attr_group_name:''}}:{{attr.attr_name?attr.attr_name:''}}
							</text> 
						</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut text-time">
							<text class="text-price">{{item.total_price?item.total_price:''}}</text>
						</view>
					</view> 
				</view>
			</view>
		</view> 
		
		<!--  -->
		<view class="bg-white" style="padding: 10upx 0upx;"> 
			<view class="li flex justify-between align-center" v-if="orderinfo.content" >
				<text>备注</text>
				<view>
					{{orderinfo.content?orderinfo.content:''}}
				</view>
			</view>
		</view>

		<view class="margin-top address">
			<view class="b-conten" style="margin-left: 56upx;margin-top: 23upx;">
				<view class="text-f" style="line-height: 37upx;font-size: 25upx;">
					<view>
						<text style="color: #000000;">收货信息：</text>{{orderinfo.name?orderinfo.name:''}} <text style="margin-left: 20upx;" >{{orderinfo.mobile?orderinfo.mobile:''}}</text> 
					</view>
					<view>
						<text style="color: rgba(0,0,0,0);">收货信息：</text>{{orderinfo.address?orderinfo.address:''}}
					</view>
				</view>
				<view class="text-f" style="line-height: 37upx;font-size: 25upx;margin-top: 20upx;">
					<text style="color: #000000;"> 物流信息：</text>{{orderinfo.express?orderinfo.express:''}}{{orderinfo.express_no?orderinfo.express_no:''}}
				</view>
			</view>
		</view>
		<view class="d-bottom margin-top bg-white">
			<view class="cu-timeline flex" v-for="(item,index) in express" :key="index">
				<view class="cu-time"> 
					<view class="tv-2">
						{{item.datetime?item.datetime:''}} 
					</view>
				</view>
				<view class="cu-item" :class="index==0?'cu-item1':(index+1==express.length?'cu-item2':'')">
					<view class="content" style="width:500upx;">
						<!-- <text>{{item.detail}}</text> -->
						{{item.detail?item.detail:''}}
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white"></view>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				detail: [ ],
				dingdan: [ ],
				express: [ ],
				id: '',
				orderinfo: '',
				detail_id:''
			}
		},
		methods: {
			// 获取订单信息
			getinfo() {
				this.$request
					.get({
							url: 'api/order/detail',
							data: {
								order_id: that.id
							}
						})
					.then(res => {
						if (res.code == 1) {
							this.$alert(res.msg);
						} else { 
							let orderinfo = res.data;
							that.getwl(orderinfo);
						}
					});
			},
			// 获取物流信息
			getwl(orderinfo){
				this.$request
					.request({
							url: 'api/order/express-detail',
							data: {
								order_id: that.id,
								detail_id:that.detail_id
							},
							rejectType:true
						} 
					)
					.then(res => {
						if (res.code == 1) {
							this.$alert(res.msg);
						} else {
							console.log(res);
							that.express=res.data.list;
							let goodslist=orderinfo.goods_list;
							let goods=res.data.order_detail;
							if(goods){
								let g=[]
								for(let i in goodslist){
									if(goods.goods_id==goodslist[i].goods_id){
										console.log("有",goodslist[i]);
										g.push(goodslist[i]);
									}
								}
								orderinfo.goods_list=g
							}
							that.orderinfo=orderinfo;
						}
						uni.hideLoading();
				});
			}
		},
		onLoad(option) {
			that = this;
			that.id = option.id;
			that.detail_id=option.detail_id?option.detail_id:''
			that.getinfo(); 
		}
	}
</script>

<style>
	.goodsImg {
		border-radius: 0;
		width: 151upx;
		height: 151upx;
		background-size: cover;
		margin-right: 34upx;
	}

	.order-top {
		height: 72upx;
		padding: 0upx 35upx;
		color: #a8a8a8;
		font-size: 24upx;
		border-bottom: solid 1upx #e4e4e4;
	}

	.goods {
		padding: 40upx;
		border-bottom: solid 1upx #e4e4e4;
		margin-bottom: 1upx;
	}

	.b-left {
		float: left;
		font-size: 25upx;
		line-height: 45upx;
		color: #afafaf;
	}

	.b-right {
		float: right;
	}

	/* .list {
		height: 227upx;
	} */

	.li {
		height: 60upx;
		font-size: 26upx;
		color: #afafaf;
		padding: 0upx 50upx;
	}

	.d-bottom {
		padding-top: 50upx;

	}

	.address {
		width: 100%;
		background-color: #fff;
		height: 178upx;
		padding-top: 8upx;
		color: #afafaf;
		padding-bottom: 20upx;
	}

	.cu-btn {
		width: 135upx;
		font-size: 25upx;
		height: 44upx;
		position: absolute;
		right: 10upx;
		bottom: 15upx;
		border: solid 1upx #4a4a4a;
	}

	.cu-timeline>.cu-item::before {
		font-family: "none";
		display: block;
		position: absolute;
		top: 0upx;
		z-index: 9;
		background-color: #d8d8d8;
		width: 16upx;
		height: 16upx;
		text-align: center;
		border: none;
		color: rgba(0, 0, 0, 0);
		border-radius: 50upx;
		line-height: 30upx;
		left: -7upx;
	}

	.cu-timeline>.cu-item1::before {
		font-family: "none";
		display: block;
		position: absolute;
		top: 0upx;
		z-index: 9;
		background-color: #ffffff;
		width: 30upx;
		height: 30upx;
		text-align: center;
		border: none;
		line-height: 30upx;
		left: -15upx;
		color: rgba(0, 0, 0, 0);
		background: url(/static/img/icon/icon-p.png) no-repeat;
		background-size: 100% 100%;
		background-position: center;
	}

	.cu-timeline>.cu-item::after {
		content: "";
		display: block;
		position: absolute;
		width: 5upx;
		background-color: #ddd;
		left: 0upx;
		height: 100%;
		top: 0;
		z-index: 8;
	}

	.cu-timeline>.cu-item2::after {
		content: "";
		display: block;
		position: absolute;
		width: 0upx !important;
		background-color: #ddd;
		left: 0upx;
		height: 100%;
		top: 0;
		z-index: 8;
	}

	.cu-timeline>.cu-item {
		padding: 15px 15px 15px 1px;
		position: relative;
		display: block;
		z-index: 0;
	}

	.cu-time {
		width: 147upx;
		/* border: solid #000 1upx; */
		text-align: right;
		padding: 0upx;
		padding-right: 25upx;
		position: relative;
		top: -20upx;

	}

	.cu-timeline>.cu-item>.content {
		padding: 0upx;
		border-radius: 6upx;
		display: block;
		line-height: 1.6;
		background-color: #FFF;
		position: relative;
		top: -44upx;
		margin-left: 30upx;
		color: #b4b4b4;
	}

	.cu-timeline>.cu-item1>.content {
		padding: 0upx;
		border-radius: 6upx;
		display: block;
		line-height: 1.6;
		background-color: #FFF;
		position: relative;
		top: -38upx;
		margin-left: 30upx;
		/* color: #b4b4b4; */
		color: #ff6060;
		font-size: 27upx;
	}

	.cu-time .tv-1 {
		font-size: 22upx;
		margin-bottom: 10upx;
	}

	.cu-time .tv-2 {
		font-size: 18upx;
	}
</style>

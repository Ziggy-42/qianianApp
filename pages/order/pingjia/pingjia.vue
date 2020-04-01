<template>
	<view>
		<!-- <cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">评价</block>
		</cu-custom> -->
		<view v-for="(item,index) in goodslist " :key="index">
			<view class="white"></view>
			<view class="goodsinfo flex align-center ">
				<view class="cu-avatar goodsimg" :style="[{ backgroundImage: 'url(' + item.goods_pic + ')' }]"></view>
				<view style=" margin-left: 20upx;">
					<view>{{item.name}}</view>
					<view style="margin-top: 35upx;">￥{{item.total_price}}</view>
				</view>
			</view>
			<view class="white"></view>
			<view class="titlei flash align-center">
				发表评价
			</view>
			<view class="flex align-center print">
				<view style="font-size: 30upx;">综合评级</view>
				<block v-for="(pj,index1) in pjlist" :key="index1">
					<view class="flex align-center print-v" @tap="printpj" :data-index="index" :data-id="pj.id">
						<image class="icon" v-if="item.score==pj.id" src="/static/img/icon/xuanzhong.png"></image>
						<image class="icon" v-else src="/static/img/icon/icon-printno.png"></image>
						<text>{{pj.name}}</text>
					</view>
				</block>
			</view>
			<view>
				<textarea class="textatea" :data-index="index" @input="getcontant" placeholder=" 商品是否让您满意？请输入您的评价"
				 placeholder-style="font-size: 26upx;color: #c8c8c8;"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img img-v" v-for="(img, index1) in item.uploaded_pic_list" :key="index1" @tap="ViewImage"
					 :data-url="img">
						<image :src="img" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index" :data-index1="index1"><text class="cuIcon-close"></text></view>
					</view>
					<view class="solids" @tap="choose_img_upload" :data-index="index" v-if="item.uploaded_pic_list?item.uploaded_pic_list.length < 4:true">
						<text class="cuIcon-add"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="text-center margin-top margin-bottom">
			<button class="cu-btn bg-yellow1 btn " @tap="subform">发表</button>
		</view>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				pjlist: [{
						name: '好评',
						id: 3,
					},
					{
						name: '中评',
						id: 2,
					},
					{
						name: '差评',
						id: 1,
					},
				],
				print: 0,
				goodslist: [],
			}
		},
		methods: {
			async choose_img_upload(e) {
				// var index = e;
				console.log(e);
				let uploader = new this.$Uploader();
				let path_arr = await uploader.choose_and_upload(1);
				that.goodslist[e.currentTarget.dataset.index]["uploaded_pic_list"] = that.goodslist[e.currentTarget.dataset.index]
					["uploaded_pic_list"].concat(path_arr);
			},
			getinfo() {
				this.$request
					.get({
							url: 'api/order/comment-preview',
							data: {
								order_id: that.id,
								type: "mall"
							}
						},
						'正在加载'
					)
					.then(res => {
						if (res.code == 1) {
							this.$alert(res.msg);
						} else {
							var list = res.data.goods_list;
							for (let i in list) {
								list[i]['score'] = 3;
								list[i]["uploaded_pic_list"] = []
							}
							that.goodslist = list;
							that.$forceUpdate();
							console.log("订单：", that.goodslist)
						}
					});
			},
			// 选择评价
			printpj(e) {
				console.log(e.currentTarget.dataset.index)
				that.goodslist[e.currentTarget.dataset.index]["score"] = e.currentTarget.dataset.id
			},
			// 提交评价
			subform(e) { 
				for(let i in that.goodslist) {
					console.log(that.goodslist[i])
					if(!that.goodslist[i].content){
						that.$alert("请为‘"+that.goodslist[i].name+"’填写您的评价");
						return
					}
				}  
				this.$request
					.post({
							url: 'api/order/comment',
							data: {
								order_id: that.id,
								goods_list:JSON.stringify(that.goodslist),
								type: "mall"
							}
						},
						'正在提交'
					)
					.then(res => {
						if (res.code == 1) {
							this.$alert(res.msg);
						} else {
							this.$alert(res.msg);
							setTimeout(function() {
								uni.navigateBack({
									delta:1
								})
							}, 1000);
						}
					});
			},
			// 获取评价内容
			getcontant(e) {
				that.goodslist[e.currentTarget.dataset.index]["content"] = e.detail.value;
			}
		},
		onLoad(option) {
			that = this;
			that.id = option.id
			that.getinfo();
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.icon {
		width: 30upx;
		height: 30upx;
	}

	.goodsinfo {
		height: 176upx;
		padding: 0upx 50upx;
	}

	.goodsimg {
		width: 116upx;
		height: 116upx;
	}

	.titlei {
		font-size: 26upx;
		color: #a5a5a5;
		padding-left: 59upx;
		height: 83upx;
		line-height: 83upx;
		border-bottom: solid 1upx #f0f0f0;
	}

	.print {
		height: 95upx;
		padding-left: 60upx;
		border-bottom: solid 1upx #f0f0f0;
	}

	.textatea {
		/* background: #F0F0F0; */
		margin: 20upx auto;
		width: 650upx;
		height: 200upx;
	}

	.print-v {
		font-size: 26upx;
		color: #a5a5a5;
		margin-left: 35upx;
	}

	.print-v text {
		margin-left: 15upx;
	}

	.btn {
		width: 501upx;
		height: 71upx;
	}
</style>

<template>
	<view>
		<form @submit="toSubmit">
			<view style="padding-top: 20upx;">
				<view class="card-view">
					<view class="card-title">商品封面</view>
					<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" @tap="ViewImage" :data-url="cover" v-if="cover">
								<image :src="cover" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" data-index="index" data-name="cover"><text class="cuIcon-close"></text></view>
							</view>
							<view class="solids bg-gray" @tap="ChooseImage" data-name="cover" v-if="!cover"><text class="cuIcon-add text-white " style="color: #FFF;"></text></view>
						</view>
					</view>
					<view class="card-title">商品轮播图</view>
					<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" v-for="(item, index) in imgList" @tap="ViewImage" :data-url="imgList[index]" v-if="imgList.length">
								<image :src="imgList[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImglist" :data-index="index" data-name="imgList"><text class="cuIcon-close"></text></view>
							</view>
							<view class="solids bg-gray" @tap="ChooseImagelist" data-name="imgList" :data-index="index" v-if="imgList.length < 4">
								<text class="cuIcon-add text-white " style="color: #FFF;"></text>
							</view>
						</view>
					</view>
					<view class="card-title">商品详情图</view>
					<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" v-for="(item, index) in imgdetaillist" @tap="ViewImage" :data-url="imgdetaillist[index]" v-if="imgdetaillist.length">
								<image :src="imgdetaillist[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImglist" :data-index="index" data-name="imgdetaillist"><text class="cuIcon-close"></text></view>
							</view>
							<view class="solids bg-gray" @tap="ChooseImagelist" data-name="imgdetaillist" :data-index="index" v-if="imgdetaillist.length < 8">
								<text class="cuIcon-add text-white " style="color: #FFF;"></text>
							</view>
						</view>
					</view>
					<view class="form-group">
						<label>商品名称</label>
						<view class="right no-border"><input name="name" placeholder="请输入名称" placeholder-class="placeholder" /></view>
					</view>
					<view class="form-group">
						<label>售价</label>
						<view class="right no-border"><input type="digit" name="price" placeholder="请输入售价" placeholder-class="placeholder" /></view>
					</view>
					<view class="form-group no-border">
						<label>虚拟销量</label>
						<view class="right no-border"><input name="virtual_sales" placeholder="请输入虚拟销量" type="number" placeholder-class="placeholder" /></view>
					</view>
				</view>
			</view>
			<view class="" style="padding: 0 80upx;"><button class="btn" form-type="submit" hover-class="btn_hover">提交</button></view>
		</form>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			imgList: [],
			imgdetaillist: [],
			cover: '',
			codeb: '',
			zheng: '',
			index: ''
		};
	},
	methods: {
		async ChooseImage(e) {
			var that = this;
			var name = e.currentTarget.dataset.name;
			let uploader = new this.$Uploader();
			let path_arr = await uploader.choose_and_upload(1);
			// this.imgList = this.imgList.concat(path_arr[0]);
			that[name] = path_arr[0];
			console.log('cover', that[name]);
		},
		async ChooseImagelist(e) {
			var that = this;
			var name = e.currentTarget.dataset.name;
			let uploader = new this.$Uploader();
			let path_arr = await uploader.choose_and_upload(1);
			that[name] = that[name].concat(path_arr[0]);
			console.log(name, that[name]);
		},
		DelImg(e) {
			var that = this;
			let index = e.currentTarget.dataset.index;
			var name = e.currentTarget.dataset.name;
			uni.showModal({
				title: '提示',
				content: '确定要删除该图片吗？',
				cancelText: '取消',
				confirmText: '确定',
				success(res) {
					if (res.confirm) {
						that[name] = '';
						// that.imgList = that.imgList.splice(index,1)
					}
				}
			});
		},
		DelImglist(e) {
			var that = this;
			console.log(that.api);
			var index = e.currentTarget.dataset.index;
			var name = e.currentTarget.dataset.name;
			console.log('name', name);
			console.log('index', index);
			console.log('that[name]', that[name]);
			uni.showModal({
				title: '提示',
				content: '确定要删除该图片吗？',
				cancelText: '取消',
				confirmText: '确定',
				success(res) {
					if (res.confirm) {
						let list = that[name];
						list.splice(index, 1);
						that[name] = list;
						console.log('list', list);
					}
				}
			});
		},
		toSubmit(e) {
			var that = this;
			var cover = that.cover;
			var imgList = that.imgList;
			var imgdetaillist = that.imgdetaillist;
			var name = e.detail.value.name;
			var virtual_sales = e.detail.value.virtual_sales;
			var price = e.detail.value.price;
			if (cover == '') {
				that.$alert('请上传商品封面');
				return false;
			}
			if (imgList.length == 0) {
				that.$alert('请上传商品轮播图');
				return false;
			}
			if (imgdetaillist.length == 0) {
				that.$alert('请上传商品详情图');
				return false;
			}
			if (name == '' || price == '' || virtual_sales == '') {
				that.$alert('请完善信息');
				return false;
			}
			that.$request
				.request({
					url: that.api.anchor_order.anchor_goods_add,
					method: 'POST',
					data: {
						name: name,
						cover: cover,
						price: price,
						slider: imgList,
						virtual_sales: virtual_sales,
						detail_image: imgdetaillist
					},
					Toast: '正在提交'
				})
				.then(res => {
					console.log(res);
					uni.showToast({
						title: '提交成功！',
						icon: 'success',
						duration: 1200
					});
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						});
					}, 1500);
				});
		}
	},
	onLoad() {},
	onUnload() {},
	onHide() {}
};
</script>

<style>
page {
	background: #f5f5f5;
}

.form-group {
	height: 112upx;
	padding: 10upx 43upx;
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
	text-align: right;
	padding: 10upx 0;
}

.placeholder {
	font-size: 28upx;
	color: #c6c6c6;
	text-align: right;
}

.upimg-view {
	border-bottom: solid #eeeeee 1upx;
	padding: 0upx 20upx 10upx;
}

.cu-form-group {
	padding: 2upx 44upx;
}

.card-view {
	width: 712upx;
	margin: auto;
	background: #fff;
	border-radius: 20upx;
	overflow: hidden;
}

.title {
	height: 80upx;
	line-height: 80upx;
	padding-left: 53upx;
	font-size: 26upx;
	color: #9f9f9f;
}

.card-title {
	height: 105upx;
	line-height: 105upx;
	padding-left: 43upx;
	font-size: 30upx;
	color: #000000;
}

.no-border {
	border: none;
}

.btn {
	margin: 40upx 0;
	font-size: 28upx;
	color: #fff;
	text-align: center;
	line-height: 80upx;
	height: 80upx;
	background-color: #b701e5;
	border-radius: 40upx;
	position: relative;
}

.btn_hover {
	top: 5upx;
}
</style>

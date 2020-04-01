<template>
	<view>
		<view class="line"></view>
		<form @submit="formSubmit">
			<view class="cu-form-group soldis-bottom ">
				<view class="title">邮件</view>
				<input placeholder="请输入标题" placeholder-class="" name="input" />
			</view>
			<view class="content"><textarea value="" name="content" placeholder="请输入内容" placeholder-style="color: #d6d6d6;font-size: 28upx;" /></view>
			<view class="upload" style="display: flex;justify-content: flex-start;flex-wrap: wrap;">
				<view
					class="c_upload"
					v-if="imglist.length"
					@tap="ViewImage"
					v-for="(item, index) in imglist"
					:key="index"
					:data-url="imglist"
					style="margin: 0 10upx 10upx 0;position: relative;"
				>
					<image :src="imglist[index]"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index" style="position: absolute;top: 0;right: 0;"><text class="cuIcon-close"></text></view>
				</view>
				<!-- <view class="solids" @tap="ChooseImage" data-name="imglist" v-if="!imglist" style="width: 184upx;height: 184upx;">
					<text class="cuIcon-add"></text>
				</view> -->
				<view class="c_upload" @tap="choose_img_upload(1)" v-if="imglist.length < 6"><image src="/static/icon/icon-upimg.png"></image></view>
			</view>

			<view class="f-view">
				<lable>添加音频</lable>
				<view class="f-right">
					<image src="/static/icon/icon-add.png"></image>
					<view class="text-red">
						<text class="cuIcon-delete"></text>
						删除
					</view>
				</view>
			</view>
			
			<view>
				<gAudio src ></gAudio>
			</view>
		 
			<view class="d_btn" style="padding: 0 75upx;margin-top: 130upx;">
				<view class=""><button class="btn" form-type="submit">提交</button></view>
			</view>
		</form>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			imglist: [],
			id: '',
			loading:true
		};
	},
	methods: {
		formSubmit(e) {
			var that = this;
			var content = e.detail.value.content;
			var id = that.id;
			var imglist = that.imglist;
			if (!content) {
				uni.showToast({
					title: '请输入举报内容',
					icon: 'none',
					duration: 1000
				});
				return false;
			}
			that.$request
				.request({
					url: that.api.live.report,
					method: 'POST',
					data: {
						id: id,
						content: content,
						image: imglist
					}
				})
				.then(res => {
					console.log(res);
					uni.showToast({
						title: '举报成功',
						icon: 'success',
						duration: 1000
					});
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						});
					}, 1200);
				});
			// .catch(() => console.log('promise catch err')); //捕获异常
		},
		async choose_img_upload(n) {
			// let name = e.currentTarget.dataset.name;
			let uploader = new this.$Uploader();
			let path_arr = await uploader.choose_and_upload(n);
			console.log('图片', path_arr);
			// that[name] = path_arr[0];
			this.imglist = this.imglist.concat(path_arr[0]);
		},
		DelImg(e) {
			var that = this;
			var index = e.currentTarget.dataset.index;
			uni.showModal({
				title: '提示',
				content: '确定要删除该图片吗？',
				cancelText: '取消',
				confirmText: '确定',
				success(res) {
					if (res.confirm) {
						console.log(index);
						console.log(typeof []);
						that.imglist.splice(index, 1);
					}
				}
			});
		}
	},
	onLoad(option) {
		that = this;
		console.log(option);
		that.id = option.id;
	}
};
</script>

<style>
page {
	background-color: #fff;
}
.line {
	height: 18upx;
	width: 100%;
	background-color: #f3f3f3;
}
.content {
	padding: 52upx 56upx;
}
.content textarea {
	width: 100%;
	height: 382upx;
}
.upload {
	padding: 0 56upx;
}
.c_upload {
	width: 184upx;
	height: 184upx;
	/* border-radius: 16upx; */
	/* border: solid 1upx #eaeaea; */
}
.c_upload image {
	width: 100%;
	height: 100%;
}
.btn {
	width: 590upx;
	height: 76upx;
	background-color: #f52618;
	border-radius: 38upx;
	color: #fff;
	font-size: 30upx;
	line-height: 71upx;
}
.upimg-view {
	border-bottom: solid #eeeeee 1upx;
	padding: 0upx 20upx 10upx;
}
.f-view {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0upx 50upx;
	height: 100upx;
}
.f-view .f-right image {
	width: 70upx;
	height: 70upx;
	border: solid 1upx #f5f5f5;
}


</style>

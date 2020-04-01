<template>
	<view>
		<view class="line"></view>
		<form @submit="formSubmit">
			<view class="">
				<view class="head  top">
					<view class="" style="color: #2f2f2f;">头像</view>
					<view class=""><image :src="info.avatar_url" style="width: 121upx;height: 121upx;border-radius: 50%;"></image></view>
				</view>
				<view class="head  list">
					<view class="" style="color: #2f2f2f;">昵称</view>
					<view class="">
						<input
							class="text-right"
							type="text"
							name="name"
							:value="info.nickname"
							@input="getinput"
							data-name="nickname"
							placeholder="请输入昵称"
							placeholder-style="text-align: right;color: #b5b5b5;"
						/>
					</view>
				</view>
				<view class="head  list">
					<view class="" style="color: #2f2f2f;">联系电话</view>
					<view class="">
						<input
							class="text-right"
							type="number"
							:value="info.binding"
							name="mobile"
							@input="getinput"
							data-name="binding"
							placeholder="请输入您的手机号"
							placeholder-style="text-align: right;color: #b5b5b5;"
						/>
					</view>
				</view>
				<view class="head flex justify-between align-center list">
					<view class="" style="color: #2f2f2f;">性别</view>
					<view class="" style="flex: 1;" >
						<picker  style="flex: 1;" @change="bindPickerChange" :value="index" :range="sex" range-key="name">
							<view class="uni-input text-right" style="color: #b5b5b5;flex: 1;">
								{{ sex[index] ? sex[index].name : '请选择' }}
								<text  class="cuIcon-right"></text>
							</view>
						</picker>
					</view>
				</view>
				<view class="head flex justify-between align-center list">
					<view class="" style="color: #2f2f2f;">出生日期</view>
					<view class="" style="flex: 1;">
						<picker style="flex: 1;" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input text-right" style="color: #b5b5b5;flex: 1;">{{ date ? date : '请选择日期' }}</view>
						</picker>
					</view>
				</view>
				
			</view>
			<view class="" style="padding: 0 128upx;width: 100%;"><button class="text-center btn" form-type="submit">保存</button></view>
		</form>
	</view>
</template>

<script>
var that;
export default {
	data() {
		return {
			index: 0,
			date: '',
			info: '',
			sex: [{ id: 1, name: '男' }, { id: 2, name: '女' }]
		};
	},
	methods: {
		getinput(e) {
			let name = e.currentTarget.dataset.name;
			that.info[name] = e.detail.value;
		},
		getuserInfo() {
			that.$zax.userinfo().then(res => {
				that.info = res.user_info;
				console.log(res);
			});
		},
		bindPickerChange(e) {
			that.index = e.detail.value;
		},
		bindDateChange(e) {
			that.date = e.detail.value;
		},
		formSubmit(e) {
			if (that.info.binding && !that.$form.isTel(that.info.binding)) {
				that.$alert('电话号码有误');
				return;
			}
			that.$request
				.request({
					url: that.api.user.UpdateUser,
					data: {
						nickname: that.info.nickname,
						binding: that.info.binding,
						birthday: that.date,
						sex: that.sex[that.index].id
					},
					method: 'post'
				})
				.then(res => {
					that.$alertok('修改成功！');
					that.$zax.userinfo();
				});
		}
	},
	onLoad() {
		that = this;
		that.info = uni.getStorageSync('userinfo');
		if (that.info.sex == 1) {
			that.index = 0;
		} else {
			that.index = 1;
		}
		console.log(that.index);
		that.$forceUpdate();
		that.date = that.info.birthday;
		that.getuserInfo();
	}
};
</script>

<style>
page {
	background: #ffffff;
}

.line {
	background: #f3f3f3;
	height: 16upx;
	width: 100%;
}

.top {
	padding: 26upx 47upx;
	border-bottom: 1upx solid #eee;
}

.list {
	padding: 0 47upx;
	height: 121upx;
	border-bottom: 1upx solid #eee;
}

.btn {
	width: 100%;
	height: 72upx;
	color: #fff;
	line-height: 72upx;
	font-size: 30upx;
	background-color: #b701e5;
	border-radius: 36upx;
	margin-top: 95upx;
}
.head {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>

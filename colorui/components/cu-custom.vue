<template>
	<view>
		<!-- ,skin ? 'skin1' : 'skin0' -->
		<view class="cu-custom" :class="[bgColor] " :style="[{ height: tubei?CustomBar+ 'px':'0px' }]"  >
			<view class="cu-bar fixed" :style="style" :class="[bgImage != '' ? 'none-bg text-white bg-img' : '', bgColor]"> 
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot> 
				</view>
				<view class="action" @tap="BackPage" v-if="ischa"> 
					<text class="cuIcon-close"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{ top: StatusBar + 'px' }]"><slot name="content">	</slot></view>
				<view class="action" :style="[{ top: StatusBar + 'px' }]"><slot name="action"></slot></view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
 
export default {
	data() {
		return {
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar
		};
	},
	name: 'cu-custom',
	computed: {
		style() {
			var StatusBar = this.StatusBar;
			var CustomBar = this.CustomBar;
			var bgImage = this.bgImage;
			var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
			if (this.bgImage) {
				style = `${style}background-image:url(${bgImage});`;
			}
			return style;
		}
	},
	props: {
		bgColor: {
			type: String,
			default: ''
		},
		isBack: {
			type: [Boolean, String],
			default: false
		},
		islist: {
			type: [Boolean, String],
			default: false
		},
		bgImage: {
			type: String,
			default: ''
		},
		ischa: {
			type: [Boolean, String],
			default: false
		},
		skin: {
			type: [Boolean, String],
			default: false
		},
		tubei:{
			type:Boolean,
			default: true
		}
	},
	methods: {
		BackPage() {
			if (this.islist) {
				uni.navigateTo({
					url: '/pages/pagesIndex/pagesIndex?id=3'
				});
			} else {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	} 
};
</script>

<style>
.cu-custom {
	z-index: 999999;
	background: rgba(0, 0, 0, 0);
}
.skin1 {
	background: #000000;
	color: #aaaaaa;
}
.skin0 {
	background: #1288ea;
	color: #ffffff;
}
</style>

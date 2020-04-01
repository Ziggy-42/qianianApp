<template>
	<view>
		<scroll-view class="sc-view" scroll-y :refresher-triggered="refresh" refresher-enabled="true" @refresherrefresh="downrefresh" @refresherrestore="restore" refresher-background="#f0f0f0" >
			<slot></slot>
		</scroll-view>
	</view>
</template>

<script>
var that;
export default {
	name: 'scroll',
	props: {
		type: {
			type: String,
			default: '1'
		}
	},
	data() {
		return {
			refresh: false
		};
	},
	computed: {},
	methods: {
		downrefresh() {
			this.$emit('downrefresh');
			that.refresh = true;
			setTimeout(res => {
				that.refresh = false;
			}, 10000);
		},
		stop() {
			that.refresh = false;
		},
		restore() {
			console.log('复位');
		}
	},
	created() {
		that = this;
	}
};
</script>
<style>
.sc-view {
	width: 100%;
	height: 100%;
}
</style>

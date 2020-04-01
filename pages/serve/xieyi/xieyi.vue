<template>
	<view>
		<rich-text :nodes="text">
			
		</rich-text>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				text:''
			}
		},
		methods: {
			
		},
		onLoad() {
			that=this;
			let text=uni.getStorageSync("text");  
			that.text=text.replace(/\<img/g, '<img style="width:100%;height:auto;display:block" ');
		}
	}
</script>

<style>
 page{
	 padding-top: 40upx ;
	 background-color: #FFF;
 }
</style>

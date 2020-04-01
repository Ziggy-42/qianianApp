(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo"],{

/***/ 352:
/*!****************************************************************************************************************!*\
  !*** E:/G/项目/千年国医/qiannianApp/main.js?{"page":"pages%2Forder%2FgroupOrder%2Fgorupgoodsinfo%2Fgorupgoodsinfo"} ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _gorupgoodsinfo = _interopRequireDefault(__webpack_require__(/*! ./pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo.vue */ 353));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_gorupgoodsinfo.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 353:
/*!*****************************************************************************************!*\
  !*** E:/G/项目/千年国医/qiannianApp/pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo.vue ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gorupgoodsinfo_vue_vue_type_template_id_118bcd40___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gorupgoodsinfo.vue?vue&type=template&id=118bcd40& */ 354);
/* harmony import */ var _gorupgoodsinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gorupgoodsinfo.vue?vue&type=script&lang=js& */ 356);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _gorupgoodsinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _gorupgoodsinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _gorupgoodsinfo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gorupgoodsinfo.vue?vue&type=style&index=0&lang=css& */ 358);
/* harmony import */ var _D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 16);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _gorupgoodsinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gorupgoodsinfo_vue_vue_type_template_id_118bcd40___WEBPACK_IMPORTED_MODULE_0__["render"],
  _gorupgoodsinfo_vue_vue_type_template_id_118bcd40___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _gorupgoodsinfo_vue_vue_type_template_id_118bcd40___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "E:/G/项目/千年国医/qiannianApp/pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 354:
/*!************************************************************************************************************************!*\
  !*** E:/G/项目/千年国医/qiannianApp/pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo.vue?vue&type=template&id=118bcd40& ***!
  \************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_template_id_118bcd40___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./gorupgoodsinfo.vue?vue&type=template&id=118bcd40& */ 355);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_template_id_118bcd40___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_template_id_118bcd40___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_template_id_118bcd40___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_template_id_118bcd40___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 355:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/G/项目/千年国医/qiannianApp/pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo.vue?vue&type=template&id=118bcd40& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 356:
/*!******************************************************************************************************************!*\
  !*** E:/G/项目/千年国医/qiannianApp/pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./gorupgoodsinfo.vue?vue&type=script&lang=js& */ 357);
/* harmony import */ var _D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 357:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/G/项目/千年国医/qiannianApp/pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var that;
var time;var _default =
{
  data: function data() {
    return {
      id: '',
      group_fail: 0,
      goods: {},
      info: {},
      limit_time: {},
      reduce_price: {},
      grouplist: [],
      modal: false,
      attr: [],
      num: 1,
      prinattr: [],
      attrgoods: [],
      iheight: uni.getStorageSync('iheight'),
      group_id: '',
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar,
      style: '',
      show: false,
      fxtablist: [
      {
        id: 0,
        image: '/static/img/invite/icon-wx.png',
        name: '分享到微信' }],
























      fx: '' };

  },
  methods: {
    tpshop: function tpshop() {

      uni.switchTab({
        url: '/pages/shop/shop' });


    },
    getstyle: function getstyle() {
      console.log('爱上表达哈', this.StatusBar);
      var StatusBar = this.StatusBar;
      var CustomBar = this.CustomBar;
      var style = "height:".concat(CustomBar, "px;padding-top:").concat(StatusBar, "px;");
      that.style = style;
    },
    BackPage: function BackPage() {
      // uni.redirectTo({
      // 	url: "/pages/order/groupOrder/orderlist/orderlist"
      // })
      uni.navigateBack({
        delta: 1 });

    },
    getinfo: function getinfo() {
      this.$request.request({
        url: 'api/group/order/group',
        data: {
          oid: that.id },

        success: function success(res) {
          console.log(res);
          var grouplist = res.data.groupList;
          for (var i in grouplist) {
            if (grouplist[i].avatar_url) {
              if (grouplist[i].avatar_url.search('http') == -1) {
                grouplist[i].avatar_url = uni.getStorageSync('url') + grouplist[i].avatar_url;
              }
            }
          }
          var e = (res.data.goods.original_price - res.data.goods.price).toFixed(2);
          that.goods = res.data.goods;
          that.info = res.data;
          that.countDownRun(res.data.limit_time_ms);
          that.grouplist = grouplist;
          that.reduce_price = e < 0 ? 0 : e;
          that.attr = res.data.attr_group_list;
          that.$forceUpdate();
        } });

    },
    // 倒计时
    countDownRun: function countDownRun(r) {
      time = setInterval(function () {
        var t = new Date(r[0], r[1] - 1, r[2], r[3], r[4], r[5]) - new Date(),
        e = parseInt(t / 1e3 / 60 / 60 / 24, 10),
        o = parseInt(t / 1e3 / 60 / 60 % 24, 10),
        a = parseInt(t / 1e3 / 60 % 60, 10),
        i = parseInt(t / 1e3 % 60, 10);
        e = that.checkTime(e), o = that.checkTime(o), a = that.checkTime(a), i = that.checkTime(i);
        var limit_time = {
          days: e,
          hours: o,
          mins: a,
          secs: i };

        that.limit_time = limit_time;
        that.$forceUpdate();
      }, 1e3);
    },
    checkTime: function checkTime(t) {
      return (t = 0 < t ? t : 0) < 10 && (t = '0' + t), t;
    },
    // 控制弹窗
    // hideModal(e) {
    // 	console.log(e);
    // 	if (e) {
    // 		if (e.currentTarget.dataset.type) {
    // 			that.modal = !that.modal;
    // 		} else {
    // 			if (that.prinattr.length == that.attr.length) {
    // 				that.modal = !that.modal;
    // 				that.groudbuy();
    // 			}
    // 		}
    // 	} else {
    // 		that.modal = !that.modal;
    // 	}
    // },
    hideModal: function hideModal(e) {
      if (e) {
        //判断但规格直接购买
        if (e.currentTarget.dataset.ok) {
          if (that.prinattr.length == that.attr.length) {
            if (e.currentTarget.dataset.type != 1) {
              that.groudbuy();
            }
          } else {
            that.$alert('请选择规格');
            return;
          }
        } else {
          if (that.attr.length == 1 && that.attr[0].attr_list.length == 1) {
            console.log('单规格');
            that.attr[0].attr_list[0]['type'] = true;
            var v = {
              attr_group_id: that.attr[0].attr_group_id,
              attr_id: that.attr[0].attr_list[0].attr_id,
              attr_name: that.attr[0].attr_list[0].attr_name };

            that.prinattr[0] = v;
            that.$forceUpdate();
            console.log('prinattr：', that.prinattr);
          }
          that.modal = !that.modal;
          that.paytype = e.currentTarget.dataset.type;
        }
      } else {
        that.modal = !that.modal;
      }
    },
    // 一件开团
    goToGoodsDetails: function goToGoodsDetails(t) {
      uni.navigateTo({
        url: '/pages/goods/goodsGroup/goodsGroup?gid=' + that.goods.id });

    },
    // 选择规格
    getattr: function getattr(e) {
      var attr_group_id = e.currentTarget.dataset.gid;
      var attr_id = e.currentTarget.dataset.id;
      var attr_name = e.currentTarget.dataset.name;
      for (var t = 0; t < that.attr.length; t++) {
        if (that.attr[t].attr_group_id == attr_group_id) {
          // console.log("当前大类:", that.attr[t]);
          for (var a = 0; a < that.attr[t].attr_list.length; a++) {
            if (that.attr[t].attr_list[a].attr_id == attr_id) {
              // console.log("选择的小类：", that.attr[t].attr_list[a]);
              that.attr[t].attr_list[a]['type'] = true;
            } else {
              that.attr[t].attr_list[a]['type'] = false;
            }
          }
        }
      }
      // 添加规格
      var list = [];
      for (var _t = 0; _t < that.attr.length; _t++) {
        for (var _a = 0; _a < that.attr[_t].attr_list.length; _a++) {
          if (that.attr[_t].attr_list[_a]['type'] == true) {
            var v = {
              attr_group_id: that.attr[_t].attr_group_id,
              attr_group_name: that.attr[_t].attr_group_name,
              attr_id: that.attr[_t].attr_list[_a].attr_id,
              attr_name: that.attr[_t].attr_list[_a].attr_name };

            // console.log("点击的", v);
            list = list.concat(v);
          }
        }
      }
      that.prinattr = list;
      // console.log('选择规格:', that.prinattr);
      // console.log("规格列表：", that.attr)
      this.$forceUpdate();
      that.getattringo();
    },
    comput: function comput(e) {
      var type = e.currentTarget.dataset.type;
      if (type == 0) {
        that.num = that.num + 1;
      } else {
        if (that.num == 1) {
          return;
        }
        that.num = that.num - 1;
      }
    },
    //获取规格信息
    getattringo: function getattringo() {
      var attr_list = [];
      for (var i in that.prinattr) {
        attr_list.push(that.prinattr[i].attr_id);
      }
      this.$request.request({
        url: 'api/group/index/goods-attr-info',
        data: {
          goods_id: that.goods.id,
          attr_list: JSON.stringify(attr_list),
          group_checked: 0,
          group_id: 0 },

        success: function success(res) {
          console.log('规格信息', res);
          that.attrgoods = res.data;
        } });

    },
    groudbuy: function groudbuy(e) {
      if (that.prinattr.length != that.attr.length) {
        that.hideModal();
        return;
      }
      var goods_info = {
        goods_id: that.goods.id,
        attr: that.prinattr,
        num: that.num,
        type: 'GROUP_BUY_C',
        deliver_type: '1',
        group_id: '',
        parent_id: that.info.oid };

      that.$request.request({
        url: 'api/group/order/submit-preview',
        data: {
          goods_info: JSON.stringify(goods_info),
          group_id: '',
          address_id: '',
          type: 'GROUP_BUY_C',
          longitude: '',
          latitude: '' },

        Toast: '正在提交',
        success: function success(res) {
          console.log(res.data);
          uni.setStorageSync('order', res.data);
          uni.redirectTo({
            url: '/pages/order/groupOrder/groupOrder?id=-1' });

        } });

    },
    // 分享弹窗
    c_show: function c_show(e) {



    },
    share: function share(e) {
      var goods = that.goods;



















    } },

  onLoad: function onLoad(option) {
    that = this;
    that.id = option.id;
    that.getinfo();
    that.getstyle();
  },
  onShow: function onShow() {
    if (!uni.getStorageSync('access_token')) {
      that.$zax.yzlogin();
      return;
    }
  },
  onUnload: function onUnload() {
    clearInterval(time);
  },
  onShareAppMessage: function onShareAppMessage() {
    console.log('分享');
    var goods = that.goods;
    return {
      imageUrl: goods.cover_pic,
      title: '我正在参与拼团，快来一起吧！',
      path: '/pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo?id=' + that.id + '&user_id=' + that.userinfo.id,
      success: function success(res) {
        console.log('成功', res);
      } };

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 358:
/*!**************************************************************************************************************************!*\
  !*** E:/G/项目/千年国医/qiannianApp/pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_2_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./gorupgoodsinfo.vue?vue&type=style&index=0&lang=css& */ 359);
/* harmony import */ var _D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_2_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_2_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_2_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_2_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_2_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gorupgoodsinfo_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 359:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/G/项目/千年国医/qiannianApp/pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[352,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/order/groupOrder/gorupgoodsinfo/gorupgoodsinfo.js.map
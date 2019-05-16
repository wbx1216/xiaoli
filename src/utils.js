import axios from 'axios';
export default {
	getCode: function() {
		if (!sessionStorage.getItem("userId") || sessionStorage.getItem("userId") == "undefined") {
			function getUrlKey(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[
					1].replace(/\+/g, '%20')) || null;
			}
			let code = getUrlKey("code")
			let state = getUrlKey("state")
			if (code) {
				axios.get("wechat/getUserId.htm?code=" + code + "&state=" + state).then((res) => {  
					if (res.data.userId) {
						sessionStorage.setItem("userId", res.data.userId)  
					} 
				})
			}
		}
	},
	wxShare:function(link,title,desc){ 
			let imgUrl=location.origin+"/include/image/icon.jpg"
			let url = encodeURIComponent(window.location.href.split('#')[0]) 
			let userId=sessionStorage.getItem("userId") 
			console.log(imgUrl,url,userId)
			axios.get("wechat/getJsSignature.htm?url=" + url).then((res) => {
			console.log(res)
			wx.config({
				debug: false,
				appId: res.data.appId,
				async: true,
				timestamp: res.data.timestamp,
				nonceStr: res.data.nonceStr,
				signature: res.data.signature,
				jsApiList: [ //需要调用的JS接口列表
					'onMenuShareTimeline', //判断当前客户端版本是否支持指定JS接口
					'onMenuShareAppMessage', //分享给好友 
				]
			}); 
			wx.ready(function() { //需在用户可能点击分享按钮前就先调用
				wx.onMenuShareAppMessage({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: link+"?userId="+userId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: imgUrl, // 分享图标
					success: function(res) {
						console.log(res)
					}
				})
				wx.onMenuShareTimeline({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link:  link+"?userId="+userId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: imgUrl, // 分享图标
					success: function(res) {
						console.log(res)
					}
				})
			});
		})
	}
}

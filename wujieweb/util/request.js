document.write('<script src="../../component/laydate/laydate.js"></script>');
document.write('<script src="../../util/jquery-3.4.1.js"></script>');
document.write('<script src="../../component/layer/layer.js"></script>');
document.write('<script src="../../component/layui/layui.js"></script>');
document.write('<script src="../../util/pageUtil.js"></script>');
document.write('<script src="../../util/vue.js"></script>');
document.write('<script src="../../component/element-ui/lib/index.js"></script>');
document.write('<script src="../../util/graceChecker.js"></script>');




const rootIp = "192.168.4.16";
const domain = "http://" + rootIp + ":9999";
// const domain = "http://192.168.3.60:9999";

const api = {
	rootIp: rootIp,
	domain: domain,
	deviceComp(reqObj = {}) {
		reqObj.url = domain + "/deviceComp";
		return yajax(reqObj);
	},
	addrInit(reqObj = {}) {
		reqObj.url = domain + "/addrInit";
		return yajax_notoken(reqObj);
	},
	deviceType(reqObj = {}) {
		reqObj.url = domain + "/deviceType";
		return yajax(reqObj);
	},
	cityByP(reqObj = {}) {
		reqObj.url = domain + "/cityByP";
		return yajax_notoken(reqObj);
	},
	areaByC(reqObj = {}) {
		reqObj.url = domain + "/areaByC";
		return yajax_notoken(reqObj);
	},
	streetByA(reqObj = {}) {
		reqObj.url = domain + "/streetByA";
		return yajax_notoken(reqObj);
	},
	secDeviceRegist(reqObj = {}) {
		reqObj.url = domain + "/secDeviceRegist";
		return yajax(reqObj);
	},
	preDeviceRegist(reqObj = {}) {
		reqObj.url = domain + "/preDeviceRegist";
		return yajax(reqObj);
	},
	deviceRegistElse(reqObj = {}) {
		reqObj.url = "http://" + reqObj.data.currIp + ":9999" + "/deviceRegistElse";
		return yajax_notoken(reqObj);
	},
	myEventList(reqObj = {}) {
		reqObj.url = "http://" + reqObj.data.currIp + ":9999" + "/myEventList";
		return yajax_notoken(reqObj);
	},
	events(reqObj = {}) {
		reqObj.url = "http://" + reqObj.data.currIp + ":9999" + "/events";
		return yajax_notoken(reqObj);
	},
	doEvent(reqObj = {}) {
		reqObj.url = "http://" + reqObj.data.currIp + ":9999" + "/doEvent";
		return yajax_notoken(reqObj);
	},
	deviceRegistManage(reqObj = {}) {
		reqObj.url = domain + "/deviceRegistManage";
		return yajax(reqObj);
	},
	searchNode(reqObj = {}) {
		reqObj.url = domain + "/searchNode";
		return yajax_notoken(reqObj);
	},
	tcpClientConnect(reqObj = {}) {
		reqObj.url = "http://" + reqObj.data.currIp + ":9999" + "/tcpClientConnect";
		return yajax_notoken(reqObj);
	},
	getTcpClientConnectInfo(reqObj = {}) {
		reqObj.url = "http://" + reqObj.data.currIp + ":9999" + "/getTcpClientConnectInfo";
		return yajax_notoken(reqObj);
	},
	owerLoginNotify(reqObj = {}) {
		reqObj.url = "http://" + reqObj.data.currIp + ":9999" + "/owerLoginNotify";
		return yajax_notoken(reqObj);
	},
	wjhttp(reqObj = {}) {
		reqObj.url = "http://" + rootIp + ":9999" + "/wjhttp";
		return yajax_notoken(reqObj);
	},
	getFullFzwno(reqObj = {}) {
		reqObj.url = "http://" + reqObj.data.ip + ":9999" + "/getFullFzwno";
		return yajax_notoken(reqObj);
	},
	getChildNodes(reqObj = {}) {
		reqObj.url = domain + "/getChildNodes";
		return yajax(reqObj);
	},
	getTreeData(reqObj = {}) {
		reqObj.url = domain + "/getTreeData";
		return yajax(reqObj);
	},
	userRegist(reqObj = {}) {
		reqObj.url = domain + "/userRegist";
		return yajax_notoken(reqObj);
	},
	addUser(reqObj = {}) {
		reqObj.url = "http://" + reqObj.data.currIp + ":9999" + "/addUser";
		return yajax_notoken(reqObj);
	},
	myUserList(reqObj = {}) {
		reqObj.url = "http://" + reqObj.data.currIp + ":9999" + "/myUserList";
		return yajax_notoken(reqObj);
	},
	getRelationTypes(reqObj = {}) {
		reqObj.url = domain + "/getRelationTypes";
		return yajax(reqObj);
	},
	// 退出登录
	logout(reqObj = {}) {
		reqObj.url = domain + "/PcUser/removeSession";
		return yajax(reqObj);
	},
	// 获取按钮权限
	getMenus(reqObj = {}) {
		reqObj.loading = false;
		reqObj.url = domain + "/findUserAllPermis";
		return yajax(reqObj);
	},
	// 获取系统信息
	getSystemConfig(reqObj = {}) {
		reqObj.loading = false;
		reqObj.url = domain + "/PcUser/getSystemConfig";
		return yajax(reqObj);
	},
	// 获取服务分类信息
	getVerifyCode(reqObj = {}) {
		reqObj.loading = false;
		reqObj.url = domain + "/PcUser/getVerifyCode";
		return yajax(reqObj);
	},
	// 登陆
	login(reqObj = {}) {
		reqObj.url = domain + "/userLogin";
		return yajax_notoken(reqObj);
	},
	// 获取左侧菜单
	getLeftMenus(reqObj = {}) {
		reqObj.url = domain + "/findUserAllPermis";
		return yajax(reqObj);
	},
	// 获取分页信息
	getPageData(reqObj = {}) {
		reqObj.url = domain + reqObj.url;
		return yajax(reqObj);
	},
	// 保存或者新增数据
	saveFrom(reqObj = {}) {
		reqObj.url = domain + reqObj.url;
		return yajax(reqObj);
	},










	// 自定义行为
	customAction(reqObj = {}) {
		reqObj.url = domain + reqObj.url;
		return yajax(reqObj);
	},

	// 获取所有的权限
	getAllMenuList(reqObj = {}) {
		reqObj.loading = false;
		reqObj.url = domain + "/PcMenu/findAllMenuList";
		return yajax(reqObj);
	},



};
// 同步执行ajax字节数组
function yajax_notoken({
	type = "POST",
	url,
	data = {},
	timeout = 10000,
	loading = true
}) {
	return new Promise((resolve, reject) => {
		let layerIdx = null;
		if (loading) {
			layerIdx = layer.msg('加载中', {
				icon: 16
			});
		}
		let token = localStorage.getItem("token");
		let url_no_token = localStorage.getItem("url_no_token");
		token = token != "" ? token : '';
		$.ajax({
			type: type,
			url: url,
			data: data,
			timeout: timeout,
			xhrFields: {
				withCredentials: false // 设置运行跨域操作
			},
			beforeSend: (XMLHttpRequest) => {
				// if(url_no_token==0){

				// }else{
				// XMLHttpRequest.setRequestHeader("Authorization", token);
				// }
				// XMLHttpRequest.setRequestHeader("Content-type", "application/octet-stream");
			},
			success(res) {
				layerIdx ? layer.close(layerIdx) : '';
				if (res.code == 'S00015') {
					// if(parent.location.pathname.indexOf("page/index/index.html") != 0){
					// 	parent.location.href = '../login/login.html';
					// 	return;
					// }
					window.location.href = '../login/login.html';
				}
				if (res.code == 304) {
					resolve(res);
					return;
				}
				if (res.code != 0) {
					reject(res);
					errMsg(res.msg || res.status);
					return;
				}
				resolve(res);
			},
			error(XmlHttpRequest, textStatus, errorThrown) {
				layerIdx ? layer.close(layerIdx) : '';
				errMsg(textStatus);
				reject(textStatus);
			}
		});
	});

}

// 同步执行ajax
function yajax({
	type = "POST",
	url,
	data = {},
	timeout = 10000,
	loading = true
}) {
	return new Promise((resolve, reject) => {
		let layerIdx = null;
		if (loading) {
			layerIdx = layer.msg('加载中', {
				icon: 16
			});
		}
		let token = localStorage.getItem("token");
		let url_no_token = localStorage.getItem("url_no_token");
		token = token != "" ? token : '';
		$.ajax({
			type: type,
			url: url,
			data: data,
			timeout: timeout,
			xhrFields: {
				withCredentials: false // 设置运行跨域操作
			},
			beforeSend: (XMLHttpRequest) => {
				// if(url_no_token==0){

				// }else{
				XMLHttpRequest.setRequestHeader("Authorization", token);
				XMLHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
				// }
			},
			success(res) {
				layerIdx ? layer.close(layerIdx) : '';
				if (res.code == 'S00015') {
					// if(parent.location.pathname.indexOf("page/index/index.html") != 0){
					// 	parent.location.href = '../login/login.html';
					// 	return;
					// }
					window.location.href = '../login/login.html';
				}
				if (res.code == 304) {
					resolve(res);
					return;
				}
				if (res.code != 0) {
					reject(res);
					errMsg(res.msg || res.status);
					return;
				}
				resolve(res);
			},
			error(XmlHttpRequest, textStatus, errorThrown) {
				layerIdx ? layer.close(layerIdx) : '';
				errMsg(textStatus);
				reject(textStatus);
			}
		});
	});

}

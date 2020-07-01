// 展示异常信息
function errMsg(msg) {
	layer.msg(msg, {
		icon: 2
	});
}


//询问框
/* 
	msg: 询问语句，
	url: 删除地址，
	data： {**id: id},
	that: VUE this 对象
 */
function inquiryPopup(url, data, that, msg = "你确定要删除吗？") {
	layer.confirm(msg, {
		btn: ['确定', '取消'], //按钮
		offset: 't20%'
	}, () => {
		delById(url, data, that);
	}, () => {});
}



// shiro按钮权限
var _shiroList, shiros, permissions, _clazzs;

function checkShiro() {
	if (shiros && shiros.length < 1) {
		return false;
	}
	// 页面权限按钮
	shiros = $(".shiro-btn");
	if (shiros.length < 1) {
		return false;
	}
	if (_shiroList) {
		showShiro(_shiroList, shiros);
		return false;
	}


	// 获取权限
	api.getMenus().then((res) => {
		if (res.code == 0) {
			_shiroList = res.data;
			showShiro(_shiroList, shiros);
		}
	});
}

function showShiro(_list, _shiros) {
	permissions = new Array(), _clazzs = "";
	for (var i = 0; i < _list.length; i++) {
		// 只处理按钮级别权限
		if (_list[i].levelNum == 2 && _list[i].permis) {
			permissions.push(_list[i].permis + "");
		}
	}
	$.each(_shiros, function(_index, _item) {
		var result = $.inArray($(_item).attr("data-shiro"), permissions);
		if (result > -1) {
			$(_item).show();
		}
	});
}




// shiro

// 权限认证
let auths, authority;
function checkAuths(auths){
	if (JSON.stringify(auths) == '{}') {
		return false;
	}
	
	if (authority) {
		authHandle(authority, auths);
		return false;
	}
	
	// 获取权限
	api.getMenus().then((res) => {
		if (res.code == 0) {
			const authList = res.data;
			authority = {};
			let i = 0;
			for(i; i < authList.length; i++){
				if(authList[i].levelNum == 2 && authList[i].permis){
					authority[authList[i].permis] = authList[i].permis
				}
			}
			authHandle(authority, auths);
		}
	});
}

// 需要认证的权限处理
function authHandle(authority, auths){
	for(let key in auths){
		if(authority[key]){
			auths[key] = true;
		}
	}
}

// 权限认证

// 弹出修改层
function openPage(html, title) {
	//页面层
	let openPageIndex = layer.open({
		title: [title, 'text-align: center;font-size: 20px;font-weight: 600;padding: 5px 0px;'],
		type: 1,
		skin: 'layui-layer-rim', //加上边框
		offset: '20px',
		area: ['60%', 'auto'], //宽高
		content: html
	});
	return openPageIndex;
}


// 翻页/刷新
function jumpPage(obj, first, that, params = {}, fun) {
	that.pageInfo = obj;
	if (first) {
		setTimeout(() => {
			checkShiro(that);
		}, 100)
		return;
	}
	// checkAuths(that.auths);
	let paramsData = {
		data: params
	};
	paramsData.url = that.pageUrl;
	paramsData.data.keyword = that.keyword;
	paramsData.data.currentPage = obj.curr;
	paramsData.data.pageSize = obj.limit;
	api.getPageData(paramsData).then((res) => {
		that.pageResult = res.data.list;
		fun ? fun() : '';
	});
	
}

// 分页初始化
function layuiPaging(count, that, params, fun) {
	// 分页初始化
	layui.use('laypage', () => {
		var laypage = layui.laypage;
		//执行一个laypage实例
		laypage.render({
			//注意，这里的 test1 是 ID，不用加 # 号
			elem: 'layui-paging',
			count: count, //数据总数，从服务端得到
			limit: that.pageInfo.limit || 10,
			limits: [10, 20, 30, 40, 50], // 每页条数的选择项
			layout: ['limit', 'count', 'prev', 'page', 'next', ],
			jump: (obj, first) => {
				jumpPage(obj, first, that, params, fun);
			}
		});
	});
}


// 初始化获取分页信息
function getPageData(that, api, fun, params = {}) {
	checkAuths(that.auths);
	let pageInfo = that.pageInfo;
	params.keyword = that.keyword;
	params.currentPage = 1;
	params.pageSize = pageInfo.limit || 10;
	api.getPageData({
		url: that.pageUrl,
		data: params,
		loading: false
	}).then((res) => {
		if (that.listLoading) {
			that.listLoading = false;
		}
		let totalCount = 0;
		if (res.data) {
			totalCount = res.data.total;
		}
		that.pageResult = res.data.list;
		layuiPaging(totalCount, that, params, fun);
		fun ? fun() : '';
		setTimeout(() => {
			checkShiro(that);
		}, 300)
	})
}




/* 修改方法
	url: 修改地址
	 e： 阻止默认页面刷新方法
	updateInfo： 修改的信息,
	that： VUE this 对象
 */
function updateFrom(url, e, updateInfo, that) {
	if (e) {
		e.preventDefault();
	}
	api.saveFrom({
		url: url,
		data: updateInfo
	}).then((res) => {
		if (res.code == 0) {
			if (that.operatingBool) {
				that.operatingBool = false;
			}
			if (that.dialogFormVisible) {
				that.dialogFormVisible = false;
			}
			that.pageRefresh();
			that.$message({
				message: '操作成功',
				type: 'success'
			});
		}
	});
}
/* 添加方法
	url: 添加地址
	e： 阻止默认页面刷新方法
	that: VUE this对象
 */
function addFrom(url, e, that, data, fun) {
	if (e) {
		e.preventDefault();
	}
	api.saveFrom({
		url: url,
		data: data || that.item || that.temp
	}).then((res) => {
		if (res.code == 0) {
			if (that.item) {
				that.item = {};
			}
			if (that.operatingBool) {
				that.operatingBool = false;
			}
			if (that.dialogFormVisible) {
				that.dialogFormVisible = false;
			}

			that.pageInit();
			fun ? fun() : '';
			layer.msg('操作成功', {
				icon: 1
			});
		}
	});
}

/* 根据ID删除
	url: 删除地址
	data： ｛**id: id｝
	that: VUE this对象
 */
function delById(url, data, that) {
	api.saveFrom({
		url: url,
		data: data
	}).then((res) => {
		if (res.code == 0) {
			that.pageInit();
			layer.msg('操作成功', {
				icon: 1
			});
		}
	});
}

/* 修改方法
	url: 修改地址
	 e： 阻止默认页面刷新方法
	updateInfo： 修改的信息,
	that： VUE this 对象
 */
function req(opts) {
	api.saveFrom({
		url: opts.url,
		data: opts.data
	}).then((res) => {
		if (res.code == 0) {
			if (opts.pageRefresh) {
				opts.that.pageRefresh();
			}
			opts.that.$message({
				message: '操作成功',
				type: 'success'
			});
		}
	});
}




/* 转换实体类中的key名为驼峰命名的形式 */
function objectTurningHump(object) {
	let obj = JSON.parse(JSON.stringify(object));
	let newObj = {};
	for (let key in obj) {
		if (key.indexOf("_") == -1) {
			newObj[key] = obj[key];
			continue;
		}
		let splitKey = key.split("_");
		let newKey = splitKey[0];
		for (let i in splitKey) {
			if (i > 0) {
				newKey += splitKey[i][0].toUpperCase() + splitKey[i].substring(1);
			}
		}
		newObj[newKey] = obj[key];
	}
	return newObj;
}



function uploadFile(data, fun) {
	return new Promise((resolve, reject) => {
		let layerIdx = layer.msg('加载中', {
			icon: 16
		});
		let token = localStorage.getItem("token");
		token = token != "" ? token : '';
		$.ajax({
			type: "post",
			url: domain + '/api/Upload/uploadImg',
			data: data,
			timeout: 10000,
			xhrFields: {
				withCredentials: true
			},
			//ajax2.0可以不用设置请求头，但是jq帮我们自动设置了，这样的话需要我们自己取消掉
			contentType: false,
			//取消帮我们格式化数据，是什么就是什么
			processData: false,
			beforeSend: (XMLHttpRequest) => {
				XMLHttpRequest.setRequestHeader("Authorization", token);
			},
			success(res) {
				layerIdx ? layer.close(layerIdx) : '';
				if (res.code != 0) {
					reject(res);
					errMsg(res.msg || res.status);
					return;
				}
				resolve(res);
			},
			error(err) {
				layerIdx ? layer.close(layerIdx) : '';
				errMsg(err.errorMessage || err.status);
				reject(err);
			}
		});
	});
	/* api.customAction({
		url: '/api/Upload/uploadImg',
		data
	}).then((res) => {
		
	}); */
}


/* function getPageInfo(that, data) {
	that.listLoading = true;
	data.currentPage = that.listQuery.page;
	api.getPageData({
		url: that.pageUrl,
		data: data,
	}).then((res) => {
		that.listLoading = false;
		const resData = res.data
		that.list = resData.list
	})
} */



/** 图片上传 */
function elUpload(uploadInfo, uploadFile) {
	const formdata = new FormData()
	formdata.append('file', uploadInfo.file)
	uploadFile(formdata).then((res) => {
		uploadInfo.onSuccess({
			url: res.data,
			pushName: uploadInfo.action
		})
	});
}
/** 图片上传成功 */
function elUploadSuccess(response, file, that) {
	file.url = response.url
	let pushNames = response.pushName.split(',');
	that.temp[pushNames[1]].push(response.url)
	// that[pushNames[0]].push({
	// 	url: response.url
	// })
}
/** el移除图片 */
function elRemoveImg(file, fileList, tempName, imgContainerName, that) {
	// 获取删除的对象下标
	let index = that[imgContainerName].map(item => item.uid).indexOf(file.uid);
	that.temp[tempName].splice(index, 1);
	that[imgContainerName] = fileList;
	console.info("=========删除结果")
	console.info(that.temp[tempName])
	console.info(that[imgContainerName])
	/* const carousel = that.temp[tempName];
	const bannerPreviews = that[imgContainerName];
	let i = 0
	for (i; i < carousel.length; i++) {
		if (carousel[i] === file.url) {
			carousel.splice(i, 1)
			bannerPreviews.splice(i, 1)
		}
	}
	that.temp[tempName] = carousel;
	that[imgContainerName] = bannerPreviews; */
}



function getExecl(formData, url, name) {
	let token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true); // 也可以使用POST方式，根据接口
	xhr.setRequestHeader("Authorization", token)
    xhr.responseType = "blob"; // 返回类型blob
    // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
    xhr.onload = function () {
      // 请求完成
      if (this.status === 200) {
        // 返回200
        var blob = this.response;
        var reader = new FileReader();
        reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href
        reader.onload = function (e) {
          // 转换完成，创建一个a标签用于下载
          var a = document.createElement("a");
          a.download = name + ".xls";
          a.href = e.target.result;
          $("body").append(a); // 修复firefox中无法触发click
          a.click();
          resolve(200)
          $(a).remove();
        };
      }
    };
    // 发送ajax请求
    xhr.send(formData);
  })
};
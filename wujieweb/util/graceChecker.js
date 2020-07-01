/**
数据验证（表单验证）
来自 grace.hcoder.net 
作者 hcoder 深海
*/
function checkForm(that, data, rule){
	for(var i = 0; i < rule.length; i++){
		if (!rule[i].checkType){return true;}
		if (!rule[i].name) {return true;}
		if (!rule[i].errorMsg) {return true;}
		if (!data[rule[i].name]) {that.error = rule[i].errorMsg; return false;}
		switch (rule[i].checkType){
			/* 不为空 */
			case 'notNull':
				if(data[rule[i].name] == null || data[rule[i].name].length < 1){that.error = rule[i].errorMsg; return false;}
			break;
			/* 验证字符长度或between(去掉前后空格) */
			case 'string':
				var str = data[rule[i].name].replace(/(^\s*)|(\s*$)/g, "");
				var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
				if(!reg.test(str)) {that.error = rule[i].errorMsg; return false;}
			break;
			/* 验证字符长度或between(去掉所有空格) */
			case 'pureString':
				var str = data[rule[i].name].replace(/\s+/g, "");
				var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
				if(!reg.test(str)) {that.error = rule[i].errorMsg; return false;}
			break;
			/* 手机号 */
			case 'phoneNo':
				var reg = /^1[0-9]{10,10}$/;
				if (!reg.test(data[rule[i].name])) { that.error = rule[i].errorMsg; return false; }
			break;
			/* 验证码 */
			case 'zipCode':
				var reg = /^[0-9]{6}$/;
				if (!reg.test(data[rule[i].name])) { that.error = rule[i].errorMsg; return false; }
			break;
			/* 交易密码 */
			case 'payPassword':
				var reg = /^[0-9]{6}$/;
				if (!reg.test(data[rule[i].name])) { that.error = rule[i].errorMsg; return false; }
			break;
			/* 再次输入(checkRule传上个input的name，如再次输入密码传password) */
			case 'reInput':
				if (data[rule[i].name] != data[rule[i].checkRule]) { that.error = rule[i].errorMsg; return false;}
			break;
			/* 邮箱 */
			case 'email':
				var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				if (!reg.test(data[rule[i].name])) { that.error = rule[i].errorMsg; return false; }
			break;
			/* 固定值true */
			case 'same':
				if (data[rule[i].name] != rule[i].checkRule) { that.error = rule[i].errorMsg; return false;}
			break;
			/* 固定值false */
			case 'notSame':
				if (data[rule[i].name] == rule[i].checkRule) { that.error = rule[i].errorMsg; return false; }
			break;
			/* indexOf */
			case 'in':
				if(rule[i].checkRule.indexOf(data[rule[i].name]) == -1){
					that.error = rule[i].errorMsg; return false;
				}
			break;
			/* 数字（包含负数和0） */
			case 'number':
				if(!isNumber(data[rule[i].name])) {that.error = rule[i].errorMsg; return false;}
				break;
			break;
			/* 金额（有最多两位小数的正实数） */
			case 'money':
				var reg = /^[0-9]+(.[0-9]{1,2})?$/;
				if(!reg.test(data[rule[i].name])) {that.error = rule[i].errorMsg; return false;}
				break;
			break;
			/* 整型 */
			case 'int':
				var reg = /^(-[1-9]|[1-9])[0-9]*$/;
				if(!reg.test(data[rule[i].name])) {that.error = rule[i].errorMsg; return false;}
				break;
			break;
			/* 数量（大于0的正整数） */
			case 'num':
				var reg = /^\+?[1-9][0-9]*$/;
				if(!reg.test(data[rule[i].name])) {that.error = rule[i].errorMsg; return false;}
				break;
			break;
			/* 正则 */
			case 'reg':
				var reg = new RegExp(rule[i].checkRule);
				if (!reg.test(data[rule[i].name])) { that.error = rule[i].errorMsg; return false; }
			break;
			/* number值的between */
			case 'between':
				if (!isNumber(data[rule[i].name])){
					that.error = rule[i].errorMsg;
					return false;
				}
				var minMax = rule[i].checkRule.split(',');
				minMax[0] = Number(minMax[0]);
				minMax[1] = Number(minMax[1]);
				if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
					that.error = rule[i].errorMsg;
					return false;
				}
			break;
			/* int值的between min < int > max */
			case 'betweenD':
				var reg = /^-?[1-9][0-9]?$/;
				if (!reg.test(data[rule[i].name])) { that.error = rule[i].errorMsg; return false; }
				var minMax = rule[i].checkRule.split(',');
				minMax[0] = Number(minMax[0]);
				minMax[1] = Number(minMax[1]);
				if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
					that.error = rule[i].errorMsg;
					return false;
				}
			break;
			/* float值的between */
			case 'betweenF': 
				var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
				if (!reg.test(data[rule[i].name])){that.error = rule[i].errorMsg; return false;}
				var minMax = rule[i].checkRule.split(',');
				minMax[0] = Number(minMax[0]);
				minMax[1] = Number(minMax[1]);
				if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
					that.error = rule[i].errorMsg;
					return false;
				}
			break;
		}
	}
	return true;
}
/* 是否是数字 */
function isNumber(checkVal){
	var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
	return reg.test(checkVal);
}
// 验证是否是手机号码
function isPhoneNo(checkVal){
	var reg = /^1[0-9]{10,10}$/;
	return reg.test(checkVal);
}
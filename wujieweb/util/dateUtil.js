
// 获取年月 2019-07
function getYearAndMonth() {
	const date = new Date();
	const seperator1 = "-";
	const year = date.getFullYear();
	let month = date.getMonth() + 1;
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	return year + seperator1 + month;
}

// 获取年月日 2019-05-01
function getNowFormatDate() {
	const date = new Date();
	const seperator1 = "-";
	const year = date.getFullYear();
	let month = date.getMonth() + 1;
	let strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	const currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

// 格式化时间搓为 yyyy-mm-dd
function formatDate(time) {
      let dateTimeStamp = time * 1000;
      var now = new Date();
      var y = now.getFullYear();
      var m = now.getMonth() + 1;
      var d = now.getDate();
      // 兼容苹果替换日期yyyy-MM-dd格式为yyyy/MM/dd
      if (typeof dateTimeStamp == "string") {
        var reg = getRegExp("-", "g");
        dateTimeStamp = dateTimeStamp.replace(reg, "/");
      }
      var date = new Date(dateTimeStamp);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();

      var result = "";
      if (year == y) {
        var n1 = new Date(y + "/" + m + "/" + d);
        var d1 = new Date(year + "/" + month + "/" + day);
        var diff = parseInt(n1 - d1);
        var cMinute = 1000 * 60;
        var cHour = cMinute * 60;
        var cDay = cHour * 24;
        var dayC = diff / cDay;
        // 补0
        month = month < 10 ? "0" + month + "" : "" + month + "";
        day = day < 10 ? "0" + day + "" : "" + day + "";
        hour = hour < 10 ? "0" + hour + "" : "" + hour + "";
        minute = minute < 10 ? "0" + minute + "" : "" + minute + "";

        if (dayC == 0) {
          result = "今天 " + hour + ":" + minute + "";
        } else if (dayC == 1) {
          result = "昨天 " + hour + ":" + minute + "";
        } else {
          result = year + "-" + month + "-" + day + " " + hour + ":" + minute + "";
        }
      } else {
        result =
          year + "-" + month + "-" + day + " " + hour + ":" + minute + "";
      }
      return result;
    }

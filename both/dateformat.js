
 DateFormat = {
	 
    dtformat : function (rksj,fmt) { //author: meizz 
		var o = {
			"M+": rksj.getMonth() + 1, //月份 
			"d+": rksj.getDate(), //日 
			"h+": rksj.getHours(), //小时 
			"m+": rksj.getMinutes(), //分 
			"s+": rksj.getSeconds(), //秒 
			"q+": Math.floor((rksj.getMonth() + 3) / 3), //季度 
			"S": rksj.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (rksj.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
};
$(document).on("turbolinks:load", function(){
	function SolarTerm(DateGL) {
		var SolarTermStr = new Array(
				"小寒", "大寒", "立春", "雨水", "惊蛰", "春分",
				"清明", "谷雨", "立夏", "小满", "芒种", "夏至",
				"小暑", "大暑", "立秋", "处暑", "白露", "秋分",
				"寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
		var DifferenceInMonth = new Array(
				1272060, 1275495, 1281180, 1289445, 1299225, 1310355,
				1321560, 1333035, 1342770, 1350855, 1356420, 1359045,
				1358580, 1355055, 1348695, 1340040, 1329630, 1318455,
				1306935, 1297380, 1286865, 1277730, 1274550, 1271556);
		var DifferenceInYear = 31556926;
		var BeginTime = new Date(1901 / 1 / 1);
		BeginTime.setTime(947120460000);
		for (; DateGL.getFullYear() < BeginTime.getFullYear();) {
				BeginTime.setTime(BeginTime.getTime() - DifferenceInYear * 1000);
		}
		for (; DateGL.getFullYear() > BeginTime.getFullYear();) {
				BeginTime.setTime(BeginTime.getTime() + DifferenceInYear * 1000);
		}
		for (var M = 0; DateGL.getMonth() > BeginTime.getMonth(); M++) {
				BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000);
		}
		if (DateGL.getDate() > BeginTime.getDate()) {
				BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000);
				M++;
		}
		if (DateGL.getDate() > BeginTime.getDate()) {
				BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000);
				M == 23 ? M = 0 : M++;
		}
		var JQ = "二十四节气";
		if (DateGL.getDate() == BeginTime.getDate()) {
				JQ += "    今日 <font color='#598F03'><b>" + SolarTermStr[M] + "</b></font>";
		} else if (DateGL.getDate() == BeginTime.getDate() - 1) {
				JQ += "　 明日 <font color='#598F03'><b>" + SolarTermStr[M] + "</b></font>";
		} else if (DateGL.getDate() == BeginTime.getDate() - 2) {
				JQ += "　 后日 <font color='#598F03'><b>" + SolarTermStr[M] + "</b></font>";
		} else {
				JQ = " 二十四节气";
				if (DateGL.getMonth() == BeginTime.getMonth()) {
						JQ += " 本月";
				} else {
						JQ += " 下月";
				}
				JQ += BeginTime.getDate() + "日" + "<font color='#598F03'><b>" + SolarTermStr[M] + "</b></font>";
		}
		return JQ;
	}
	$(".JQ").html(SolarTerm(new Date()))
	$('.JQ').css({'color': 'red', 'font-size': '20px'});
})
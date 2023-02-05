/* 计算下注得分 */
//有8个下注选项
var thisRound = new Array(8);

$(document).ready(function() {
	$(".btn").on("click",function(){
		var code = $(this).attr("code");
		//给显示灯管添加数字
		var num = thisRound[code];
		console.log(num);
		if(num == undefined){
			thisRound[code] = 1;
		}else{
			thisRound[code] = thisRound[code] + 1;
		}
		//给显示灯管赋值
		showIntegral(thisRound[code],code);
	});
});
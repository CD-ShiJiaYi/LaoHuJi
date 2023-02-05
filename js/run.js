/* 用于编写游戏开始后的动画 */
//一个轮回是24步
//开始后火车头后面带三个
//locomotive 车头
//carriage 车身
var gameInterval;
function gameStart(){
	var n = 1;
	//圈
	var number = 1;
	gameInterval = setInterval(()=>{
		if(n > 24){
			n = 1;
			number++;//圈速的增加
		}
		if(n<4 && number > 1){
			if(n == 3){
				runStep(n,n-1,n-2,24);
			}else if(n == 2){
				runStep(n,n-1,24,23);
			}else if(n == 1){
				runStep(n,24,23,22);
			}
		}else{
			runStep(n,n-1,n-2,n-3);
		}
		n++;
	},100);
}

//1个车头 4个车箱
function runStep(a,b,c,d){
	//清屏
	$(".step").html("");
	var loHtml = "<div class=\"locomotive\"></div>";
	var caHtml = "<div class=\"carriage\"></div>";
	$(".step"+a).html(loHtml);
	$(".step"+b).html(caHtml);
	$(".step"+c).html(caHtml);
	$(".step"+d).html(caHtml);
}



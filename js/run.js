/* 用于编写游戏开始后的动画 */
//一个轮回是24步
//开始后火车头后面带三个
//locomotive 车头
//carriage 车身
var gameInterval;
//音频
let audio1 = document.getElementById("audio1");
let audio2 = document.getElementById("audio2");
var n = 1;
//圈
var number = 1;
//中奖号
var winningNumbers = 0;
var loHtml = "<div class=\"locomotive\"></div>";
var caHtml = "<div class=\"carriage\"></div>";
var isRun = false;

function gameStart(){
	if(thisRoundIn == 0){
		layer.msg("请先下注");
		return;
	}
	if(!isRun){
		isRun = true;
		//随机一个中奖号码
		winningNumbers = generate_rand_num(1,24);
		number=0;
		n=0;
		gameInterval = setInterval("startRun()",100);
		audio1.play();
	}else{
		layer.msg("请等待本局结束");
	}
}

function startRun(){
	if(n > 24){
		n = 1;
		number++;//圈速的增加
	}
	runStep();
	//渐近加速效果
	if(n>=5 && number == 0){
		clearInterval(gameInterval);
		gameInterval = setInterval("startRun()",80);
	}
	if(n>=15 && number == 0){
		clearInterval(gameInterval);
		gameInterval = setInterval("startRun()",50);
	}
	if(n>=20 && number == 0){
		clearInterval(gameInterval);
		gameInterval = setInterval("startRun()",20);
	}
	//中奖操作
	if(number > 11 && winningNumbers == n){
		stopStep();
	}
	n++;
}

//1个车头 4个车箱
function runStep(){
	var a,b,c,d;
	if(n<4 && number > 1){
		if(n == 3){
			a = n;
			b = n-1;
			c = n-2;
			d = 24;
		}else if(n == 2){
			a = n;
			b = n-1;
			c = 24;
			d = 23;
		}else if(n == 1){
			a = n;
			b = 24;
			c = 23;
			d = 22;
		}
	}else{
		a = n;
		b = n-1;
		c = n-2;
		d = n-3;
	}
	
	//清屏
	$(".step").html("");
	$(".step"+a).html(loHtml);
	$(".step"+b).html(caHtml);
	$(".step"+c).html(caHtml);
	$(".step"+d).html(caHtml);
}
//停止运行
function stopStep(){
	audio1.load();
	audio2.play();
	clearInterval(gameInterval);
	$(".step").html("");
	$(".step"+n).html(loHtml);
	settlement();
}

//生成min_v到max_v之间的随机数
function generate_rand_num(min_v, max_v) {
    //min_v下限，max_v上限
    var rand_num = parseInt(Math.random() * (max_v - min_v + 1) + min_v);
    return rand_num
}

//结算方法
function settlement(){
	var obj = multiple[(winningNumbers-1)];
	//下注的量
	var xz = thisRound[obj.xz+1];
	if(xz != undefined && xz != -1){
		var od = xz;
		xz = (xz*obj.bei);
		userIntegral += xz;
		chageNum(userIntegral);
		setTimeout(()=>{
			layer.msg(od+" * "+obj.bei+" = "+(od*obj.bei));
		},1000);
	}
	//对应的开始闪烁2秒(待开发)
	setTimeout(()=>{
		//清除下注
		thisRound = new Array(8);
		for(var j = 1; j<9; j++){
			showIntegral(0,j);
		}
		thisRoundIn=0;
		isRun = false;
	},2000);
}


//大四喜
var dsxInterval;
//第几个
var appleStep = 0;
//步骤
var appleStep4 = [0,0,0,0];
//苹果位置
var appleLocal = [5,11,17,23];
//圈
var appleQuan = 0;

function dasixi(){
	 dsxInterval = setInterval("startDashixi()",150);
}

function startDashixi(){
	appleStep4[appleStep] = appleStep4[appleStep] + 1;
	var a = winningNumbers + appleStep4[appleStep];
	if(a > 24){
		a = a - 24
		appleQuan += 1;
	}
	
	$(".step"+a).html(loHtml);
	//第二步开始消除
	//if(appleStep4[appleStep] > 1){
		//对于命中项不清除
		if(a != winningNumbers){
			if(a == 1){
				$(".step"+24).html("");
			}else{
				var bh = 0;
				for(var i=0;i<appleStep;i++){
					if(a == appleLocal[i]+1){
						bh = 1;
						break;
					}
				}
				if(bh == 0){
					$(".step"+(a-1)).html("");
				}
			}
		}else{
			$(".step"+(a-1)).html("");
		}
	//}
	
	//第一个苹果
	if(a == appleLocal[appleStep] && appleQuan > 0){
		audio2.play();
		appleStep++;
		appleQuan=0;
		setTimeout(()=>{
			audio2.load();
		},1000);
		//实时结算
		DashixiSettlement();
	}
	if(appleStep == 4){
		stopDashixi();
	}
}


function stopDashixi(){
	clearInterval(dsxInterval);
	appleStep = 0;
	appleStep4 = [0,0,0,0];
	appleQuan = 0;
	
	var xz = thisRound[8];
	if(xz != undefined && xz != -1){
		xz = (xz*20);
		jieshuan(thisRoundIn,xz);
	}else{
		jieshuan(thisRoundIn,0);
	}
	setTimeout(()=>{
		//清除下注
		thisRound = new Array(8);
		for(var j = 1; j<9; j++){
			showIntegral(0,j);
		}
		thisRoundIn=0;
		audio4.load();
		isRun = false;
		audio5.play();
	},2000);
}

function DashixiSettlement(){
	var xz = thisRound[8];
	if(xz != undefined && xz != -1){
		xz = (xz*5);
		userIntegral += xz;
		chageNum(userIntegral);
	}
}
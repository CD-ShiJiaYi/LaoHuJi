/* 计算下注得分 */
//有8个下注选项
var thisRound = new Array(8);
//用户的总积分
var userIntegral = 0;
//本轮下注积分
var thisRoundIn = 0;

$(document).ready(function() {
	//初始化给所有灯管赋0
	for(var j = 1; j<9; j++){
		showIntegral(0,j);
	}
	//给用户赋一个初始值
	chageNum(userIntegral);
	
	$(".btn").on("click",function(){
		if(!isRun){
			//添加本轮积分
			thisRoundIn++;
			if(userIntegral >= 1){
				//屏幕减分
				var a = userIntegral-=1;
				chageNum(a);
				var code = $(this).attr("code");
				//给显示灯管添加数字
				var num = thisRound[code];
				if(num == undefined){
					thisRound[code] = 1;
				}else{
					thisRound[code] = thisRound[code] + 1;
				}
				//给显示灯管赋值
				showIntegral(thisRound[code],code);
			}
		}
	});
	
	
	//绑定上分事件
	$(".add-num").on("click",function(){
		//提示用户输入金额
		var money = prompt("充值多少(1-100)?",1);
		if(money != null){
			var number = /^[0-9]*$/;
			if(number.test(money)){
				console.log(money);
				if(money > 0 && money <= 100){
					//修改用户的积分
					userIntegral += (money * 10)
					chageNum(userIntegral);
				}
			}
		}
	})
	
	//绑定上开始事件
	$(".btn9").on("click",function(){
		gameStart();
	});
});


//定时刷新，不然会出现屏显问题
setInterval(()=>{
	chageNum(userIntegral);
	for(var j = 0; j<thisRound.length; j++){
		if(thisRound[j] == undefined){
			showIntegral(0,j);
		}else{
			showIntegral(thisRound[j],j);
		}
	}
	console.log("刷新数据");
},5000);
/* 计算下注得分 */
//有8个下注选项
var thisRound = new Array(8);
var czNum = 0;
//倍数
var multiple = [
	{'bei':10,"xz":6},
	{'bei':10,"xz":4},
	{'bei':50,"xz":0},
	{'bei':100,"xz":0},
	{'bei':5,"xz":7},
	{'bei':2,"xz":7},
	{'bei':10,"xz":5},
	{'bei':10,"xz":3},
	{'bei':2,"xz":3},
	{'bei':1,"xz":-1},
	{'bei':5,"xz":7},
	{'bei':2,"xz":6},
	{'bei':10,"xz":6},
	{'bei':10,"xz":4},
	{'bei':2,"xz":1},
	{'bei':20,"xz":1},
	{'bei':5,"xz":7},
	{'bei':2,"xz":5},
	{'bei':10,"xz":5},
	{'bei':20,"xz":2},
	{'bei':2,"xz":2},
	{'bei':1,"xz":-1},
	{'bei':5,"xz":7},
	{'bei':2,"xz":4}
];
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
		var code = $(this).attr("code");
		if(code != 9){
			if(!isRun){
				if(userIntegral >= 1){
					//给显示灯管添加数字
					var num = thisRound[code];
					if(num == undefined){
						thisRound[code] = 1;
					}else{
						if(num == 99){
							layer.msg("梭哈是一种智慧");
							return;
						}else{
							thisRound[code] = num + 1;
						}
					}
					//屏幕减分
					var a = userIntegral-=1;
					chageNum(a);
					//添加本轮积分
					thisRoundIn++;
					//给显示灯管赋值
					showIntegral(thisRound[code],code);
				}else{
					layer.msg("积分不足，请充值");
				}
			}else{
				layer.msg("请等待本局结束");
			}
		}
	});
	
	
	
	//绑定上分事件
	$(".add-num").on("click",function(){
		if(!isRun){
			if((userIntegral+thisRoundIn) >= 100){
				layer.msg("这么多积分，用完再充吧");
			}else{
				//提示用户输入金额
				layer.msg('充值5块钱？', {
				  time: 0 //不自动关闭
				  ,btn: ['确定', '关闭']
				  ,yes: function(index){
				    layer.close(index);
					//修改用户的积分
					userIntegral += 50;
					chageNum(userIntegral);
					if(audio5.isPlay){}
				  }
				});
			}
		}
	})
	
	//绑定盈亏事件
	$(".settlement").on("click",function(){
		if(!isRun){
			var userMoney = $.cookie("userMoney");
			layer.msg('已赚取：'+(userMoney)+'分', {
			   time: 0 //不自动关闭
			  ,title:'水果机系统提示'
			  ,btn: ['确定', '关闭']
			  ,yes: function(index){
			    layer.close(index);
			  }
			});
		}else{
			layer.msg("本局结束后再看吧");
		}
	});
	
	//绑定上开始事件
	$(".btn9").on("click",function(){
		gameStart();
	});
	
	//绑定重置事件
	$(".clear").on("click",function(){
		czNum++;
		if(czNum >= 8){
			czNum = 0;
			$.cookie("userMoney", 0, {
				expires: 1
			});
			$.cookie("userIntegral", 0, {
				//cookies信息的有效时常（7天）。
				expires: 7
			});
			userIntegral = 0;
			chageNum(userIntegral);
			layer.msg("重置成功！");
		}
	});
	setInterval(()=>{
		czNum = 0;
	},2000);
	
});


//定时刷新，不然会出现屏显问题
setInterval(()=>{
	if(!isRun){
		$.cookie("userIntegral", userIntegral, {
			//cookies信息的有效时常（7天）。
			expires: 7
		});
		console.log("自动保存积分");
	}
},3000);
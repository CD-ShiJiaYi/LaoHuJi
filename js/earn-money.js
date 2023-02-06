/* 用户科学合理的让用户上瘾，且挣钱 */
function winningVerification(a){
	//-------------- 待开发 --------------
	//按照当日总盈亏进行动态难度调整 优先级1
	//且0局内必须有6局是中奖状态(保持用户亢奋状态) 按照倍率保证不亏钱（小苹果特别容易中） 优先级2
	//对大于20倍的所有下注进行二次盈利判断 优先级3
	//当用户进行梭哈操作落点在大奖附近让用户愤怒 优先级4
	//当用户积分不足时(提高大四喜概率)大四喜进行奖励  优先级3

	//获取盈亏数据
	var userMoney = parseInt($.cookie("userMoney"));
	
	//负分难度机制
	if(userMoney < 0){
		return getHqdf(a);
	}
	//大四喜防亏损
	if(a == 10 || a == 22){
		var xz = thisRound[8];
		if(xz != undefined && xz != -1){
			xz = (xz*20);
			if(xz > userMoney){
				return 18;
			}else{
				return a;
			}
		}else{
			return a;
		}
	}
	
	//大四喜奖励机制
	if(userMoney > 1000 && userIntegral<=10 && a>=19 && a<=23){
		return 22;
	}
	
	//分析用户下注
	var obj = multiple[(a-1)];
	//下注的量
	var xz = thisRound[obj.xz+1];
	if(xz != undefined && xz != -1){//是否下注
		xz = (xz*obj.bei);
		if(thisRoundIn > xz){//下注的量小于赚取的量
			return a;
		}else{
			if(userMoney < 1000){//当天没有赚够100
				return getZxpl(a);
			}else{//如果赚够了就降低难度
				if(xz < 1000){//亏损不能大于赚的钱
					return a;
				}else{
					return 18;
				}
			}
		}
	}else{
		return a;
	}
}

//获取最小赔率
function getZxpl(a){
	var xzstep = 6;
	var xzks = 0;
	for(var i=0; i<multiple.length; i++){
		var xzfx = multiple[i];
		var xzjs = thisRound[xzfx.xz+1];
		if(xzjs != undefined && xzjs != -1){
			if(xzks == 0){
				xzks = xzjs*xzfx.bei
			}else{
				if(xzks > xzjs*xzfx.bei){
					xzks = xzjs*xzfx.bei
					xzstep = i+1;
				}
			}
		}
	}
	if(a == xzstep){
		xzstep = 21;
	}
	return xzstep;
}

//获取得分
function getHqdf(a){
	var xzstep = 6;
	var xzks = 0;
	for(var i=0; i<multiple.length; i++){
		var xzfx = multiple[i];
		var xzjs = thisRound[xzfx.xz+1];
		if(xzjs != undefined && xzjs != -1){
			if(xzks == 0){
				xzks = xzjs*xzfx.bei
			}else{
				if(xzks > xzjs*xzfx.bei){
					xzks = xzjs*xzfx.bei
					xzstep = i+1;
				}
			}
		}else{
			return i;
		}
	}
	if(a == xzstep){
		xzstep = 21;
	}
	return xzstep;
}



//a是下注 b是返还
function jieshuan(a,b){
	//赚的钱
	var c = a - b;
	var userMoney = $.cookie("userMoney");
	if(userMoney != undefined && userMoney != null){
		userMoney = parseInt(userMoney) + c;
		userMoney = parseInt(userMoney);
		$.cookie("userMoney", userMoney, {
			expires: 1
		});
	}
}
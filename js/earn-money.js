/* 用户科学合理的让用户上瘾，且挣钱 */
function winningVerification(a){
	//按照当日总盈亏进行动态难度调整 优先级1
	//且0局内必须有6局是中奖状态(保持用户亢奋状态) 按照倍率保证不亏钱（小苹果特别容易中） 优先级2
	//对大于20倍的所有下注进行二次盈利判断 优先级3
	//当用户进行梭哈操作落点在大奖附近让用户愤怒 优先级4
	//当用户积分不足时(提高大四喜概率)大四喜进行奖励  优先级3
	
	
	//分析用户下注
	if(){
		
	}
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
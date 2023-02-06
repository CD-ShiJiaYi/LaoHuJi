// 获取设备的宽高 计算游戏加载宽高
function gameInit(){
	let winWidth = $(window).width();
	let winHeight = $(window).height();
	//确保跑马灯位置是正方形
	$("#bg").css({
		"height":winHeight+"px",
		"width":winWidth+"px",
	});
	if(winWidth > winHeight){
		$("#bg").css({
			"height":winHeight+"px",
			"width":winWidth+"px",
			"transform": "rotate(90deg)"
		});
	}else{
		$("#bg").css({
			"height":winHeight+"px",
			"width":winWidth+"px"
		});
	}
	//老虎机的高度
	if(winHeight > 710){
		var mTop = (winHeight - 690)/2;
		$(".m1").css("margin-top",mTop+"px");
	}
	//获取cookie中的积分
	var nb = $.cookie("userIntegral");
	if(nb != undefined && nb != null){
		if(isNaN(nb)){
			nb = 0;
		}
		console.log(nb);
		userIntegral = parseInt(nb);
		chageNum(userIntegral);
	}
}

gameInit();


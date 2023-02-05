var digitSegments = [
	[1, 2, 3, 4, 5, 6],
	[2, 3],
	[1, 2, 7, 5, 4],
	[1, 2, 7, 3, 4],
	[6, 7, 2, 3],
	[1, 6, 7, 3, 4],
	[1, 6, 5, 4, 3, 7],
	[1, 2, 3],
	[1, 2, 3, 4, 5, 6, 7],
	[1, 2, 7, 3, 6, 4]

]
var oldNum = 0;
function chageNum(num){
	if(num < 0){
		num = 0;
	}
	if(num > 9999999){
		num = 9999999;
	}
	//数据跑动效果
	showNum(num)
	/* if(num > oldNum){
		var cn = setInterval(()=>{
			oldNum++;
			showNum(oldNum);
			if(num==oldNum){
				clearInterval(cn);
				oldNum = num;
			}
		},1);
	}else if(num < oldNum){
		var cn = setInterval(()=>{
			oldNum--;
			showNum(oldNum);
			if(num==oldNum){
				clearInterval(cn);
				oldNum = num;
			}
		},1);
	} */
}
//总积分
function showNum(num){
	var _digit = document.querySelectorAll('.digit');
	//切割数据
	var arr = num.toString().split('');
	var j = arr.length-1;
	for(var i=_digit.length;i>0;i--){
		var obj = _digit[i-1];
		setNumber(obj, Math.floor(arr[j]), 1);
		j--;
	}
}
//下注积分
function showIntegral(num,code){
	var _digit = document.querySelectorAll('.digit'+code);
	//切割数据
	var arr = num.toString().split('');
	var j = arr.length-1;
	for(var i=_digit.length;i>0;i--){
		var obj = _digit[i-1];
		setNumber(obj, Math.floor(arr[j]), 1);
		j--;
	}
}

var setNumber = function(digit, number, on) {
	var segments = digit.querySelectorAll('.segment');
	var current = parseInt(digit.getAttribute('data-value'));

	if (!isNaN(current) && current != number) {
		digitSegments[current].forEach(function(digitSegment, index) {
			setTimeout(function() {
				segments[digitSegment - 1].classList.remove('on');
			}, index * 45)
		});
	}

	if (isNaN(current) || current != number) {
		setTimeout(function() {
			try{
				digitSegments[number].forEach(function(digitSegment, index) {
					setTimeout(function() {
						segments[digitSegment - 1].classList.add('on');
					}, index * 45)
				});
			}catch(e){
				//手动打印异常
			}
		}, 250);
		digit.setAttribute('data-value', number);
	}
}
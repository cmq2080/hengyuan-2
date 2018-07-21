function back(){
	window.history.back(1);
}

function checkEmail(email){
	return /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]+$/.test(email);
}

function checkTelephone(telephone){
	return /^1[3|4|5|7|8]{1}[0-9]{9}$/.test(telephone);
}

function checkNum(obj) {
	var val=obj.value;
	while(!/^[0-9]*$/.test(val)){
		val=val.replace(/[^0-9]+/, '');
	}
	obj.value=val;
}

function checkFloat(obj){
	var str=obj.value;
	while(!/^[0-9.]*$/.test(str)){
		str=str.replace(/[^0-9.]+/, '');
	}
	while(!/^[0-9]{1}[0-9.]*/.test(str)){
		if(str.length==0){obj.value="";return;}
		str=str.substring(1);
	}
	str=str.split(".");
	if(str.length==1){
		obj.value= str[0];
	}else{
		obj.value= str[0]+"."+str[1];
	}
}

$(function(){
	/*
	 * 前台
	 */
	var html_height=parseInt($("html").css("height"));
	var header_height=$(".header").outerHeight(true);
	var footer_height=$(".footer").outerHeight(true);
	var content_margins=parseInt($(".content").css("margin-top"))+parseInt($(".content").css("margin-bottom"));
	var content_paddings=parseInt($(".content").css("padding-top"))+parseInt($(".content").css("padding-bottom"));
	console.log(content_margins);
	var height=html_height-header_height-footer_height-content_margins-content_paddings;
	$(".content").css({"min-height": height+"px"});
	
	/*
	 * 后台
	 */
	var e_tr=$(".main-table tbody tr");
	for(var i=0;i<e_tr.length;i++){
		if(i%2!=0){
			$(e_tr[i]).css({"background":"#ECECEC"});
		}
	}
	
	$("input[name='id']").on("click", function(){
		if($(this).is(":checked")){
			$(this).attr("checked", "checked");
		}else{
			$(this).removeAttr("checked");
			$("input[name='dataid']").removeAttr("checked");
		}
	});
	
	$("input[name='dataid']").on('click', function(){
		if($(this).is(":checked")){
			$("input[name='id']").attr("checked", "checked");
		}else{
			$("input[name='id']").removeAttr("checked");
		}
	});
});
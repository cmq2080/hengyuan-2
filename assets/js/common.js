// 返回上一页
function back() {
    window.history.back(1);
}

function verify(type, val) {
    switch (type) {
        case "telephone":
            return /^1[3|4|5|7|8]{1}[0-9]{9}$/.test(val);
            break;
        case "email":
            return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val);
            break;
        case "number":
            if (!val) {
                return false;
            } else {
                return !isNaN(val);
            }
            break;
        case "float":
            return /^(-?\d+)(\.\d+)?$/.test(val);
            break;
        case "date":
            return /^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/.test(val);
            break;
        default:
            alert("未知类型");
            return false;
            break;
    }
}

// 使用ajax来post数据（需引入jQuery）
function ajaxPost(url, data) {
    $.ajax({
        type: "post",
        url: url,
        dataType: "json",
        async: false,
        data: data,
        success: function (res) {
            alert(res.msg);
            if (res.stat == 0) {
                location.href = location.href;
            }
        },
        error: function (e) {
            alert("网络错误");
        }
    });
}

// 删除单条记录
function deleteOne(url, id, token) {
    if (!window.confirm("确定删除所选信息？")) {
        return false;
    }
    var postData = {"id": id};
    if (token) {
        postData._token = token;
    }
    ajaxPost(url, postData);
}

// 获取选中记录的id
function getSelected() {
    var checkbox = $("input.hy-id[type='checkbox']");
    var id = '';
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            id += checkbox[i].value + ",";
        }
    }
    if (id.length == 0) {// 没有选中，则返回false
        return false;
    }
    id = id.substr(0, id.length - 1);
    return id;
}

// 删除选中记录
function deleteSelected(url, token) {
    var id = getSelected();
    if (id == false) {
        alert("请选择有效信息");
        return false;
    }
    deleteOne(url, id, token);
}

// 在表单数据中获取某个相对应的值
function getFormValue(formData, name) {
    for (var i = 0; i < formData.length; i++) {
        if (formData[i].name == name) {
            return formData[i].value;
        }
    }
    return null;
}


$(function () {
    /*
     * ******************************** 前台 ********************************
     */
    // var html_height = parseInt($("html").css("height"));
    // var header_height = $(".header").outerHeight(true);
    // var footer_height = $(".footer").outerHeight(true);
    // var content_margins = parseInt($(".content").css("margin-top")) + parseInt($(".content").css("margin-bottom"));
    // var content_paddings = parseInt($(".content").css("padding-top")) + parseInt($(".content").css("padding-bottom"));
    // console.log(content_margins);
    // var height = html_height - header_height - footer_height - content_margins - content_paddings;
    // $(".content").css({ "min-height": height + "px" });

    /*
     * ******************************** 后台 ********************************
     */
    // var e_tr=$(".main-table tbody tr");
    // for(var i=0;i<e_tr.length;i++){
    // 	if(i%2!=0){
    // 		$(e_tr[i]).css({"background":"#ECECEC"});
    // 	}
    // }

    // 总checkbox选中事件
    $(".hy-main-table input.hy-data").on('click', function () {
        var ele_id = $(".hy-main-table input.hy-id");
        if ($(this).is(":checked")) {
            $(ele_id).prop("checked", "checked");
        } else {
            $(ele_id).prop("checked", false);
        }
    });

    // 分checkbox选中事件
    $(".hy-main-table input.hy-id").on("click", function () {
        if ($(this).is(":checked")) {
            $(this).attr("checked", "checked");
        } else {
            $(this).removeAttr("checked");
            $(".hy-main-table input.hy-data").removeAttr("checked");
        }
    });
});
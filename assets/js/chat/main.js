/**
 * Created by tcjr on 2017/6/26.
 */


var msgList = JSON.parse(localStorage.getItem("msgLogging")),
myDetail = {
    id: Math.floor(Math.random()*100000),
    face: "data:image/jpeg;base64,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",
},
otherDetail = {
  face: "data:image/jpeg;base64,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"
},
$messageBox = $("#messageBox"),
$sendBtn = $("#sendBtn"),
$messageInput =$("#messageInput")

window.onload=function () {
    relovesMsgList(msgList?msgList:[])
    $messageInput.on("keypress",function (event) {
        if(event.keyCode==13){
            var $val = $messageInput.val();
            sendMyMessage($val)
        }
    })


    $sendBtn.on("click",function () {
        var $this = $(this);
        var $val = $messageInput.val();
        sendMyMessage($val)
    })
}

function gotoScrollEnd(id) {
    var obj=document.getElementById(id)
    obj.scrollTop = obj.scrollHeight
}


function relovesMsgList(data) {
    var len = data.length;
    var html = "";
    html +='<ul id="messageList">'
    if(len>0){
        for(var i = 0; i<len;i++){
            var msg = data[i]
            var typeClass = "";
            switch (msg.type){
                case 1:
                    typeClass = "form-items"
                    break;
                case 2:
                    typeClass = "to-items"
                    break;
            }

            html += '<li class="message-items '+typeClass+'">'+
                        '<div class="message-main">'+
                            '<a href="javascript:void(0)" class="face-img-box">'+
                                '<img class="face-img" src="'+msg.face+'" alt="">'+
                            '</a>'+
                            '<div class="message-content-box clearfix">'+
                                '<div class="message-content">'+
                                    msg.content
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</li>'
        }
    }else {

    }
    html+='</ul>'
    $messageBox.html(html)
    gotoScrollEnd("messageBox");
}

function sendMyMessage(txt) {
    if(txt.length > 0){
        var $id = 'content-'+Math.floor(Math.random()*10000)
        var str = '<li class="message-items to-items">'+
            '<div class="message-main">'+
            '<a href="javascript:void(0)" class="face-img-box">'+
            '<img class="face-img" src="'+myDetail.face+'" alt="">'+
            '</a>'+
            '<div class="message-content-box clearfix">'+
            '<div class="message-content" id="'+$id+'">'+
            '<div class="sending-box">' +
            '<div class="sending-1"></div>'+
            '<div class="sending-2"></div>'+
            '<div class="sending-3"></div>'+
            '</div>'
        '</div>'+
        '</div>'+
        '</div>'+
        '</li>';
        $("#messageList").append(str)
        $messageInput.val("")
        gotoScrollEnd("messageBox");
        askXiaoYueSen(txt,function () {
            $("#"+$id).html(txt);
            msgList = JSON.parse(localStorage.getItem("msgLogging"))
            relovesMsgList(msgList?msgList:[])
            gotoScrollEnd("messageBox");
        })
        addMsg(2,txt,myDetail)
    }else {
        $messageInput.prop("placeholder","请输入聊天内容").focus();
    }


}

function addMsg(type,txt,userInfo) {
    msgList = JSON.parse(localStorage.getItem("msgLogging"))
    msgList = msgList?msgList:[]
    saveLocalStorage(msgList.concat([
        {
            face: userInfo.face,
            type: type,
            content:txt
        }
    ]));
}


function saveLocalStorage(msgLists) {
    localStorage.setItem("msgLogging",JSON.stringify(msgLists))
}


function askXiaoYueSen(txt,callback) {
    $.post("http://www.tuling123.com/openapi/api",
        {
        "key":"c21cd0d45d5e431dab34e79520de8872",
        "info": txt,
        'userid': myDetail.id
    },function (result) {
        addMsg(1,result.text,otherDetail)
        callback();
    })
}
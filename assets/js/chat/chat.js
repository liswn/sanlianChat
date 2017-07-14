/**
 * Created by tcjr on 2017/6/27.
 */
function chatObj() {
    this.chatWindow
    this.myself
    this.yourself
    this.chatRecords = []
}

chatObj.prototype.init = function (myself,yourself,chatWindow,inputControl) {
    this.chatWindow = chatWindow
    this.inputControl = inputControl
    this.myself = myself
    this.yourself = yourself
    this.chatRecords = JSON.parse(localStorage.getItem("chatRecords-"+myself.id + '-' + yourself.id)) || []

    for(var index in this.chatRecords){
        this.createBubble(this.chatRecords[index])
    }
}
/**
 * 发送消息
 * @param txt
 */
chatObj.prototype.sendMessage = function(){
    var $this = this,
        text = this.inputControl.val()
    if(text.length>0&&text!=""){
        this.inputControl.val("")
        //使用图灵机器人
        var sendMessage = new Message(MessageType.loading,text);
        this.sendLoading(sendMessage);
        $.post("http://www.tuling123.com/openapi/api",
            {
                "key":"c21cd0d45d5e431dab34e79520de8872",
                "info": text,
                "loc":"北京市海淀区信息路28号",
                "lon": "116.234632",
                "lat":"39.45492",
                'userid': this.myself.id
            },function (result) {
                $this.saveMessageLocalStorage(sendMessage)
                var getMessage = new Message(MessageType.receive,result.text,result.url,result.code,result.list);
                $this.saveMessageLocalStorage(getMessage)
            })
    }else {
        this.inputControl.prop("placeholder","请输入聊天内容").focus()
    }
}

/**
 * 将消息保存到本地
 * @param message
 */
chatObj.prototype.saveMessageLocalStorage=function (message) {
    this.createBubble(message)
    if(message.type ==MessageType.loading){
        message.type = MessageType.send
    }
    if(this.chatRecords.length>100){
        this.chatRecords.splice(0,20)
    }
    this.chatRecords.push(message)
    localStorage.setItem("chatRecords-"+this.myself.id + '-' + this.yourself.id,JSON.stringify(this.chatRecords))
}

/**
 * 发送消息时的动画
 * @param message
 */
chatObj.prototype.sendLoading = function (message) {
    var _html = '<div class="message-items to-items" id="'+message.id+'">'+
            '<div class="message-main">'+
            '<a href="javascript:void(0)" class="face-img-box">'+
            '<img class="face-img" src="'+this.myself.avatar+'" alt="">'+
            '</a>'+
            '<div class="message-content-box clearfix">'+
            '<div class="message-content">'+
            '<div class="sending-box">' +
            '<div class="sending-1"></div>'+
            '<div class="sending-2"></div>'+
            '<div class="sending-3"></div>'+
            '</div>'
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>';
    this.chatWindow.append(_html)
    this.gotoScrollEnd(this.chatWindow)
}

/**
 * 创建聊天气泡
 * @param message
 */
chatObj.prototype.createBubble = function(message){
    var _html = ""
    var _listStr = ""

    if(message.code == 308000 && message['list']!=null){
        var $html = ""
        var len = message['list'].length
        for( var i = 0;i < len;i++){
            var item = message.list[i]
            $html += '<a class="result-list-items" href="'+item.detailurl+'">' +
                    '<img class="result-list-icon" src="'+item.icon+'"/>'+
                    '<div>' +
                    '<h4 class="result-list-title">'+item.name+'</h4>'+
                    '<p class="result-list-desc">'+ item.info +'</p>'+
                    '</div>'+
                '</a>'
        }

        _listStr+='<div class="result-list-box">'+$html+'</div>'
        _listStr+= '<div class="result-list-count">为您找到'+len+'条可用信息</div>'
    }

    switch (message.type){
        case MessageType.loading:
            $("#"+message.id).find(".message-content").html(message.text)
            break
        case MessageType.receive:
            _html = '<div class="message-items form-items">'+
                        '<div class="message-main">'+
                        '<a href="javascript:void(0)" class="face-img-box">'+
                        '<img class="face-img" src="'+this.yourself.avatar+'" alt="">'+
                        '</a>'+
                        '<div class="message-content-box clearfix">'+
                        '<div class="message-content">'+
                            message.text+
                            (message.code === 200000?'<a class="answer-link" href="'+message.url+'">[点击查看]</a>':'')+
                            _listStr+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'
            break
        case MessageType.send:
            _html = '<div class="message-items to-items">'+
                '<div class="message-main">'+
                '<a href="javascript:void(0)" class="face-img-box">'+
                '<img class="face-img" src="'+this.myself.avatar+'" alt="">'+
                '</a>'+
                '<div class="message-content-box clearfix">'+
                '<div class="message-content">'+
                    message.text
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'
            break
        default:
            break
    }
    this.chatWindow.append(_html)
    this.gotoScrollEnd(this.chatWindow)
}

chatObj.prototype.gotoScrollEnd = function(obj) {
    obj.scrollTop(obj[0].scrollHeight);
}
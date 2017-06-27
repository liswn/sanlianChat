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
        console.log(this.chatRecords[index])
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
                'userid': this.myself.id
            },function (result) {
                $this.saveMessageLocalStorage(sendMessage)
                var getMessage = new Message(MessageType.receive,result.text);
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
    this.chatRecords.push(message)
    localStorage.setItem("chatRecords-"+this.myself.id + '-' + this.yourself.id,JSON.stringify(this.chatRecords))
}

/**
 * 发送消息时的动画
 * @param message
 */
chatObj.prototype.sendLoading = function (message) {
    var _html = '<li class="message-items to-items" id="'+message.id+'">'+
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
        '</li>';
    this.chatWindow.append(_html)
    this.gotoScrollEnd(this.chatWindow)
}

/**
 * 创建聊天气泡
 * @param message
 */
chatObj.prototype.createBubble = function(message){
    var _html = ""
    switch (message.type){
        case MessageType.loading:
            $("#"+message.id).find(".message-content").html(message.text)
            break
        case MessageType.receive:
            _html = '<li class="message-items form-items">'+
                        '<div class="message-main">'+
                        '<a href="javascript:void(0)" class="face-img-box">'+
                        '<img class="face-img" src="'+this.yourself.avatar+'" alt="">'+
                        '</a>'+
                        '<div class="message-content-box clearfix">'+
                        '<div class="message-content">'+
                        message.text
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</li>'
            break
        case MessageType.send:
            _html = '<li class="message-items to-items">'+
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
            '</li>'
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
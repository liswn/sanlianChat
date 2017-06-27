/**
 * Created by tcjr on 2017/6/27.
 */
function Message(type,text,url,code,list) {
    this.id = "Message-"+Math.floor(Math.random()*9999999)
    this.code = code
    this.list = list
    this.type = type || MessageType.send
    this.text = text
    this.url = url
    this.time = new Date()
}







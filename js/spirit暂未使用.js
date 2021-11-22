// 暂时先用ES5的写法（因为不需要继承，所以ES6的写法没方便到哪里去）
var Spirit = function(json){
        this.x = json.x;
        this.y = json.y;
        this.w = json.w;
        this.h = json.w;
        this.img = json.img;
        this.color = json.color;
        this.text = json.text;
}
Spirit.prototype.hover = function(){
    var json = {
        x1: this.x,
        y1: this.y,
        x2: this.x + this.w,
        y2: this.y + this.h
    }
    var that = this;
    mouse.move(json, function(){
        that.isMove = true;
    }, function(){
        that.isMove = false;
    })
    return this.isMove;
}
Spirit.prototype.click = function(callBack){
    var json = {
        x1: this.x,
        y1: this.y,
        x2: this.x + this.w,
        y2: this.y + this.h
    }
    var that = this;
    mouse.click(json, function(){
        callBack();
    })
}
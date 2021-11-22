//鼠标对象
var Mouse = function () {
    //属性
    var o = {
        img: "image/icon/mouse.png", // 鼠标箭头
        x: 0, // 鼠标的位置
        y: 0,
        isDown: false, // 左键是否被按下
        isPlay: false, // 是否播放BGM（应对chrome）
        isStay: false, // 是否停止鼠标点击事件
        isMove: false, // 是否hover（drag）
    }
    // 行为
    o.draw = function () {
        game.draw(o.img, o.x, o.y);
    }
    // 鼠标监听
    window.addEventListener("mousemove", function (e) {
        o.x = e.clientX;
        o.y = e.clientY;
    });
    window.addEventListener("mousedown", function (e) {
        o.isDown = true;
        // 游戏屏幕内
        if (o.x < game.width && o.y < game.height) {
            // 只执行一次（应对chrome的play必须先交互）
            if (!o.isPlay) {
                // 开启音频功能
                game.play(game.titleBGM);
                o.isPlay = true;
            }
        }
    });
    window.addEventListener("mouseup", function (e) {
        o.isDown = false;
    });
    // 鼠标移动事件
    o.move = function (json, callYse, callNo = function () { }) {
        if (o.x > json.x1 && o.x < json.x2 && o.y > json.y1 && o.y < json.y2) {
            callYse();
        }
        else {
            callNo();
        }
    }
    // 鼠标点击事件
    o.click = function (json, callBack) {
        o.move(json, function () {
            if (o.isDown) {
                if (!o.isStay) {
                    callBack();
                }
                o.isDown = false;
            }
        });
    }
    // 鼠标拖拽事件
    o.drag = function (json, callBack = function(){}) {
        o.move(json, function () {
            o.isMove = true;
        });
        if(o.isMove){
            if (o.isDown) {
                callBack({x: o.x, y: o.y});
                // 清空状态量（避免与其他的drag事件冲突）
                o.isMove = false;
            }
            else{
                o.isMove = false
            }
        }
    }
    return o;
}
//获取鼠标信息
var mouse = Mouse();

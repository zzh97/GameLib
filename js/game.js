var Game = function () {
    // 属性
    var o = {
        // 获取画布
        canvas: document.querySelector("#canvas"),
        ctx: canvas.getContext("2d"),
        // 音频对象
        bgm: document.querySelector("#BGM"),
        se: document.querySelector("#SE"),
        titleBGM: 'music/标题BGM.mp3',
        moveSE: 'music/书落.mp3',
        clickSE: 'music/书顿.mp3',
        // BGM音量
        bgmValue: 0.5,
        seValue: 0.5,
        // 字号、字体、颜色
        size: 20,
        font: "Arial",
        color: "#fff",
        // 框框的颜色
        boxColor: 'rgba(0, 0, 0, 0.5)',
        hBoxColor: 'rgba(0, 0, 0, 0.7)',
        // 屏幕大小
        width: 960,
        height: 540,
        // 帧率
        fps: 30,
        // 按键
        keys: {},
        actions: {},
        // 游戏进度
        now: 0,
        // 最大进度
        max: 2
    };

    // 监听按键
    window.addEventListener("keydown", function (e) {
        o.keys[e.key] = true;
    });
    window.addEventListener("keyup", function (e) {
        o.keys[e.key] = false;
    });
    // 注册按键
    o.registerAction = function (key, callback1) {
        var tempFun = function () {
            callback1();
        }
        o.actions[key] = tempFun;
    }
    // 更新（每帧都执行）
    o.updata = function () {
        // 设置游戏屏幕的大小
        o.canvas.width = o.width;
        o.canvas.height = o.height;
        // 设置游戏字体和字号
        o.ctx.font = o.size + 'px ' + o.font;
        // 设置游戏画笔颜色
        o.ctx.fillStyle = o.color;
        // 设置游戏BGM音量
        game.bgm.volume = o.bgmValue;
        // 设置游戏SE音量
        game.se.volume = o.seValue;
    }
    // 初始化（只执行一次，在特定的时候）
    o.init = function () {
        o.size = 11 + parseInt(o.width / 100); // 临时设置
    }
    // 清屏
    o.clear = function () {
        o.ctx.clearRect(0, 0, o.canvas.width, o.canvas.height);
    }
    // 绘制图片
    o.draw = function (url, x = 0, y = 0) {
        if (url) {
            let img = imgLoad(url);
            o.ctx.drawImage(img, x, y);
        }
    }
    // 绘制文本
    o.text = function (content = '', x = 0, y = 0) {
        o.ctx.fillText(content, x, y);
    }
    // 绘制框框
    o.box = function (x = 50, y = 50, w = 100, h = 100, isMove = false) {
        // 选择画笔颜色
        if(isMove){
            o.ctx.fillStyle = o.hBoxColor;
        }else{
            o.ctx.fillStyle = o.boxColor;
        }
        // 绘制
        o.ctx.fillRect(x, y, w, h);
        // 改回画笔颜色
        o.ctx.fillStyle = o.color;
    }
    // 播放音乐
    o.play = function (url) {
        o.bgm.src = url;
    }
    o.playSE = function (url) {
        o.se.src = url;
    }
    return o;
}
// 获取游戏信息
var game = Game();
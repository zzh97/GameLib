// 私有变量
var p = {
    exURL: '', // 前一个BGM的url
    isMoveMenu: false, // 是否被hover
    isSelect: false, // 是否出现选项（出现了就要暂停剧情）
    isMove: [false, false, false, false], // 哪个选项被hover
    isMoveOptions: false, // 是否被hover
    xy: { x: 0, y: 0 },
    bgmX: 0,
    seX: 0,
    tempNow: 0,
    cv: []
}
// 播放音乐
var BGM = function (name, url) {
    // 如果name有被绑定，则替换url
    if (index[name]) {
        url = index[name];
    }
    // 只执行一次（应对定时器的循环）
    if (p.exURL != url) {
        // 更新exURL
        p.exURL = url;
        // 播放BGM
        game.play(url);
    }
}
/*----三要素API----*/
// 绘制背景
var Place = function (name, url) {
    // 如果name有被绑定，则替换url
    if (index[name]) {
        url = index[name];
    }
    // 绘制图片
    game.draw(url, 0, 0);
}
// 区域精灵（hover改变状态，click触发事件）省略了改回文字颜色
var spirit = function (json, isMove, callBack) {
    // 鼠标移动
    mouse.move(json, function () {
        // 当选项被鼠标指着
        if (!isMove) {
            // 移动音效
            game.playSE(game.moveSE);
            // 只执行一次（避免声音重复播放与颜色重复叠加）
            isMove = true;
        }
    }, function () {
        isMove = false;
    });
    // 鼠标点击
    mouse.click(json, function () {
        callBack();
        // 点击音效
        game.playSE(game.clickSE);
    });
    // 返回hover状态
    return isMove;
}
// 绘制角色
var Role = function (name, url) {
    // 如果name有被绑定，则替换url
    if (index[name]) {
        url = index[name];
    }
    // 绘制图片
    game.draw(url, 0, 0);
    // 绘制对话框
    var boxW = game.width;
    var boxH = game.height * (1 / 3);
    var boxY = game.height - boxH;
    game.box(0, boxY, boxW, boxH);
    // 绘制文本
    game.text(name, game.size * 2, boxY + game.size * 2);
    // 菜单选项的参数
    var menuW = game.size * 4;
    var menuH = game.size * 2;
    var menuY = boxY - menuH;
    var menuX = game.width - menuW;
    // 绘制菜单选项
    game.box(menuX, menuY, menuW, menuH, p.isMoveMenu);
    // 绘制菜单文字
    game.text('MENU', menuX + game.size * 0.6, menuY + game.size * 1.4);
    // 添加精灵（hover改变颜色，click触发事件）
    p.isMoveMenu = spirit({
        x1: menuX,
        x2: menuX + menuW,
        y1: menuY,
        y2: menuY + menuH
    }, p.isMoveMenu, function () {
        p.tempNow = game.now;
        game.now = -1;
    });
}
// 绘制对话
var Say = function (string, style = 1) {
    // 对话框的高度
    var wordH = game.height - game.height * (1 / 3) + game.size * 2;
    // 名字的宽度
    var nameW = game.size * 2;
    // 每行最大字数
    var max = parseInt(game.width / game.size) - 4;
    // 对话显示的方式
    switch (style) {
        case 0:
            // 逐行逐字输出（进一法，不足一行当作一行）
            for (i = 0; i < parseInt(string.length / max) + 1; i++) {
                for (j = 0; j < max; j++) {
                    game.text(string[i * max + j], nameW + game.size * j, wordH + (game.size * 1.5) * (i + 1));
                }
            }
            break;
        case 1:
            // 逐行逐字的动画输出
            animate.text(string, nameW, wordH + (game.size * 1.5), max);
            break;
    }
    // 鼠标点击继续剧情
    mouse.click({
        x1: 0,
        x2: game.width,
        y1: wordH - game.size * 2,
        y2: game.height
    }, function () {
        // 在不出现选项的情况下
        if (!p.isSelect) {
            game.now++;
            // 重置文字动画状态
            animate.turn = true;
        }
    });
}
// 场景、人物、 对话
var AVG = function (place, name, say) {
    Place(place);
    Role(name);
    Say(say);
}
/*----选择API----*/
// 选择题
var Select = function (options, json = {
    width: game.width * (2 / 3),
    newTop: game.height * (1 / 5),
    newLeft: (game.width - game.width * (2 / 3)) / 2,
}) {
    // 是否出现选项（用于控制click继续剧情）
    p.isSelect = true;
    var space = game.size;
    var w = json.width;
    var h = game.size * 2;
    var top;
    var baseTop = json.newTop;
    var left = json.newLeft;
    // 绘制选项框
    for (i = 0; i < options.length; i++) {
        top = baseTop + (h + space) * i;
        // 选项框的判断区域
        let json = {
            x1: left,
            x2: left + w,
            y1: top,
            y2: top + h
        };
        // 添加精灵
        p.isMove[i] = spirit(json, p.isMove[i], function () {
            if (p.isMove[i]) {
                // 跳转
                game.now = options[i][1];
                // 重置文字动画状态
                animate.turn = true;
                // 改回字号
                game.init();
                // 选项消失
                p.isSelect = false;
                // 点击音效
                game.playSE(game.clickSE);
            }
        });
        // 绘制
        game.box(left, top, w, h, p.isMove[i]);
    }
    top = game.height * (1 / 5);
    // 绘制选项
    for (i = 0; i < options.length; i++) {
        top = baseTop + (h + space) * i;
        game.text(options[i][0], left + game.size, top + game.size * 1.4);
    }
}
/*----标题API----*/
// 绘制标题画面
var Title = function (name, json = {
    x: (game.width / 2) - (name.length * game.size) / 2,
    y: game.height * (1 / 4),
    size: (11 + parseInt(game.width / 100)) * 1.3,
}) {
    // 暂时不用
    if (mouse.isPlay || 1) {
        // 如果name有被绑定，则替换url
        if (index[name]) {
            json.url = index[name];
        }
        // 绘制背景
        game.draw(json.url);
        // 设置标题字号
        game.size = json.size;
        // 绘制标题
        json.x = animate.xy({
            id: 'a',
            style: 'x',
            ori: game.width*(1/3)-game.size*2,
            end: game.width*(2/3)-game.size*2,
            speed: 5,
            back: true,
            loop: true
        });
        /*json.y = animate.xy({
            id: 'b',
            style: 'y',
            ori: 100,
            end: 400,
            speed: 10,
            back: true,
            loop: true
        });*/
        var rgba = animate.color();
        game.ctx.fillStyle = rgba;
        game.text(name, json.x, json.y);
        // 绘制选项
        Select([
            ['开始游戏', 1],
            ['读取进度', -4],
            ['游戏设置', -2]
        ], {
            width: game.size * 6,
            newTop: game.height * (2 / 5),
            newLeft: (game.width - game.size * 6) / 2
        })
    } else {
        // 绘制遮罩
        game.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        game.ctx.fillRect(0, 0, game.width, game.height);
        game.ctx.fillStyle = game.color;
        game.text("点击唤醒", game.width / 2 - game.size * 2.5, game.height / 2);
    }

}
// 绘制菜单
var Menu = function (name, url) {
    // 如果name有被绑定，则替换url
    if (index[name]) {
        url = index[name];
    }
    // 绘制背景
    game.draw(url);
    // 绘制选项
    Select([
        ['读取进度', -4],
        ['保存档案', -3],
        ['游戏设置', -2],
        ['返回游戏', p.tempNow],
        ['返回标题', 0],
    ], {
        width: game.size * 6,
        newTop: game.height * (1 / 10),
        newLeft: game.width * (1 / 15)
    })
}
// 游戏设置
var Options = function (name) {
    // 如果name有被绑定，则替换url
    if (index[name]) {
        url = index[name];
    }
    // 绘制背景
    game.draw(url);
    var w = game.size * 4;
    var h = game.size * 2;
    var x = (game.width - w) / 2;
    var y = (game.height - h) / 2 + 100;
    // 绘制返回按钮
    game.box(x, y, w, h, p.isMoveOptions);
    game.text('返回', x + game.size, y + game.size * 1.3);
    // 添加精灵
    p.isMoveOptions = spirit({
        x1: x,
        y1: y,
        x2: x + w,
        y2: y + h
    }, p.isMoveOptions, function () {
        if(p.tempNow == 0){
            game.now = 0;
        }else{
            game.now = -1;
        }
    });
    /*var opt =  new Spirit({
        x: x,
        y: y,
        w: w,
        h: h,
        img: '',
        color: game.color,
        text : '',
    });
    p.isMoveOptions =  opt.hover();
    opt.click(function(){
        game.now = 0;
    });*/
    // 音量拖拽
    mouse.drag({
        x1: x,
        y1: y - 100 - 50,
        x2: x + 100,
        y2: y - 100 + 20 - 50
    }, function (xy) {
        p.bgmX = xy.x;
    });
    // SE
    mouse.drag({
        x1: x,
        y1: y - 100,
        x2: x + 100,
        y2: y - 100 + 20
    }, function (xy) {
        p.seX = xy.x;
    });
    // 音量
    var volBGM = game.bgmValue * 100; //BGM原有值
    if (p.bgmX - x >= 0) {
        if (p.bgmX - x <= 100) {
            volBGM = p.bgmX - x;
        } else {
            volBGM = 100;
        }
    }
    // SE
    var volSE = game.seValue * 100; //SE原有值
    if (p.seX - x >= 0) {
        if (p.seX - x <= 100) {
            volSE = p.seX - x;
        } else {
            volSE = 100;
        }
    }
    // 绘制音量框
    game.text('BGM音量', x - game.size * 5, y - 83 - 50);
    game.ctx.fillStyle = 'rgba(0,0,0,0.6)';
    game.ctx.fillRect(x, y - 100 - 50, 100, 20);
    // SE
    game.ctx.fillStyle = game.color;
    game.text('SE音量', x - game.size * 5, y - 83);
    game.ctx.fillStyle = 'rgba(0,0,0,0.6)';
    game.ctx.fillRect(x, y - 100, 100, 20);
    // 绘制音量条
    game.ctx.fillStyle = '#f55';
    game.ctx.fillRect(x, y - 100 - 50, volBGM, 20);
    // SE
    game.ctx.fillRect(x, y - 100, volSE, 20);
    // 修改音量
    game.bgmValue = volBGM / 100;
    // SE
    game.seValue = volSE / 100;
}
// 绘制档案栏（存档）
var Save = function (name, url) {
    // 如果name有被绑定，则替换url
    if (index[name]) {
        url = index[name];
    }
    // 绘制背景图片
    game.draw(url);
    var wB = game.size * 4;
    var hB = game.size * 2;
    var xB = (game.width - wB) / 2;
    var yB = (game.height - hB) / 2 + 200;
    // 绘制返回按钮
    game.box(xB, yB, wB, hB, p.isMoveOptions);
    game.text('返回', xB + game.size, yB + game.size * 1.3);
    // 添加精灵
    p.isMoveOptions = spirit({
        x1: xB,
        y1: yB,
        x2: xB + wB,
        y2: yB + hB
    }, p.isMoveOptions, function () {
        game.now = -1;
    });
    // 如档案不存在，则新建一个空档案（否则不能parse）
    if(localStorage.resume == null){
        let str = JSON.stringify(p.cv);
        localStorage.resume = str;
    }
    var resume = JSON.parse(localStorage.resume);
    p.cv = resume;
    // 属性
    var x = game.width / 21;
    var y = game.height / 13;
    var w = game.size * 9; // 2019-12-24
    var h = w;
    for (i = 0, j = 0; i < 8; i++) {
        let newX = x + (x + w) * i;
        let newY = y ;
        // 判断是否到边界（下一行）
        if (newX > game.width - w) {
            let nextX = x + (x + w) * (j);
            let nextY = y + h + y;
            newX = nextX;
            newY = nextY;
           j++;
        }
        // 选项框的判断区域
        let json = {
            x1: newX,
            x2: newX + w,
            y1: newY,
            y2: newY + h
        }; 
        // 添加精灵
        p.isMove[i] = spirit(json, p.isMove[i], function () {
            if (p.isMove[i]) {
                let date = new Date();
                let time = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate();
                // 档案
                p.cv[i] = {
                    now: p.tempNow,
                    time: time
                };
                // 转为String（localStorage只能接收String）
                let str = JSON.stringify(p.cv);
                localStorage.resume = str;
                log(localStorage.resume)
                // 跳转
                game.now = p.tempNow;
                // 改回字号
                game.init();
                // 点击音效
                game.playSE(game.clickSE);
            }
        });
        // 绘制框框
        game.box(newX, newY, w, h, p.isMove[i]);
        // 绘制日期
        if(i < resume.length){
            game.text(resume[i].time, newX + game.size, newY + h - game.size);
        }
    }
}
// 绘制档案栏（读档）
var Load = function (name, url) {
    // 如果name有被绑定，则替换url
    if (index[name]) {
        url = index[name];
    }
    // 绘制背景图片
    game.draw(url);
    var wB = game.size * 4;
    var hB = game.size * 2;
    var xB = (game.width - wB) / 2;
    var yB = (game.height - hB) / 2 + 200;
    // 绘制返回按钮
    game.box(xB, yB, wB, hB, p.isMoveOptions);
    game.text('返回', xB + game.size, yB + game.size * 1.3);
    // 添加精灵
    p.isMoveOptions = spirit({
        x1: xB,
        y1: yB,
        x2: xB + wB,
        y2: yB + hB
    }, p.isMoveOptions, function () {
        if(p.tempNow == 0){
            game.now = 0;
        }else{
            game.now = -1;
        }
        
    });
    /*
        resume = [
            {now: 3, time: '2019-12-24'},
            {now: 5, time: '2019-12-25'},
        ]
    */
    // 如档案不存在，则新建一个空档案（否则不能parse）
    if(localStorage.resume == null){
        let str = JSON.stringify(p.cv);
        localStorage.resume = str;
    }
    var resume = JSON.parse(localStorage.resume);
    p.cv = resume;
    // 属性
    var x = game.width / 21;
    var y = game.height / 13;
    var w = game.size * 9; // 2019-12-24
    var h = w;
    for (i = 0, j = 0; i < 8; i++) {
        let newX = x + (x + w) * i;
        let newY = y ;
        // 判断是否到边界（下一行）
        if (newX > game.width - w) {
            let nextX = x + (x + w) * (j);
            let nextY = y + h + y;
            newX = nextX;
            newY = nextY;
           j++;
        }
        // 选项框的判断区域
        let json = {
            x1: newX,
            x2: newX + w,
            y1: newY,
            y2: newY + h
        }; 
        // 添加精灵
        p.isMove[i] = spirit(json, p.isMove[i], function () {
            log(resume)
            if (p.isMove[i] && i < resume.length) {
                // 跳转
                game.now = parseInt(resume[i].now);
                // 改回字号
                game.init();
                // 点击音效
                game.playSE(game.clickSE);
            }
        });
        // 绘制框框
        game.box(newX, newY, w, h, p.isMove[i]);
        // 绘制日期
        if(i < resume.length){
            game.text(resume[i].time, newX + game.size, newY + h - game.size);
        }
    }
}

var GOTO = function(num){
    game.now = num;
}
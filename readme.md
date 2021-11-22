### GameLib_AVG
##### （1）简介
这是一款基于Canvas的游戏库（目前还不能算是引擎），仅支持AVG模式（文字冒险类游戏），之后可能会支持RPG（角色扮演类游戏）

在GameLib_AVG中，游戏由三个基本元素组成，**场景、人物、对话**

——V0.1——
绘制系统：绘制图片，绘制文字
事件系统：按键事件，鼠标事件，区域精灵
剧情系统：场景，角色，对话，选项，跳转
动画系统：坐标移动，颜色变化，文字打印
音乐系统：BGM音乐，SE音效，音量调节
存档系统：存单，读档

——V0.5——
敬请期待

##### （2）使用方法
将GameLib解压包，解压完成后，进入到GameLib文件夹中，打开script.js文件，输入游戏代码

如：
```
case 0: 
    Title("夏日不语")
    BGM("在沙子里的微风")
    break
case 1:
    AVG("人民广场", "小明", "好久不见")
    BGM("别着急")
    break
case 2:
    AVG("人民广场", "小明", "你最近去哪了")
    break
case 3:
    AVG("人民广场", "大莲", "我去夏威夷度假了")
    break
case 4:
    AVG("人民广场", "大莲", "昨天刚回来")
    break
case 5:
    AVG("人民广场", "小明", "夏威夷怎么样")
    Select([
        ['很棒的体验', 1],
        ['还好啦，一般吧', 6],
        ['别提了，不堪回首', 0]
    ])
    break
case 6:
    AVG("人民广场", "大莲", "还好啦，一般吧")
    break
case 7:
    AVG("人民广场", "大莲", "前面有家咖啡店，去吗")
    break
case 8:
    AVG("人民广场", "小明", "好啊")
    break
case 9:
    AVG("咖啡店", "", "二人来到咖啡店")
    break
case 10:
    AVG("咖啡店", "店员", "两位要来点什么")
    break
```
注：上述其实是Switch语句中的一部分，还有一部分在js/playScript.js中，在这里面可以修改游戏菜单、游戏设置和存档读档时的背景图片
```
case -4:
    Load("读档背景");
    break;
case -3:
    Save("存档背景");
    break;
case -2:
    Options("游戏设置");
    break;
case -1:
    Menu("游戏菜单");
    break
```

##### （3）文件结构
```
main.html // 游戏入口
script.js // 游戏剧本
question.md // 开发过程中遇到的问题
readme.md // 程序文档（即本文件）
image // 图片资源文件夹
js // 代码文件夹
    game.js // 游戏设置
    public.js // 公共脚本
    mouse.js // 鼠标监听
    action.js // 按键监听
    animate.js // 动画效果
    private.js // 私有脚本
    playScript.js // 演绎剧本
```
如果你想要修改游戏的内容，一般只要在private.js中修改就好了
比如：对话框的颜色

##### （4）API集合
格式为
```
API1的名字 // 注释
    API1的案例 // 注释
API2的名字 // 注释
    API2的案例 // 注释
```
在public.js中
```
log // 调试输出
    log('你好啊'); // 输出一段话
imgLoad // 加载图片资源
    var img = imgLoad('image/temp.png') // 把图片存在img中
```
在game.js中
```
game.ctx // 画布环境（canvas的context）
    game.ctx.fillRect(10, 10, 100, 150); // 绘制一个矩形
    （这款可以参考canvas的官方手册）
game.width // 游戏宽度
    game.width = 960; // 设置游戏宽度为960px
game.height // 游戏高度
    game.height 540; // 设置游戏高度为540px
game.size // 游戏字号
    game.size = 16; // 设置游戏字号为18px
game.font // 游戏字体
    game.font = '黑体'; // 设置游戏字体为黑体
game.fps // 游戏帧率
    game.fps = 30; // 设置游戏的帧率为30帧/秒
```
上为属性，下为方法
```
game.clear // 清屏
    game.clear(); // 游戏清屏
game.draw // 绘制图片
    game.draw('image/temp.png', 50, 100); // 在坐标(50, 100)处绘制
game.text // 绘制文本
    game.text('你好啊', 50, 100); // 在坐标(50, 100)处绘制
game.keydown // 注册按键事件
    game.keydown('w', function(){ // 当w被按下时不断触发
        log('w键被按下')
    });
```
在mouse.js中
```
mouse.move // 鼠标移动事件
    mouse.move({ // 范围为(x1,y1)到(x2,y2)的矩形区域
        x1: 100,
        x2: 200,
        y1: 100,
        y2: 200
    }, function(){
        log("鼠标在范围内移动");
    }, function(){
        log("鼠标在范围外移动");
    });
mouse.click // 鼠标点击事件
    mouse.click({ // 范围为(x1,y1)到(x2,y2)的矩形区域
        x1: 100,
        x2: 200,
        y1: 100,
        y2: 200
    }, function(){
        log("鼠标在范围内点击");
    });
mouse.drag // 鼠标拖动事件
    mouse.drag({ // 按下的范围
        x1: 100,
        y1: 100,
        x2: 200,
        y2: 200
    }, function(xy){ // 拖动时的回调函数（鼠标坐标）
        log(xy.x); // 输出鼠标所在的x坐标
    });
mouse.spirit //
isMove = spirit({
        x1: 100,
        y1: 100,
        x2: 200,
        y2: 200
    }, isMove, function(){
        game.now = 0;
    });
```
在animate.js中
```
animate.xy // 坐标变化
    animate({
        id: 'move', // 唯一表示符
        style: 'x', // 在x坐标上变化
        ori: 0, // 起点
        end: 500, // 终点（x>=500就停止）
        speed: 10, // 速度为10（每帧x=x+10）
        accel: 1, // 加速度为1
        back: true, // 达到最值后，执行相反动画
        loop: true // 循环动画
    })
animate.wh // 尺寸变化
animate.rgba // 颜色变化
    animate({
        id: 'color', // 唯一表示符
        rgbaOri:[0,0,0,0], // 起始颜色
        rgbaEnd:[255,255,255,1], // 最终颜色
        speed: 10, // 速度为10
        accel: 1, // 加速度为1
        back: true, // 达到最值后，执行相反动画
        loop: true // 循环动画
    })
animate.text // 文字动画
    animate.text(str,{
        x: 100, // 绘制的位置
        y: 100,
        max: 10, // 每行10个字
    });
```
基本API
```
game.draw(url, x, y) // 绘制图片
game.text(str, x, y) // 绘制文本
game.keyDown(key, callBack) // 按键事件
mouse.move(json, callYes, callNo) // 移动事件
mouse.click(json, callBack) // 点击事件 
x = animate.xy(json) // 坐标动画
rgba = animate.rgba(json) // 颜色动画
animate.text(str,json) // 文字动画
spirit(json, isMove, clickFun) // 添加精灵
```
AVG的API（全在private.js中）
```
Menu(name) // 游戏菜单
Title(name) // 标题画面
BGM(name) // 背景音乐
AVG(place, role, say) // 场景 人物 对话
Select(array) // 分支事件
```
##### （5）命名空间
以下皆为全局定义，故请注意命名冲突
```
log //  自定义输出
imgLoad // 加载图片
game // 游戏对象
mouse // 鼠标对象
animate // 动画对象
p // 私有脚本的公共对象
spirit // 区域精灵
Title // 显示标题画面
Place // 绘制场景
Role // 绘制角色
Say // 绘制对话
AVG // 绘制场景、角色和对话（一般用这个）
BGM // 播放BGM
ScriptOut // 剧本外壳
ScriptIn // 剧本内核
myScript // 剧本整体
Script // 执行剧本
```
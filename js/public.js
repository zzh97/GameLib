/*----图片资源索引----*/
var index = {
    "标题BGM": "music/标题BGM.mp3",
    "场景BGM": "music/场景BGM.mp3",
    "某某游戏": "image/place/title.jpg",
    "人民广场": "image/place/square.jpg",
    "小明": "image/role/role1.png",
    "大莲": "image/role/role2.png",
}
// 快捷调试输出
var log = console.log.bind(console);
// 图片加载
var imgLoad = function (path) {
    // 声明image对象
    var img = new Image();
    // 图片路径
    img.src = path;
    // 返回对象
    return img;
}
// 按键事件组
var action = function () {
    // 把对象转换成枚举类数组
    var actions = Object.keys(game.actions);
    // 遍历数组
    for (var i = 0; i < actions.length; i++) {
        // 按键值
        var key = actions[i];
        // 当某键被激活，则触发对应事件
        if (game.keys[key]) {
            if (key == 'w') {
                game.actions[key]();
            }
        }
    }
}
// 按键注册事件
game.registerAction("w", function () {
    log("w");
});
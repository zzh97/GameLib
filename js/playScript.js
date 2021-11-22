var scriptOut = `var Script = function (now) {
    switch (now) {
        case -4:
            Load("某某游戏");
            break;
        case -3:
            Save("某某游戏");
            break;
        case -2:
            Options("某某游戏");
            break;
        case -1:
            Menu("某某游戏");
            break;
        scriptSign
    }
}`
var myScript = scriptOut.split('scriptSign')[0] + scriptIn + scriptOut.split('scriptSign')[1]
log(myScript)
eval(myScript)
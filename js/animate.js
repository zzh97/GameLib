// 动画系统
var Animate = function(){
    var o = {
        x: 0, // 移动动画中的坐标
        y: 0,
        isEnd: {}, // 移动动画中，是否到头
        isOtoX: false, // 是否把ori传给x了
        isOtoY: false, // 是否把ori传给y了
        rgba: [0, 0, 0, 0], // 变色动画中的颜色
        isOtoR: false, // 是否把ori传给rgba了
        isEndR: [], // 变色动画中，颜色值是否到头了
        isEndBR: [],  // 变色动画中，往回跑的颜色值是否到头了
        i: 1, // 文字动画中的行数的状态
        j: [], // 文字动画中的字数的状态
        turn: true, // 用于只初始化一次j这个数组
        max: 10, // 文字动画中每行字数的上限
        lineSpace: game.size * 0.5, // 行距
    }
    // 坐标变化
    o.xy = function(json = {
        id: 'a', // 唯一表示符
        style: 'x', // 在x坐标上变化
        ori: 0, // 起点
        end: game.width/2, // 终点
        speed: 5, // 速度为5
        accel: 1, // 加速度为1
        back: true, // 达到最值后，执行相反动画
        loop: true // 循环动画
    }){
        // 判断x还是y
        switch (json.style){
            case 'x':
                // 只执行一次（确保只给x赋值ori一次）
                if(!o.isOtoX){
                    o.x = json.ori;
                    o.isOtoX = true;
                }
                // 正方向
                if(json.speed > 0){
                    // 是否在最值内
                    if(o.x < json.end && !o.isEnd[json.id]){
                        o.x += json.speed;
                    }else{
                        // 到头了
                        o.isEnd[json.id] = true;
                        // 是否要回头
                        if(json.back){
                            if(o.x > json.ori){
                                o.x -= json.speed;
                            // 是否循环
                            }else if(json.loop){
                                // 重头开始
                                o.isEnd[json.id] = false;
                            }
                        // 是否循环
                        }else if(json.loop){
                            o.x = json.ori;
                            // 重头开始
                            o.isEnd[json.id] = false;
                        }
                    }
                    // 返回x
                    return o.x;
                }
                // 负方向
                else{
                    // 是否在最值内
                    if(o.x > json.end && !o.isEnd[json.id]){
                        o.x += json.speed;
                    }else{
                        // 到头了
                        o.isEnd[json.id] = true;
                        // 是否要回头
                        if(json.back){
                            if(o.x < json.ori){
                                o.x -= json.speed;
                            // 是否循环
                            }else if(json.loop){
                                // 重头开始
                                o.isEnd[json.id] = false;
                            }
                        // 是否循环
                        }else if(json.loop){
                            o.x = json.ori;
                            // 重头开始
                            o.isEnd[json.id] = false;
                        }
                    }
                    // 返回x
                    return o.x;
                }
                break;
            case 'y':
                // 只执行一次（确保只给y赋值origin一次）
                if(!o.isOtoY){
                    o.y = json.ori;
                    o.isOtoY = true;
                }
                // 正方向
                if(json.speed > 0){
                    // 是否在最值内
                    if(o.y < json.end && !o.isEnd[json.id]){
                        o.y += json.speed;
                    }else{
                        o.isEnd[json.id] = true;
                        // 是否要回头
                        if(json.back){
                            if(o.y > json.ori){
                                o.y -= json.speed;
                            // 是否循环
                            }else if(json.loop){
                                o.isEnd[json.id] = false;
                            }
                        // 是否循环
                        }else if(json.loop){
                            o.y = json.ori;
                            o.isEnd[json.id] = false;
                        }
                    }
                    // 返回y
                    return o.y;
                }
                else{
                    // 是否在最值内
                    if(o.y > json.end && !o.isEnd[json.id]){
                        o.y += json.speed;
                    }else{
                        o.isEnd[json.id] = true;
                        // 是否要回头
                        if(json.back){
                            if(o.y < json.ori){
                                o.y -= json.speed;
                            // 是否循环
                            }else if(json.loop){
                                o.isEnd[json.id] = false;
                            }
                        // 是否循环
                        }else if(json.loop){
                            o.y = json.ori;
                            o.isEnd[json.id] = false;
                        }
                    }
                    // 返回y
                    return o.y;
                }
                break;
        }
    }
    // 颜色变化
    o.color = function(json = {
        id: 'color', // 唯一表示符
        rgbaOri:[255,255,255,0], // 起始颜色
        rgbaEnd:[255,255,255,1], // 最终颜色
        speed: 3, // 速度为3
        accel: 1, // 加速度为1
        back: true, // 达到最值后，执行相反动画
        loop: true // 循环动画
    }){
        // 只执行一次（确保只给x赋值ori一次）
        if(!o.isOtoR){
            o.rgba = json.rgbaOri;
            o.isOtoR = true;
        }
        // 颜色发生变化
        for(i=0; i<o.rgba.length; i++){
            // rbga中某一个没达到目标
            if(o.rgba[i] < json.rgbaEnd[i] && !o.isEnd[json.id]){
                // rgb
                if(i < 3){
                    o.rgba[i] += json.speed;
                }
                // alpha
                else{
                    o.rgba[i] += json.speed/255;
                }
            }
            // 相反动画
            else if(json.back){
                // 表示第i个颜色值到达终点
                o.isEndR[i] = true;
                // rgba都到达终点
                if(o.isEndR[0] && o.isEndR[1] && o.isEndR[2] && o.isEndR[3]){
                    // 表示正向跑已经结束
                    o.isEnd[json.id] = true;
                    // 开始反向跑
                    if(o.rgba[i] > json.rgbaOri[i]){
                        // rgb
                        if(i < 3){
                            o.rgba[i] -= json.speed;
                        }
                        // alpha
                        else{
                            o.rgba[i] -= json.speed/255;
                        }
                    }
                    else{
                        // 表示在反向跑中第i个颜色值到达终点
                        o.isEndBR[i] = true;
                        // 都达到了且loop为true
                        if(o.isEndBR[0] && o.isEndBR[1] && o.isEndBR[2] && o.isEndBR[3] && json.loop){
                            // 重头开始
                            o.isEnd[json.id] = false;
                            // 到达终点的信号量重置
                            for(let j=0; j<4; j++){
                                o.isEndR[j] = false;
                                o.isEndBR[i] = false;
                            }
                        }   
                    }
                }
                
            }
        }
        // rgba的字符串
        var str = 'rgba(' + o.rgba[0] + ',' + o.rgba[1] + ',' + o.rgba[2] + ',' + o.rgba[3] + ')';
        return str;
    }
    // 文字动画
    o.text = function(str = '文字动画', x = 100, y = 100, max = 10, id, json = {
        x1: 0,
        y1: 0,
        x2: game.width,
        y2: game.height
    }){
        // 初始化o.i（以免不断地o.i++）
        o.i = 1;
        json.y2 = (parseInt(str.length / max) + 1) * (game.size + o.lineSpace);
        json.x2 = max * game.size;
        // 逐行
        for(let i=0; i<o.i; i++){
            // 只执行一次
            if(o.turn){
                // 初始化o.j这个数组（以免Nan）
                for(let h=0; h<parseInt(str.length / max) + 1; h++){
                    o.j[h] = 0;
                }
                o.turn = false;
            }
            // 逐字
            for(let j=0; j<o.j[i]; j++){
                game.text(str[j+i*max], x + game.size * j, y + (game.size + o.lineSpace) * i);
            }
            // o.j[i]表示第i行要写几个字
            if(o.j[i]<max){
                o.j[i]++;
                // 一行写完，开始下一行
            }else if(o.i < parseInt(str.length / max) + 1){
                // 从第二行开始，因为o.j[0]>=max，所以每次都会自加
                // 从第三行开始，则每次都会自加两下
                o.i++;
            }
        }
        mouse.click(json, function(){
            o.i = parseInt(str.length / max) + 1
            for(let i = 0; i<o.i; i++){
                o.j[i] = max;
            }
        });
    }
    return o;
}
var animate = Animate();
var scriptIn = `
        case 0:
            Title("某某游戏")
            BGM("标题BGM")
            break
        case 1:
            AVG("人民广场", "小明", "好久不见")
            BGM("场景BGM")
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
            break
        case 6:
            AVG("人民广场", "大莲", "你想知道啊？")
            break
        case 7:
            AVG("人民广场", "小明", "对啊")
            break
        case 8:
            AVG("人民广场", "大莲", "那你回答我一个问题，答对了我就告诉你")
            break
        case 9:
            AVG("人民广场", "大莲", "两人抛硬币，规定第一个抛出正面的人必须穿女装，问：先抛的人穿女装的概率")
            Select([
                ['1/2', 10],
                ['2/3', 13],
                ['3/4', 16]
            ])
            break
        case 10:
            AVG("人民广场", "小明", "抛硬币嘛，很明显一半对一半，答案是1/2")
            break
        case 11:
            AVG("人民广场", "大莲", "就喜欢你一本正经地说着一无所知的话，这让我感觉自己很聪明")
            break
        case 12:
            GOTO(0)
            break
        case 13:
            AVG("人民广场", "小明", "A中+A不中且B不中再A中+A不中且B不中且A再不中且B也不中而后A中....的概率和取极限 = 2/3")
            break
        case 14:
            AVG("人民广场", "大莲", "哦，我的老伙计，看在你答对的份上，我请你吃苏丹阿姨做的苹果派")
            break
        case 15:
            GOTO(0)
            break
        case 16:
            AVG("人民广场", "小明", "C是正确选择中最多的，所以我选择3/4")
            break
        case 17:
            AVG("人民广场", "大莲", "上帝真是不公平，他夺走了你的智商，还夺走了你的运气")
            break
        case 18:
            GOTO(0)
            break
`
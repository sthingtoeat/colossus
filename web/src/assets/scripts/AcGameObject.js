//这里是为了控制游戏画面(生成画面)

const AC_GAME_OBJECTS = [];


export class AcGameObject{      //类似于java中的一个类
    constructor(){              //这个是这个类的构造函数
        AC_GAME_OBJECTS.push(this);
        this.timedelta = 0;     //这一帧和上一帧直接的时间间隔
        this.has_called_start = false;//是否执行了开始函数
    }
                                //注意，下面的这些函数都是自己需要实现的
    start(){                    //这个函数只执行一次，应该能理解为初始化

    }

    update(){                   //除了第一帧不执行，之后每一帧都执行一次

    }

    on_destroy(){               //删除之前执行

    }

    destroy(){
        this.on_destroy();

        for(let i in AC_GAME_OBJECTS){
            const obj = AC_GAME_OBJECTS[i];
            if(obj === this){
                AC_GAME_OBJECTS.splice(i);          //删除数组中的一个元素
                break;
            }
        }
    }
}


let last_timestamp;             //上一次执行的时刻
const step = timestamp =>{      //传入执行时刻
    for(let obj of AC_GAME_OBJECTS){    //在js中，of遍历的是数组的值，in则是下标
        if(!obj.has_called_start){      //这里是为了判断是否开始了
            obj.has_called_start = true;
            obj.start();
        }else{
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(step) //执行下一帧
}

requestAnimationFrame(step)
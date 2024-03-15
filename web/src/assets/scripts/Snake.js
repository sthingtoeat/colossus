import { AcGameObject } from "./AcGameObject";
import { Cell } from "./Cell";

export class Snake extends AcGameObject{
    constructor(info , gamemap){
        super();

        this.id = info.id;
        this.color = info.color;
        this.gamemap = gamemap;
        
        this.cells = [new Cell(info.r , info.c)];   //放的是蛇的身体，Cell[0]是头
        this.next_cell = null;  //下一步的目标位置

        this.speed = 5;     //蛇每秒走几个格子
        this.direction = -1; //-1表示不走，0, 1 , 2 , 3 表示上右下左
        this.status = "idle";   //idle表示静止，move表示正在移动,die表示寄了
    
        this.dr = [-1 , 0 , 1 , 0];//行偏移量           0
        this.dc = [0 , 1 , 0 , -1];//列偏移量      3←  ↓↑  →1
                                    //                2
        this.step = 0 ;             //回合数
        this.eps = 1e-2;            //允许的误差

        this.check_ready_direction = 0;
        
        this.eye_direction = 0;             //右上蛇眼睛朝下
        if(this.id === 1){
            this.eye_direction = 2;         //左下蛇眼睛朝上
        }

        this.eye_dx = [                     //蛇眼的x偏移量(这里的x轴是横->的)
            [-1 , 1],                       //关于圆球中心,在中心右方则为1，左方为-1
            [1 , 1],                        
            [1 , -1],
            [-1 , -1],
        ];
        this.eye_dy = [                     //蛇眼的y偏移量(这里y轴是竖↓的)
            [-1 , -1],                      //关于圆球中心,在中心下方则为1，上方为-1
            [-1 , 1],
            [1 , 1],
            [1 , -1],
        ];      
    }                              

    start(){

    }

    set_direction(d){        //统一输入接口
        this.direction = d;
    }

    check_tail_increasing(){    //检测当前回合蛇的长度是否增加
        if(this.step <= 10) return true;
        if(this.step % 3 === 1) return true;
        return false;

    }

    next_step(){            //更新蛇的下一步状态
        const d = this.direction;
        this.next_cell = new Cell(this.cells[0].r + this.dr[d] , this.cells[0].c + this.dc[d]);
        this.eye_direction = d;
        this.direction = -1 ;//清空操作
        this.status = "move";
        this.step ++;

        const k = this.cells.length;
        for(let i = k ; i > 0 ; i --){  //直接赋值可能会产生重复或者其他问题
            this.cells[i] =JSON.parse(JSON.stringify(this.cells[i - 1]));
        }

        //判断是否去世移动至后端进行判断
        // if(!this.gamemap.check_valid(this.next_cell)){  //下一步撞上了,则会寄
        //     this.status = "die";
        // }
    }

    update_move(){          //操控蛇头移动
        
        const dx = this.next_cell.x - this.cells[0].x;
        const dy = this.next_cell.y - this.cells[0].y;  
        const distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < this.eps){        //已经走到目的地了
            this.cells[0] = this.next_cell; //添加一个新蛇头
            this.next_cell = null;
            this.status = "idle";   //走完以后停下

            if(!this.check_tail_increasing()){//如果不变长，那么就需要删除尾巴
                this.cells.pop();   //删除尾巴
            }
            
        }else{
            const move_distance = this.speed * this.timedelta / 1000  //每两帧之间走的距离
            this.cells[0].x += move_distance * dx / distance;
            this.cells[0].y += move_distance * dy / distance;
 
            if(!this.check_tail_increasing()){  //如果蛇不用变长，那么蛇就需要前往下一个目的地
                const k = this.cells.length;    //蛇头动一下，蛇尾少一个，其他不动
                const tail = this.cells[k - 1] , tail_target = this.cells[k - 2];
                const tail_dx = tail_target.x - tail.x;
                const tail_dy = tail_target.y - tail.y;
                tail.x += move_distance * tail_dx / distance;
                tail.y += move_distance * tail_dy / distance;
            }
        }
    }

    update(){
        if(this.status === 'move'){
            this.update_move();
        }
        this.render();
    }

    render(){
        const L = this.gamemap.L;       //每个单元格的距离
        const ctx = this.gamemap.ctx;

        ctx.fillStyle = this.color;
        if(this.status === "die"){      //如果蛇寄了，那么就会变成白色
            ctx.fillStyle = "white";
        }

        for(const cell of this.cells){  //枚举每一个身体
            //开始画圆
            ctx.beginPath(); 
            //设置圆的参数(x , y , r , a1 , a2)参数分别为：圆心坐标x , y,半径r,圆的起始角度a1，圆的结束角度a2
            ctx.arc(cell.x * L , cell.y * L , L / 2 , 0 , Math.PI * 2);
            //填充颜色
            ctx.fill();
        }

        for(let i = 1 ; i < this.cells.length ; i ++){  //给身体填充矩形，看着连贯一点
            const a = this.cells[i - 1] , b = this.cells[i];
            if(Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps){//如果两个球之前是重合的则不用画
                continue;
            }
            if(Math.abs(a.x - b.x) < this.eps){         //竖着(y的方向上有位移需要竖着填充矩形,画布的x,y轴和数组的相反)
                ctx.fillRect((a.x - 0.5) * L , Math.min(a.y , b.y) * L , L , Math.abs(a.y - b.y) * L);
            }else{                                      //横着
                ctx.fillRect(Math.min(a.x , b.x) * L , (a.y - 0.5) * L , Math.abs(a.x - b.x) * L , L);
            }
        }

        ctx.fillStyle = "black";        //画两个黑眼睛
        for(let i = 0 ; i < 2 ; i ++){
            const eye_x = (this.cells[0].x + this.eye_dx[this.eye_direction][i] * 0.25) * L;//0.25是眼睛的相对距离
            const eye_y = (this.cells[0].y + this.eye_dy[this.eye_direction][i] * 0.25) * L;
            ctx.beginPath();
            ctx.arc(eye_x, eye_y ,L * 0.1 , 0 , Math.PI * 2);
            ctx.fill();
        }
    }
}
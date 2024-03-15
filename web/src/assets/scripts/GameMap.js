import { AcGameObject } from "./AcGameObject";
import { Snake } from "./Snake";
import { Wall } from "./Wall";
//生成游戏地图
export class GameMap extends AcGameObject{
    constructor(ctx , parent , store){
        super();
        
        this.ctx = ctx;
        this.parent = parent;
        this.store = store;
        this.L = 0;         //每个格子之间的绝对距离

        this.rows = 13;     //格子行数
        this.cols = 14;     //格子列数  行列相等可能会导致最后同时进入一点
                            //具体也可用其他方式调整
        this.inner_walls_count = 20;//设置墙壁数量
        this.walls = [];

        //创造左下右上两条蛇
        this.snakes = [
            new Snake({id: 0,color:"#4876EC" , r:this.rows - 2 , c:1} , this),
            new Snake({id: 1,color:"#F94848" , r:1 , c:this.cols - 2} , this),
        ];

        

    }
    //下面这些已经在后端实现了
    // //flood fill算法判断区域是否连通
    // check_connectivity(g , sx , sy , tx , ty){//在地图g中起点坐标(sx , sy)到终点坐标(tx ,ty)
    //     if(sx == tx && sy == ty){
    //         return true;
    //     }
    //     g[sx][sy] = true;
    //     let dx = [-1 , 0 , 1 , 0] , dy = [0 , 1 , 0 , -1];
    //     for(let i = 0 ; i < 4 ; i ++){
    //         let x = sx + dx[i] , y = sy + dy[i];
    //         if(!g[x][y] && this.check_connectivity(g , x , y , tx , ty)){
    //             return true;
    //         }
    //     }

    //     return false;

    // }
    
    create_walls(){         //生成墙壁
        // const g = [];
        // for(let r = 0 ; r < this.rows ; r ++){      //  初始化数组
        //     g[r] = [];
        //     for(let c = 0 ; c < this.cols ; c ++){
        //         g[r][c] = false;

        //     }
        // }


        // //左右两列
        // for(let r = 0 ; r < this.rows ; r ++){      //给需要赋值的墙壁的数组赋值为true
        //     g[r][0] = g[r][this.cols - 1] = true;   
        // }                                           //即，哪些地方需要变成墙壁
        // //上下两行
        // for(let c = 0 ; c < this.cols ; c ++){
        //     g[0][c] = g[this.rows - 1][c] = true;  
        // }

        // //中间创建随机的墙壁    
        // for(let i = 0 ; i < this.inner_walls_count / 2; i ++){
        //     for(let j = 0 ; j < 1000 ; j ++){//取1000次随机值，应该就好了吧
        //         let r = parseInt(Math.random() * this.rows);//随机行坐标
        //         let c = parseInt(Math.random() * this.cols);//随机列坐标
        //         //如果随机到的坐标已经要变成墙壁了(==true)，那么就得重新赋值
        //         if(g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]){
        //             continue;
        //         }
                
        //         //左下角和右上角保证不能被变成墙壁
        //         if(r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2){
        //             continue;
        //         }

        //         //中心对称赋值
        //         g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;                  
        //         break;
        //     }
        // }

        // const copy_g = JSON.parse(JSON.stringify(g));       //复制一个g表示当前地图
        // if(!this.check_connectivity(copy_g , this.rows - 2 , 1 , 1 , this.cols - 2)){//左下区域和右上区域
        //     return false;                                   //如果不连通则返回false
        // }

        //按照数组生成墙壁
        const g = this.store.state.pk.gamemap;

        for(let r = 0 ; r < this.rows ; r ++){     
            for(let c = 0 ; c < this.cols ; c ++){
                if(g[r][c]){
                    this.walls.push(new Wall(r , c , this));
                }
            }
        }
    }

    add_listening_events(){ //检测用户键盘输入
        if(this.store.state.record.is_record){      //判断是否为录像
            let k = 0;
            const a_steps = this.store.state.record.a_steps;
            const b_steps = this.store.state.record.b_steps;
            const loser = this.store.state.record.record_loser;
            const [snake0 , snake1] = this.snakes;
            const interval_id = setInterval(() => {
                if(k >= a_steps.length - 1){         //最后一步为非法(撞墙)
                    if(loser === "all" || loser === "A"){
                        snake0.status = "die";
                    }
                    if(loser === "all" || loser === "B"){
                        snake1.status = "die";
                    }
                    clearInterval(interval_id);
                } else {
                    snake0.set_direction(parseInt(a_steps[k]));
                    snake1.set_direction(parseInt(b_steps[k]));
                }
                k ++;                               //不加上就会导致一直动
            } , 300);
        } else {
            this.ctx.canvas.focus();               //聚焦画布（刷新页面周围变黑）
            this.ctx.canvas.addEventListener("keydown",e =>{
                let d = -1 ;
                if(e.key === 'w') d = 0;
                else if(e.key ==='d')d = 1;
                else if(e.key === 's')d = 2;
                else if(e.key === 'a')d = 3;
    
                if(d >= 0 ){
                    this.store.state.pk.socket.send(JSON.stringify({
                        event:"move",
                        direction:d,
                    }));
                }
            });
        }
        
    }
    
    start(){
        this.create_walls();
        // for(let i = 0 ; i < 1000 ; i ++){       //随机1000次总应该能找到合法方案
        //     if(this.create_walls()){            //如果成功创建了墙，那么则是合法的方案
        //         break;
        //     }
        // }
        this.add_listening_events();
        
    }

    update_size(){           //动态更新每个小格的像素尺寸(缩放)
                            //变量L是浮点型数，在之后的运算里面会被取成整数，使得小格之间产生一丁点缝隙
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols , this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    check_ready(){          //判断两蛇是否都准备好走下一步了
        for(const snake of this.snakes){
            if(snake.status !== "idle"){        //判断是否静止
                return false;
            }
            if(snake.direction === -1){         //判断是否有方向
                return false;
            }
        }

        return true;
    }

    next_step(){            //两蛇进入下一回合
        for(const snake of this.snakes){
            snake.next_step();
        }
    }

    check_valid(cell){      //检测是否撞墙或者蛇
        for(const wall of this.walls){
            if(wall.r === cell.r && wall.c ===cell.c){
                return false;
            }
        }

        for(const snake of this.snakes){
            let k = snake.cells.length;
            if(!snake.check_tail_increasing()){
                k --;
            }
            for(let i = 0 ; i < k ; i ++){      //判断蛇头是否撞到蛇尾
                if(snake.cells[i].r === cell.r && snake.cells[i].c === cell.c)
                    return false;
            }
        }

        return true;
    }

    update(){
        this.update_size();
        if(this.check_ready()){
            this.next_step();
        }
        this.render();
    }

    render(){               //渲染（画图）
        const color_even = "#AAD751" , color_odd = "#A2D149";
        for(let r = 0 ; r < this.rows ; r ++){
            for(let c = 0 ; c < this.cols ; c ++){
                if((r + c) % 2 == 0){
                    this.ctx.fillStyle = color_even;
                }else{
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L , r * this.L , this.L , this.L); 
            }
        }
    }
}
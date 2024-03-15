//蛇里面的其中一个格子

export class Cell{
    constructor(r , c){
        this.r = r;
        this.c = c;

        this.x = c + 0.5;   //画布和数组的坐标轴是相反的
        this.y = r + 0.5;
    }
}
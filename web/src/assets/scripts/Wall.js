import { AcGameObject } from "./AcGameObject";
//生成墙壁(但是还未绘画)
export class Wall extends AcGameObject{
    constructor(r , c , gamemap){
        super();

        this.r = r;
        this.c = c;
        this.gamemap = gamemap;
        this.color = "#B37266";         //墙壁的颜色
    }

    update(){
        this.render();
    }

    render(){
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.c * L , this.r * L , L , L);
    }
}
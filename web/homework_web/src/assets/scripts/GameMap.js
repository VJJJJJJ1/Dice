import { GameObject } from "./GameObject";

export class GameMap extends GameObject{
    constructor(ctx, parent){
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;

        this.rows = 3;
        this.cols = 8;
    }
    start(){

    }
    update_size(){
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }
    update(){
        this.update_size();
        this.render();
    }

    render(){
        const color_odd = "#007ACC";
        const color_even = "#008AD3"
        for(let r = 0; r < this.rows; r ++){
            for(let c = 0; c < this.cols; c ++){
                if(c > 2 && c < 5) {   //间隔
                    continue;
                }
                else if((r + c) % 2 === 0){
                    this.ctx.fillStyle = color_even;
                }
                else this.ctx.fillStyle = color_odd;
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }
    // render(){    //每一帧都需要渲染，即把当前游戏对象画到地图上
    //     this.ctx.fillStyle = 'green';
    //     this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // }
}
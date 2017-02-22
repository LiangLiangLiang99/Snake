/**
 *
 * @author 
 *
 */
class Main_Game extends egret.DisplayObjectContainer {
    private head:egret.Shape = new egret.Shape();
    /**触摸板类*/
    private x_jn :number;
    private y_jn:number;
    private a_num:number = -1;
    /***/
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
    private onAddToStage(e: egret.Event): void {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouch,this);
        this.createhead();
        this.conturol();
        this.creatapple();
        this.addEventListener(egret.Event.ENTER_FRAME,this.view,this);
    }
    private apple:egret.Shape;
    private appletoyou :egret.Shape[] = [];
    private creatapple():void{
        var chars: number[] = [0x0033FF,0xFFCC00,0x00CC33,0xCC33CC,0xFF0033,0x000000];
        this.apple = new egret.Shape();
        this.apple.x = Math.ceil(Math.random() * this.stage.stageWidth);
        this.apple.y = Math.ceil(Math.random() * this.stage.height);
        this.apple.graphics.beginFill(chars[Math.ceil(Math.random() * 5)],1);
        this.apple.graphics.drawCircle(0,0,20);
        //this.apple.anchorOffsetX = 20;
        //this.apple.anchorOffsetY = 20;
        this.apple.graphics.endFill();
        this.addChild(this.apple);
        this.appletoyou.push(this.apple);
        this.a_num++;
    }
    
    private view(e:egret.Event){
        var i :number;
        if(this.a_num > -1){

        }

        if(Math.abs(this.head.x - this.appletoyou[this.a_num].x) <= 40 && Math.abs(this.head.y - this.appletoyou[this.a_num].y) <= 40) {

            console.log("迟到啦！！！！！！！！");
            console.log("头x：" + this.head.x + "y：" + this.head.y);
            console.log("吃x：" + this.appletoyou[this.a_num].x + "y:" + this.appletoyou[this.a_num].y);
            this.creatapple();

        }



    }
    private createhead():void{
        this.head.x = 100;
        this.head.y = 100;
        this.head.graphics.beginFill(0xff0000,1);
        this.head.graphics.drawCircle(0,0,20);
        this.head.graphics.endFill();
        this.addChild(this.head);
    }
    private contorl_bg: egret.Shape;
    private contorl: egret.Shape;
    private conturol():void{
        //21,286左上角
        var contorl_bg :egret.Shape = new egret.Shape();
        contorl_bg.graphics.beginFill(0xff0000,1);
        contorl_bg.graphics.drawCircle(75,313,60);
        contorl_bg.graphics.endFill();
        contorl_bg.alpha = 0.5;
        this.addChild(contorl_bg);
        contorl_bg.touchEnabled = true;
        this.contorl_bg = contorl_bg;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouch,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.endTouch,this);
        //66,325,r=15
        this.contorl = new egret.Shape();
        this.contorl.graphics.beginFill(0x0033FF,1);
        this.contorl.x=80;
        this.contorl.y =320;
        this.contorl.graphics.drawCircle(0,0,15);
        this.contorl.anchorOffsetX = 7.5;
        this.contorl.anchorOffsetY = 7.5;
        this.contorl.graphics.endFill();
        this.contorl.alpha = 0.5;
        this.addChild(this.contorl);
    }
    private onTouch(e:egret.TouchEvent):void{
        //this.head.x = e.localX;
        //this.head.y = e.localY;
        if(e.target == this.contorl_bg){
            //console.log(e.localX);
            //if(e.localX )

            //console.log(e.localX);
            //console.log(e.localY);
            //if(e.localX >=61 && e.localX <=105 && e.localY>=308 && e.localY<=345)
            //{
            //    }else{
                //console.log(e.localX);
                //console.log(e.localY);
                this.addEventListener(egret.Event.ENTER_FRAME,this.move,this);//移动动作
           // }
            this.contorl.x = e.localX;
            this.contorl.y = e.localY;
            this.x_jn = e.localX;
            this.y_jn = e.localY;
        }
    }
    private endTouch(e: egret.TouchEvent): void {
        //this.head.x = e.localX;
        //this.head.y = e.localY;
        if(e.target == this.contorl_bg) {
            //console.log(e.localX);
            this.contorl.x = 80;
            this.contorl.y = 320;
            this.removeEventListener(egret.Event.ENTER_FRAME,this.move,this);
        }
    }
    private move(e:egret.Event):void{
        //计算变化率
        var angle:number;
        var stance:number = 5;
        var gensui_x:number;
        var gensui_y:number;
        if(this.x_jn >= 80 && this.y_jn<=320)
        {
            this.head.x += Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            this.head.y += Math.sin(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            gensui_x = -Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80)))*20;
            gensui_y = -Math.sin(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * 20;
        }
        if(this.x_jn <= 80 && this.y_jn <= 320) {
            this.head.x -= Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            this.head.y -= Math.sin(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            gensui_x = Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * 20;
            gensui_y = Math.sin(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * 20;
        }
        if(this.x_jn <= 80 && this.y_jn >= 320) {
            this.head.x -= Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            this.head.y -= Math.sin(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            gensui_x = Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * 20;
            gensui_y = Math.sin(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * 20;
        }
        if(this.x_jn >= 80 && this.y_jn >= 320) {
            this.head.x += Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            this.head.y += Math.sin(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            gensui_x = -Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * 20;
            gensui_y = -Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * 20;
        }
        //穿墙
        if(this.head.y<=0){
            this.head.y = this.stage.stageHeight;
        } else if(this.head.y >= this.stage.stageHeight){
            this.head.y = 0;
        }
        if(this.head.x <= 0) {
            this.head.x = this.stage.stageWidth;
        }else if(this.head.x >= this.stage.stageWidth){
            this.head.x = 0;
        }
        var i:number;
        for(i = 0;i <= this.a_num - 1;i++) {
            if(i>0){
                this.action(i,this.appletoyou[i - 1].x + gensui_x,this.appletoyou[i - 1].y + gensui_y);
                //this.appletoyou[i].x = this.appletoyou[i-1].x + gensui_x;
                //this.appletoyou[i].y = this.appletoyou[i - 1].y + gensui_y;
            }else{
                this.action(i,this.head.x + gensui_x,this.head.y + gensui_y);
                //this.appletoyou[i].x = this.head.x + gensui_x;
                //this.appletoyou[i].y = this.head.y + gensui_y;
            }
        }
    }
    private action(i:number,x:number,y:number){
        var speed:number = 3;
        //先走到上一次的位置
        if(Math.abs(y - this.appletoyou[i].y)<=1){
            
        }else{
        if(y > this.appletoyou[i].y){
            this.appletoyou[i].y += (y - (this.appletoyou[i].y)) / speed;
        }else{
            this.appletoyou[i].y -= ((this.appletoyou[i].y) - y) / speed;
        }
        }
        if(Math.abs(x - this.appletoyou[i].x) <= 1) {

        } else {
        if(x > this.appletoyou[i].x){
            this.appletoyou[i].x += (x - (this.appletoyou[i].x)) / speed;
        }else{
            this.appletoyou[i].x -= ((this.appletoyou[i].x) - x) / speed;
        }
        }
    }
}

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var Main_Game = (function (_super) {
    __extends(Main_Game, _super);
    /***/
    function Main_Game() {
        var _this = _super.call(this) || this;
        _this.head = new egret.Shape();
        _this.a_num = -1;
        _this.appletoyou = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main_Game.prototype.onAddToStage = function (e) {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.createhead();
        this.conturol();
        this.creatapple();
        this.addEventListener(egret.Event.ENTER_FRAME, this.view, this);
    };
    Main_Game.prototype.creatapple = function () {
        var chars = [0x0033FF, 0xFFCC00, 0x00CC33, 0xCC33CC, 0xFF0033, 0x000000];
        this.apple = new egret.Shape();
        this.apple.x = Math.ceil(Math.random() * this.stage.stageWidth);
        this.apple.y = Math.ceil(Math.random() * this.stage.height);
        this.apple.graphics.beginFill(chars[Math.ceil(Math.random() * 5)], 1);
        this.apple.graphics.drawCircle(0, 0, 20);
        //this.apple.anchorOffsetX = 20;
        //this.apple.anchorOffsetY = 20;
        this.apple.graphics.endFill();
        this.addChild(this.apple);
        this.appletoyou.push(this.apple);
        this.a_num++;
    };
    Main_Game.prototype.view = function (e) {
        var i;
        if (this.a_num > -1) {
        }
        if (Math.abs(this.head.x - this.appletoyou[this.a_num].x) <= 40 && Math.abs(this.head.y - this.appletoyou[this.a_num].y) <= 40) {
            console.log("迟到啦！！！！！！！！");
            console.log("头x：" + this.head.x + "y：" + this.head.y);
            console.log("吃x：" + this.appletoyou[this.a_num].x + "y:" + this.appletoyou[this.a_num].y);
            this.creatapple();
        }
    };
    Main_Game.prototype.createhead = function () {
        this.head.x = 100;
        this.head.y = 100;
        this.head.graphics.beginFill(0xff0000, 1);
        this.head.graphics.drawCircle(0, 0, 20);
        this.head.graphics.endFill();
        this.addChild(this.head);
    };
    Main_Game.prototype.conturol = function () {
        //21,286左上角
        var contorl_bg = new egret.Shape();
        contorl_bg.graphics.beginFill(0xff0000, 1);
        contorl_bg.graphics.drawCircle(75, 313, 60);
        contorl_bg.graphics.endFill();
        contorl_bg.alpha = 0.5;
        this.addChild(contorl_bg);
        contorl_bg.touchEnabled = true;
        this.contorl_bg = contorl_bg;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.endTouch, this);
        //66,325,r=15
        this.contorl = new egret.Shape();
        this.contorl.graphics.beginFill(0x0033FF, 1);
        this.contorl.x = 80;
        this.contorl.y = 320;
        this.contorl.graphics.drawCircle(0, 0, 15);
        this.contorl.anchorOffsetX = 7.5;
        this.contorl.anchorOffsetY = 7.5;
        this.contorl.graphics.endFill();
        this.contorl.alpha = 0.5;
        this.addChild(this.contorl);
    };
    Main_Game.prototype.onTouch = function (e) {
        //this.head.x = e.localX;
        //this.head.y = e.localY;
        if (e.target == this.contorl_bg) {
            //console.log(e.localX);
            //if(e.localX )
            //console.log(e.localX);
            //console.log(e.localY);
            //if(e.localX >=61 && e.localX <=105 && e.localY>=308 && e.localY<=345)
            //{
            //    }else{
            //console.log(e.localX);
            //console.log(e.localY);
            this.addEventListener(egret.Event.ENTER_FRAME, this.move, this); //移动动作
            // }
            this.contorl.x = e.localX;
            this.contorl.y = e.localY;
            this.x_jn = e.localX;
            this.y_jn = e.localY;
        }
    };
    Main_Game.prototype.endTouch = function (e) {
        //this.head.x = e.localX;
        //this.head.y = e.localY;
        if (e.target == this.contorl_bg) {
            //console.log(e.localX);
            this.contorl.x = 80;
            this.contorl.y = 320;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.move, this);
        }
    };
    Main_Game.prototype.move = function (e) {
        //计算变化率
        var angle;
        var stance = 5;
        var gensui_x;
        var gensui_y;
        if (this.x_jn >= 80 && this.y_jn <= 320) {
            this.head.x += Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            this.head.y += Math.sin(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            gensui_x = -Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * 20;
            gensui_y = -Math.sin(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * 20;
        }
        if (this.x_jn <= 80 && this.y_jn <= 320) {
            this.head.x -= Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            this.head.y -= Math.sin(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            gensui_x = Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * 20;
            gensui_y = Math.sin(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * 20;
        }
        if (this.x_jn <= 80 && this.y_jn >= 320) {
            this.head.x -= Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            this.head.y -= Math.sin(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            gensui_x = Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * 20;
            gensui_y = Math.sin(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * 20;
        }
        if (this.x_jn >= 80 && this.y_jn >= 320) {
            this.head.x += Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            this.head.y += Math.sin(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * stance;
            gensui_x = -Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * 20;
            gensui_y = -Math.cos(Math.atan((this.contorl.y - 320) / (this.contorl.x - 80))) * 20;
        }
        //穿墙
        if (this.head.y <= 0) {
            this.head.y = this.stage.stageHeight;
        }
        else if (this.head.y >= this.stage.stageHeight) {
            this.head.y = 0;
        }
        if (this.head.x <= 0) {
            this.head.x = this.stage.stageWidth;
        }
        else if (this.head.x >= this.stage.stageWidth) {
            this.head.x = 0;
        }
        var i;
        for (i = 0; i <= this.a_num - 1; i++) {
            if (i > 0) {
                this.action(i, this.appletoyou[i - 1].x + gensui_x, this.appletoyou[i - 1].y + gensui_y);
            }
            else {
                this.action(i, this.head.x + gensui_x, this.head.y + gensui_y);
            }
        }
    };
    Main_Game.prototype.action = function (i, x, y) {
        var speed = 3;
        //先走到上一次的位置
        if (Math.abs(y - this.appletoyou[i].y) <= 1) {
        }
        else {
            if (y > this.appletoyou[i].y) {
                this.appletoyou[i].y += (y - (this.appletoyou[i].y)) / speed;
            }
            else {
                this.appletoyou[i].y -= ((this.appletoyou[i].y) - y) / speed;
            }
        }
        if (Math.abs(x - this.appletoyou[i].x) <= 1) {
        }
        else {
            if (x > this.appletoyou[i].x) {
                this.appletoyou[i].x += (x - (this.appletoyou[i].x)) / speed;
            }
            else {
                this.appletoyou[i].x -= ((this.appletoyou[i].x) - x) / speed;
            }
        }
    };
    return Main_Game;
}(egret.DisplayObjectContainer));
__reflect(Main_Game.prototype, "Main_Game");
//# sourceMappingURL=Main_Game.js.map
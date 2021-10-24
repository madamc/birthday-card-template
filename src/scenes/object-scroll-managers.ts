import { Game } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';
import { GameScene } from './game-scene';

export class ObjectScrollManager {
    public firstItem: GameChildItem;
    public lastItem: GameChildItem;
    public group: GameGroupType;
    public counter: number;
    public playerX: number;
    public gameWidth: number;
    public scene: GameScene;
    constructor(scene: GameScene, group: GameGroupType, gameWidth: number)
    {
        this.firstItem = group.getFirst(true);
        this.lastItem = group.getLast(true);
        this.group = group;
        this.counter = 0;
        this.playerX = 0;
        this.gameWidth = gameWidth;
        this.scene = scene;
    }

    public updateLastAndFirst(element: GameChildItem) : void {
        if (!this.firstItem && !this.lastItem)
        {
            this.firstItem = this.group.getFirst(true);
            this.lastItem = this.group.getLast(true);
        }
        if (this.group.children.size == 1)
          {
            this.firstItem = element;
            this.lastItem = element;
          }
          if (element.x < this.firstItem.x)
          {
            this.firstItem = element;
          }
          if (element.x > this.lastItem.x)
          {
            this.lastItem = element;
          }
    }

    public updateCycling(element: GameChildItem) : void {
    if (element.x < this.playerX - this.gameWidth)
    {        
        this.group.killAndHide(element);
        //console.log(`killed one ${this.group.children.size}`);
    }
    }
    public update() {
        this.group.children.getArray().forEach(element => {
            this.updateLastAndFirst(element as GameChildItem);
            this.updateCycling(element as GameChildItem);
        });
    }
};

export class SceneObjectScrollManager extends ObjectScrollManager {
    public gameHeight: number;
    public numbGener: Phaser.Math.RandomDataGenerator;
    public layer: number;
    public speed: number;
    constructor(scene: GameScene, group: GameGroupType, gameWidth: number, gameHeight: number, layer: number, speed: number)
    {
        super(scene, group, gameWidth);
        this.numbGener = new Phaser.Math.RandomDataGenerator();
        this.gameHeight = gameHeight;
        this.layer = layer;
        this.speed = speed;
    }

    public update() {
        super.update();
        if (this.layer ==1)
            {
                if ((this.playerX + this.gameWidth/2) - this.lastItem.x > (-50)) {
            
                    this.group.get(this.playerX + this.gameWidth/2 + 300, this.gameHeight/10,"buildings", this.numbGener.integerInRange(0,5)).setActive(true).setVisible(true).setScale(5).setDepth(3);
                    //console.log(`Added one ${this.group.children.size}`);
                }
            }
            else if (this.layer == 2)
            {
                if ((this.playerX + this.gameWidth/2) - this.lastItem.x > (-150)) {
            
                    this.group.get(this.playerX + this.gameWidth/2 + 300, this.gameHeight/5,"buildings", this.numbGener.integerInRange(6,8)).setActive(true).setVisible(true).setScale(3).setVelocityX(this.speed/2).setDepth(1);
                    //console.log(`Added one ${this.group.children.size}`);
                }
                
                this.group.children.getArray().forEach(element => {
                    let gameChildElement = element as Phaser.Physics.Arcade.Sprite;
                    if (this.scene.player.body.velocity.x > 1)
                       gameChildElement.setVelocityX(this.speed/2);
                });
            }
            else if (this.layer == 3)
            {
                if ((this.playerX + this.gameWidth/2) - this.lastItem.x > (this.gameWidth/60)) {
            
                    this.group.get(this.playerX + this.gameWidth/2 + 300, this.gameHeight/2+5,"road").setActive(true).setVisible(true).setScale(10.5).setDepth(3);
                    //console.log(`Added one ${this.group.children.size}`);
                }
                
            }
            else if (this.layer == 4)
            {
                if ((this.playerX + this.gameWidth/2) - this.lastItem.x > (this.gameWidth/60)) {
            
                    this.group.get(this.playerX + (this.gameWidth/3)*2, (this.gameHeight/3)*2,"road").setActive(true).setVisible(true).setScale(20).setDepth(1).setOrigin(0,0).setVelocityX(-this.speed*1.5);
                    //console.log(`Added one ${this.group.children.size}`);
                }
                this.group.children.getArray().forEach(element => {
                    let gameChildElement = element as Phaser.Physics.Arcade.Sprite;
                    if (this.scene.player.body.velocity.x > 1)
                        gameChildElement.setVelocityX(-this.speed*1.5);
                });
                    
            }

        this.counter++;
    }
}

export class PlatformsScrollManager extends ObjectScrollManager {

    constructor(scene: GameScene, group: GameGroupType, gameWidth: number)
    {
        super(scene, group, gameWidth);
    }
    public update() {
        super.update();
        //if ((this.playerX + this.gameWidth/2) - this.lastItem.x > (this.gameWidth/2)) {
        if ((this.playerX + this.gameWidth/2) > (this.lastItem.x + (this.lastItem.width)* 10)) {
            let newItem = this.group.get(this.playerX + this.gameWidth/2, this.firstItem.y,"block", 1).setOrigin(0,0).setActive(true).setVisible(true).setScale(10,2).setDepth(4);
            newItem.body.x = newItem.x;
            newItem.body.y = newItem.y;
            newItem.body.setSize(this.lastItem.width * 10, this.lastItem.height *2, true);
            //console.log(`Added one ${this.group.children.size}`);
        }
    }
}

export class BulletScrollManager extends ObjectScrollManager {
    public fired: boolean;
    constructor(scene: GameScene, group: GameGroupType, gameWidth: number)
    {
        super(scene, group, gameWidth);
    }

    public update() {
        super.update();
        this.group.children.getArray().forEach(element => {
            let gameChildElement = element as Phaser.Physics.Arcade.Sprite;
            if (!gameChildElement.body.enable)
            {
                this.group.killAndHide(element);
            }
            //let bulletSprite = element as Phaser.Physics.Arcade.Sprite;
            if (gameChildElement.x > this.playerX + (this.gameWidth/2))
            {
                this.group.killAndHide(gameChildElement);
                
            }
        });
    }

}

export class ChaserScrollManager extends ObjectScrollManager {
    public gameHeight: number;
    public topLimit: number;
    public bottomLimit: number;
    public speed: number;
    public spawnTimer: Phaser.Time.TimerEvent;
    public numbGener: Phaser.Math.RandomDataGenerator;
    public bulletGener: BulletScrollManager;
    constructor(scene: GameScene, group: GameGroupType, gameWidth: number, gameHeight: number, speed: number, bulletGener: BulletScrollManager)
    {
        super(scene, group, gameWidth);
        this.gameHeight = gameHeight;
        this.topLimit = (gameHeight/3) - 50;
        this.bottomLimit = ((gameHeight/3) * 2) + 50;
        this.speed = speed;
        this.bulletGener = bulletGener;
        const spawnTimerConfig: Phaser.Types.Time.TimerEventConfig = {
            delay: 1000,
            loop: true,
            callback: this.spawnChaser(this)
        }
        this.spawnTimer =  this.scene.time.addEvent(spawnTimerConfig);
        const bulletTimerConfig: Phaser.Types.Time.TimerEventConfig = {
            delay: 2000,
            loop: true,
            callback: this.spawnBullet(this, this.bulletGener)
        }
        this.spawnTimer = this.scene.time.addEvent(bulletTimerConfig);
        this.numbGener = new Phaser.Math.RandomDataGenerator();
    }

    public update() {
        super.update();
        this.group.children.getArray().forEach(element => {
            let gameChildElement = element as Phaser.Physics.Arcade.Sprite;
            // if ((gameChildElement.x > (this.playerX - this.gameWidth/2)+(this.gameWidth/6)) && (gameChildElement.texture.key == 'runchase')&&(this.scene.player.body.enable))
            // {
            //     gameChildElement.setVelocityX(1*this.speed);
            // }
            if ((gameChildElement.x < (this.playerX - this.gameWidth/2)) && (gameChildElement.body.velocity.x < 0.9))
            {
                this.group.killAndHide(element);
            }
            if (!gameChildElement.body.enable)
            {
                //gameChildElement.play("chaserDie");// this.group.kill(element)
                gameChildElement.setVelocityX(0);
            }
            if (gameChildElement.body.enable && !gameChildElement.anims.isPlaying)
            {
                gameChildElement.play("chaserRun");
            }
            if (gameChildElement.anims.currentAnim.key == "chaserDie" && gameChildElement.anims.currentFrame.index == 4) {
                //gameChildElement.setFrame(28);
                gameChildElement.disableBody(true, false);
            }
        });
    
    }

    public updateCycling() {
        //if ()
    }

    public spawnChaser(manager: ChaserScrollManager): Function {
        return function () {
            
            if (manager.group.children.size < 4)
            {
                manager.group.get(
                    manager.playerX - manager.gameWidth, manager.numbGener.realInRange(manager.gameHeight/3 + 50, (manager.gameHeight/3)*2 - 50),"runchase", manager.counter)
                    .setActive(true).setVisible(true).setVelocityX(2*manager.speed).setScale(5).setDepth(4).play("chaserRun");
            }
            else if (manager.group.children.size >= 4)
            {
                let anyInactive = false;
                manager.group.children.each(element => {
                    if (!element.active)
                    {
                        anyInactive = true;
                    }
                });
                if (anyInactive)
                {
                    let reactivated = manager.group.get(
                        manager.playerX - manager.gameWidth, manager.numbGener.realInRange((manager.gameHeight/3)+ 50, ((manager.gameHeight/3)*2) - 50),"runchase", manager.counter)
                        .setActive(true).setVisible(true).setVelocityX(2*manager.speed).setScale(5).setDepth(4).play("chaserRun");
                    reactivated.body.enable = true;
                }
            }
        };
    } 
    public spawnBullet(manager: ChaserScrollManager, bulletsManager: BulletScrollManager): Function {
        return function () {
            // manager.group.children.each(element => {
            //     if (!element.active)
            //     {
                    
            //     }
            // });
            if (manager.group.children.size > 0)
            {
                let chaser = manager.group.children.getArray()[manager.numbGener.integerInRange(0,manager.group.children.size - 1)] as Phaser.Physics.Arcade.Sprite;
                if (chaser.body.velocity.x < 2*manager.speed - 20)
                {
                    //manager.scene.chaserShot.play();
                    bulletsManager.group.get(chaser.x, chaser.y, "block2", 3).setActive(true).setVisible(true).setVelocityX(4*manager.speed).setDepth(4);
                    chaser.play("chaserShoot");
                }
            }
        }
    }

}
export const spawner = function () {}

export class ObstacleScrollManager extends ObjectScrollManager {
    public gameHeight: number;
    constructor(scene: GameScene, group: GameGroupType, gameWidth: number, gameHeight: number)
    {
        super(scene, group, gameWidth);
        this.gameHeight = gameHeight;
    }

    public update() {
        super.update();
        
    }

}

export class PitScrollManager extends ObjectScrollManager {
    public gameHeight: number;
    constructor(scene: GameScene, group: GameGroupType, gameWidth: number, gameHeight: number)
    {
        super(scene, group, gameWidth);
        this.gameHeight = gameHeight;
    }

    public update() {
        super.update();
    }
}
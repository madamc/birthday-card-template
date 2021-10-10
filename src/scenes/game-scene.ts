import { Input } from 'phaser';
import { getGameWidth, getGameHeight, createTextBubble } from '../helpers';
import { BulletScrollManager, ChaserScrollManager, ObstacleScrollManager, PlatformsScrollManager, SceneObjectScrollManager, ObjectScrollManager } from './object-scroll-managers';


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};


let backGroundCounterDebug = 0;
export class GameScene extends Phaser.Scene {
  public speed = 200;
  public player: Phaser.Physics.Arcade.Sprite;
  public playerDead: boolean;
  public playerDieAnimPlayed: boolean;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private image: Phaser.Physics.Arcade.Sprite;
  private backgroundGroup: SceneObjectScrollManager;
  private backgroundGroup2: SceneObjectScrollManager;
  private roadGroup: SceneObjectScrollManager;
  private roadGroup2: SceneObjectScrollManager;
  private platforms1: PlatformsScrollManager;
  private platforms2: PlatformsScrollManager;
  private obstacleGroup: ObstacleScrollManager;
  private playerBullets: BulletScrollManager;
  private chaserBullets: BulletScrollManager;
  private chasersGroup: ChaserScrollManager;
  public cycleGroups: Array<ObjectScrollManager>;
  public bubble1: Phaser.GameObjects.Graphics;
  public message1: Phaser.GameObjects.BitmapText;
  public message2: Phaser.GameObjects.BitmapText;
  public background: Phaser.GameObjects.Image;
  public song: Phaser.Sound.BaseSound; 
  public playerShot: Phaser.Sound.BaseSound;
  public playerDied: Phaser.Sound.BaseSound;
  public chaserShot: Phaser.Sound.BaseSound;
  public chaserDied: Phaser.Sound.BaseSound;
  //private maingroundGroup: Phaser.GameObjects.Group;
  //private guardGroup: Phaser.GameObjects.Group;

  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    
    this.song = this.sound.add('song', {loop: true});
    this.playerShot = this.sound.add('playershot', {loop: false});
    this.playerDied = this.sound.add('playerdied', {loop: false});
    this.chaserShot = this.sound.add('chasershot', {loop: false});
    this.chaserDied = this.sound.add('chaserdied', {loop: false});
    this.song.play();
   
    this.background =this.add.image(0,0, "sky").setOrigin(0,0).setScale(7);
    this.initializeGroups();
    // Add a player sprite that can be moved around. Place him in the middle of the screen.
    this.addAnimations();
    this.player = this.physics.add.sprite(getGameWidth(this) / 2, getGameHeight(this) / 2, 'runchase', 3).setScale(5).setDepth(4).play("playerRun");
    this.playerDead = false;
    this.playerDieAnimPlayed = false;
    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    
    this.physics.add.collider(this.player, this.platforms1.group);
    this.physics.add.collider(this.player, this.platforms2.group);
    this.physics.add.overlap(this.playerBullets.group, this.chasersGroup.group, this.chaserBulletCollide, null, this);
    this.physics.add.overlap(this.chasersGroup.group, this.player, this.playerHit, null, this);
    this.physics.add.overlap(this.chaserBullets.group, this.player, this.playerHit, null, this);
    this.cameras.main.setSize(getGameWidth(this), getGameHeight(this));
    this.cameras.main.startFollow(this.player, false, 1, 0);
    this.bubble1 = this.add.graphics({ x: window.innerWidth/2, y: 200 }).setDepth(10);
    this.message1 = this.add.bitmapText(window.innerWidth/2, 300, 'atari', "quote", 30, Phaser.GameObjects.BitmapText.ALIGN_LEFT).setMaxWidth(1000).setOrigin(0).setScale(1).setDepth(11);
    this.message2 = this.add.bitmapText((getGameWidth(this)/2)- 300, (getGameHeight(this)/3)*2 + 250, 'atari-w', "Press Shift for Instructions", 30, Phaser.GameObjects.BitmapText.ALIGN_LEFT).setMaxWidth(1000).setOrigin(0).setScale(1).setDepth(11);

  }
  

  public update(): void {
    // Every frame, we create a new velocity for the sprite based on what keys the player is holding down.
    const velocity = new Phaser.Math.Vector2(0, 0);
    velocity.x = 1; 

    if (this.playerDead)
    {
      if (this.player.anims.currentAnim.key != "playerDie" )
      {
          this.playerDieAnimPlayed = true;
          this.player.play("playerDie");
        
      }
      if (this.player.anims.currentFrame.index == 4 && this.player.anims.currentAnim.key == "playerDie")
      {
        this.player.disableBody(true, false);
      }

      //this.player.play("playerDie");
      this.player.setVelocityX(0);
      this.chasersGroup.group.children.each(element => {
        let chaser = element as Phaser.Physics.Arcade.Sprite;
        console.log(`${chaser.body.velocity}`);
        chaser.setVelocityX(0);
        console.log(`${chaser.body.velocity}`);
      });
      this.backgroundGroup2.group.children.each(element => {
        let backG2 = element as Phaser.Physics.Arcade.Sprite;
        console.log(`${backG2.body.velocity}`);
        backG2.setVelocityX(0);
        console.log(`${backG2.body.velocity}`);
      });
      this.roadGroup2.group.children.each(element => {
        let road2 = element as Phaser.Physics.Arcade.Sprite;
        console.log(`${road2.body.velocity}`);
        road2.setVelocityX(0);
        console.log(`${road2.body.velocity}`);
      });
    }

    if (this.cursorKeys.space.isDown && this.player.body.enable) {
      if (!this.playerBullets.fired)
      {
        console.log(`${this.playerBullets.group.children}`);

        this.player.play("playerShoot");
        this.playerShot.play();
        let bullet = this.playerBullets.group.get(this.player.x,this.player.y,"block",2, true).setVelocity(-3 * this.speed,0).setActive(true).setVisible(true).setDepth(4);
        if (!bullet.body.enable)
        {
          bullet.body.enable = true;
        }
        this.playerBullets.fired = true;

        console.log(`player bullets ${this.playerBullets.group.children.size}`);
        console.log(`chaser bullets ${this.chaserBullets.group.children.size}`);
        console.log(`chasers ${this.chasersGroup.group.children.size}`);
        console.log(`platform 1 ${this.platforms1.group.children.size}`);
        console.log(`platform 2 ${this.platforms2.group.children.size}`);
      }

      if (this.bubble1.visible)
      {
        this.bubble1.visible = false;
      }
      
    }

    if (this.cursorKeys.shift.isDown)
    {
      this.bubble1.visible = true;
      this.messageHandler(`The chase is on! You've got to get to your escape ship before you're caught. To play, press up and down to move up and down and press space to fire back at your pursuers. To read the birthdaycard message, press the right arrow key. To start over, (in case you get hit) refresh the page.`);
    }
    else if (this.cursorKeys.shift.isUp && this.cursorKeys.right.isUp) {
      this.bubble1.visible = false;
      this.message1.text = "";
    }
    if (this.cursorKeys.right.isDown)
    {
      this.bubble1.visible = true;
      this.messageHandler(`Hey Cory, sorry this is pretty late in coming, but I finally got this finished! I blame the baby, they just mess things up. I've said it before, but I'll say it again. You're an inspiration, and I've learned a lot from your work as I have been working on the game development stuff. I'm very glad you're my brother, and I hope this next year is superb for you.                                                    Love Adam`);
    }

    if (this.cursorKeys.space.isUp) {
      this.playerBullets.fired = false;
    }
    if (this.cursorKeys.up.isDown) {
      velocity.y -= 1;
    }
    if (this.cursorKeys.down.isDown) {
      velocity.y += 1;
    }

    // We normalize the velocity so that the player is always moving at the same speed, regardless of direction.
    const normalizedVelocity = velocity.normalize();
    if (this.player.body.enable)
    {
      if (!this.player.anims.isPlaying)
        this.player.play("playerRun");
      this.player.setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
    }
    
      //this.updateBackGround();
    this.bubble1.x = this.player.x - getGameWidth(this)/3;
    this.message1.x = this.player.x - getGameWidth(this)/3;
    this.message2.x = this.player.x - getGameWidth(this)/3 + 200;
    this.background.x = this.player.x - getGameWidth(this)/2;
    this.cycleGroups.forEach(group => {
      group.playerX = this.player.x;
      group.gameWidth = getGameWidth(this);
      group.update();
    });
  }
  
  public messageHandler(text) {
    console.log(window.innerWidth);
    let charPixelWidth = 30;
    let width = text.length * charPixelWidth > 1000 ? 1000 : text.length * charPixelWidth;
    let height = Math.ceil((text.length * charPixelWidth)/1000) * charPixelWidth;
    this.message1 = createTextBubble(this, width + 100, height + (charPixelWidth * 2), text, this.bubble1, this.message1);
  }

  public initializeGroups(): void {
    this.cycleGroups = new Array<SceneObjectScrollManager>();


    this.backgroundGroup2 = new SceneObjectScrollManager(this, this.physics.add.group(), getGameWidth(this), getGameHeight(this), 2, this.speed);
    this.backgroundGroup2.group.add(this.physics.add.sprite(-100, getGameHeight(this)/5,"buildings", 7).setScale(3).setVelocityX(this.speed/2));
    this.backgroundGroup2.group.setDepth(1);

    this.backgroundGroup = new SceneObjectScrollManager(this, new Phaser.GameObjects.Group(this), getGameWidth(this), getGameHeight(this), 1, null);
    this.backgroundGroup.group.setDepth(3);    
    this.backgroundGroup.group.add(this.add.sprite(0,200,"buildings", 4).setScale(5));


    
    this.roadGroup = new SceneObjectScrollManager(this, new Phaser.GameObjects.Group(this), getGameWidth(this), getGameHeight(this), 3, null);
    this.roadGroup.group.setDepth(3);
    this.roadGroup.group.add(this.add.image(0,getGameHeight(this)/2,"road").setScale(10.5));
    this.roadGroup.group.add(this.add.image(32*10.5, getGameHeight(this)/2, "road").setScale(10.5));
    this.roadGroup.group.add(this.add.image(32*10.5*2, getGameHeight(this)/2, "road").setScale(10.5).setDepth(3));
    this.roadGroup.group.add(this.add.image(32*10.5*3, getGameHeight(this)/2, "road").setScale(10.5).setDepth(3));
    this.roadGroup.group.add(this.add.image(32*10.5*4, getGameHeight(this)/2, "road").setScale(10.5).setDepth(3));
    this.roadGroup.group.add(this.add.image(32*10.5*5, getGameHeight(this)/2, "road").setScale(10.5).setDepth(3));1
    this.roadGroup.group.add(this.add.image(32*10.5*6, getGameHeight(this)/2, "road").setScale(10.5).setDepth(3));

    this.roadGroup2 = new SceneObjectScrollManager(this, this.physics.add.group(), getGameWidth(this), getGameHeight(this), 4, this.speed);
    this.roadGroup2.group.add(this.physics.add.image(0,(getGameHeight(this)/3)*2,"road").setScale(20).setOrigin(0,0).setDepth(1));
    this.roadGroup2.group.add(this.physics.add.image(32*20,(getGameHeight(this)/3)*2,"road").setScale(20).setOrigin(0,0).setDepth(1));
    this.roadGroup2.group.add(this.physics.add.image(32*20*2,(getGameHeight(this)/3)*2,"road").setScale(20).setOrigin(0,0).setDepth(1));
    this.roadGroup2.group.add(this.physics.add.image(32*20*3,(getGameHeight(this)/3)*2,"road").setScale(20).setOrigin(0,0).setDepth(1));
    
    this.playerBullets = new BulletScrollManager(this, this.physics.add.group(), getGameWidth(this));
    this.chaserBullets = new BulletScrollManager(this, this.physics.add.group(), getGameWidth(this));

    this.platforms1 = new PlatformsScrollManager(this, this.physics.add.staticGroup(), getGameWidth(this));
    this.platforms1.group.create(0,getGameHeight(this) / 3, 'block', 1).setScale(60,2).setOrigin(0,0).refreshBody();
    this.platforms1.group.create(50*8,getGameHeight(this) / 3, 'block', 1).setScale(60,2).setOrigin(0,0).refreshBody();
    this.platforms1.group.create(100*8,getGameHeight(this) / 3, 'block', 1).setScale(60,2).setOrigin(0,0).refreshBody();
    this.platforms1.group.create(150*8,getGameHeight(this) / 3, 'block', 1).setScale(60,2).setOrigin(0,0).refreshBody();
    this.platforms2 = new PlatformsScrollManager(this, this.physics.add.staticGroup(), getGameWidth(this));
    this.platforms2.group.create(0,(getGameHeight(this) / 3 * 2), 'block', 1).setScale(60,2).setOrigin(0,0).refreshBody();
    this.platforms2.group.create(50*8,(getGameHeight(this) / 3 * 2), 'block', 1).setScale(60,2).setOrigin(0,0).refreshBody();
    this.platforms2.group.create(100*8,(getGameHeight(this) / 3 * 2), 'block', 1).setScale(60,2).setOrigin(0,0).refreshBody();
    this.platforms2.group.create(150*8,(getGameHeight(this) / 3 * 2), 'block', 1).setScale(60,2).setOrigin(0,0).refreshBody();    
    
    this.obstacleGroup = new ObstacleScrollManager(this, this.physics.add.staticGroup(), getGameWidth(this), getGameHeight(this));

    this.chasersGroup = new ChaserScrollManager(this, this.physics.add.group(), getGameWidth(this), getGameHeight(this), this.speed, this.chaserBullets);

    this.cycleGroups.push(this.playerBullets);
    this.cycleGroups.push(this.chaserBullets);
    this.cycleGroups.push(this.backgroundGroup);
    this.cycleGroups.push(this.backgroundGroup2);
    this.cycleGroups.push(this.roadGroup);
    this.cycleGroups.push(this.roadGroup2);
    this.cycleGroups.push(this.platforms1);
    this.cycleGroups.push(this.platforms2);
    this.cycleGroups.push(this.chasersGroup);
  }
  
  public addAnimations(): void {
    this.anims.create({
      key: 'playerRun',
      frames: this.anims.generateFrameNumbers('runchase', { frames: [ 0, 1, 2, 3 ] }),
      frameRate: 8,
      repeat: -1,
      repeatDelay: 0
    });
  
    this.anims.create({
      key: 'playerShoot',
      frames: this.anims.generateFrameNumbers('runchase', { frames: [ 5, 7, 8, 9 ] }),
      frameRate: 12,
      repeat: 0,
      repeatDelay: 0
    });
    this.anims.create({
      key: 'playerDie',
      frames: this.anims.generateFrameNumbers('runchase', { frames: [ 10, 11, 12, 13 ] }),
      frameRate: 8,
      repeat: 0,
      repeatDelay: 0
    });
    this.anims.create({
      key: 'chaserRun',
      frames: this.anims.generateFrameNumbers('runchase', { frames: [ 15, 16, 17, 18 ] }),
      frameRate: 8,
      repeat: -1,
      repeatDelay: 0
    });
    this.anims.create({
      key: 'chaserShoot',
      frames: this.anims.generateFrameNumbers('runchase', { frames: [ 20, 21, 22, 23, 24 ] }),
      frameRate: 12,
      repeat: 0,
      repeatDelay: 0
    });
    this.anims.create({
      key: 'chaserDie',
      frames: this.anims.generateFrameNumbers('runchase', { frames: [ 25, 26, 27, 28 ] }),
      frameRate: 8,
      repeat: 0,
      repeatDelay: 0
    });
  }

  public chaserBulletCollide(bullet, chaser): void {
      
      this.playerBullets.group.killAndHide(bullet);
      bullet.disableBody(true, true);
      chaser.play("chaserDie").setScale(5);
      this.chaserDied.play();
      //chaser.disableBody(true, false)
      
      chaser.setVelocityX(0);
  }
  public playerHit(player, bullet) {
    console.log("direct hit!");
    //this.player.setVelocityX(0);
    //player.disableBody(true, false);
    this.playerDied.play();
    this.playerDead = true;
    bullet.disableBody(true, true);
  }
}

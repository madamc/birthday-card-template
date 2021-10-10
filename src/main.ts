import * as Phaser from 'phaser';
import * as StateMachine from './StateMachine';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};
  
let platforms;
type SpriteDir = 'left' | 'right';
//let player;
let obj0;
let obj1;
let obj2;
let obj3;
let obj4;
let obj5;

export class GameScene extends Phaser.Scene {
  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
  bubble1: Phaser.GameObjects.Graphics;
  message1: Phaser.GameObjects.BitmapText;
  sceneItems: Array<Object>;
  //TODO Add another bitmaptext saying to press space to continue in white letters
  typingHelper: {text: string, counter: number, typeSound: Phaser.Sound.BaseSound};
  texts: Map<string, string>;
  messageFSM: StateMachine.StateMachine;
  player: Phaser.Physics.Arcade.Sprite;
  playerDir: SpriteDir;
  typingSound: Phaser.Sound.BaseSound;
  song: Phaser.Sound.BaseSound; 

  constructor() {
    super(sceneConfig);
  }
  
  public preload() {
    this.load.bitmapFont('atari', 'assets/sprites/atari-classic-b.png', 'assets/sprites/atari-classic.xml');
    this.load.spritesheet('block', 'assets/sprites/EC-floor.png', { frameWidth: 8, frameHeight: 8 });
    this.load.spritesheet('reeny', 'assets/sprites/Reeny3-Sheet.png', {frameWidth: 16, frameHeight: 16});
    //TODO change color of back wall
    this.load.image('backwall', 'assets/sprites/EC-home2.png');
    this.load.image('window', 'assets/sprites/EC-window.png');
    this.load.image('chair', 'assets/sprites/EC-chair.png');
    this.load.image('desk', 'assets/sprites/EC-desk.png');
    this.load.image('plant', 'assets/sprites/EC-plant.png');
    this.load.image('fridge', 'assets/sprites/EC-fridge.png');
    this.load.image('shelf', 'assets/sprites/EC-shelf.png');
    this.load.image('door-open', 'assets/sprites/EC-door-o.png');
    this.load.image('door-closed', 'assets/sprites/EC-door-c.png');
    this.load.image('cabinets', 'assets/sprites/EC-cabinets.png');
    this.load.image('sky', 'assets/sprites/EC-sky.png');
    this.load.image('clouds', 'assets/sprites/EC-clouds.png');
    this.load.image('offscreen', 'assets/sprites/offscreen.png');
    this.load.image('floor', 'assets/sprites/EC-floor.png');
    this.load.image('ice', 'assets/sprites/iceblock.png');
    this.load.audio('song', 'assets/sounds/song.ogg');
    this.load.audio('typing', 'assets/sounds/typing.ogg');
  }

  public create() {

    //register sounds and music
    this.song = this.sound.add('song', {loop: true});
    this.song.play();
    this.typingSound = this.sound.add('typing');

    //TODO
    //initialize objects in scene1Content and add to a dictionary
    //make sure to associate an event name with each object

    //initialize message texts
    //initialize the texts in the scene1content class file
    this.typingHelper = {text: '', counter: 0, typeSound: this.typingSound};
    
    //instead, we'll just create some images (it's a simple game)
    let sky = this.add.image(0,0, 'sky');//setScale(100);
    sky.scaleX = 230;
    sky.scaleY = 88;
    //create JSON file that contains all of these objects
    this.add.image(350, 500, 'clouds').setScale(10);
    this.add.image(1025, 550,'clouds').setScale(10);
    this.add.image(-200,-50,'backwall').setOrigin(0,0).setScale(10);
    this.add.image(360, 530, 'window').setScale(10);
    this.add.image(990, 530, 'window').setScale(10);
    this.add.image(80, 580, 'chair').setScale(10);
    this.add.image(220, 580, 'desk').setScale(10);
    this.add.image(1400, 580, 'cabinets').setScale(10);

    //initialize and configure floor
    platforms = this.physics.add.staticGroup();
    platforms.create(1200, 700, 'block', 1).setScale(300,10).refreshBody();

    //bit ghetto right now, but define the objects with an event name that corresponds with the
    //registered events above
    //Create another JSON for objects that will be collided with and that have events 
    //associated with them.
    //Then register the events
    
    //initialize player and playerdir
    this.player = this.physics.add.sprite(100, 400, 'reeny').setScale(10);
    this.player.setCollideWorldBounds(true);
    this.playerDir = 'right';

    //initialize offscreen framing
    let topBlack = this.add.image(-100,0, 'offscreen').setOrigin(0,0);
    let bottomBlack = this.add.image(-100,800, 'offscreen').setOrigin(0,0);
    topBlack.scaleX = 150;
    topBlack.scaleY = 15;
    bottomBlack.scaleX = 150;
    bottomBlack.scaleY = 15;
    
    //initialize bubble, bitmaptext, and the messages
    this.bubble1 = this.add.graphics({ x: window.innerWidth/2, y: 200 });
    this.message1 = this.add.bitmapText(window.innerWidth/2, 300, 'atari', "quote", 30, Phaser.GameObjects.BitmapText.ALIGN_LEFT).setMaxWidth(1000).setOrigin(0).setScale(1);
    this.message1.visible = false;

    
    //initialize with message Finite State Machine
    this.messageFSM = new StateMachine.StateMachine('idle', {
      idle: new IdleState(),
      move: new MoveState(),
      show: new ShowMessageState()
    }, [this, this.player, this.playerDir, this.message1, this.bubble1, this.typingHelper]);

    //create the events that will trigger the messages
    //Load animations from JSON file
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('reeny', { frames: [ 0, 1] }),
      frameRate: 2,
      repeat: -1
  });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('reeny', { frames: [2,3] }),
      frameRate: 4,
      repeat: -1
  });

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('reeny', { frames: [2,3] }),
    frameRate: 4,
    repeat: -1
  });

  //register collisions between every 2 objects and collect logic between ever 2 objects
  //TODO create a function where you send a collection of objects to be registered with any one object
  this.physics.add.collider(this.player, platforms);
  this.physics.add.collider(obj0, platforms);
  this.physics.add.collider(obj1, platforms);
  this.physics.add.collider(obj2, platforms);
  this.physics.add.collider(obj3, platforms);
  this.physics.add.collider(obj4, platforms);
  this.physics.add.collider(obj4.secondObj, platforms);
  this.physics.add.collider(obj5, platforms);
  this.physics.add.overlap(this.player, obj0, collectItem, null, this);
  this.physics.add.overlap(this.player, obj1, collectItem, null, this);
  this.physics.add.overlap(this.player, obj2, collectItem, null, this);
  this.physics.add.overlap(this.player, obj3, collectItem, null, this);
  this.physics.add.overlap(this.player, obj4, collectItem, null, this);
  this.physics.add.overlap(this.player, obj5, collectItem, null, this);
  obj4.secondObj.disableBody(true, true);
  }
  
  public update() {

      this.messageFSM.step();
  }


  
}


const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Birthday Card',
  scene: GameScene,
  type: Phaser.AUTO,
  pixelArt: true,
 
  scale: {
    width: 1700,
    height: 1024,
  },
 
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {y:10000}
    },
  },
 
  parent: 'game',
  backgroundColor: '#000000',
};
 
export const game = new Phaser.Game(gameConfig);
// import * as Phaser from 'phaser';
// import * as StateMachine from '../StateMachine';

// const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
//     active: false,
//     visible: false,
//     key: 'Game2',
// };
  
// let platforms;
// type SpriteDir = 'left' | 'right';
// //let player;
// let obj0;
// let obj1;
// let obj2;
// let obj3;
// let obj4;
// let obj5;

// export class GameScene2 extends Phaser.Scene {
//   //TODO: create class that jjust hass all of the attributes
//   private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
//   bubble1: Phaser.GameObjects.Graphics;
//   message1: Phaser.GameObjects.BitmapText;
//   sceneItems: Array<Object>;
//   //TODO Add another bitmaptext saying to press space to continue in white letters
//   typingHelper: {text: string, counter: number, typeSound: Phaser.Sound.BaseSound};
//   texts: Map<string, string>;
//   messageFSM: StateMachine.StateMachine;
//   player: Phaser.Physics.Arcade.Sprite;
//   playerDir: SpriteDir;
//   typingSound: Phaser.Sound.BaseSound;
//   song: Phaser.Sound.BaseSound; 

//   constructor() {
//     super(sceneConfig);
//   }
  
//   public preload() {
//     //iterate through the json files
//     this.song = this.sound.add('song', {loop: true});
//   }

//   public create() {

//     //register sounds and music
    
//     this.song.play();
//     this.typingSound = this.sound.add('typing');

//     //TODO
//     //initialize objects in scene1Content and add to a dictionary
//     //make sure to associate an event name with each object

//     //initialize message texts
//     //initialize the texts in the scene1content class file
//     this.typingHelper = {text: '', counter: 0, typeSound: this.typingSound};
    
//     //instead, we'll just create some images (it's a simple game)
//     let sky = this.add.image(0,0, 'sky');//setScale(100);
//     sky.scaleX = 230;
//     sky.scaleY = 88;
//     //create JSON file that contains all of these objects
//     this.add.image(350, 500, 'clouds').setScale(10);
//     this.add.image(1025, 550,'clouds').setScale(10);
//     this.add.image(-200,-50,'backwall').setOrigin(0,0).setScale(10);
//     this.add.image(360, 530, 'window').setScale(10);
//     this.add.image(990, 530, 'window').setScale(10);
//     this.add.image(80, 580, 'chair').setScale(10);
//     this.add.image(220, 580, 'desk').setScale(10);
//     this.add.image(1400, 580, 'cabinets').setScale(10);

//     //initialize and configure floor
//     platforms = this.physics.add.staticGroup();
//     platforms.create(1200, 700, 'block', 1).setScale(300,10).refreshBody();

//     //bit ghetto right now, but define the objects with an event name that corresponds with the
//     //registered events above
//     //Create another JSON for objects that will be collided with and that have events 
//     //associated with them.
//     //Then register the events
    
//     //initialize player and playerdir
//     this.player = this.physics.add.sprite(100, 400, 'reeny').setScale(10);
//     this.player.setCollideWorldBounds(true);
//     this.playerDir = 'right';

//     //initialize offscreen framing
//     let topBlack = this.add.image(-100,0, 'offscreen').setOrigin(0,0);
//     let bottomBlack = this.add.image(-100,800, 'offscreen').setOrigin(0,0);
//     topBlack.scaleX = 150;
//     topBlack.scaleY = 15;
//     bottomBlack.scaleX = 150;
//     bottomBlack.scaleY = 15;
    
//     //initialize bubble, bitmaptext, and the messages
//     this.bubble1 = this.add.graphics({ x: window.innerWidth/2, y: 200 });
//     this.message1 = this.add.bitmapText(window.innerWidth/2, 300, 'atari', "quote", 30, Phaser.GameObjects.BitmapText.ALIGN_LEFT).setMaxWidth(1000).setOrigin(0).setScale(1);
//     this.message1.visible = false;

    
//     //initialize with message Finite State Machine
//     // this.messageFSM = new StateMachine.StateMachine('idle', {
//     //   idle: new IdleState(),
//     //   move: new MoveState(),
//     //   show: new ShowMessageState()
//     // }, [this, this.player, this.playerDir, this.message1, this.bubble1, this.typingHelper]);

//     //create the events that will trigger the messages
//     //TODO make function that iterates through the trigger collision items
//     //Load animations from JSON file
    

//   //register collisions between every 2 objects and collect logic between ever 2 objects
//   //TODO create a function where you send a collection of objects to be registered with any one object
//   this.physics.add.collider(this.player, platforms);
//   this.physics.add.collider(obj0, platforms);
//   this.physics.add.collider(obj1, platforms);
//   this.physics.add.collider(obj2, platforms);
//   this.physics.add.collider(obj3, platforms);
//   this.physics.add.collider(obj4, platforms);
//   this.physics.add.collider(obj4.secondObj, platforms);
//   this.physics.add.collider(obj5, platforms);
//   // this.physics.add.overlap(this.player, obj0, collectItem, null, this);
//   // this.physics.add.overlap(this.player, obj1, collectItem, null, this);
//   // this.physics.add.overlap(this.player, obj2, collectItem, null, this);
//   // this.physics.add.overlap(this.player, obj3, collectItem, null, this);
//   // this.physics.add.overlap(this.player, obj4, collectItem, null, this);
//   // this.physics.add.overlap(this.player, obj5, collectItem, null, this);
//   obj4.secondObj.disableBody(true, true);
//   }
  
//   public update() {

//       this.messageFSM.step();
//   }


  
// }


// // const gameConfig: Phaser.Types.Core.GameConfig = {
// //   title: 'Birthday Card',
// //   scene: GameScene2,
// //   type: Phaser.AUTO,
// //   pixelArt: true,
 
// //   scale: {
// //     width: 1700,
// //     height: 1024,
// //   },
 
// //   physics: {
// //     default: 'arcade',
// //     arcade: {
// //       debug: false,
// //       gravity: {y:10000}
// //     },
// //   },
 
// //   parent: 'game',
// //   backgroundColor: '#000000',
// // };
 
// // export const game = new Phaser.Game(gameConfig);
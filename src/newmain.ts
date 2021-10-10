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
  //TODO Add another bitmaptext saying to press space to continue in white letters
  typingHelper: {text: string, counter: number, typeSound: Phaser.Sound.BaseSound};
  text0: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
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

    //map and background
    //for this one, we're not using a tiled background, so we don't actually need these next three lines:
    ////const map1 = this.make.tilemap({ key: 'map1' });
    ////const tileset1 = map1.addTilesetImage('SuperMarioBros-World1-1', 'tiles1');
    ////const layer1 = map1.createLayer('World1', tileset1, 0, 64).setScale(2);
    
    //initialize message texts
    this.typingHelper = {text: '', counter: 0, typeSound: this.typingSound};
    this.text0 = "Drat this writer's block! I just can't figure out what to write next in this poem. Maybe I'll find some inspiration here around the house to help me finish.\n[Press the left and right arrow keys to move around, and Spacebar to hide messages]";
    this.text1 = "Here's a word from one of my books. It's 'Jerflibicus'.... Not quite what I was expecting from this book. I guess I'll have to keep looking.";
    this.text2 = "Getting inspiration from my plant....aand it saays...Folgollywelcrevaterim....I think I need to keep searching...and get a new plant.";
    this.text3 = "Surely a snack might give me some good inspiration, right? *sniff* *sniff* ....mmmm, Phidroplemolesctikeenwa...nope.";
    this.text4 = "Scrupleplu, flantagelum, vormistify...hmm. Maybe I just need to go for a walk.";
    this.text5 = `Happy birthday again, Eirene (late edition)! I hope you've enjoyed this little teeny game. You've done some pretty cool writing--a lot of which I still have to catch up on. I appreciate your efforts to employ your creative talents. It really does inspire me to not give up on mine. You're a terrific person, and have a terrific family. That much is clear. :)  Anyways, I love you butTons, and I hope that this year is just as good as last, if not better.        Edgrum`;
    //instead, we'll just create some images (it's a simple game)
    let sky = this.add.image(0,0, 'sky');//setScale(100);
    sky.scaleX = 230;
    sky.scaleY = 88;
    this.add.image(350, 500, 'clouds').setScale(10);
    this.add.image(1025, 550,'clouds').setScale(10);
    this.add.image(-200,-50,'backwall').setOrigin(0,0).setScale(10);
    this.add.image(360, 530, 'window').setScale(10);
    this.add.image(990, 530, 'window').setScale(10);



    //initialize furniture
    this.add.image(80, 580, 'chair').setScale(10);
    this.add.image(220, 580, 'desk').setScale(10);
    this.add.image(1400, 580, 'cabinets').setScale(10);

    //initialize and configure floor
    platforms = this.physics.add.staticGroup();
    platforms.create(1200, 700, 'block', 1).setScale(300,10).refreshBody();

    //bit ghetto right now, but define the objects with an event name that corresponds with the
    //registered events above
    obj0 = this.physics.add.image(50, 200, 'chair').setScale(0.1);
    obj0.text = this.text0;
    obj0.event = 'message0';
    obj1 = this.physics.add.image(550,450, 'shelf').setScale(10);
    obj1.text = this.text1;
    obj1.event = 'message1';
    obj2 = this.physics.add.image(800, 400, 'plant').setScale(10);
    obj2.text = this.text2;
    obj2.event = 'message2';
    obj3 = this.physics.add.image(1200, 400, 'fridge').setScale(10);
    obj3.text = this.text3;
    obj3.event = 'message3';
    obj4 = this.physics.add.image(1590, 400, 'door-closed').setScale(10);
    obj4.text = this.text4;
    obj4.event = 'message4';
    obj4.secondObj = this.physics.add.image(1590,0, 'door-open').setScale(10);
    obj5 = this.physics.add.image(1660, 400, 'chair').setScale(0.1);
    obj5.text = this.text5;
    obj5.event = 'message5';
    
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
    this.events.once('message0', this.messageHandler, this);
    this.events.once('message1', this.messageHandler, this);
    this.events.once('message2', this.messageHandler, this);
    this.events.once('message3', this.messageHandler, this);
    this.events.once('message4', this.messageHandler, this);
    this.events.once('message5', this.messageHandler, this);

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


  messageHandler(text) {
    console.log(window.innerWidth);
    let charPixelWidth = 30;
    let width = text.length * charPixelWidth > 1000 ? 1000 : text.length * charPixelWidth;
    
    let height = Math.ceil((text.length * charPixelWidth)/1000) * charPixelWidth;
    this.message1 = createTextBubble(this, width + 100, height + (charPixelWidth * 2), text, this.bubble1, this.message1);
    console.log(this.messageFSM.state);
    this.messageFSM.transition('idle');
    this.messageFSM.transition('show');
  }
}

class ShowMessageState extends StateMachine.State {
    enter(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite, playerDir: SpriteDir, 
      text: Phaser.GameObjects.BitmapText, bubble: Phaser.GameObjects.Graphics, typeHelp: {text: string, counter: number, typeSound: Phaser.Sound.BaseSound}) {
      bubble.visible = true;
      text.visible = true;
      typeHelp.text = text.text;
      typeHelp.counter = 0;
      text.text = '';
      
    }
    execute(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite, playerDir: SpriteDir, 
      text: Phaser.GameObjects.BitmapText, bubble: Phaser.GameObjects.Graphics, typeHelp: {text: string, counter: number, typeSound: Phaser.Sound.BaseSound}) {
      const cursorKeys = scene.input.keyboard.createCursorKeys();
      if (cursorKeys.space.isDown) {
        bubble.visible = false;
        
        text.visible = false;
        this.stateMachine.transition('idle');
      }

      if (typeHelp.counter < typeHelp.text.length) {
        //if(!typeHelp.typeSound.isPlaying) {
          text.text += typeHelp.text[typeHelp.counter];
          typeHelp.typeSound.play();
          typeHelp.counter += 1;
        //}
      }

    }
}
class IdleState extends StateMachine.State {
  enter(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite, playerDir: SpriteDir, 
    text: Phaser.GameObjects.BitmapText, bubble: Phaser.GameObjects.Graphics, typeHelp: {text: string, counter: number, typeSound: Phaser.Sound.BaseSound}) {
    player.setVelocityX(0);
    player.anims.play(`${playerDir}`);
    player.anims.stop();
  }
  execute(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite, playerDir: SpriteDir, 
    text: Phaser.GameObjects.BitmapText, bubble: Phaser.GameObjects.Graphics, typeHelp: {text: string, counter: number, typeSound: Phaser.Sound.BaseSound}) {
    const cursorKeys = scene.input.keyboard.createCursorKeys();
    if (cursorKeys.left.isDown || cursorKeys.right.isDown) {
      this.stateMachine.transition('move');
    }
    player.anims.play('idle', true);
  }
}
class MoveState extends StateMachine.State {
  execute(scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite, playerDir: SpriteDir, 
    text: Phaser.GameObjects.BitmapText, bubble: Phaser.GameObjects.Graphics, typeHelp: {text: string, counter: number, typeSound: Phaser.Sound.BaseSound}) {
    const cursorKeys = scene.input.keyboard.createCursorKeys();
    if(!(cursorKeys.left.isDown || cursorKeys.right.isDown || cursorKeys.up.isDown || cursorKeys.down.isDown)) {
      this.stateMachine.transition('idle');
      return;
    }

    // handle movement
    player.setVelocityX(0);
    if(cursorKeys.left.isDown) {
        player.setVelocityX(-300);
        playerDir = 'left';
        player.flipX = true;//setScale(-2);
    } else if(cursorKeys.right.isDown) {
        player.setVelocityX(300);
        playerDir = 'right';
        player.flipX = false;//.setScale(2);
    }
    player.anims.play(`${playerDir}`, true);
  }
}

  function collectItem (player, item)
  {
    //
    this.events.emit(item.event, item.text)
    if (item.event == 'message4') {
      item.disableBody(true, true);
      item = item.secondObj
      item.enableBody(true, 1590, 580, true, true);
      //item = scene.physics.add.image(1590, 400, 'door-open').setScale(10);
    }
  }

  function createTextBubble (scene, width, height, quote, bubble, bitmapText)
  {
    bubble.clear();
    var bubbleWidth = width;
    var bubbleHeight = height;
    var bubblePadding = 10;
    var arrowHeight = bubbleHeight / 4;

    //var bubble = scene.add.graphics({ x: x, y: y });

    //  Bubble shadow
    bubble.fillStyle(0x222222, 0.5);
    bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    //  Bubble color
    bubble.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    bubble.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    //  Calculate arrow coordinates
    var point1X = Math.floor(bubbleWidth / 7);
    var point1Y = bubbleHeight;
    var point2X = Math.floor((bubbleWidth / 7) * 2);
    var point2Y = bubbleHeight;
    var point3X = Math.floor(bubbleWidth / 7);
    var point3Y = Math.floor(bubbleHeight + arrowHeight);

    //var content = scene.add.bitmapText(400, 300, 'atari', quote, 30, 'center').setMaxWidth(1000).setOrigin(0).setScale(1);//.add.text(0, 0, quote, { fontFamily: 'atari', fontSize: 20, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });
    bubble.setPosition(window.innerWidth/2 - bubbleWidth/2, bubble.y);
    bitmapText.text = quote;
    //var b = content.getBounds();

    //bitmapText.setPosition(bubble.x + (bubbleWidth / 2) - (bitmapText.width / 2), bubble.y + (bubbleHeight / 2) - (bitmapText.height / 2));
    bitmapText.setPosition(bubble.x + 50, bubble.y + 25);

    return bitmapText;
  }

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Eirene',
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
import * as Phaser from 'phaser';
import { collectItem, messageHandler } from '../helpers';
import { StateMachine, State} from '../StateMachine';
import {ANIMATED_ITEMS, BACKGROUND_ITEMS, TRIGGER_COLLISION_ITEMS, SOUND_ITEMS, PLATFORM_ITEMS, FONT_ITEMS, EVENT_ITEMS} from './boot-scene';
import States from '../states';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game2',
};
  
export class GameScene2 extends Phaser.Scene {
  //TODO: create class that jjust hass all of the attributes
  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
  bubble1: Phaser.GameObjects.Graphics;
  message1: Phaser.GameObjects.BitmapText;
  sceneItems: Array<Object>;
  //TODO Add another bitmaptext saying to press space to continue in white letters
  typingHelper: {text: string, counter: number, typeSound: Phaser.Sound.BaseSound};
  texts: Map<string, string>;
  messageFSM: StateMachine;
  player: GameChildItem;
  playerDir: SpriteDir;
  typingSound: Phaser.Sound.BaseSound;
  song: Phaser.Sound.BaseSound; 
  animItemCol: Map<String,GameChildItem>;
  triggerCollisionItemCol: Map<String, GameChildItem>;
  backGroundItemCol: Map<String, Phaser.GameObjects.Image>;
  platformItemCol: Map<String, GameGroupType>;
  soundItemCol: Map<String, Phaser.Sound.BaseSound>;
  eventItemCol: Map<String, Map<String, String>>;

  constructor() {
    super(sceneConfig);
  }
  
  public preload() {
    this.animItemCol = new Map<String, GameChildItem>();
    this.triggerCollisionItemCol = new Map<String, GameChildItem>();
    this.backGroundItemCol = new Map<String, GameChildItem>();
    this.platformItemCol = new Map<String, GameGroupType>();
    this.soundItemCol = new Map<String, Phaser.Sound.BaseSound>();
    this.eventItemCol = new  Map<String, Map<String, String>>();
    //iterate through the json files
    //this.song = this.sound.add('song', {loop: true});
  }

  public create() {

    //register sounds and music
    
    this.fabricateBackgroundItems();
    this.fabricatePlatformItems();
    this.fabricateTriggerCollisionItems();
    this.fabricateAnimatedItems();
    this.fabricateSoundItems();
    this.registerEvents();
    this.soundItemCol.get("song").play();

    //TODO
    //make sure to associate an event name with each object

    //initialize message texts
    //initialize the texts in the scene1content class file
    this.typingHelper = {text: '', counter: 0, typeSound: this.soundItemCol.get("typing")};
    

    this.player = this.animItemCol.get("reeny");
    this.playerDir = 'right';

    // //initialize offscreen framing
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
    this.messageFSM = new StateMachine('idle', {
      idle: new States.IdleState(),
      move: new States.MoveState(),
      show: new States.ShowMessageState()
    }, [this, this.player, this.playerDir, this.message1, this.bubble1, this.typingHelper]);


    
    //create the events that will trigger the messages
    //TODO make function that iterates through the trigger collision items
    //Load animations from JSON file
    //this.physics.add.image(50,50, 'shelf').setScale(10)
  //register collisions between every 2 objects and collect logic between ever 2 objects
  //TODO create a function where you send a collection of objects to be registered with any one object
  this.setCollisionables(this.triggerCollisionItemCol.values(), this.platformItemCol.get("floor"), this.triggerCollisionItemCol.size);
  this.setTriggerables(this.triggerCollisionItemCol.values(), this.animItemCol.get("reeny"), this.triggerCollisionItemCol.size);
  this.physics.add.collider(this.player, this.platformItemCol.get("floor"));

  //obj4.secondObj.disableBody(true, true);
    let doorOpen = this.triggerCollisionItemCol.get("door-open") as Phaser.Physics.Arcade.Sprite;
    doorOpen.disableBody(true, true);
  }

  
  public update() {

      this.messageFSM.step();
  }

  private fabricateAnimatedItems() {
    let arr = Array.from(this.cache.json.entries.get(ANIMATED_ITEMS));
    arr.forEach((element:any) => {
      let instances = Array.from(element.instances);
      instances.forEach((instance:any) => {
        let animItem = this.physics.add.sprite(instance.x, instance.y, element.asset);
        let options = Array.from(element.options);
        options.forEach((optionElement:any) => {
          switch(optionElement.option){
            case "scale":
              animItem.setScale(optionElement.value.x, optionElement.value.y);
              break;
            case "origin":
              animItem.setOrigin(optionElement.value.x, optionElement.value.y);
              break;
            case "colliderWorldBounds":
              animItem.setCollideWorldBounds(true)
            default:
              break;
          }
        })
        this.animItemCol.set(element.asset, animItem)
      });
      let animations = Array.from(element.animations);
      animations.forEach((animation:any) => {
        this.anims.create({
          key: animation.key,
          frames: this.anims.generateFrameNumbers(element.asset, {frames: animation.frames}),
          frameRate: animation.frameRate,
          repeat: animation.repeat
        })
      });
      
    });
  }

  private fabricateBackgroundItems() {
    let arr = Array.from(this.cache.json.entries.get(BACKGROUND_ITEMS));
    arr.forEach((element:any) => {
      
      let instances = Array.from(element.instances);
      instances.forEach((instance:any) => {
        let imageItem = this.add.image(instance.x, instance.y, element.asset);
        let options = Array.from(element.options);
        options.forEach((optionElement:any) => {
          switch(optionElement.option){
            case "scale":
              imageItem.setScale(optionElement.value.x, optionElement.value.y);
              break;
            case "origin":
              imageItem.setOrigin(optionElement.value.x, optionElement.value.y);
              break;
            default:
              break;
          }
        })
        this.backGroundItemCol.set(element.asset, imageItem);
      });

    });
  }

  private fabricateFontItems() {
    let arr = Array.from(this.cache.json.entries.get(FONT_ITEMS));
    arr.forEach((element:any) => {
      
      let instances = Array.from(element.instances);
      instances.forEach((instance:any) => {
        let animItem = this.physics.add.sprite(instance.x, instance.y, element.asset);
        let options = Array.from(element.options);
        options.forEach((optionElement:any) => {
          switch(optionElement.option){
            case "scale":
              animItem.setScale(optionElement.value.x, optionElement.value.y);
              break;
            case "origin":
              animItem.setOrigin(optionElement.value.x, optionElement.value.y);
              break;
            default:
              break;
          }
        })
      });

      
    });
  }
  
  private fabricatePlatformItems() {
    let arr = Array.from(this.cache.json.entries.get(PLATFORM_ITEMS));
    arr.forEach((element:any) => {
      if (!this.platformItemCol.has("group")) {
        this.platformItemCol.set("group", this.physics.add.staticGroup())
      } 
      
      let instances = Array.from(element.instances);
      instances.forEach((instance:any) => {
        
        let platformItemInstance = this.platformItemCol.get("group").create(instance.x, instance.y,element.asset, element.frame)
        //let animItem = this.physics.add.sprite(instance.x, instance.y, element.asset);
        let options = Array.from(element.options);
        options.forEach((optionElement:any) => {
          switch(optionElement.option){
            case "scale":
              platformItemInstance.setScale(optionElement.value.x, optionElement.value.y);
              break;
            case "origin":
              platformItemInstance.setOrigin(optionElement.value.x, optionElement.value.y);
              break;
            case "refresh":
              platformItemInstance.refreshBody()
            default:
              break;
          }
        })

        this.platformItemCol.set(element.asset, platformItemInstance)
      });

      
    });
  }

  private fabricateSoundItems() {
    let arr = Array.from(this.cache.json.entries.get(SOUND_ITEMS));
    arr.forEach((element:any) => {
      let soundItem = this.sound.add(element.asset, element.config);
      this.soundItemCol.set(element.asset, soundItem);
      // let instances = Array.from(element.instances);
      // instances.forEach((instance:any) => {
      //   let animItem = this.physics.add.sprite(instance.x, instance.y, element.asset);
      //   let options = Array.from(element.options);
      //   options.forEach((optionElement:any) => {
      //     switch(optionElement.option){
      //       case "scale":
      //         animItem.setScale(optionElement.value.x, optionElement.value.y);
      //         break;
      //       case "origin":
      //         animItem.setOrigin(optionElement.value.x, optionElement.value.y);
      //         break;
      //       default:
      //         break;
      //     }
      //   })
      // });

      
    });
  }

  private fabricateTriggerCollisionItems() {
    let arr = Array.from(this.cache.json.entries.get(TRIGGER_COLLISION_ITEMS));
    arr.forEach((element:any) => {
      
      let instances = Array.from(element.instances);
      instances.forEach((instance:any) => {
        let imageItem = this.physics.add.image(instance.x, instance.y, element.asset);
        let options = Array.from(element.options);
        options.forEach((optionElement:any) => {
          switch(optionElement.option){
            case "scale":
              imageItem.setScale(optionElement.value.x, optionElement.value.y);
              break;
            case "origin":
              imageItem.setOrigin(optionElement.value.x, optionElement.value.y);
              break;
            default:
              break;
          }
        })
        this.triggerCollisionItemCol.set(element.asset, imageItem);
      });

      
    });
  }

  private setCollisionables(gameItems: IterableIterator<GameChildItem>, gameItemTarget: GameChildItem 
    | GameGroupType, iterationSize: number) {
    for (var i = 0; i< iterationSize; i++)
    {
      this.physics.add.collider(gameItems.next().value, gameItemTarget);
    }
    
  }

  private setTriggerables(gameItems: IterableIterator<GameChildItem>, gameItemTarget: GameChildItem 
    | GameGroupType, iterationSize: number) {
    for (var i = 0; i< iterationSize; i++)
    {
      this.physics.add.overlap( gameItemTarget, gameItems.next().value, collectItem, null, this);
    }
    
  }
  
  private registerEvents() {
    let arr = Array.from(this.cache.json.entries.get(EVENT_ITEMS));
    arr.forEach((element:any) => {
      if (element.type == "message")
      {
        this.events.once(element.event, messageHandler, this )
      }
      this.eventItemCol.set(element.asset, element)
    });
    
  }
  
}


// const gameConfig: Phaser.Types.Core.GameConfig = {
//   title: 'Birthday Card',
//   scene: GameScene2,
//   type: Phaser.AUTO,
//   pixelArt: true,
 
//   scale: {
//     width: 1700,
//     height: 1024,
//   },
 
//   physics: {
//     default: 'arcade',
//     arcade: {
//       debug: false,
//       gravity: {y:10000}
//     },
//   },
 
//   parent: 'game',
//   backgroundColor: '#000000',
// };
 
// export const game = new Phaser.Game(gameConfig);
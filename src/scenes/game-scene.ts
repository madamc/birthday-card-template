import * as Phaser from 'phaser';
import { collectItem, messageHandler } from '../helpers';
import { StateMachine, State} from '../StateMachine';
import {ANIMATED_ITEMS, BACKGROUND_ITEMS, TRIGGER_COLLISION_ITEMS, SOUND_ITEMS, PLATFORM_ITEMS, FONT_ITEMS, EVENT_ITEMS} from './boot-scene';
import States from '../states';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};
  
export class GameScene extends Phaser.Scene {
  //TODO: create class that jjust hass all of the attributes
  protected square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
  bubble1: Phaser.GameObjects.Graphics;
  message1: Phaser.GameObjects.BitmapText;
  spacePrompt: Phaser.GameObjects.BitmapText;
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
  fontItemCol: Map<String, Phaser.GameObjects.Text | Phaser.GameObjects.BitmapText>;
  backGroundItemFilter: Array<String>;
  triggerCollisionItemFilter: Array<String>;
  animItemFilter: Array<String>;
  eventItemFilter: Array<String>;

  constructor(scnConfig) {
    super(scnConfig);
  }
  
  public preload() {
    this.animItemCol = new Map<String, GameChildItem>();
    this.triggerCollisionItemCol = new Map<String, GameChildItem>();
    this.backGroundItemCol = new Map<String, GameChildItem>();
    this.platformItemCol = new Map<String, GameGroupType>();
    this.soundItemCol = new Map<String, Phaser.Sound.BaseSound>();
    this.eventItemCol = new  Map<String, Map<String, String>>();
    this.fontItemCol = new Map<String, Phaser.GameObjects.Text | Phaser.GameObjects.BitmapText>();
    this.backGroundItemFilter = new Array<String>();
    this.triggerCollisionItemFilter = new Array<String>();
    this.animItemFilter = new Array<String>();
    this.eventItemFilter = new Array<String>();
  }

  public create() {
    
    this.fabricateBackgroundItems();
    this.fabricatePlatformItems();
    this.fabricateTriggerCollisionItems();
    this.fabricateAnimatedItems();
    this.fabricateSoundItems();
    this.registerEvents();
    this.fabricateFontItems();
    this.soundItemCol.get("song").play();

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

    this.setCollisionables(this.triggerCollisionItemCol.values(), this.platformItemCol.get("floor"), this.triggerCollisionItemCol.size);
    this.setTriggerables(this.triggerCollisionItemCol.values(), this.animItemCol.get("reeny"), this.triggerCollisionItemCol.size);
    this.physics.add.collider(this.player, this.platformItemCol.get("floor"));
      
  }

  
  public update() {

      this.messageFSM.step();
  }

  protected fabricateAnimatedItems() {
    let arr = Array.from(this.cache.json.entries.get(ANIMATED_ITEMS));
    arr = this.filterArrayWithStringArray(arr, this.animItemFilter);
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

  protected fabricateBackgroundItems() {
    let arr = Array.from(this.cache.json.entries.get(BACKGROUND_ITEMS));
    arr = this.filterArrayWithStringArray(arr, this.backGroundItemFilter);

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

  protected fabricateFontItems() {
    let arr = Array.from(this.cache.json.entries.get(FONT_ITEMS));
    arr.forEach((element:any) => {
      let instances = Array.from(element.instances);
      instances.forEach((instance:any) => {
        let fontItem = this.add.bitmapText(instance.x, instance.y, element.asset, element.text, element.fontSize);
        let options = Array.from(element.options);
        options.forEach((optionElement:any) => {
          switch(optionElement.option){
            case "scale":
              fontItem.setScale(optionElement.value.x, optionElement.value.y);
              break;
            case "origin":
              fontItem.setOrigin(optionElement.value.x, optionElement.value.y);
              break;
            case "maxWidth":
              fontItem.setMaxWidth(optionElement.value);
            default:
              break;
          }
        })
        this.fontItemCol.set(element.asset, fontItem);
      });

      
    });
  }
  
  protected fabricatePlatformItems() {
    let arr = Array.from(this.cache.json.entries.get(PLATFORM_ITEMS));
    arr.forEach((element:any) => {
      if (!this.platformItemCol.has("group")) {
        this.platformItemCol.set("group", this.physics.add.staticGroup())
      } 
      
      let instances = Array.from(element.instances);
      instances.forEach((instance:any) => {
        
        let platformItemInstance = this.platformItemCol.get("group").create(instance.x, instance.y,element.asset, element.frame)
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

  protected fabricateSoundItems() {
    let arr = Array.from(this.cache.json.entries.get(SOUND_ITEMS));
    arr.forEach((element:any) => {
      let soundItem = this.sound.add(element.asset, element.config);
      this.soundItemCol.set(element.asset, soundItem);
    });
  }

  protected fabricateTriggerCollisionItems() {
    let arr = Array.from(this.cache.json.entries.get(TRIGGER_COLLISION_ITEMS));
    arr = this.filterArrayWithStringArray(arr, this.triggerCollisionItemFilter);
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

  protected setCollisionables(gameItems: IterableIterator<GameChildItem>, gameItemTarget: GameChildItem 
    | GameGroupType, iterationSize: number) {
    for (var i = 0; i< iterationSize; i++)
    {
      this.physics.add.collider(gameItems.next().value, gameItemTarget);
    }
    
  }

  protected setTriggerables(gameItems: IterableIterator<GameChildItem>, gameItemTarget: GameChildItem 
    | GameGroupType, iterationSize: number) {
    for (var i = 0; i< iterationSize; i++)
    {
      this.physics.add.overlap( gameItemTarget, gameItems.next().value, collectItem, null, this);
    }
    
  }
  
  protected registerEvents() {
    let arr = Array.from(this.cache.json.entries.get(EVENT_ITEMS));
    arr.forEach((element:any) => {
      if (element.type == "message")
      {
        this.events.once(element.event, messageHandler, this )
      }
      this.eventItemCol.set(element.asset, element)
    });
    
  }
  
  protected filterArrayWithStringArray(arrayToFilter: Array<any>, stringArray: Array<String>) {
    if (stringArray.length > 0) {
      arrayToFilter = arrayToFilter.filter((element:any) => {
        return stringArray.includes(element.asset);
      });
    }
    return arrayToFilter;
  }
}



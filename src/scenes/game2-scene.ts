import * as Phaser from 'phaser';
import { collectItem, messageHandler } from '../helpers';
import { StateMachine, State} from '../StateMachine';
import {ANIMATED_ITEMS, BACKGROUND_ITEMS, TRIGGER_COLLISION_ITEMS, SOUND_ITEMS, PLATFORM_ITEMS, FONT_ITEMS, EVENT_ITEMS} from './boot-scene';
import States from '../states';
import { GameScene } from './game-scene';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game2',
};
  
export class GameScene2 extends GameScene {
  //TODO: create class that jjust hass all of the attributes
  

  constructor() {
    super(sceneConfig);
  }
  
  public preload() {
    super.preload();
  }

  public create() {

    super.create();//register sounds and music
    let doorOpen = this.triggerCollisionItemCol.get("door-open") as Phaser.Physics.Arcade.Sprite;
    doorOpen.disableBody(true, true);
    this.fabricateFontItems();
    

  }

  
  public update() {
    super.update();
  }

  override fabricateFontItems() {
    super.fabricateFontItems();
    let atariFont = this.fontItemCol.get("atari") as Phaser.GameObjects.BitmapText;
    atariFont.setLeftAlign();

  }
  
  
}


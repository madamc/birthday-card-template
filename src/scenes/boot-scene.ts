import { getGameWidth, getGameHeight, messageHandler } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Boot',
};

export const ANIMATED_ITEMS = "animated-items";
export const BACKGROUND_ITEMS = "background-items";
export const SINGLE_SPRITE_ITEMS = "single-sprite-items"
export const SPRITESHEET_ITEMS = "spritesheet-items";
export const TRIGGER_COLLISION_ITEMS = "trigger-collision-items";
export const PLATFORM_ITEMS = "platform-items";
export const SOUND_ITEMS = "sound-items";
export const FONT_ITEMS = "font-items";
export const MESSAGE_ITEMS = "message-items";
export const EVENT_ITEMS = "event-items";
/**
 * The initial scene that loads all necessary assets to the game and displays a loading bar.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public preload(): void {
    const halfWidth = getGameWidth(this) * 0.5;
    const halfHeight = getGameHeight(this) * 0.5;

    const progressBarHeight = 100;
    const progressBarWidth = 400;

    const progressBarContainer = this.add.rectangle(
      halfWidth,
      halfHeight,
      progressBarWidth,
      progressBarHeight,
      0x000000,
    );
    const progressBar = this.add.rectangle(
      halfWidth + 20 - progressBarContainer.width * 0.5,
      halfHeight,
      10,
      progressBarHeight - 20,
      0x888888,
    );

    const loadingText = this.add.text(halfWidth - 75, halfHeight - 100, 'Loading...').setFontSize(24);
    const percentText = this.add.text(halfWidth - 25, halfHeight, '0%').setFontSize(24);
    const assetText = this.add.text(halfWidth - 25, halfHeight + 100, '').setFontSize(24);

    this.load.on('progress', (value) => {
      progressBar.width = (progressBarWidth - 30) * value;

      const percent = value * 100;
      percentText.setText(`${percent}%`); 
    });  

    this.load.on('filecomplete', (filename) => {
      this.loadAssets(filename);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(file.key);
    });

    this.load.on('complete', () => {
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      progressBar.destroy();
      progressBarContainer.destroy();
      
      this.scene.start('MainMenu');
    });
    //load the json resources so that when this scene completes loading, the assets can be loaded in
    this.load.json(ANIMATED_ITEMS, 'assets/contentConfigs/animated-items.json');
    this.load.json(SINGLE_SPRITE_ITEMS, 'assets/contentConfigs/single-sprite-items.json');
    this.load.json(SPRITESHEET_ITEMS, 'assets/contentConfigs/spritesheet-items.json');
    this.load.json(BACKGROUND_ITEMS, 'assets/contentConfigs/background-items.json');
    this.load.json(TRIGGER_COLLISION_ITEMS, 'assets/contentConfigs/trigger-collision-items.json');
    this.load.json(PLATFORM_ITEMS, 'assets/contentConfigs/platform-items.json');
    this.load.json(SOUND_ITEMS, 'assets/contentConfigs/sound-items.json');
    this.load.json(FONT_ITEMS, 'assets/contentConfigs/font-items.json');
    this.load.json(EVENT_ITEMS, 'assets/contentConfigs/event-items.json');

    //non-loadables
    this.load.json(MESSAGE_ITEMS, 'assets/contentConfigs/message-items.json');    // this.load.audio('song', 'assets/sounds/song.ogg');
    // this.load.audio('typing', 'assets/sounds/typing.ogg');
  }

  /**
   * All assets that need to be loaded by the game (sprites, images, animations, tiles, music, etc)
   * should be added to this method. Once loaded in, the loader will keep track of them, indepedent of which scene
   * is currently active, so they can be accessed anywhere.
   */
  public loadAssets(filename) {

    if (this.cache.json.entries.get(filename) != undefined)
    {
      let arr = Array.from(this.cache.json.entries.get(filename));
      switch (filename){
        case ANIMATED_ITEMS:
          break;
        case SPRITESHEET_ITEMS:
          arr.forEach((element:any) => {
            this.load.spritesheet(
              element.asset,
              element.spritesheet.filepath, 
              {
                frameWidth: element.spritesheet.framewidth,
                frameHeight: element.spritesheet.frameheight
              });
          });
          break;
        case SINGLE_SPRITE_ITEMS:
          arr.forEach((element:any) => {
            this.load.image(
              element.asset,
              element.filepath);
          });
          break;
        case BACKGROUND_ITEMS:
          break;
        case PLATFORM_ITEMS:
          break;
        case TRIGGER_COLLISION_ITEMS:
          break;
        case SOUND_ITEMS:
          arr.forEach((element:any) => {
            this.load.audio(
              element.asset,
              element.filepath);
          });
          break;
        case FONT_ITEMS:
          arr.forEach((element:any) => {
            this.load.bitmapFont(
              element.asset,
              element.imagepath,
              element.configpath);
          });
            
        default:
          break;
      }
    }
    else{
    }
    //});
    // this.load.bitmapFont('atari', 'assets/sprites/atari-classic-b.png', 'assets/sprites/atari-classic.xml');
    // this.load.spritesheet('block', 'assets/sprites/EC-floor.png', { frameWidth: 8, frameHeight: 8 });
    // this.load.spritesheet('reeny', 'assets/sprites/Reeny3-Sheet.png', {frameWidth: 16, frameHeight: 16});
    // this.load.image('backwall', 'assets/sprites/EC-home2.png');
    // this.load.image('window', 'assets/sprites/EC-window.png');
    // this.load.image('chair', 'assets/sprites/EC-chair.png');
    // this.load.image('desk', 'assets/sprites/EC-desk.png');
    // this.load.image('plant', 'assets/sprites/EC-plant.png');
    // this.load.image('fridge', 'assets/sprites/EC-fridge.png');
    // this.load.image('shelf', 'assets/sprites/EC-shelf.png');
    // this.load.image('door-open', 'assets/sprites/EC-door-o.png');
    // this.load.image('door-closed', 'assets/sprites/EC-door-c.png');
    // this.load.image('cabinets', 'assets/sprites/EC-cabinets.png');
    // this.load.image('sky', 'assets/sprites/EC-sky.png');
    // this.load.image('clouds', 'assets/sprites/EC-clouds.png');
    // this.load.image('offscreen', 'assets/sprites/offscreen.png');
    // this.load.image('floor', 'assets/sprites/EC-floor.png');
    // this.load.image('ice', 'assets/sprites/iceblock.png');
    // this.load.audio('song', 'assets/sounds/song.ogg');
    // this.load.audio('typing', 'assets/sounds/typing.ogg');
  }
}

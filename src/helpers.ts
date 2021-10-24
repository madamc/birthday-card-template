import * as Phaser from 'phaser';
import { MESSAGE_ITEMS } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';

export const getGameWidth = (scene: Phaser.Scene): number => {
  return scene.game.scale.width;
};

export const getGameHeight = (scene: Phaser.Scene): number => {
  return scene.game.scale.height;
};

export function createTextBubble (scene: GameScene, width, height, quote, bubble, bitmapText)
  {
    let bubble1 = scene.bubble1;
    bubble1.clear();
    var bubbleWidth = width;
    var bubbleHeight = height;
    var bubblePadding = 10;
    var arrowHeight = bubbleHeight / 4;

    //var bubble = scene.add.graphics({ x: x, y: y });

    //  Bubble shadow
    bubble1.fillStyle(0x222222, 0.5);
    bubble1.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    //  Bubble color
    bubble1.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    bubble1.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    bubble1.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    bubble1.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    //  Calculate arrow coordinates
    var point1X = Math.floor(bubbleWidth / 7);
    var point1Y = bubbleHeight;
    var point2X = Math.floor((bubbleWidth / 7) * 2);
    var point2Y = bubbleHeight;
    var point3X = Math.floor(bubbleWidth / 7);
    var point3Y = Math.floor(bubbleHeight + arrowHeight);

    //var content = scene.add.bitmapText(400, 300, 'atari', quote, 30, 'center').setMaxWidth(1000).setOrigin(0).setScale(1);//.add.text(0, 0, quote, { fontFamily: 'atari', fontSize: 20, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });
    bubble1.setPosition(window.innerWidth/2 - bubbleWidth/2, bubble1.y);
    bitmapText.text = quote;

    //bitmapText.setPosition(bubble.x + (bubbleWidth / 2) - (bitmapText.width / 2), bubble.y + (bubbleHeight / 2) - (bitmapText.height / 2));
    bitmapText.setPosition(bubble1.x + 50, bubble1.y + 25);

    return bitmapText;
  }

export function collectItem (player, item)
{
  let messageMap = (this.cache.json.entries.get(MESSAGE_ITEMS));
  //console.log(item.texture.key)
  this.events.emit(this.eventItemCol.get(item.texture.key).event, messageMap[this.eventItemCol.get(item.texture.key).subject]);
  if (this.eventItemCol.get(item.texture.key).event == 'found door-closed') {
    item.disableBody(true, true);
    //item = item.secondObj
    //item.enableBody(true, 1590, 580, true, true);
    this.triggerCollisionItemCol.get("door-open").enableBody(true, 1590, 580, true, true); 
    
  }
}

export function messageHandler(text) {
  console.log("Emmitted " + text);
  //console.log(window.innerWidth);
  let charPixelWidth = 30;
  let width = text.length * charPixelWidth > 1000 ? 1000 : text.length * charPixelWidth;
  
  let height = Math.ceil((text.length * charPixelWidth)/1000) * charPixelWidth;
  this.message1 = createTextBubble(this, width + 100, height + (charPixelWidth * 2), text, this.bubble1, this.message1);
  console.log(this.messageFSM.state);
  this.messageFSM.transition('idle');
  this.messageFSM.transition('show');
}

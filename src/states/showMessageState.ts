import * as StateMachine from "../StateMachine";
export class ShowMessageState extends StateMachine.State {
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
import * as StateMachine from "../StateMachine";

export class MoveState extends StateMachine.State {
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
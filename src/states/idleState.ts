export class IdleState extends StateMachine.State {
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
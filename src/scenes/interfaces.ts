interface IXYObject {
    x: number;
    y: number;
}
interface IObjectScrollManager {
    updateLastAndFirst(): void;
    update(): void;
}
type GameGroupType = Phaser.Physics.Arcade.StaticGroup | Phaser.GameObjects.Group;
type GameChildItem = Phaser.Physics.Arcade.Sprite | Phaser.Physics.Arcade.Image | Phaser.GameObjects.Sprite;
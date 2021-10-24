/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/StateMachine.ts":
/*!*****************************!*\
  !*** ./src/StateMachine.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StateMachine\": () => (/* binding */ StateMachine),\n/* harmony export */   \"State\": () => (/* binding */ State)\n/* harmony export */ });\n/*\r\n- `possibleStates` is an object whose keys refer to the state name and whose values are instances of the `State` class (or subclasses). The class assigns the `stateMachine` property on each instance so they can call `this.stateMachine.transition` whenever they want to trigger a transition.\r\n- `stateArgs` is a list of arguments passed to the `enter` and `execute` functions. This allows us to pass commonly-used values (such as a sprite object or current Phaser Scene) to the state methods.\r\n*/\r\nclass StateMachine {\r\n    constructor(initialState, possibleStates, stateArgs = []) {\r\n        this.initialState = initialState;\r\n        this.possibleStates = possibleStates;\r\n        this.stateArgs = stateArgs;\r\n        this.state = null;\r\n        // state instances get access to the state machine via `this.stateMachine`\r\n        // Note: \"Object.values() returns an array of a given object's own enumerable property values\" (MDN)\r\n        for (const state of Object.values(this.possibleStates)) {\r\n            state.stateMachine = this;\r\n        }\r\n    }\r\n    step() {\r\n        // This method should be called in the Scene's update() loop\r\n        // On the first step, the state is null and needs to be initialized\r\n        // Note: \"Spread syntax allows an iterable such as an array expression to be expanded in places where zero or more arguments or elements are expected.\" (MDN)\r\n        if (this.state === null) {\r\n            this.state = this.initialState;\r\n            this.possibleStates[this.state].enter(...this.stateArgs); //.filter(state=>state==this.state)[0].enter(...this.stateArgs);\r\n        }\r\n        // run the current state's execute method\r\n        this.possibleStates[this.state].execute(...this.stateArgs);\r\n    }\r\n    transition(newState, ...enterArgs) {\r\n        this.state = newState;\r\n        this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs);\r\n    }\r\n}\r\n// parent class structure for all `State` subclasses\r\nclass State {\r\n    enter(...stateArgs) {\r\n    }\r\n    execute(...stateArgs) {\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://coryproj/./src/StateMachine.ts?");

/***/ }),

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getGameWidth\": () => (/* binding */ getGameWidth),\n/* harmony export */   \"getGameHeight\": () => (/* binding */ getGameHeight),\n/* harmony export */   \"createTextBubble\": () => (/* binding */ createTextBubble),\n/* harmony export */   \"collectItem\": () => (/* binding */ collectItem),\n/* harmony export */   \"messageHandler\": () => (/* binding */ messageHandler)\n/* harmony export */ });\n/* harmony import */ var _scenes_boot_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scenes/boot-scene */ \"./src/scenes/boot-scene.ts\");\n\r\nconst getGameWidth = (scene) => {\r\n    return scene.game.scale.width;\r\n};\r\nconst getGameHeight = (scene) => {\r\n    return scene.game.scale.height;\r\n};\r\nfunction createTextBubble(scene, width, height, quote, bubble, bitmapText) {\r\n    let bubble1 = scene.bubble1;\r\n    bubble1.clear();\r\n    var bubbleWidth = width;\r\n    var bubbleHeight = height;\r\n    var bubblePadding = 10;\r\n    var arrowHeight = bubbleHeight / 4;\r\n    //var bubble = scene.add.graphics({ x: x, y: y });\r\n    //  Bubble shadow\r\n    bubble1.fillStyle(0x222222, 0.5);\r\n    bubble1.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);\r\n    //  Bubble color\r\n    bubble1.fillStyle(0xffffff, 1);\r\n    //  Bubble outline line style\r\n    bubble1.lineStyle(4, 0x565656, 1);\r\n    //  Bubble shape and outline\r\n    bubble1.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);\r\n    bubble1.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);\r\n    //  Calculate arrow coordinates\r\n    var point1X = Math.floor(bubbleWidth / 7);\r\n    var point1Y = bubbleHeight;\r\n    var point2X = Math.floor((bubbleWidth / 7) * 2);\r\n    var point2Y = bubbleHeight;\r\n    var point3X = Math.floor(bubbleWidth / 7);\r\n    var point3Y = Math.floor(bubbleHeight + arrowHeight);\r\n    //var content = scene.add.bitmapText(400, 300, 'atari', quote, 30, 'center').setMaxWidth(1000).setOrigin(0).setScale(1);//.add.text(0, 0, quote, { fontFamily: 'atari', fontSize: 20, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });\r\n    bubble1.setPosition(window.innerWidth / 2 - bubbleWidth / 2, bubble1.y);\r\n    bitmapText.text = quote;\r\n    //bitmapText.setPosition(bubble.x + (bubbleWidth / 2) - (bitmapText.width / 2), bubble.y + (bubbleHeight / 2) - (bitmapText.height / 2));\r\n    bitmapText.setPosition(bubble1.x + 50, bubble1.y + 25);\r\n    return bitmapText;\r\n}\r\nfunction collectItem(player, item) {\r\n    let messageMap = (this.cache.json.entries.get(_scenes_boot_scene__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_ITEMS));\r\n    //console.log(item.texture.key)\r\n    this.events.emit(this.eventItemCol.get(item.texture.key).event, messageMap[this.eventItemCol.get(item.texture.key).subject]);\r\n    if (this.eventItemCol.get(item.texture.key).event == 'found door-closed') {\r\n        item.disableBody(true, true);\r\n        //item = item.secondObj\r\n        //item.enableBody(true, 1590, 580, true, true);\r\n        this.triggerCollisionItemCol.get(\"door-open\").enableBody(true, 1590, 580, true, true);\r\n    }\r\n}\r\nfunction messageHandler(text) {\r\n    console.log(\"Emmitted \" + text);\r\n    //console.log(window.innerWidth);\r\n    let charPixelWidth = 30;\r\n    let width = text.length * charPixelWidth > 1000 ? 1000 : text.length * charPixelWidth;\r\n    let height = Math.ceil((text.length * charPixelWidth) / 1000) * charPixelWidth;\r\n    this.message1 = createTextBubble(this, width + 100, height + (charPixelWidth * 2), text, this.bubble1, this.message1);\r\n    console.log(this.messageFSM.state);\r\n    this.messageFSM.transition('idle');\r\n    this.messageFSM.transition('show');\r\n}\r\n\n\n//# sourceURL=webpack://coryproj/./src/helpers.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"game\": () => (/* binding */ game)\n/* harmony export */ });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scenes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes */ \"./src/scenes/index.ts\");\n\r\n\r\nconst gameConfig = {\r\n    title: 'Sample',\r\n    type: phaser__WEBPACK_IMPORTED_MODULE_0__.AUTO,\r\n    pixelArt: true,\r\n    scale: {\r\n        width: window.innerWidth,\r\n        height: window.innerHeight,\r\n    },\r\n    scene: _scenes__WEBPACK_IMPORTED_MODULE_1__.default,\r\n    physics: {\r\n        default: 'arcade',\r\n        arcade: {\r\n            debug: false,\r\n            gravity: { y: 10000 }\r\n        },\r\n    },\r\n    parent: 'game',\r\n    backgroundColor: '#000000',\r\n};\r\nconst game = new phaser__WEBPACK_IMPORTED_MODULE_0__.Game(gameConfig);\r\nwindow.addEventListener('resize', () => {\r\n    game.scale.refresh();\r\n});\r\n\n\n//# sourceURL=webpack://coryproj/./src/main.ts?");

/***/ }),

/***/ "./src/scenes/boot-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/boot-scene.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ANIMATED_ITEMS\": () => (/* binding */ ANIMATED_ITEMS),\n/* harmony export */   \"BACKGROUND_ITEMS\": () => (/* binding */ BACKGROUND_ITEMS),\n/* harmony export */   \"SINGLE_SPRITE_ITEMS\": () => (/* binding */ SINGLE_SPRITE_ITEMS),\n/* harmony export */   \"SPRITESHEET_ITEMS\": () => (/* binding */ SPRITESHEET_ITEMS),\n/* harmony export */   \"TRIGGER_COLLISION_ITEMS\": () => (/* binding */ TRIGGER_COLLISION_ITEMS),\n/* harmony export */   \"PLATFORM_ITEMS\": () => (/* binding */ PLATFORM_ITEMS),\n/* harmony export */   \"SOUND_ITEMS\": () => (/* binding */ SOUND_ITEMS),\n/* harmony export */   \"FONT_ITEMS\": () => (/* binding */ FONT_ITEMS),\n/* harmony export */   \"MESSAGE_ITEMS\": () => (/* binding */ MESSAGE_ITEMS),\n/* harmony export */   \"EVENT_ITEMS\": () => (/* binding */ EVENT_ITEMS),\n/* harmony export */   \"BootScene\": () => (/* binding */ BootScene)\n/* harmony export */ });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/helpers.ts\");\n\r\nconst sceneConfig = {\r\n    active: false,\r\n    visible: false,\r\n    key: 'Boot',\r\n};\r\nconst ANIMATED_ITEMS = \"animated-items\";\r\nconst BACKGROUND_ITEMS = \"background-items\";\r\nconst SINGLE_SPRITE_ITEMS = \"single-sprite-items\";\r\nconst SPRITESHEET_ITEMS = \"spritesheet-items\";\r\nconst TRIGGER_COLLISION_ITEMS = \"trigger-collision-items\";\r\nconst PLATFORM_ITEMS = \"platform-items\";\r\nconst SOUND_ITEMS = \"sound-items\";\r\nconst FONT_ITEMS = \"font-items\";\r\nconst MESSAGE_ITEMS = \"message-items\";\r\nconst EVENT_ITEMS = \"event-items\";\r\n/**\r\n * The initial scene that loads all necessary assets to the game and displays a loading bar.\r\n */\r\nclass BootScene extends Phaser.Scene {\r\n    constructor() {\r\n        super(sceneConfig);\r\n    }\r\n    preload() {\r\n        const halfWidth = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getGameWidth)(this) * 0.5;\r\n        const halfHeight = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getGameHeight)(this) * 0.5;\r\n        const progressBarHeight = 100;\r\n        const progressBarWidth = 400;\r\n        const progressBarContainer = this.add.rectangle(halfWidth, halfHeight, progressBarWidth, progressBarHeight, 0x000000);\r\n        const progressBar = this.add.rectangle(halfWidth + 20 - progressBarContainer.width * 0.5, halfHeight, 10, progressBarHeight - 20, 0x888888);\r\n        const loadingText = this.add.text(halfWidth - 75, halfHeight - 100, 'Loading...').setFontSize(24);\r\n        const percentText = this.add.text(halfWidth - 25, halfHeight, '0%').setFontSize(24);\r\n        const assetText = this.add.text(halfWidth - 25, halfHeight + 100, '').setFontSize(24);\r\n        this.load.on('progress', (value) => {\r\n            progressBar.width = (progressBarWidth - 30) * value;\r\n            const percent = value * 100;\r\n            percentText.setText(`${percent}%`);\r\n        });\r\n        this.load.on('filecomplete', (filename) => {\r\n            this.loadAssets(filename);\r\n        });\r\n        this.load.on('fileprogress', (file) => {\r\n            assetText.setText(file.key);\r\n        });\r\n        this.load.on('complete', () => {\r\n            loadingText.destroy();\r\n            percentText.destroy();\r\n            assetText.destroy();\r\n            progressBar.destroy();\r\n            progressBarContainer.destroy();\r\n            this.scene.start('MainMenu');\r\n        });\r\n        //load the json resources so that when this scene completes loading, the assets can be loaded in\r\n        this.load.json(ANIMATED_ITEMS, 'assets/contentConfigs/animated-items.json');\r\n        this.load.json(SINGLE_SPRITE_ITEMS, 'assets/contentConfigs/single-sprite-items.json');\r\n        this.load.json(SPRITESHEET_ITEMS, 'assets/contentConfigs/spritesheet-items.json');\r\n        this.load.json(BACKGROUND_ITEMS, 'assets/contentConfigs/background-items.json');\r\n        this.load.json(TRIGGER_COLLISION_ITEMS, 'assets/contentConfigs/trigger-collision-items.json');\r\n        this.load.json(PLATFORM_ITEMS, 'assets/contentConfigs/platform-items.json');\r\n        this.load.json(SOUND_ITEMS, 'assets/contentConfigs/sound-items.json');\r\n        this.load.json(FONT_ITEMS, 'assets/contentConfigs/font-items.json');\r\n        this.load.json(EVENT_ITEMS, 'assets/contentConfigs/event-items.json');\r\n        //non-loadables\r\n        this.load.json(MESSAGE_ITEMS, 'assets/contentConfigs/message-items.json'); // this.load.audio('song', 'assets/sounds/song.ogg');\r\n        // this.load.audio('typing', 'assets/sounds/typing.ogg');\r\n    }\r\n    /**\r\n     * All assets that need to be loaded by the game (sprites, images, animations, tiles, music, etc)\r\n     * should be added to this method. Once loaded in, the loader will keep track of them, indepedent of which scene\r\n     * is currently active, so they can be accessed anywhere.\r\n     */\r\n    loadAssets(filename) {\r\n        if (this.cache.json.entries.get(filename) != undefined) {\r\n            let arr = Array.from(this.cache.json.entries.get(filename));\r\n            switch (filename) {\r\n                case ANIMATED_ITEMS:\r\n                    break;\r\n                case SPRITESHEET_ITEMS:\r\n                    arr.forEach((element) => {\r\n                        this.load.spritesheet(element.asset, element.spritesheet.filepath, {\r\n                            frameWidth: element.spritesheet.framewidth,\r\n                            frameHeight: element.spritesheet.frameheight\r\n                        });\r\n                    });\r\n                    break;\r\n                case SINGLE_SPRITE_ITEMS:\r\n                    arr.forEach((element) => {\r\n                        this.load.image(element.asset, element.filepath);\r\n                    });\r\n                    break;\r\n                case BACKGROUND_ITEMS:\r\n                    break;\r\n                case PLATFORM_ITEMS:\r\n                    break;\r\n                case TRIGGER_COLLISION_ITEMS:\r\n                    break;\r\n                case SOUND_ITEMS:\r\n                    arr.forEach((element) => {\r\n                        this.load.audio(element.asset, element.filepath);\r\n                    });\r\n                    break;\r\n                case FONT_ITEMS:\r\n                    arr.forEach((element) => {\r\n                        this.load.bitmapFont(element.asset, element.imagepath, element.configpath);\r\n                    });\r\n                default:\r\n                    break;\r\n            }\r\n        }\r\n        else {\r\n        }\r\n        //});\r\n        // this.load.bitmapFont('atari', 'assets/sprites/atari-classic-b.png', 'assets/sprites/atari-classic.xml');\r\n        // this.load.spritesheet('block', 'assets/sprites/EC-floor.png', { frameWidth: 8, frameHeight: 8 });\r\n        // this.load.spritesheet('reeny', 'assets/sprites/Reeny3-Sheet.png', {frameWidth: 16, frameHeight: 16});\r\n        // this.load.image('backwall', 'assets/sprites/EC-home2.png');\r\n        // this.load.image('window', 'assets/sprites/EC-window.png');\r\n        // this.load.image('chair', 'assets/sprites/EC-chair.png');\r\n        // this.load.image('desk', 'assets/sprites/EC-desk.png');\r\n        // this.load.image('plant', 'assets/sprites/EC-plant.png');\r\n        // this.load.image('fridge', 'assets/sprites/EC-fridge.png');\r\n        // this.load.image('shelf', 'assets/sprites/EC-shelf.png');\r\n        // this.load.image('door-open', 'assets/sprites/EC-door-o.png');\r\n        // this.load.image('door-closed', 'assets/sprites/EC-door-c.png');\r\n        // this.load.image('cabinets', 'assets/sprites/EC-cabinets.png');\r\n        // this.load.image('sky', 'assets/sprites/EC-sky.png');\r\n        // this.load.image('clouds', 'assets/sprites/EC-clouds.png');\r\n        // this.load.image('offscreen', 'assets/sprites/offscreen.png');\r\n        // this.load.image('floor', 'assets/sprites/EC-floor.png');\r\n        // this.load.image('ice', 'assets/sprites/iceblock.png');\r\n        // this.load.audio('song', 'assets/sounds/song.ogg');\r\n        // this.load.audio('typing', 'assets/sounds/typing.ogg');\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://coryproj/./src/scenes/boot-scene.ts?");

/***/ }),

/***/ "./src/scenes/game-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/game-scene.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameScene\": () => (/* binding */ GameScene)\n/* harmony export */ });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ \"./src/helpers.ts\");\n/* harmony import */ var _StateMachine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../StateMachine */ \"./src/StateMachine.ts\");\n/* harmony import */ var _boot_scene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boot-scene */ \"./src/scenes/boot-scene.ts\");\n/* harmony import */ var _states__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../states */ \"./src/states/index.ts\");\n\r\n\r\n\r\n\r\n\r\nconst sceneConfig = {\r\n    active: false,\r\n    visible: false,\r\n    key: 'Game',\r\n};\r\nclass GameScene extends phaser__WEBPACK_IMPORTED_MODULE_0__.Scene {\r\n    constructor(scnConfig) {\r\n        super(scnConfig);\r\n    }\r\n    preload() {\r\n        this.animItemCol = new Map();\r\n        this.triggerCollisionItemCol = new Map();\r\n        this.backGroundItemCol = new Map();\r\n        this.platformItemCol = new Map();\r\n        this.soundItemCol = new Map();\r\n        this.eventItemCol = new Map();\r\n        //iterate through the json files\r\n        //this.song = this.sound.add('song', {loop: true});\r\n    }\r\n    create() {\r\n        //register sounds and music\r\n        this.fabricateBackgroundItems();\r\n        this.fabricatePlatformItems();\r\n        this.fabricateTriggerCollisionItems();\r\n        this.fabricateAnimatedItems();\r\n        this.fabricateSoundItems();\r\n        this.registerEvents();\r\n        this.fabricateFontItems();\r\n        this.soundItemCol.get(\"song\").play();\r\n        //TODO\r\n        //make sure to associate an event name with each object\r\n        //initialize message texts\r\n        //initialize the texts in the scene1content class file\r\n        this.typingHelper = { text: '', counter: 0, typeSound: this.soundItemCol.get(\"typing\") };\r\n        this.player = this.animItemCol.get(\"reeny\");\r\n        this.playerDir = 'right';\r\n        // //initialize offscreen framing\r\n        let topBlack = this.add.image(-100, 0, 'offscreen').setOrigin(0, 0);\r\n        let bottomBlack = this.add.image(-100, 800, 'offscreen').setOrigin(0, 0);\r\n        topBlack.scaleX = 150;\r\n        topBlack.scaleY = 15;\r\n        bottomBlack.scaleX = 150;\r\n        bottomBlack.scaleY = 15;\r\n        //initialize bubble, bitmaptext, and the messages\r\n        this.bubble1 = this.add.graphics({ x: window.innerWidth / 2, y: 200 });\r\n        this.message1 = this.add.bitmapText(window.innerWidth / 2, 300, 'atari', \"quote\", 30, phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.BitmapText.ALIGN_LEFT).setMaxWidth(1000).setOrigin(0).setScale(1);\r\n        this.message1.visible = false;\r\n        //initialize with message Finite State Machine\r\n        this.messageFSM = new _StateMachine__WEBPACK_IMPORTED_MODULE_2__.StateMachine('idle', {\r\n            idle: new _states__WEBPACK_IMPORTED_MODULE_4__.default.IdleState(),\r\n            move: new _states__WEBPACK_IMPORTED_MODULE_4__.default.MoveState(),\r\n            show: new _states__WEBPACK_IMPORTED_MODULE_4__.default.ShowMessageState()\r\n        }, [this, this.player, this.playerDir, this.message1, this.bubble1, this.typingHelper]);\r\n        //create the events that will trigger the messages\r\n        //TODO make function that iterates through the trigger collision items\r\n        //Load animations from JSON file\r\n        //this.physics.add.image(50,50, 'shelf').setScale(10)\r\n        //register collisions between every 2 objects and collect logic between ever 2 objects\r\n        //TODO create a function where you send a collection of objects to be registered with any one object\r\n        this.setCollisionables(this.triggerCollisionItemCol.values(), this.platformItemCol.get(\"floor\"), this.triggerCollisionItemCol.size);\r\n        this.setTriggerables(this.triggerCollisionItemCol.values(), this.animItemCol.get(\"reeny\"), this.triggerCollisionItemCol.size);\r\n        this.physics.add.collider(this.player, this.platformItemCol.get(\"floor\"));\r\n        //obj4.secondObj.disableBody(true, true);\r\n        let doorOpen = this.triggerCollisionItemCol.get(\"door-open\");\r\n        doorOpen.disableBody(true, true);\r\n    }\r\n    update() {\r\n        this.messageFSM.step();\r\n    }\r\n    fabricateAnimatedItems() {\r\n        let arr = Array.from(this.cache.json.entries.get(_boot_scene__WEBPACK_IMPORTED_MODULE_3__.ANIMATED_ITEMS));\r\n        arr.forEach((element) => {\r\n            let instances = Array.from(element.instances);\r\n            instances.forEach((instance) => {\r\n                let animItem = this.physics.add.sprite(instance.x, instance.y, element.asset);\r\n                let options = Array.from(element.options);\r\n                options.forEach((optionElement) => {\r\n                    switch (optionElement.option) {\r\n                        case \"scale\":\r\n                            animItem.setScale(optionElement.value.x, optionElement.value.y);\r\n                            break;\r\n                        case \"origin\":\r\n                            animItem.setOrigin(optionElement.value.x, optionElement.value.y);\r\n                            break;\r\n                        case \"colliderWorldBounds\":\r\n                            animItem.setCollideWorldBounds(true);\r\n                        default:\r\n                            break;\r\n                    }\r\n                });\r\n                this.animItemCol.set(element.asset, animItem);\r\n            });\r\n            let animations = Array.from(element.animations);\r\n            animations.forEach((animation) => {\r\n                this.anims.create({\r\n                    key: animation.key,\r\n                    frames: this.anims.generateFrameNumbers(element.asset, { frames: animation.frames }),\r\n                    frameRate: animation.frameRate,\r\n                    repeat: animation.repeat\r\n                });\r\n            });\r\n        });\r\n    }\r\n    fabricateBackgroundItems() {\r\n        let arr = Array.from(this.cache.json.entries.get(_boot_scene__WEBPACK_IMPORTED_MODULE_3__.BACKGROUND_ITEMS));\r\n        arr.forEach((element) => {\r\n            let instances = Array.from(element.instances);\r\n            instances.forEach((instance) => {\r\n                let imageItem = this.add.image(instance.x, instance.y, element.asset);\r\n                let options = Array.from(element.options);\r\n                options.forEach((optionElement) => {\r\n                    switch (optionElement.option) {\r\n                        case \"scale\":\r\n                            imageItem.setScale(optionElement.value.x, optionElement.value.y);\r\n                            break;\r\n                        case \"origin\":\r\n                            imageItem.setOrigin(optionElement.value.x, optionElement.value.y);\r\n                            break;\r\n                        default:\r\n                            break;\r\n                    }\r\n                });\r\n                this.backGroundItemCol.set(element.asset, imageItem);\r\n            });\r\n        });\r\n    }\r\n    fabricateFontItems() {\r\n        let arr = Array.from(this.cache.json.entries.get(_boot_scene__WEBPACK_IMPORTED_MODULE_3__.FONT_ITEMS));\r\n        arr.forEach((element) => {\r\n            let instances = Array.from(element.instances);\r\n            instances.forEach((instance) => {\r\n                let fontItem = this.add.bitmapText(instance.x, instance.y, element.asset, element.text, element.fontSize);\r\n                let options = Array.from(element.options);\r\n                options.forEach((optionElement) => {\r\n                    switch (optionElement.option) {\r\n                        case \"scale\":\r\n                            fontItem.setScale(optionElement.value.x, optionElement.value.y);\r\n                            break;\r\n                        case \"origin\":\r\n                            fontItem.setOrigin(optionElement.value.x, optionElement.value.y);\r\n                            break;\r\n                        case \"maxWidth\":\r\n                            fontItem.setMaxWidth(optionElement.value);\r\n                        default:\r\n                            break;\r\n                    }\r\n                });\r\n                this.fontItemCol.set(element.asset, fontItem);\r\n            });\r\n        });\r\n    }\r\n    fabricatePlatformItems() {\r\n        let arr = Array.from(this.cache.json.entries.get(_boot_scene__WEBPACK_IMPORTED_MODULE_3__.PLATFORM_ITEMS));\r\n        arr.forEach((element) => {\r\n            if (!this.platformItemCol.has(\"group\")) {\r\n                this.platformItemCol.set(\"group\", this.physics.add.staticGroup());\r\n            }\r\n            let instances = Array.from(element.instances);\r\n            instances.forEach((instance) => {\r\n                let platformItemInstance = this.platformItemCol.get(\"group\").create(instance.x, instance.y, element.asset, element.frame);\r\n                let options = Array.from(element.options);\r\n                options.forEach((optionElement) => {\r\n                    switch (optionElement.option) {\r\n                        case \"scale\":\r\n                            platformItemInstance.setScale(optionElement.value.x, optionElement.value.y);\r\n                            break;\r\n                        case \"origin\":\r\n                            platformItemInstance.setOrigin(optionElement.value.x, optionElement.value.y);\r\n                            break;\r\n                        case \"refresh\":\r\n                            platformItemInstance.refreshBody();\r\n                        default:\r\n                            break;\r\n                    }\r\n                });\r\n                this.platformItemCol.set(element.asset, platformItemInstance);\r\n            });\r\n        });\r\n    }\r\n    fabricateSoundItems() {\r\n        let arr = Array.from(this.cache.json.entries.get(_boot_scene__WEBPACK_IMPORTED_MODULE_3__.SOUND_ITEMS));\r\n        arr.forEach((element) => {\r\n            let soundItem = this.sound.add(element.asset, element.config);\r\n            this.soundItemCol.set(element.asset, soundItem);\r\n        });\r\n    }\r\n    fabricateTriggerCollisionItems() {\r\n        let arr = Array.from(this.cache.json.entries.get(_boot_scene__WEBPACK_IMPORTED_MODULE_3__.TRIGGER_COLLISION_ITEMS));\r\n        arr.forEach((element) => {\r\n            let instances = Array.from(element.instances);\r\n            instances.forEach((instance) => {\r\n                let imageItem = this.physics.add.image(instance.x, instance.y, element.asset);\r\n                let options = Array.from(element.options);\r\n                options.forEach((optionElement) => {\r\n                    switch (optionElement.option) {\r\n                        case \"scale\":\r\n                            imageItem.setScale(optionElement.value.x, optionElement.value.y);\r\n                            break;\r\n                        case \"origin\":\r\n                            imageItem.setOrigin(optionElement.value.x, optionElement.value.y);\r\n                            break;\r\n                        default:\r\n                            break;\r\n                    }\r\n                });\r\n                this.triggerCollisionItemCol.set(element.asset, imageItem);\r\n            });\r\n        });\r\n    }\r\n    setCollisionables(gameItems, gameItemTarget, iterationSize) {\r\n        for (var i = 0; i < iterationSize; i++) {\r\n            this.physics.add.collider(gameItems.next().value, gameItemTarget);\r\n        }\r\n    }\r\n    setTriggerables(gameItems, gameItemTarget, iterationSize) {\r\n        for (var i = 0; i < iterationSize; i++) {\r\n            this.physics.add.overlap(gameItemTarget, gameItems.next().value, _helpers__WEBPACK_IMPORTED_MODULE_1__.collectItem, null, this);\r\n        }\r\n    }\r\n    registerEvents() {\r\n        let arr = Array.from(this.cache.json.entries.get(_boot_scene__WEBPACK_IMPORTED_MODULE_3__.EVENT_ITEMS));\r\n        arr.forEach((element) => {\r\n            if (element.type == \"message\") {\r\n                this.events.once(element.event, _helpers__WEBPACK_IMPORTED_MODULE_1__.messageHandler, this);\r\n            }\r\n            this.eventItemCol.set(element.asset, element);\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://coryproj/./src/scenes/game-scene.ts?");

/***/ }),

/***/ "./src/scenes/game2-scene.ts":
/*!***********************************!*\
  !*** ./src/scenes/game2-scene.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameScene2\": () => (/* binding */ GameScene2)\n/* harmony export */ });\n/* harmony import */ var _game_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-scene */ \"./src/scenes/game-scene.ts\");\n\r\nconst sceneConfig = {\r\n    active: false,\r\n    visible: false,\r\n    key: 'Game2',\r\n};\r\nclass GameScene2 extends _game_scene__WEBPACK_IMPORTED_MODULE_0__.GameScene {\r\n    //TODO: create class that jjust hass all of the attributes\r\n    constructor() {\r\n        super(sceneConfig);\r\n    }\r\n    preload() {\r\n        super.preload();\r\n    }\r\n    create() {\r\n        super.create(); //register sounds and music\r\n        //TODO\r\n        //make sure to associate an event name with each object\r\n        //initialize message texts\r\n        //initialize the texts in the scene1content class file\r\n        //     this.typingHelper = {text: '', counter: 0, typeSound: this.soundItemCol.get(\"typing\")};\r\n        //     this.player = this.animItemCol.get(\"reeny\");\r\n        //     this.playerDir = 'right';\r\n        //     // //initialize offscreen framing\r\n        //     let topBlack = this.add.image(-100,0, 'offscreen').setOrigin(0,0);\r\n        //     let bottomBlack = this.add.image(-100,800, 'offscreen').setOrigin(0,0);\r\n        //     topBlack.scaleX = 150;\r\n        //     topBlack.scaleY = 15;\r\n        //     bottomBlack.scaleX = 150;\r\n        //     bottomBlack.scaleY = 15;\r\n        //     //initialize bubble, bitmaptext, and the messages\r\n        //     this.bubble1 = this.add.graphics({ x: window.innerWidth/2, y: 200 });\r\n        //     this.message1 = this.add.bitmapText(window.innerWidth/2, 300, 'atari', \"quote\", 30, Phaser.GameObjects.BitmapText.ALIGN_LEFT).setMaxWidth(1000).setOrigin(0).setScale(1);\r\n        //     this.message1.visible = false;\r\n        //     //initialize with message Finite State Machine\r\n        //     this.messageFSM = new StateMachine('idle', {\r\n        //       idle: new States.IdleState(),\r\n        //       move: new States.MoveState(),\r\n        //       show: new States.ShowMessageState()\r\n        //     }, [this, this.player, this.playerDir, this.message1, this.bubble1, this.typingHelper]);\r\n        //     //create the events that will trigger the messages\r\n        //     //TODO make function that iterates through the trigger collision items\r\n        //     //Load animations from JSON file\r\n        //     //this.physics.add.image(50,50, 'shelf').setScale(10)\r\n        //   //register collisions between every 2 objects and collect logic between ever 2 objects\r\n        //   //TODO create a function where you send a collection of objects to be registered with any one object\r\n        //   this.setCollisionables(this.triggerCollisionItemCol.values(), this.platformItemCol.get(\"floor\"), this.triggerCollisionItemCol.size);\r\n        //   this.setTriggerables(this.triggerCollisionItemCol.values(), this.animItemCol.get(\"reeny\"), this.triggerCollisionItemCol.size);\r\n        //   this.physics.add.collider(this.player, this.platformItemCol.get(\"floor\"));\r\n        //   //obj4.secondObj.disableBody(true, true);\r\n        //     let doorOpen = this.triggerCollisionItemCol.get(\"door-open\") as Phaser.Physics.Arcade.Sprite;\r\n        //     doorOpen.disableBody(true, true);\r\n    }\r\n    update() {\r\n        super.update();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://coryproj/./src/scenes/game2-scene.ts?");

/***/ }),

/***/ "./src/scenes/index.ts":
/*!*****************************!*\
  !*** ./src/scenes/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _main_menu_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-menu-scene */ \"./src/scenes/main-menu-scene.ts\");\n/* harmony import */ var _boot_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boot-scene */ \"./src/scenes/boot-scene.ts\");\n/* harmony import */ var _game_scene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game-scene */ \"./src/scenes/game-scene.ts\");\n/* harmony import */ var _game2_scene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game2-scene */ \"./src/scenes/game2-scene.ts\");\n\r\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([_boot_scene__WEBPACK_IMPORTED_MODULE_1__.BootScene, _main_menu_scene__WEBPACK_IMPORTED_MODULE_0__.MainMenuScene, _game_scene__WEBPACK_IMPORTED_MODULE_2__.GameScene, _game2_scene__WEBPACK_IMPORTED_MODULE_3__.GameScene2]);\r\n\n\n//# sourceURL=webpack://coryproj/./src/scenes/index.ts?");

/***/ }),

/***/ "./src/scenes/main-menu-scene.ts":
/*!***************************************!*\
  !*** ./src/scenes/main-menu-scene.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MainMenuScene\": () => (/* binding */ MainMenuScene)\n/* harmony export */ });\n/* harmony import */ var _ui_menu_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\n\r\nconst sceneConfig = {\r\n    active: false,\r\n    visible: false,\r\n    key: 'MainMenu',\r\n};\r\n/**\r\n * The initial scene that starts, shows the splash screens, and loads the necessary assets.\r\n */\r\nclass MainMenuScene extends Phaser.Scene {\r\n    constructor() {\r\n        super(sceneConfig);\r\n    }\r\n    create() {\r\n        this.add\r\n            .text(100, 50, 'This is a sample main menu. Click the \"Start\" button below to run your game.', {\r\n            color: '#FFFFFF',\r\n        })\r\n            .setFontSize(24);\r\n        new _ui_menu_button__WEBPACK_IMPORTED_MODULE_0__.MenuButton(this, 100, 150, 'Start Game', () => {\r\n            this.scene.start('Game2');\r\n        });\r\n        new _ui_menu_button__WEBPACK_IMPORTED_MODULE_0__.MenuButton(this, 100, 250, 'Settings', () => console.log('settings button clicked'));\r\n        new _ui_menu_button__WEBPACK_IMPORTED_MODULE_0__.MenuButton(this, 100, 350, 'Help', () => console.log('help button clicked'));\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://coryproj/./src/scenes/main-menu-scene.ts?");

/***/ }),

/***/ "./src/states/idleState.ts":
/*!*********************************!*\
  !*** ./src/states/idleState.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"IdleState\": () => (/* binding */ IdleState)\n/* harmony export */ });\n/* harmony import */ var _StateMachine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StateMachine */ \"./src/StateMachine.ts\");\n\r\nclass IdleState extends _StateMachine__WEBPACK_IMPORTED_MODULE_0__.State {\r\n    enter(scene, player, playerDir, text, bubble, typeHelp) {\r\n        player.setVelocityX(0);\r\n        player.anims.play(`${playerDir}`);\r\n        player.anims.stop();\r\n    }\r\n    execute(scene, player, playerDir, text, bubble, typeHelp) {\r\n        const cursorKeys = scene.input.keyboard.createCursorKeys();\r\n        if (cursorKeys.left.isDown || cursorKeys.right.isDown) {\r\n            this.stateMachine.transition('move');\r\n        }\r\n        player.anims.play('idle', true);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://coryproj/./src/states/idleState.ts?");

/***/ }),

/***/ "./src/states/index.ts":
/*!*****************************!*\
  !*** ./src/states/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _states_idleState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../states/idleState */ \"./src/states/idleState.ts\");\n/* harmony import */ var _states_moveState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../states/moveState */ \"./src/states/moveState.ts\");\n/* harmony import */ var _states_showMessageState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../states/showMessageState */ \"./src/states/showMessageState.ts\");\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ IdleState: _states_idleState__WEBPACK_IMPORTED_MODULE_0__.IdleState, MoveState: _states_moveState__WEBPACK_IMPORTED_MODULE_1__.MoveState, ShowMessageState: _states_showMessageState__WEBPACK_IMPORTED_MODULE_2__.ShowMessageState });\r\n\n\n//# sourceURL=webpack://coryproj/./src/states/index.ts?");

/***/ }),

/***/ "./src/states/moveState.ts":
/*!*********************************!*\
  !*** ./src/states/moveState.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MoveState\": () => (/* binding */ MoveState)\n/* harmony export */ });\n/* harmony import */ var _StateMachine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StateMachine */ \"./src/StateMachine.ts\");\n\r\nclass MoveState extends _StateMachine__WEBPACK_IMPORTED_MODULE_0__.State {\r\n    execute(scene, player, playerDir, text, bubble, typeHelp) {\r\n        const cursorKeys = scene.input.keyboard.createCursorKeys();\r\n        if (!(cursorKeys.left.isDown || cursorKeys.right.isDown || cursorKeys.up.isDown || cursorKeys.down.isDown)) {\r\n            this.stateMachine.transition('idle');\r\n            return;\r\n        }\r\n        // handle movement\r\n        player.setVelocityX(0);\r\n        if (cursorKeys.left.isDown) {\r\n            player.setVelocityX(-300);\r\n            playerDir = 'left';\r\n            player.flipX = true; //setScale(-2);\r\n        }\r\n        else if (cursorKeys.right.isDown) {\r\n            player.setVelocityX(300);\r\n            playerDir = 'right';\r\n            player.flipX = false; //.setScale(2);\r\n        }\r\n        player.anims.play(`${playerDir}`, true);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://coryproj/./src/states/moveState.ts?");

/***/ }),

/***/ "./src/states/showMessageState.ts":
/*!****************************************!*\
  !*** ./src/states/showMessageState.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShowMessageState\": () => (/* binding */ ShowMessageState)\n/* harmony export */ });\n/* harmony import */ var _StateMachine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StateMachine */ \"./src/StateMachine.ts\");\n\r\nclass ShowMessageState extends _StateMachine__WEBPACK_IMPORTED_MODULE_0__.State {\r\n    enter(scene, player, playerDir, text, bubble, typeHelp) {\r\n        bubble.visible = true;\r\n        text.visible = true;\r\n        typeHelp.text = text.text;\r\n        typeHelp.counter = 0;\r\n        text.text = '';\r\n    }\r\n    execute(scene, player, playerDir, text, bubble, typeHelp) {\r\n        const cursorKeys = scene.input.keyboard.createCursorKeys();\r\n        if (cursorKeys.space.isDown) {\r\n            bubble.visible = false;\r\n            text.visible = false;\r\n            this.stateMachine.transition('idle');\r\n        }\r\n        if (typeHelp.counter < typeHelp.text.length) {\r\n            //if(!typeHelp.typeSound.isPlaying) {\r\n            text.text += typeHelp.text[typeHelp.counter];\r\n            typeHelp.typeSound.play();\r\n            typeHelp.counter += 1;\r\n            //}\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://coryproj/./src/states/showMessageState.ts?");

/***/ }),

/***/ "./src/ui/menu-button.ts":
/*!*******************************!*\
  !*** ./src/ui/menu-button.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MenuButton\": () => (/* binding */ MenuButton)\n/* harmony export */ });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\r\nconst padding = 10;\r\nconst minimumWidth = 200;\r\nconst minimumHeight = 50;\r\nclass MenuButton extends phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Rectangle {\r\n    constructor(scene, x, y, text, onClick) {\r\n        super(scene, x, y);\r\n        scene.add.existing(this);\r\n        this.setOrigin(0, 0);\r\n        this.label = scene.add\r\n            .text(x + padding, y + padding, text)\r\n            .setFontSize(18)\r\n            .setAlign('center');\r\n        const labelWidth = this.label.width + padding;\r\n        const labelHeight = this.label.height + padding;\r\n        this.width = labelWidth >= minimumWidth ? labelWidth : minimumWidth;\r\n        this.height = labelHeight >= minimumHeight ? labelHeight : minimumHeight;\r\n        this.setInteractive({ useHandCursor: true })\r\n            .on('pointerover', this.enterMenuButtonHoverState)\r\n            .on('pointerout', this.enterMenuButtonRestState)\r\n            .on('pointerdown', this.enterMenuButtonActiveState)\r\n            .on('pointerup', this.enterMenuButtonHoverState);\r\n        if (onClick) {\r\n            this.on('pointerup', onClick);\r\n        }\r\n        this.enterMenuButtonRestState();\r\n    }\r\n    enterMenuButtonHoverState() {\r\n        this.label.setColor('#000000');\r\n        this.setFillStyle(0x888888);\r\n    }\r\n    enterMenuButtonRestState() {\r\n        this.label.setColor('#FFFFFF');\r\n        this.setFillStyle(0x888888);\r\n    }\r\n    enterMenuButtonActiveState() {\r\n        this.label.setColor('#BBBBBB');\r\n        this.setFillStyle(0x444444);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://coryproj/./src/ui/menu-button.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcoryproj"] = self["webpackChunkcoryproj"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./src/main.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
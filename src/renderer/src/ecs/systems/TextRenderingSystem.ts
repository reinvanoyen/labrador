import {Text, TextStyle} from 'pixi.js';
import System from "../core/System.ts";

export default class TextRenderingSystem extends System {

	private renderingSystem;

	constructor(renderingSystem) {
		super();
		this.renderingSystem = renderingSystem;
	}

	test(entity) {
		return (entity.components.text && entity.components.position);
	}

	enter(entity) {

		const { position, text } = entity.components;

		entity.text = new Text({
			text: text.value,
			style: new TextStyle({
				fontFamily: 'Arial',
				fontSize: text.size,
				fill: text.color
			})
		});

		entity.text.x = position.x + text.offsetX;
		entity.text.y = position.y + text.offsetY;

		entity.text.anchor.x = .5;
		entity.text.anchor.y = .5;

		this.renderingSystem.stage.addChild(entity.text);
	}

	exit(entity) {
		delete entity.text;
	}

	update(entity) {

		const { position, text } = entity.components;

		entity.text.x = position.x + text.offsetX;
		entity.text.y = position.y + text.offsetY;

		entity.text.text = text.value;
		entity.text.style.fontSize = text.size;
		entity.text.style.fill = text.color;
	}
}

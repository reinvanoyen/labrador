import {Graphics} from "pixi.js";
import System from "../core/System.ts";

export default class DiscRenderingSystem extends System {

	private renderingSystem;

	constructor(renderingSystem) {
		super();

		this.renderingSystem = renderingSystem;
	}

	test(entity) {
		return (entity.components.disc && entity.components.position);
	}

	enter(entity) {

		const {position, disc} = entity.components;

		entity.discGraphic = new Graphics()
			.circle(0, 0, disc.radius)
			.fill(disc.color);

		entity.discGraphic.x = position.x;
		entity.discGraphic.y = position.y;

		this.renderingSystem.stage.addChild(entity.discGraphic);
	}

	exit(entity) {
		entity.discGraphic.destroy();
		delete entity.discGraphic;
	}

	update(entity) {
		const {position, disc} = entity.components;

		entity.discGraphic.x = position.x;
		entity.discGraphic.y = position.y;
		entity.discGraphic.radius = disc.radius;
	}
}

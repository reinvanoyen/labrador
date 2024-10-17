import ECS from 'tnt-ecs';
import { BlurFilter } from 'pixi.js';

export default class BlurSystem extends ECS.System {

	public blur = 0;

	private blurFilter;

	constructor(renderingSystem) {
		super();
		this.blurFilter = new BlurFilter();
		renderingSystem.pixiApp.stage.filters = [
			...renderingSystem.pixiApp.stage.filters || [],
			this.blurFilter
		];
	}

	test(entity) {
		return entity.components.position && entity.components.velocity;
	}

	postUpdate() {
		this.blurFilter.strength = this.blur;
	}
}
import ECS from 'tnt-ecs';
import * as PIXI from 'pixi.js';
import dom from "../../utils/dom.ts";

export default class RenderingSystem extends ECS.System {

	private rootEl;

	private pixiApp;

	private stage;

	async init() {

		this.pixiApp = new PIXI.Application();
		await this.pixiApp.init({ width: 640, height: 360 });
		this.stage = this.pixiApp.stage;

		this.rootEl = await dom.lateQuerySelector('#canvas');
		this.rootEl.appendChild(this.pixiApp.canvas);
	}
}

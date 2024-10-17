import ECS from 'tnt-ecs';
import * as PIXI from 'pixi.js';
import dom from "../../utils/dom.ts";
import MessageBus from "../../core/MessageBus.ts";

export default class RenderingSystem extends ECS.System {

	private width = 1000;
	private height = 600;

	private rootEl;

	private pixiApp;

	private stage;

	private popup = null;

	async init() {

		MessageBus.addListener('newCanvasWindow', () => {
			this.openInNewWindow();
		});

		this.pixiApp = new PIXI.Application();
		await this.pixiApp.init({ width: this.width, height: this.height, background: 0x000000 });
		this.stage = this.pixiApp.stage;

		await this.initCanvas(document, '#canvas');
	}

	async initCanvas(document, selector) {
		this.rootEl = await dom.lateQuerySelector(document, selector);
		this.rootEl.appendChild(this.pixiApp.canvas);
	}

	async openInNewWindow() {
		// Open the popup window
		this.popup = window.open("", "canvasPopup", `width=${this.width},height=${this.height},menubar=no,toolbar=no,location=no,status=no,scrollbars=no`);
		this.popup.document.body.style = 'margin: 0;';
		await this.initCanvas(this.popup.document, 'body');

		this.popup.addEventListener('beforeunload', async () => {
			await this.initCanvas(document, '#canvas');
			this.popup = null;
		});
	}
}

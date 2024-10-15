import ECS from 'tnt-ecs';
import useExportState from "../../store/export.ts";
import useGlobalStore from "../../store/global.ts";

export default class ExportSystem extends ECS.System {

	private renderingSystem;

	constructor(renderingSystem) {
		super();
		this.renderingSystem = renderingSystem;
	}

	async postUpdate() {

		const { isRecording } = useGlobalStore.getState();

		if (isRecording) {
			const { addFrame } = useExportState.getState();
			addFrame(this.renderingSystem.pixiApp.canvas.toDataURL("image/png"));
		}
	}
}

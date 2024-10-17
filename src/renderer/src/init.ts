import ECS from 'tnt-ecs';
import "./css/index.css";

// Stores
import useParameterStore from "./store/parameters.ts";
import useControlStore from "./store/controls.ts";
import useGlobalStore from "./store/global.ts";

// Core
import MessageBus from "./core/MessageBus.ts";

// Systems
import UiSystem from "./ecs/systems/UiSystem.tsx";
import RenderingSystem from "./ecs/systems/RenderingSystem.ts";
import DiscRenderingSystem from "./ecs/systems/DiscRenderingSystem.ts";
import MovementSystem from "./ecs/systems/MovementSystem.ts";
import TargetMovementSystem from "./ecs/systems/TargetMovementSystem.ts";
import TextRenderingSystem from "./ecs/systems/TextRenderingSystem.ts";
import ExportSystem from "./ecs/systems/ExportSystem.ts";
import WiggleSystem from "./ecs/systems/WiggleSystem.ts";
import BlurSystem from "./ecs/systems/BlurSystem.ts";

// Components
import Environment from "./core/Environment.ts";

async function init() {

	let isUpdating = true;
	const ecs = new ECS.Core();

	ecs.addSystem(new UiSystem());

	const renderingSystem = new RenderingSystem();
	await renderingSystem.init();

	ecs.addSystem(renderingSystem);
	ecs.addSystem(new TextRenderingSystem(renderingSystem));
	ecs.addSystem(new DiscRenderingSystem(renderingSystem));

	ecs.addSystem(new MovementSystem());
	ecs.addSystem(new TargetMovementSystem());
	ecs.addSystem(new WiggleSystem());

	const blurSystem = new BlurSystem(renderingSystem);
	ecs.addSystem(blurSystem);

	// Export system
	ecs.addSystem(new ExportSystem(renderingSystem));

	useParameterStore.setState({
		parameters: {}
	});

	useControlStore.setState({
		controls: {}
	});

	useGlobalStore.subscribe((state) => {
		const {isActive} = state;
		isUpdating = isActive;
	});

	const env = new Environment(ecs);

	// Define the render loop
	function update() {
		if (isUpdating) {
			const {currentFrame, setCurrentFrame} = useGlobalStore.getState();
			setCurrentFrame(currentFrame + 1);
			ecs.update();
		}
		MessageBus.process();
		requestAnimationFrame(update);
	}

	update();
}

init();
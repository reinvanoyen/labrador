import ECS from 'tnt-ecs';
import "./css/index.css";

// Stores
import useParameterStore from "./store/parameters.ts";
import useControlStore from "./store/controls.ts";

// Systems
import UiSystem from "./ecs/systems/UiSystem.tsx";
import RenderingSystem from "./ecs/systems/RenderingSystem.ts";
import DiscRenderingSystem from "./ecs/systems/DiscRenderingSystem.ts";

// Components
import Position from "./ecs/components/Position.ts";
import Disc from "./ecs/components/Disc.ts";
import MovementSystem from "./ecs/systems/MovementSystem.ts";
import Velocity from "./ecs/components/Velocity.ts";
import TargetMovementSystem from "./ecs/systems/TargetMovementSystem.ts";
import Target from "./ecs/components/Target.ts";
import TextRenderingSystem from "./ecs/systems/TextRenderingSystem.ts";
import Text from "./ecs/components/Text.ts";
import ExportSystem from "./ecs/systems/ExportSystem.ts";
import WiggleSystem from "./ecs/systems/WiggleSystem.ts";
import Wiggle from "./ecs/components/Wiggle.ts";
import BlurSystem from "./ecs/systems/BlurSystem.ts";
import MessageBus from "./core/MessageBus.ts";
import useGlobalStore from "./store/global.ts";
import useCodeStore from "./store/code.ts";

async function init() {

	const position = new Position();
	const disc = new Disc();

	let isUpdating = true;
	const ecs = new ECS.Core();

	ecs.addSystem(new UiSystem());

	const renderingSystem = new RenderingSystem(document.getElementById('canvas'));
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

	useCodeStore.subscribe((state) => {
		const {code} = state;
		eval(code);
	});

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
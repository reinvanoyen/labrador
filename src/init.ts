import ECS from 'tnt-ecs';
import "./css/index.css";

// Stores
import useParameterStore from "./store/parameters.ts";
import useControlStore from "./store/controls.ts";

// Systems
import UiSystem from "./ecs/systems/UiSystem.tsx";
import RenderingSystem from "./ecs/systems/RenderingSystem.ts";
import DiscRenderingSystem from "./ecs/systems/DiscRenderingSystem.ts";
import MessagingSystem from "./ecs/systems/MessagingSystem.ts";

// Components
import Position from "./ecs/components/Position.ts";
import MovementSystem from "./ecs/systems/MovementSystem.ts";
import Velocity from "./ecs/components/Velocity.ts";
import TargetMovementSystem from "./ecs/systems/TargetMovementSystem.ts";
import Target from "./ecs/components/Target.ts";
import useGlobalStore from "./store/global.ts";
import TextRenderingSystem from "./ecs/systems/TextRenderingSystem.ts";
import Text from "./ecs/components/Text.ts";
import ExportSystem from "./ecs/systems/ExportSystem.ts";
import WiggleSystem from "./ecs/systems/WiggleSystem.ts";
import Wiggle from "./ecs/components/Wiggle.ts";
import BlurSystem from "./ecs/systems/BlurSystem.ts";

async function init() {

	let isUpdating = true;
	const ecs = new ECS.Core();

	ecs.addSystem(new MessagingSystem());
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

	const entity = new ECS.Entity([
		new Position({x: 325, y: 200}),
		new Target(),
		new Wiggle(),
		new Velocity(),
		new Text({value: 'Labrador', color: 0xf14000, size: 90})
	]);

	ecs.addEntity(entity);

	useParameterStore.subscribe((state) => {
		const {parameters} = state;

		for (const paramName in parameters) {
			if (paramName === 'blur') {
				blurSystem.blur = parameters[paramName];
			}
			if (paramName === 'targetX') {
				entity.components.target.x = parameters[paramName];
			}
			if (paramName === 'targetY') {
				entity.components.target.y = parameters[paramName];
			}
			if (paramName === 'mass') {
				entity.components.velocity.mass = parameters[paramName];
			}
			if (paramName === 'slowingRadius') {
				entity.components.velocity.slowingRadius = parameters[paramName];
			}
			if (paramName === 'text') {
				entity.components.text.value = parameters[paramName];
			}
			if (paramName === 'textSize') {
				entity.components.text.size = parameters[paramName];
			}
			if (paramName === 'wiggleX') {
				entity.components.wiggle.x = parameters[paramName];
			}
			if (paramName === 'wiggleY') {
				entity.components.wiggle.y = parameters[paramName];
			}
			if (paramName === 'wiggleFreq') {
				entity.components.wiggle.frequency = parameters[paramName];
			}
		}
	});

	useGlobalStore.subscribe((state) => {
		const {isActive} = state;
		isUpdating = isActive;
	});

	// Updating state, will trigger listeners
	useParameterStore.setState({
		parameters: {
			blur: 0,
			text: 'LABRADOR',
			textSize: 90,
			targetX: 325,
			targetY: 200,
			mass: 10,
			max: 10,
			slowingRadius: 30,
			wiggleX: 10,
			wiggleY: 0,
			wiggleFreq: 10
		}
	});

	useControlStore.setState({
		controls: {
			'Blur': [
				{
					name: 'blur',
					label: 'Blur',
					type: 'slider',
					options: {
						min: 0,
						max: 1000
					}
				}
			],

			'Text': [
				{
					name: 'text',
					label: 'Value',
					type: 'text'
				},
				{
					name: 'textSize',
					label: 'Size',
					type: 'slider',
					options: {
						min: 0,
						max: 1000
					}
				}
			],
			'Wiggle': [
				{
					name: 'wiggleFreq',
					label: 'Frequency',
					type: 'slider',
					options: {
						min: 2,
						max: 200
					}
				},
				{
					name: 'wiggleX',
					label: 'x',
					type: 'slider',
					options: {
						min: 0,
						max: 200
					}
				},
				{
					name: 'wiggleY',
					label: 'y',
					type: 'slider',
					options: {
						min: 0,
						max: 200
					}
				}
			],
			'Target': [
				{
					name: 'targetX',
					label: 'x',
					type: 'slider',
					options: {
						min: 0,
						max: 2000
					}
				},
				{
					name: 'targetY',
					label: 'y',
					type: 'slider',
					options: {
						min: 0,
						max: 2000
					}
				}
			],
			'Velocity': [
				{
					name: 'mass',
					type: 'slider',
					options: {
						min: 1,
						max: 200
					}
				},
				{
					name: 'max',
					type: 'slider',
					options: {
						min: 1,
						max: 200
					}
				},
				{
					name: 'slowingRadius',
					label: 'Slowing radius',
					type: 'slider',
					options: {
						min: 1,
						max: 1000
					}
				}
			]
		}
	});

	// Define the render loop
	function update() {
		if (isUpdating) {
			useGlobalStore.setState((state) => ({...state, currentFrame: state.currentFrame + 1}));
			ecs.update();
		}
		requestAnimationFrame(update);
	}

	update();
}

init();
import ECS from 'tnt-ecs';

export default class Wiggle extends ECS.Component {

	getName() {
		return 'wiggle';
	}

	getDefaults() {
		return {
			frequency: 100,
			x: 10,
			y: 10
		};
	}
}

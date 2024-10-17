import ECS from 'tnt-ecs';

export default class Velocity extends ECS.Component {

	getName() {
		return 'velocity';
	}

	getDefaults() {
		return {
			x: 0,
			y: 0,
			max: 10,
			mass: 1,
			slowingRadius: 5
		};
	}
}

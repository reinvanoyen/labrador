import Component from "../core/Component.ts";

export default class Wiggle extends Component {

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

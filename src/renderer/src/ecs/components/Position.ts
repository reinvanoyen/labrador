import Component from "../core/Component.ts";

export default class Position extends Component {

	getName() {
		return 'position';
	}

	getDefaults() {
		return {x: 0, y: 0};
	}
}
import Component from "../core/Component.ts";

export default class Target extends Component {

	getName() {
		return 'target';
	}

	getDefaults() {
		return {x: 0, y: 0};
	}
}
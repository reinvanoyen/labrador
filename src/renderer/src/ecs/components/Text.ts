"use strict";

import Component from "../core/Component.ts";

export default class Text extends Component {

	getName() {
		return 'text';
	}

	getDefaults() {
		return {
			value: '',
			color: 0x000000,
			size: 20,
			offsetX: 0,
			offsetY: 0,
		};
	}
}

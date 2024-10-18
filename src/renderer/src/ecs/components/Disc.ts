"use strict";

import Component from "../core/Component.ts";

export default class Disc extends Component {

	getName() {
		return 'disc';
	}

	getDefaults() {
		return {
			radius: 25,
			color: 0xFFFFFF
		};
	}
}
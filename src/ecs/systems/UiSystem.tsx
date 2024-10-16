"use strict";

import ECS from 'tnt-ecs';
import {createRoot} from "react-dom/client";
import App from "../../components/App.tsx";
import "@radix-ui/themes/styles.css";

export default class UiSystem extends ECS.System {
	constructor() {
		super();

		createRoot(document.getElementById('root')!).render(
			<App />
		);
	}
}
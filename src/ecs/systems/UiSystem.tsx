"use strict";

import ECS from 'tnt-ecs';
import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import {Theme} from "@radix-ui/themes";
import App from "../../components/App.tsx";
import "@radix-ui/themes/styles.css";

export default class UiSystem extends ECS.System {
	constructor() {
		super();

		createRoot(document.getElementById('root')!).render(
			<StrictMode>
				<Theme radius="large" appearance="dark" accentColor="indigo">
					<App />
				</Theme>
			</StrictMode>,
		);
	}
}
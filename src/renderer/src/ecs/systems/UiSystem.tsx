"use strict";

import {createRoot} from "react-dom/client";
import App from "../../components/App.tsx";
import "@radix-ui/themes/styles.css";
import System from "../core/System.ts";

export default class UiSystem extends System {
	constructor() {
		super();

		createRoot(document.getElementById('root')!).render(
			<App />
		);
	}
}
"use strict";

import useConsoleStore from "../store/console.ts";
import ECS from "tnt-ecs";
import useControlStore, {TControl} from "../store/controls.ts";
import useParameterStore from "../store/parameters.ts";
import useCodeStore from "../store/code.ts";
import useGlobalStore from "../store/global.ts";
import useKeyframeStore from "../store/keyframes.ts";
import MessageBus from "./MessageBus.ts";
import useExportState from "../store/export.ts";

const labra = {
	ecs: null,
	log(message) {
		const {log} = useConsoleStore.getState();
		log({
			level: 'info',
			message: message
		});
	},
	play() {
		const {activate} = useGlobalStore.getState();
		activate();
	},
	stop() {
		const {deactivate} = useGlobalStore.getState();
		deactivate();
	},
	popout() {
		MessageBus.trigger('newCanvasWindow', {});
	},
	clearRenders() {
		const { clear } = useExportState.getState();
		clear();
	},
	startRecording() {
		const {startRecording} = useGlobalStore.getState();
		startRecording();
	},
	stopRecording() {
		const {stopRecording} = useGlobalStore.getState();
		stopRecording();
	},
	frame(frame) {
		const {setCurrentFrame} = useGlobalStore.getState();
		setCurrentFrame(frame);
	},
	at(frame, callback) {
		const {setFrameCallback} = useGlobalStore.getState();
		setFrameCallback(frame, callback);
	},
	run() {
		MessageBus.trigger('run', {});
	},
	set(name, value) {
		const {define} = useCodeStore.getState();
		define(name, value);
	},
	get(name) {
		const {get} = useCodeStore.getState();
		return get(name);
	},
	entity(components = []) {
		return new ECS.Entity(components);
	},
	add(entity) {
		labra.ecs.addEntity(entity);
		return entity;
	},
	keyframe(frame, parameter, value) {
		const {setKeyframe} = useKeyframeStore.getState();
		setKeyframe(frame, parameter, value);
	},
	parameter(name, value) {
		const {setParameter} = useParameterStore.getState();
		setParameter(name, value);
	},
	control(group: string, control: TControl, value?: unknown) {
		const {addControl} = useControlStore.getState();
		addControl(group, control);

		if (value) {
			const {setParameter} = useParameterStore.getState();
			setParameter(control.name, value);
		}
	}
};

export default labra;
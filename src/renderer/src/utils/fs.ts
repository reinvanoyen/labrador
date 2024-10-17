import useCodeStore from "../store/code.ts";
import useControlStore from "../store/controls.ts";
import useFileStore from "../store/file.ts";
import useKeyframeStore from "../store/keyframes.ts";
import useParameterStore from "../store/parameters.ts";
import useGlobalStore from "../store/global.ts";

const fs = {
	async blobUrlToArrayBuffer(blobUrl) {
		const response = await fetch(blobUrl);
		const blob = await response.blob();
		return blob.arrayBuffer(); // or new Uint8Array(await blob.arrayBuffer()) if Uint8Array is needed
	},
	stateToFile() {
		const {code} = useCodeStore.getState();
		const {controls, onChangeCallbacks} = useControlStore.getState();
		const {filename} = useFileStore.getState();
		const {	currentFrame, atFrameCallbacks } = useGlobalStore.getState();
		const {	keyframes, keyframeProperties } = useKeyframeStore.getState();
		const {	parameters } = useParameterStore.getState();

		const state = {
			code: { code },
			control: { controls, onChangeCallbacks },
			file: { filename },
			global: {currentFrame, atFrameCallbacks},
			keyframes: {keyframes, keyframeProperties},
			parameters: { parameters }
		};

		return JSON.stringify(state);
	},
	fileToState(contents: string) {
		const fileState = JSON.parse(contents);

		useCodeStore.setState({
			code: fileState.code.code
		});

		useControlStore.setState({
			controls: fileState.control.controls,
			onChangeCallbacks: fileState.control.onChangeCallbacks
		});

		useFileStore.setState({
			filename: fileState.file.filename
		});

		useGlobalStore.setState({
			currentFrame: fileState.global.currentFrame,
			atFrameCallbacks: fileState.global.atFrameCallbacks
		});

		useParameterStore.setState({
			parameters: fileState.parameters.parameters
		});
	},
	async open() {
		const contents = await window.electron.invoke('openFile');
		fs.fileToState(contents);
	},
	async save(filename, content) {
		return await window.electron.invoke('saveFile', filename, content);
	}
};

export default fs;
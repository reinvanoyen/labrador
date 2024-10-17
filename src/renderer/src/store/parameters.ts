import { create } from 'zustand'
import useControlStore from "./controls.ts";
import Environment from "../core/Environment.ts";

const useParameterStore = create((set) => ({
	parameters: {},
	setParameter: (name, value) => set((state) => {

		const {onChangeCallbacks} = useControlStore.getState();

		if (onChangeCallbacks[name]) {
			onChangeCallbacks[name].forEach(callback => {
				Environment.run(`(${callback})("${value}");`);
			});
		}

		return {
			parameters: {
				...state.parameters,
				[name]: value
			}
		}
	})
}));

export default useParameterStore;
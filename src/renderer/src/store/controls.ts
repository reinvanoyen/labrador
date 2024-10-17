import { create } from 'zustand'

export interface TControl {
	name: string;
	label?: string;
	type: 'slider';
	options: Record<string, never>;
	onChange?: (value) => void;
}

interface TControlState {
	controls: Record<string, TControl[]>,
	onChangeCallbacks: Record<string, unknown>
}

const useControlStore = create<TControlState>((set) => ({
	controls: {},
	onChangeCallbacks: {},
	addControl: (group: string, control: TControl) => set((state) => ({
		onChangeCallbacks: {
			...state.onChangeCallbacks,
			[control.name]: [
				...state.onChangeCallbacks[control.name] || [],
				control.onChange.toString()
			]
		},
		controls: {
			...state.controls,
			[group]: [
				...state.controls[group] || [],
				control
			]
		}
	}))
}));

export default useControlStore;
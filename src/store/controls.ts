import { create } from 'zustand'

interface TControl {
	name: string;
	label?: string;
	type: 'slider';
	options: Record<string, never>;
}

interface TControlState {
	controls: Record<string, TControl[]>
}

const useControlStore = create<TControlState>((set) => ({
	controls: {}
}));

export default useControlStore;
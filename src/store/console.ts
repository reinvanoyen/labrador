import { create } from 'zustand'

interface TMessage {
	level: 'error' | 'warning' | 'info';
	message: string;
}

interface TConsoleState {
	messages: TMessage[]
}

const useConsoleStore = create<TConsoleState>((set) => ({
	messages: [],
	log: (message: TMessage) => set((state) => ({
		messages: [
			...state.messages,
			message
		]
	}))
}));

export default useConsoleStore;
import { create } from 'zustand'
import useConsoleStore from "./console.ts";

interface TSettingsStore {
	darkMode: boolean;
}

const useSettingsStore = create<TSettingsStore>((set) => ({
	darkMode: true,
	toggleDarkMode: () => set((state) => {
		const {log} = useConsoleStore.getState();

		log({
			level: 'info',
			message: `Darkmode ${! state.darkMode ? 'ON' : 'OFF'}`
		});

		return {
			darkMode: ! state.darkMode
		};
	}),
}));

export default useSettingsStore;
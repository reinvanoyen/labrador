const {contextBridge, ipcRenderer} = require('electron');

// Expose API to renderer process
contextBridge.exposeInMainWorld('electron', {
	// Example method to send data to the main process
	invoke: (channel, ...args) => {
		return ipcRenderer.invoke(channel, ...args);
	},
	// Example method to receive data from the main process
	on: (channel, func) => {
		ipcRenderer.on(channel, (event, ...args) => func(...args));
	}
});
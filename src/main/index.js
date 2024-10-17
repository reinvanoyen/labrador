import { app, BrowserWindow } from 'electron';
import path from 'path';

const createWindow = () => {
	const win = new BrowserWindow({
		title: "Labrador",
		show: false
	});
	win.maximize();

	// Load the local URL for development or the local
	// html file for production
	if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
		win.loadURL(process.env['ELECTRON_RENDERER_URL'])
	} else {
		win.loadFile(path.join(__dirname, '../renderer/index.html'))
	}

	win.show();
};

app.whenReady().then(() => {
	createWindow();
});
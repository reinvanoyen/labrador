import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from "fs";

const createWindow = () => {
	const win = new BrowserWindow({
		title: "Labrador",
		show: false,
		webPreferences: {
			preload: path.join(app.getAppPath(), 'out/preload/index.js'),
			contextIsolation: true,   // Ensure this is enabled for security
			enableRemoteModule: false, // Disable remote module for security
			nodeIntegration: false,    // Disable direct Node.js integration in the renderer
		},
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

	return win;
};

app.whenReady().then(() => {
	const window = createWindow();

	app.on('open-file', (event, path) => {
		event.preventDefault();  // Prevent the default behavior
		if (window) {
			window.webContents.send('file-opened', path);  // Send the path to the renderer
		}
	});

	// Handle open dialog request from the renderer
	ipcMain.handle('openFile', async (event) => {
		const result = await dialog.showOpenDialog({
			properties: ['openFile'],
			filters: [{
				name: 'Labra Project Files', extensions: ['labra'] },
				{ name: 'All Files', extensions: ['*']
			}]
		});

		const fileBuffer = await fs.promises.readFile(result.filePaths[0]);

		return fileBuffer.toString('utf-8');
	});

	ipcMain.handle('saveFile', async (event, filename, content) => {
		// Show the save dialog to get the file path
		const { filePath } = await dialog.showSaveDialog({
			title: 'Save your file',
			defaultPath: path.join(app.getPath('documents'), filename), // Suggest a default filename
			filters: [
				{ name: 'Labra Project Files', extensions: ['labra'] },  // File extension filter
				{ name: 'All Files', extensions: ['*'] }  // Allow any file type
			]
		});

		// If the user selects a file path, save the file
		if (filePath) {
			console.log('Saving file to:', filePath);
			try {
				// Use fs.promises.writeFile for asynchronous file saving
				await fs.promises.writeFile(filePath, content, 'utf-8');
				console.log('File saved successfully');
				return filePath; // Return the file path as a success response
			} catch (error) {
				console.error('Error saving file:', error);
				return null; // Return null if there is an error
			}
		}

		// If the user cancels the save dialog, return null
		return null;
	});
});
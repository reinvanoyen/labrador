import {Button, Flex, Grid} from "@radix-ui/themes";
import useExportState from "../../store/export.ts";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import {fetchFile, toBlobURL} from '@ffmpeg/util';
import useConsoleStore from "../../store/console.ts";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import fs from "../../utils/fs.ts";

function Export() {

	const {renderedFrames, renderedVideos, clear, addVideo} = useExportState();
	const {log} = useConsoleStore();

	const exportVideo = async () => {

		const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
		const ffmpeg = new FFmpeg();

		ffmpeg.on('log', ({ message }) => {
			log({
				level: 'info',
				message
			});
		});

		await ffmpeg.load({
			coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
			wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
		});

		// Write the image frames into ffmpeg's virtual filesystem
		for (let i = 0; i < renderedFrames.length; i++) {
			//const arrayBuffer = await fs.blobUrlToArrayBuffer(renderedFrames[i]);

			await ffmpeg.writeFile(`frame${i}.png`, await fetchFile(renderedFrames[i]));
		}

		// Run the ffmpeg command to create the video
		await ffmpeg.exec([
			'-framerate', `${60}`, // Set the framerate
			'-i', 'frame%d.png',          // Input image sequence
			'-c:v', 'libx264',            // Video codec
			'-pix_fmt', 'yuv420p',        // Pixel format for browser compatibility
			'output.mp4'                  // Output video file
		]);

		// Read the output file from ffmpeg's filesystem
		const data = await ffmpeg.readFile('output.mp4');
		const blob = new Blob([data.buffer], { type: 'video/mp4' });
		const blobText = URL.createObjectURL(blob);

		addVideo(blobText);
	};

	return (
		<>
			<Flex justify="end" p="2" gap="1">
				<Button color="gray" size="1" onClick={exportVideo}>Export as MP4</Button>
				<Button color="gray" size="1" onClick={clear}>Clear rendered frames</Button>
			</Flex>
			<PanelGroup direction="horizontal">
				<Panel defaultSize={75}>
					<Grid columns="40" gap="1" p="4" style={{
						background: "var(--gray-1)"
					}}>
						{renderedFrames.map((frame, i) => {
							return <img key={i} src={frame} width="100%" />;
						})}
					</Grid>
				</Panel>
				<PanelResizeHandle />
				<Panel defaultSize={25}>
					{renderedVideos.map((video, i) => {
						return (
							<a href={video} download="video.mp4">Video {i}</a>
						);
					})}
				</Panel>
			</PanelGroup>
		</>
	);
}

export default Export;
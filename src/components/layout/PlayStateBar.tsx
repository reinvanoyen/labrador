import {Box, Flex, IconButton} from "@radix-ui/themes";
import {CircleIcon, PauseIcon, PlayIcon, StopIcon} from "@radix-ui/react-icons";
import useGlobalStore from "../../store/global.ts";
import Label from "../ui/Label.tsx";

function PlayStateBar() {
	const {isActive, isRecording, currentFrame, activate, deactivate, startRecording, stopRecording} = useGlobalStore();

	return (
		<Flex justify="center" width="100%" py="2" style={{
			borderTop: "1px solid var(--gray-3)",
			borderBottom: "1px solid var(--gray-3)"
		}}>
			<Flex gap="2" width="100%" justify="center" align="center">
				<Box position="absolute" left="2">
					<Label text={`Current frame: ${currentFrame}`} />
				</Box>
				<IconButton onClick={isActive ? deactivate : activate}>
					{isActive ? <PauseIcon width="14" height="14" /> : <PlayIcon width="14" height="14" />}
				</IconButton>
				<IconButton onClick={isRecording ? stopRecording : startRecording}>
					{isRecording ? <StopIcon width="14" height="14" /> : <CircleIcon width="14" height="14" />}
				</IconButton>
			</Flex>
		</Flex>
	);
}

export default PlayStateBar;
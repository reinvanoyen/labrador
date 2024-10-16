import {Flex, IconButton, Text} from "@radix-ui/themes";
import {CircleIcon, PauseIcon, PlayIcon, ResetIcon, StopIcon} from "@radix-ui/react-icons";
import useGlobalStore from "../../store/global.ts";
import Label from "../ui/Label.tsx";

function PlayStateBar() {
	const {
		isActive,
		isRecording,
		currentFrame,
		setCurrentFrame,
		activate,
		deactivate,
		startRecording,
		stopRecording
	} = useGlobalStore();

	return (
		<Flex justify="center" width="100%" py="2" style={{
			borderTop: "1px solid var(--gray-3)",
			borderBottom: "1px solid var(--gray-3)"
		}}>
			<Flex gap="2" width="100%" justify="center" align="center">
				<Flex direction="column" position="absolute" left="2" align="start" gap="2">
					<Label text={`Current frame: ${currentFrame}`} />
					<Flex gap="2">
						{isActive && (
							<Text size="1" color="green">
								▷ simulating
							</Text>
						)}
						{isRecording && (
							<Text size="1" color="red">
								⦿ recording
							</Text>
						)}
						{(! isActive && ! isRecording) && (
							<Text size="1" color="gray">
								Inactive
							</Text>
						)}
					</Flex>
				</Flex>
				<IconButton onClick={() => setCurrentFrame(0)} color="gray">
					<ResetIcon />
				</IconButton>
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
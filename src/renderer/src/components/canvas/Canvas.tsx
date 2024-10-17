import {Box, Flex, IconButton} from "@radix-ui/themes";
import useGlobalStore from "../../store/global.ts";
import {OpenInNewWindowIcon} from "@radix-ui/react-icons";
import MessageBus from "../../core/MessageBus.ts";

function Canvas() {

	const {isActive} = useGlobalStore();

	const openInNewWindow = () => {
		MessageBus.trigger('newCanvasWindow', {});
	};

	return (
		<Flex overflow="scroll" width="100%" height="100%" align="center" justify="center" style={{
			position: 'relative',
			background: 'var(--gray-2)',
			border: isActive ? '1px solid var(--accent-9)' : ''
		}}>
			<Box position="absolute" top="10px" right="10px">
				<IconButton onClick={openInNewWindow} size="1" color="gray">
					<OpenInNewWindowIcon />
				</IconButton>
			</Box>
			<div id="canvas"></div>
		</Flex>
	);
}

export default Canvas;
import {Flex} from "@radix-ui/themes";

function Canvas() {
	return (
		<Flex overflow="scroll" width="100%" height="100%" align="center" justify="center" style={{
			position: 'relative'
		}}>
			<div id="canvas"></div>
		</Flex>
	);
}

export default Canvas;
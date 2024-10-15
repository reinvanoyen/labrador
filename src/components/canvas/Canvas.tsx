import {Flex} from "@radix-ui/themes";
import useGlobalStore from "../../store/global.ts";

function Canvas() {

	const {isActive} = useGlobalStore();

	return (
		<Flex overflow="scroll" width="100%" height="100%" align="center" justify="center" style={{
			position: 'relative',
			background: 'var(--gray-2)',
			border: isActive ? '1px solid var(--accent-9)' : ''
		}}>
			<div id="canvas"></div>
		</Flex>
	);
}

export default Canvas;
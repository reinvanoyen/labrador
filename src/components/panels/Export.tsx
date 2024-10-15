import {Button, Flex, Grid} from "@radix-ui/themes";
import useExportState from "../../store/export.ts";

function Export() {

	const {renderedFrames, clear} = useExportState();

	return (
		<>
			<Flex justify="end" p="2">
				<Button color="gray" size="1" onClick={clear}>Clear rendered frames</Button>
			</Flex>
			<Grid columns="40" gap="1" p="4" style={{
				background: "var(--gray-1)"
			}}>
				{renderedFrames.map(frame => {
					return <img src={frame} width="100%" />;
				})}
			</Grid>
		</>
	);
}

export default Export;
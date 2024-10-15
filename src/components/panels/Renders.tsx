import {Flex} from "@radix-ui/themes";
import Label from "../ui/Label.tsx";

function Renders() {
	return (
		<Flex direction="column" align="center" justify="center" p="4" style={{
			background: "var(--gray-1)"
		}}>
			<Label text="Renders" />
		</Flex>
	);
}

export default Renders;
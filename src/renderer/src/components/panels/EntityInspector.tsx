import {Flex} from "@radix-ui/themes";
import Label from "../ui/Label.tsx";

function EntityInspector() {
	return (
		<Flex direction="column" align="center" justify="center" p="4" style={{
			background: "var(--gray-1)"
		}}>
			<Label text="Entity inspector" />
		</Flex>
	);
}

export default EntityInspector;
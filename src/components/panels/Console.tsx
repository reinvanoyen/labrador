import { Flex } from "@radix-ui/themes";
import useConsoleStore from "../../store/console.ts";

function Console() {

	const {messages} = useConsoleStore();

	return (
		<Flex direction="column">
			{messages.map((message, i) => {
				return (
					<div key={i}>
						[{message.level}] {message.message}
					</div>
				);
			})}
		</Flex>
	);
}

export default Console;
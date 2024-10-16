import {Flex, Text} from "@radix-ui/themes";
import useConsoleStore from "../../store/console.ts";

function Console() {

	const {messages} = useConsoleStore();

	return (
		<Flex direction="column" px="2">
			{messages.map((message, i) => {
				return (
					<div key={i}>
						<Text size="1">
							[{message.level}] {message.message}
						</Text>
					</div>
				);
			})}
		</Flex>
	);
}

export default Console;
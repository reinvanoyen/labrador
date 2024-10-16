import {Flex, Heading} from "@radix-ui/themes";
import SettingsMenu from "./SettingsMenu.tsx";
import ViewMenu from "./ViewMenu.tsx";

function Header() {
	return (
		<Flex flexShrink="0" height="45px" px="4" align="center" justify="between" style={{
			borderBottom: "1px solid var(--gray-3)",
		}}>
			<Heading size="3" color="indigo">Labrador</Heading>
			<Flex gap="2">
				<SettingsMenu />
				<ViewMenu />
			</Flex>
		</Flex>
	);
}

export default Header;
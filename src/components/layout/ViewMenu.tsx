import {Button, DropdownMenu} from "@radix-ui/themes";
import {CheckIcon} from "@radix-ui/react-icons";
import useSettingsStore from "../../store/settings.ts";

function ViewMenu() {

	const {darkMode, toggleDarkMode} = useSettingsStore();

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button variant="soft" color="gray">
					View
					<DropdownMenu.TriggerIcon />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.CheckboxItem
					checked={darkMode}
					onCheckedChange={toggleDarkMode}
				>
					Dark mode <div className="RightSlot">⌘+B</div>
				</DropdownMenu.CheckboxItem>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}

export default ViewMenu;
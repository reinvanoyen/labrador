import {Button, DropdownMenu} from "@radix-ui/themes";
import fs from "../../utils/fs.ts";

function FileMenu() {

	const open = async () => {
		const content = await fs.open();
	};

	const save = async () => {
		const filePath = await fs.save('UntitledProject.labra', fs.stateToFile());
	};

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button variant="soft" color="gray">
					File
					<DropdownMenu.TriggerIcon />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item shortcut="⌘ O" onClick={open}>Open</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item shortcut="⌘ S" onClick={save}>Save As...</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}

export default FileMenu;
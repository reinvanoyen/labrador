import {Button, DropdownMenu} from "@radix-ui/themes";
import fs from "../../utils/fs.ts";

function FileMenu() {

	const save = () => {
		fs.save('Nice', 'project.lbr', 'application/json');
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
				<DropdownMenu.Item shortcut="⌘ S" onClick={save}>Save As...</DropdownMenu.Item>
				<DropdownMenu.Item shortcut="⌘ O">Open</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}

export default FileMenu;
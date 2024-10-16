import {Tabs} from "@radix-ui/themes";
import Timeline from "./Timeline.tsx";
import Export from "./Export.tsx";
import EntityInspector from "./EntityInspector.tsx";
import Console from "./Console.tsx";
import CodeEditor from "./CodeEditor.tsx";

function Bottom() {
	return (
		<Tabs.Root defaultValue={"timeline"}>
			<Tabs.List>
				<Tabs.Trigger value="timeline">Timeline</Tabs.Trigger>
				<Tabs.Trigger value="renders">Renders</Tabs.Trigger>
				<Tabs.Trigger value="entityInspector">Entity inspector</Tabs.Trigger>
				<Tabs.Trigger value="console">Console</Tabs.Trigger>
				<Tabs.Trigger value="code">Code editor</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="timeline">
				<Timeline />
			</Tabs.Content>
			<Tabs.Content value="entityInspector">
				<EntityInspector />
			</Tabs.Content>
			<Tabs.Content value="renders">
				<Export />
			</Tabs.Content>
			<Tabs.Content value="console">
				<Console />
			</Tabs.Content>
			<Tabs.Content value="code">
				<CodeEditor />
			</Tabs.Content>
		</Tabs.Root>
	);
}

export default Bottom;
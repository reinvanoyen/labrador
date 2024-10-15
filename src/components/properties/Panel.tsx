import {Flex, Separator, Tabs} from "@radix-ui/themes";
import useControlStore from "../../store/controls.ts";
import Label from "../ui/Label.tsx";
import GenericInput from "../inputs/GenericInput.tsx";

function Panel() {
	const {controls} = useControlStore();
	const controlNames = Object.keys(controls);

	return (
		<Tabs.Root defaultValue="properties">
			<Tabs.List>
				<Tabs.Trigger value="properties">Properties</Tabs.Trigger>
				<Tabs.Trigger value="canvas">Canvas settings</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content value="properties">
				<Flex direction="column" gap="3">
					{controlNames.map(controlName => {
						return (
							<div key={controlName}>
								<Flex direction="column" gap="3" p="3">
									<Label text={controlName} />
									{controls[controlName].map(control => {
										return <GenericInput key={control.name} name={control.name} label={control.label} type={control.type} options={control.options} />;
									})}
								</Flex>
								<Separator decorative={true} orientation="horizontal" size="4" />
							</div>
						);
					})}
				</Flex>
			</Tabs.Content>

			<Tabs.Content value="canvas">
				<Flex direction="column" gap="3" p="3">
					Soon..
				</Flex>
			</Tabs.Content>
		</Tabs.Root>
	);
}

export default Panel;
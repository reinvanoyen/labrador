import {Box, Button, Flex, Grid, IconButton} from "@radix-ui/themes";
import Label from "../ui/Label.tsx";
import useControlStore from "../../store/controls.ts";
import {CircleIcon} from "@radix-ui/react-icons";
import useKeyframeStore from "../../store/keyframes.ts";

function Timeline() {

	const {keyframes, keyframeProperties, setKeyframe} = useKeyframeStore();
	const {controls} = useControlStore();
	const controlNames = Object.keys(controls);

	const addKeyframe = (name: string) => {
		const frame = prompt('frame');
		const value = prompt('value');

		setKeyframe(frame, name, value);
	};

	console.log(keyframeProperties);

	return (
		<Flex direction="column" style={{
			background: "var(--gray-1)"
		}}>
			{controlNames.map(controlName => {
				return (
					<Box key={controlName} px="2">
						<Label text={controlName} />
						{controls[controlName].map(control => {
							return (
								<Grid columns="12" py="2" align="center">
									<Flex align="center" gap="2" gridColumnStart="1" gridColumnEnd="4" px="2">
										<Label text={control.label || control.name} />
										<CircleIcon width="10" height="10" onClick={e => addKeyframe(control.name)} />
									</Flex>
									<Flex gap="2" gridColumnStart="4" gridColumnEnd="13">
										{(keyframeProperties[control.name] || []).map(frame => {
											return (
												<Label key={frame} text={frame} />
											)
										})}
									</Flex>
								</Grid>
							);
						})}
					</Box>
				);
			})}
		</Flex>
	);
}

export default Timeline;
import {Box, Flex, Grid, Separator} from "@radix-ui/themes";
import Label from "../ui/Label.tsx";
import useControlStore from "../../store/controls.ts";

function Timeline() {

	const {controls} = useControlStore();
	const controlNames = Object.keys(controls);

	return (
		<Flex direction="column" style={{
			background: "var(--gray-1)"
		}}>
			{controlNames.map(controlName => {
				return (
					<Box key={controlName}>
						<Label text={controlName} />
						{controls[controlName].map(control => {
							return (
								<Grid columns="12" py="2" align="center">
									<Box gridColumnStart="1" gridColumnEnd="2" px="2">
										<Label text={control.label || control.name} />
									</Box>
									<Box gridColumnStart="2" gridColumnEnd="13">
										<Box width="100%" height="5px" style={{
											background: 'var(--gray-3)'
										}}>
										</Box>
									</Box>
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
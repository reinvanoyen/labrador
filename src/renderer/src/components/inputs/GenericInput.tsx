import SliderInput from "./SliderInput.tsx";
import Label from "../ui/Label.tsx";
import {Box, Grid} from "@radix-ui/themes";
import TextInput from "./TextInput.tsx";

type TGenericInputProps = {
	name: string;
	label?: string;
	type: string;
	options: Record<string, never>
};

function GenericInput({name, type, options, label}: TGenericInputProps) {
	if (type === 'slider') {
		return (
			<Grid columns="12" gap="3" align="center">
				<Box gridColumnStart="1" gridColumnEnd="4">
					<Label text={label || name} />
				</Box>
				<Box gridColumnStart="4" gridColumnEnd="13">
					<SliderInput name={name} label={label} max={options.max} min={options.min} step={options.step} />
				</Box>
			</Grid>
		);
	}

	if (type === 'text') {
		return (
			<Grid columns="12" gap="3" align="center">
				<Box gridColumnStart="1" gridColumnEnd="4">
					<Label text={label || name} />
				</Box>
				<Box gridColumnStart="4" gridColumnEnd="13">
					<TextInput name={name} />
				</Box>
			</Grid>
		);
	}
}

export default GenericInput;
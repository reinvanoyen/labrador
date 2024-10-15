import {Box, Grid, Slider, TextField} from "@radix-ui/themes";
import useParameterStore from "../../store/parameters.ts";

type TSliderInputProps = {
	name: string;
	min: number;
	max: number;
	step?: number;
};

function SliderInput({name, min, max, step = 1}: TSliderInputProps) {

	const {parameters, setParameter} = useParameterStore();

	return (
		<Grid columns="12" gap="3" align="center">
			<Box gridColumnStart="1" gridColumnEnd="10">
				<Slider value={[parameters[name]]} min={min} max={max} step={step} size="1" variant="soft" onValueChange={(data) => {
					setParameter(name, data[0]);
				}} />
			</Box>
			<Box gridColumnStart="10" gridColumnEnd="13">
				<TextField.Root size="1" type="number" value={parameters[name]} onChange={(e) => {
					setParameter(name, e.target.value);
				}} />
			</Box>
		</Grid>
	);
}

export default SliderInput;
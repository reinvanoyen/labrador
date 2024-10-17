import {TextField} from "@radix-ui/themes";
import useParameterStore from "../../store/parameters.ts";

type TTextInputProps = {
	name: string;
	onChange: (value) => void;
};

function TextInput({name, onChange}: TTextInputProps) {

	const {parameters, setParameter} = useParameterStore();

	return (
		<TextField.Root size="1" value={parameters[name]} onChange={(e) => {
			onChange(e.target.value);
			setParameter(name, e.target.value);
		}} />
	);
}

export default TextInput;
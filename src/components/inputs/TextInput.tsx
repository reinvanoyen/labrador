import {TextField} from "@radix-ui/themes";
import useParameterStore from "../../store/parameters.ts";

type TTextInputProps = {
	name: string;
};

function TextInput({name}: TTextInputProps) {

	const {parameters, setParameter} = useParameterStore();

	return (
		<TextField.Root size="1" value={parameters[name]} onChange={(e) => {
			setParameter(name, e.target.value);
		}} />
	);
}

export default TextInput;
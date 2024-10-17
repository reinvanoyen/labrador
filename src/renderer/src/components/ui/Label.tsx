import {Text} from "@radix-ui/themes";

type TLabelProps = {
	text: string;
};

function Label(props: TLabelProps) {
	return (
		<Text size="1" color="gray" trim="both">
			{props.text}
		</Text>
	);
}

export default Label;
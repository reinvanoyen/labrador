import {Button, Flex} from "@radix-ui/themes";
import useCodeStore from "../../store/code.ts";
import {useRef} from "react";
import {Editor} from "@monaco-editor/react";
import useSettingsStore from "../../store/settings.ts";
import MessageBus from "../../core/MessageBus.ts";

function CodeEditor() {

	const {darkMode} = useSettingsStore();
	const {code, setCode, runCode} = useCodeStore();
	const editorRef = useRef(null);

	function handleEditorDidMount(editor, monaco) {
		editorRef.current = editor;
	}

	const onCodeChange = () => {
		setCode(editorRef.current.getValue());
	};

	const onCodeRun = () => {
		MessageBus.trigger('run', {});
	};

	return (
		<>
			<Flex justify="end" p="2" gap="1">
				<Button color="gray" onClick={onCodeRun} size="1">Run</Button>
			</Flex>
			<Editor
				theme={darkMode ? 'vs-dark' : 'light'}
				height="100vh"
				value={code}
				onChange={onCodeChange}
				defaultLanguage="javascript"
				onMount={handleEditorDidMount}
			/>
		</>
	);
}

export default CodeEditor;
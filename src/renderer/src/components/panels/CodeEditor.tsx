import {Button, Flex} from "@radix-ui/themes";
import useCodeStore from "../../store/code.ts";
import {useRef} from "react";
import {Editor} from "@monaco-editor/react";
import useSettingsStore from "../../store/settings.ts";

function CodeEditor() {

	const {darkMode} = useSettingsStore();
	const {code, setCode} = useCodeStore();
	const editorRef = useRef(null);

	function handleEditorDidMount(editor, monaco) {
		editorRef.current = editor;
	}

	const runCode = () => {
		setCode(editorRef.current.getValue());
	};

	return (
		<>
			<Flex justify="end" p="2" gap="1">
				<Button color="gray" onClick={runCode} size="1">Run</Button>
			</Flex>
			<Editor
				theme={darkMode ? 'vs-dark' : 'light'}
				height="100vh"
				value={code}
				defaultLanguage="javascript"
				onMount={handleEditorDidMount}
			/>
		</>
	);
}

export default CodeEditor;
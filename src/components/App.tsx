import {Flex, Box } from "@radix-ui/themes";
import Header from "./layout/Header.tsx";
import Bottom from "./panels/Bottom.tsx";
import Canvas from "./canvas/Canvas.tsx";
import PlayStateBar from "./layout/PlayStateBar.tsx";
import {PanelGroup, PanelResizeHandle, Panel} from "react-resizable-panels";
import ControlPanel from "./properties/ControlPanel.tsx";

function App() {
    return (
        <Flex direction="column" height="100vh" width="100vw">
            <Header />
            <Box flexGrow="1">
                <PanelGroup direction="horizontal">
                    <Panel defaultSize={85}>
                        <PanelGroup direction="vertical">
                            <Panel defaultSize={75}>
                                <Canvas />
                            </Panel>
                            <PanelResizeHandle />
                            <Panel defaultSize={25}>
                                <PlayStateBar />
                                <Bottom />
                            </Panel>
                        </PanelGroup>
                    </Panel>
                    <PanelResizeHandle />
                    <Panel defaultSize={15}>
                        <ControlPanel />
                    </Panel>
                </PanelGroup>
            </Box>
        </Flex>
    );
}

export default App
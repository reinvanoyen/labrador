import {Flex, Box, Theme} from "@radix-ui/themes";
import Header from "./layout/Header.tsx";
import Bottom from "./panels/Bottom.tsx";
import Canvas from "./canvas/Canvas.tsx";
import PlayStateBar from "./layout/PlayStateBar.tsx";
import {PanelGroup, PanelResizeHandle, Panel} from "react-resizable-panels";
import ControlPanel from "./properties/ControlPanel.tsx";
import {StrictMode} from "react";
import useSettingsStore from "../store/settings.ts";

function App() {

    const {darkMode} = useSettingsStore();

    return (
        <StrictMode>
            <Theme radius="large" appearance={darkMode ? 'dark' : 'light'} accentColor="indigo">
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
            </Theme>
        </StrictMode>
    );
}

export default App
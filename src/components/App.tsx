import {Flex, Box, Grid, IconButton, Tabs, Text} from "@radix-ui/themes";
import Panel from "./properties/Panel.tsx";
import Header from "./layout/Header.tsx";
import Timeline from "./panels/Timeline.tsx";
import Bottom from "./panels/Bottom.tsx";
import {OpenInNewWindowIcon} from "@radix-ui/react-icons";
import Canvas from "./canvas/Canvas.tsx";
import PlayStateBar from "./layout/PlayStateBar.tsx";

function App() {
    return (
        <Flex direction="column" height="100vh" width="100vw">
            <Header />
            <Box flexGrow="1">
                <Grid columns="12" height="100%">

                    <Grid gridColumnStart="1" gridColumnEnd="11">
                        <Grid rows="12">
                            <Box gridRowStart="1" gridRowEnd="10" position="relative">
                                <Box position="absolute" top="10px" right="10px">
                                    <IconButton size="1" color="gray" variant="soft">
                                        <OpenInNewWindowIcon />
                                    </IconButton>
                                </Box>
                                <Canvas />
                            </Box>
                            <Box gridRowStart="10" gridRowEnd="13">
                                <PlayStateBar />
                                <Bottom />
                            </Box>
                        </Grid>
                    </Grid>

                    <Box gridColumnStart="11" gridColumnEnd="13" style={{
                        borderLeft: "1px solid var(--gray-3)"
                    }}>
                        <Panel />
                    </Box>
                </Grid>
            </Box>
        </Flex>
    );
}

export default App
import * as React from 'react';
import Box from '@mui/material/Box';
import NumberSlider from './NumberSlider'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ToggleSwitch from './ToggleSwitch'


export default function Crawl(props) {
    const [currentPatternData, setCurrentPatternData] = React.useState({});
   
    
    React.useEffect(() => {
        setCurrentPatternData(props.currentPatternData);
        
    }, []);

    const handleSavePatternData = () => {
        props.saveData(currentPatternData);
    }

    const handleRunPattern = () => {
        fetch(props.workingIP + "/start/" + currentPatternData['sceneid'],{
          method: "POST",
          headers: {
              "Content-Type": "text/plain",
          },
        }).then(responce => console.log(responce))
        .catch(e => console.log(e))
       };

    return (
        <div>
            <br/>
            <Stack justifyContent="center" spacing={8} alignItems="center" align direction="row">
                <Button variant="contained" color="secondary" onClick={() => handleSavePatternData()}>Save</Button>
                <Button variant="contained" color="primary" onClick={() => handleRunPattern()}>Run</Button>
                <Button variant="contained" color="error" onClick={() => props.onDelete({'id': currentPatternData['id']})}>Delete</Button>
            </Stack>
            <br/>
            {/* <DualNumberSlider setStart={e => setCurrentPatternData({...currentPatternData, 'start':e})} setEnd={e => setCurrentPatternData({...currentPatternData, 'end':e})} label={"Range: " + currentPatternData['start'] + "-" + currentPatternData['end']} width={300} min={1} max={17}></DualNumberSlider> */}
            <Stack spacing={8} alignItems="center">
            <NumberSlider label={"Start: " + currentPatternData['start']} width={300} height={0} orientation="horizontal" color="" size="medium" min={1} max={props.numLeds} defaultValue={props.currentPatternData['start']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'start':e})}></NumberSlider>
            <NumberSlider label={"End: " + currentPatternData['end']} width={300} height={0} orientation="horizontal" color="" size="medium" min={1} max={props.numLeds} defaultValue={props.currentPatternData['end']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'end':e})}></NumberSlider>
            </Stack>
            <br/>
            <br/>
            <br/>
            <Box  display="flex"
                justifyContent="center"
                alignItems="center"
                style={{backgroundColor:"rgb(" + currentPatternData['red_on'] + "," + currentPatternData['green_on'] + "," + currentPatternData['blue_on'] + ")"}}
                >
                <NumberSlider valueLabel="auto" width={100} height={200} orientation="vertical" color="rgb(255,0,0)" size="medium" min={0} max={255} defaultValue={50} setValue={e => setCurrentPatternData({...currentPatternData, 'red_on':e})}></NumberSlider>
                <NumberSlider valueLabel="auto" width={100} height={200} orientation="vertical" color="rgb(0,255,0)" size="medium" min={0} max={255} defaultValue={50} setValue={e => setCurrentPatternData({...currentPatternData, 'green_on':e})}></NumberSlider>
                <NumberSlider valueLabel="auto" width={100} height={200} orientation="vertical" color="rgb(0,0,255)" size="medium" min={0} max={255} defaultValue={50} setValue={e => setCurrentPatternData({...currentPatternData, 'blue_on':e})}></NumberSlider>
            </Box>
            <Box  display="flex"
                justifyContent="center"
                alignItems="center"
                style={{backgroundColor:"rgb(" + currentPatternData['red_off'] + "," + currentPatternData['green_off'] + "," + currentPatternData['blue_off'] + ")"}}
                >
                <NumberSlider valueLabel="auto" width={100} height={200} orientation="vertical" color="rgb(255,0,0)" size="medium" min={0} max={255} defaultValue={50} setValue={e => setCurrentPatternData({...currentPatternData, 'red_off':e})}></NumberSlider>
                <NumberSlider valueLabel="auto" width={100} height={200} orientation="vertical" color="rgb(0,255,0)" size="medium" min={0} max={255} defaultValue={50} setValue={e => setCurrentPatternData({...currentPatternData, 'green_off':e})}></NumberSlider>
                <NumberSlider valueLabel="auto" width={100} height={200} orientation="vertical" color="rgb(0,0,255)" size="medium" min={0} max={255} defaultValue={50} setValue={e => setCurrentPatternData({...currentPatternData, 'blue_off':e})}></NumberSlider>
            </Box>
            <br/>
            <Stack spacing={8} alignItems="center">
            <NumberSlider label={"Brightness: " + parseInt(100*currentPatternData['brightness']) + "%"} width={300} height={0} orientation="horizontal" color="" size="medium" min={1} max={100} defaultValue={100*props.currentPatternData['brightness']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'brightness':e/100})}></NumberSlider>
            <NumberSlider label={"Speed: " + currentPatternData['speed_max']} width={300} height={0} orientation="horizontal" color="" size="medium" min={1} max={100} defaultValue={props.currentPatternData['speed_max']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'speed_max':e/1000})}></NumberSlider>
            <NumberSlider label={"Length: " + currentPatternData['crawl_length']} width={300} height={0} orientation="horizontal" color="" size="medium" min={1} max={props.numLeds} defaultValue={props.currentPatternData['crawl_length']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'crawl_length':e})}></NumberSlider>
            <ToggleSwitch label="Direction" checked={currentPatternData['move_right']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'move_right':e})}></ToggleSwitch>
            <ToggleSwitch label="Bounce" checked={currentPatternData['crawl_bounce']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'crawl_bounce':e})}></ToggleSwitch>
            </Stack>
        </div>
    );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import NumberSlider from './NumberSlider'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export default function Fire(props) {
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
            <NumberSlider  label={"Start: " + currentPatternData['start']} width={300} height={0} orientation="horizontal" color="" size="medium" min={1} max={props.numLeds} defaultValue={props.currentPatternData['start']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'start':e})}></NumberSlider>
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
            <br/>
            <Stack spacing={8} alignItems="center">
            <NumberSlider label={"Brightness: " + parseInt(100*currentPatternData['brightness']) + "%"} width={300} height={0} orientation="horizontal" color="" size="medium" min={1} max={100} defaultValue={100*props.currentPatternData['brightness']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'brightness':e/100})}></NumberSlider>
            <NumberSlider label={"Fade Speed Multiplier: " + parseInt(currentPatternData['fade_speed_multiplier'])} width={300} height={0} orientation="horizontal" color="" size="medium" min={1} max={100} defaultValue={props.currentPatternData['fade_speed_multiplier']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'fade_speed_multiplier':e})}></NumberSlider>
            <NumberSlider label={"Fade Speed Min: " + currentPatternData['fade_speed_min']} width={300} height={0} orientation="horizontal" color="" size="medium" min={0} max={100} defaultValue={props.currentPatternData['fade_speed_min']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'fade_speed_min':e/1000})}></NumberSlider>
            <NumberSlider label={"Fade Speed Max: " + currentPatternData['fade_speed_max']} width={300} height={0} orientation="horizontal" color="" size="medium" min={0} max={100} defaultValue={props.currentPatternData['fade_speed_max']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'fade_speed_max':e/1000})}></NumberSlider>
            <NumberSlider label={"Fade Up Chance: " + currentPatternData['fade_up_chance_ratio']} width={300} height={0} orientation="horizontal" color="" size="medium" min={2} max={10000} defaultValue={props.currentPatternData['fade_up_chance_ratio']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'fade_up_chance_ratio':e})}></NumberSlider>
                  
            </Stack>
        </div>
    );
}

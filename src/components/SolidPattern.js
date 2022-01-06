import * as React from 'react';
import Box from '@mui/material/Box';
import NumberSlider from './NumberSlider'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export default function Solid(props) {
    const [currentPatternData, setCurrentPatternData] = React.useState({});
   
    
    React.useEffect(() => {
        setCurrentPatternData(props.currentPatternData);
        
    }, []);

    const handleSavePatternData = () => {
        props.saveData(currentPatternData);
    }

    const handleRunPattern = () => {
        fetch(props.workingIP + "/start/" + currentPatternData['sceneid'],{
          method: "GET",
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
            <Stack spacing={8} alignItems="center">
                <NumberSlider label={"Brightness: " + parseInt(100*currentPatternData['brightness']) + "%"} width={300} height={0} orientation="horizontal" color="" size="medium" min={1} max={100} defaultValue={100*props.currentPatternData['brightness']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'brightness':e/100})}></NumberSlider>
                  
            </Stack>
        </div>
    );
}

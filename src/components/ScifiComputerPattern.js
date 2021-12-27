import * as React from 'react';
import Box from '@mui/material/Box';
import NumberSlider from './NumberSlider'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ColorArray from './ColorArray'


export default function ScifiComputer(props) {
    const [currentPatternData, setCurrentPatternData] = React.useState({});
    const [colors, setColors] = React.useState([[0,100,0], [100,0,0]]);
    const [workingRed, setWorkingRed] = React.useState(50);
    const [workingGreen, setWorkingGreen] = React.useState(50);
    const [workingBlue, setWorkingBlue] = React.useState(50);
    
    React.useEffect(() => {
        setCurrentPatternData(props.currentPatternData);
        console.log(currentPatternData['colors']);
        
    }, []);

    const handleSavePatternData = () => {
        
        props.saveData(currentPatternData);
    }

    React.useEffect(() => {
        if (currentPatternData['colors']){
            setColors(JSON.parse(currentPatternData['colors']));
        }
    }, [currentPatternData['colors']]);

    const handleAddColor = () => {

        let tempArray = [...colors, [workingRed, workingGreen, workingBlue]];
        setCurrentPatternData({...currentPatternData, 'colors': JSON.stringify(tempArray)});
        
    }
   const handleDeleteWorkingColor = (i) => {
    setCurrentPatternData({...currentPatternData, 'colors': JSON.stringify(colors.filter(c => c !== colors[i]))});
   };

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
            <Stack spacing={8} alignItems="center">
                <NumberSlider label={"Start: " + currentPatternData['start']} width={300} height={0} orientation="horizontal" color="" size="medium" min={1} max={props.numLeds} defaultValue={props.currentPatternData['start']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'start':e})}></NumberSlider>
                <NumberSlider label={"End: " + currentPatternData['end']} width={300} height={0} orientation="horizontal" color="" size="medium" min={1} max={props.numLeds} defaultValue={props.currentPatternData['end']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'end':e})}></NumberSlider>
          
                <NumberSlider label={"Brightness: " + parseInt(100*currentPatternData['brightness']) + "%"} width={300} height={0} orientation="horizontal" color="" size="medium" min={1} max={100} defaultValue={100*props.currentPatternData['brightness']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'brightness':e/100})}></NumberSlider>
                <NumberSlider label={"OnFreq: " + currentPatternData['on_frequency']} width={300} height={0} orientation="horizontal" color="" size="medium" min={1} max={10000} defaultValue={props.currentPatternData['on_frequency']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'on_frequency':e})}></NumberSlider>
                <NumberSlider label={"OffFreq: " + currentPatternData['off_frequency']} width={300} height={0} orientation="horizontal" color="" size="medium" min={1} max={10000} defaultValue={props.currentPatternData['off_frequency']} setValue={(e) => setCurrentPatternData({...currentPatternData, 'off_frequency':e})}></NumberSlider>
               <br/>
            <Stack direction="row" spacing={1} >

            {colors.map((color, i) => {
                return(
                    <ColorArray id={i} key={i} red={color[0]} green={color[1]} blue={color[2]} handleClick={() => handleDeleteWorkingColor(i)}></ColorArray>
                    );
                })}
            </Stack>
               
            <Box  display="flex"
                justifyContent="center"
                alignItems="center"
                style={{backgroundColor:"rgb(" + workingRed + "," + workingGreen + "," + workingBlue + ")"}}
                >
                <NumberSlider valueLabel="auto" width={100} height={200} orientation="vertical" color="rgb(255,0,0)" size="medium" min={0} max={255} defaultValue={50} setValue={e => setWorkingRed(e)}></NumberSlider>
                <NumberSlider valueLabel="auto" width={100} height={200} orientation="vertical" color="rgb(0,255,0)" size="medium" min={0} max={255} defaultValue={50} setValue={e => setWorkingGreen(e)}></NumberSlider>
                <NumberSlider valueLabel="auto" width={100} height={200} orientation="vertical" color="rgb(0,0,255)" size="medium" min={0} max={255} defaultValue={50} setValue={e => setWorkingBlue(e)}></NumberSlider>
                <Button onClick={handleAddColor}>Add Color</Button>
                
            </Box>
                    </Stack>
                
                <br/>

            
        </div>
    );
}

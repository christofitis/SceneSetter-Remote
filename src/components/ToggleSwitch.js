import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function ToggleSwitch(props){

    return(
        <Box>
            <FormControlLabel label={props.label} control={<Switch 
            checked={props.checked} 
            onChange={(e, v) => props.setValue(v)}
            />}/>
        </Box>
    );

}





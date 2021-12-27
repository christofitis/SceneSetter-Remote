import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

export default function NumberSlider(props){


    return (
        <Box width={props.width} height={props.height}>
            <Typography gutterBottom>{props.label}</Typography>
            <Slider
                
                size={props.size}
                defaultValue={props.defaultValue}
                aria-label="Small"
                valueLabelDisplay={props.valueLabel}
                onChange={(e, v) => props.setValue(v)}
                min={props.min}
                max={props.max}
                style={{color: props.color}}
                orientation={props.orientation}
            />
        </Box>
    );
}
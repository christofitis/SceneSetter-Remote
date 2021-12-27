
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SceneSelect(props) {
  const [scene, setScene] = React.useState('');



  const handleChange = (event) => {
    setScene(event.target.value);
    
  };

  React.useEffect(() => {
    props.handleSceneSelect(scene);
  }, [scene]);


  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Scene</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={scene}
          label="Scene"
          onChange={handleChange}
        >
            {
                props.scenes.map((s, i) => {
                    return (
                        <MenuItem key={s['id']} value={s['id']}>{s['name']}</MenuItem>
                    )
                })
            }
          
          
        </Select>
      </FormControl>
    </Box>
  );
}
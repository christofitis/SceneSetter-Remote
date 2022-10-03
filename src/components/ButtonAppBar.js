import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Menu as MenuIcon } from "@material-ui/icons";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import SceneSelect from './EditSceneSelect'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Fire from './FirePattern'
import Solid from './SolidPattern'
import Pulse from './PulsePattern'
import Crawl from './CrawlPattern'
import Marquee from './MarqueePattern'
import ScifiComputer from './ScifiComputerPattern'
import SimpleDialog from './PatternDialog'
import CreateScene from './CreateSceneDialog';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ButtonAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [sceneid, setSceneid] = React.useState(0)
  const [layouts, setLayouts] = React.useState([]);
  const [currentPattern, setCurrentPattern] = React.useState("");
  const [patternControls, setPatternControls] = React.useState("");
  const [addPatternDisabled, setAddPatternDisabled] = React.useState(1);
  const [createSceneDisplay, setCreateSceneDisplay] = React.useState(0);
  const [del, setDel] = React.useState(1);
  const [settingsDialogOpen, setSettingsDialogOpen] = React.useState(false);
  const [numLeds, setNumLeds] = React.useState(0);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
    setLayouts([]);
  };

  const handleCloseDialog = () => {
    setSettingsDialogOpen(false);
    setOpenDialog(false);
    setPatternControls(null);
    setAddPatternDisabled(1);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseEditScene = () => {
    setAnchorEl(null);
    handleClickOpenDialog();
  };
  const handleCloseCreateScene = () => {
    setAnchorEl(null);
    setCreateSceneDisplay(1);
  };
  const handleCloseEditStrip = () => {
   
    getNumberOfLeds();
    setAnchorEl(null);
    setSettingsDialogOpen(true);
    
  };
  const handleCloseDeleteScene = () => {
    setAnchorEl(null);
    props.setDeleteMode(del);
    setDel(d => !d);
  };
  const handleClose = () => {
    setAnchorEl(null);
    
  };

  const handleSaveSettings = () => {
    setSettingsDialogOpen(false);
    let data = {
      'num_leds': numLeds
    }
    fetch(props.workingIP + "/settings/update",{
      method: "POST",
      
      headers: {
          "Content-Type": "text/plain",
          
      },
      body: JSON.stringify(data)
    }).then(responce => responce.json())
    .catch(e => console.log(e))

  }

  const getNumberOfLeds = () => {
    fetch(props.workingIP + "/settings",{
      method: "GET",
      headers: {
          "Content-Type": "text/plain",
      },
    }).then(responce => responce.json())
    .then(data => setNumLeds(data['num_leds']))
    .catch(e => console.log(e))
  }

  React.useEffect(() => {
    if (props.workingIP !== null){
      getNumberOfLeds();
    }
  }, [props.workingIP]);

  const handleLedNumChange = (event) => {
    setNumLeds(event.target.value);
  }

  const handlePatternUpdateData = (newData) => {
    fetch(props.workingIP + "/layouts/update",{
          method: "POST",
          
          headers: {
              "Content-Type": "text/plain",
              
          },
          body: JSON.stringify([newData])
        }).then(responce => responce.json())
        .then(data => {
          setCurrentPattern(newData);
          console.log('Success: ', data);
        })
        .catch(e => console.log(e))
  };


  const handleLayoutsChange = (id) => {
    setPatternControls(null);
    setSceneid(id);
  };
  
  const handleDeleteLayout = (layoutID) => {
   
    if (window.confirm("Delete Pattern?")){
      fetch(props.workingIP + "/layouts/delete",{
      method: "DELETE",
      
      headers: {
          "Content-Type": "text/plain",
          
      },
      body: JSON.stringify(layoutID)
    }).then(responce => responce.json())
    .then(data => {
      console.log('Success: ', data);
      setPatternControls(null);
      getLayouts();
    })
    .catch(e => console.log(e))}
    }

    const handleAddPattern = (pattern) => {
      let addPatternData = []

    fetch(props.workingIP + "/patterndefaults/" + pattern,{
        method: "GET",
        headers: {
            "Content-Type": "text/plain",
        },
      }).then(responce => responce.json())
      .then(data => addPatternData.push(data))
      .then(() => addPatternData[0] = {...addPatternData[0], 'sceneid': sceneid, 'pattern': pattern})
      .then(() => handleCreatePattern(addPatternData))
      .catch(e => console.log(e))
    }

    
      const handleCreatePattern = (newPattern) => {
        
        fetch(props.workingIP + "/layouts/create",{
          method: "POST",
          
          headers: {
              "Content-Type": "text/plain",
          },
          body: JSON.stringify(newPattern)
        }).then(responce => responce.json())
        .then(data => {
          console.log('Success: ', data);
          getLayouts();
        })
        .catch(e => console.log(e))
        }

        const getLayouts = () => {
          if (props.workingIP !== null){

            fetch(props.workingIP + "/layouts/" + sceneid,{
              method: "GET",
              
              headers: {
                  "Content-Type": "text/plain",
                  
              },
            }).then(responce => responce.json())
            .then(data => setLayouts(data))
            .catch(e => console.log(e))
          }
        }


  React.useEffect(() => {
    getLayouts();
    sceneid ? setAddPatternDisabled(0) : setAddPatternDisabled(1);
  }, [sceneid, patternControls]);

  React.useEffect(() => {
    console.log('new pattern');
      switch(currentPattern['pattern']){
        case 'fire':
          setPatternControls(<Fire numLeds={numLeds} key={currentPattern["id"]} workingIP={props.workingIP} currentPatternData={currentPattern} saveData={handlePatternUpdateData} onDelete={handleDeleteLayout}></Fire>);
          break;
        case 'solid':
          setPatternControls(<Solid numLeds={numLeds} key={currentPattern["id"]} workingIP={props.workingIP} currentPatternData={currentPattern} saveData={handlePatternUpdateData} onDelete={handleDeleteLayout}></Solid>);
          break
        case 'pulse':
          setPatternControls(<Pulse numLeds={numLeds} key={currentPattern["id"]} workingIP={props.workingIP} currentPatternData={currentPattern} saveData={handlePatternUpdateData} onDelete={handleDeleteLayout}></Pulse>);
          break
        case 'crawl':
          setPatternControls(<Crawl numLeds={numLeds} key={currentPattern["id"]} workingIP={props.workingIP} currentPatternData={currentPattern} saveData={handlePatternUpdateData} onDelete={handleDeleteLayout}></Crawl>);
          break
        case 'marquee':
          setPatternControls(<Marquee numLeds={numLeds} key={currentPattern["id"]} workingIP={props.workingIP} currentPatternData={currentPattern} saveData={handlePatternUpdateData} onDelete={handleDeleteLayout}></Marquee>);
          break
        case 'scifi_computer':
          setPatternControls(<ScifiComputer numLeds={numLeds} key={currentPattern["id"]} workingIP={props.workingIP} currentPatternData={currentPattern} saveData={handlePatternUpdateData} onDelete={handleDeleteLayout}></ScifiComputer>);
          break
      }
    
  }, [currentPattern]);

  const [alignment, setAlignment] = React.useState('');

  const handlePatternChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static" >
        <Toolbar>
        
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Scene Setter
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem disabled={(props.workingIP === null) ? true : false} onClick={handleCloseEditStrip}>LED Strip Settings</MenuItem>
        <MenuItem disabled={(props.workingIP === null) ? true : false} onClick={handleCloseEditScene}>Edit Scene Layout</MenuItem>
        <MenuItem disabled={(props.workingIP === null) ? true : false} onClick={handleCloseCreateScene}>Create New Scene</MenuItem>
        <MenuItem disabled={(props.workingIP === null) ? true : false} onClick={handleCloseDeleteScene}>{del ?  "Enable Delete Mode" : "End Delete Mode"}</MenuItem>
        <MenuItem disabled>ver {props.version}</MenuItem>
      </Menu>
        <CreateScene workingIP={props.workingIP} handleOpen={createSceneDisplay} handleClose={() => {setCreateSceneDisplay(0);props.updateScenes()}}></CreateScene>
        </Toolbar>
      </AppBar>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', marginBottom: '10px' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Scenes
            </Typography>
          </Toolbar>
        </AppBar>
            <SceneSelect scenes={props.scenes} handleSceneSelect={handleLayoutsChange}></SceneSelect>
         <Box display="flex"
          justifyContent="center"
          alignItems="center">
            <ToggleButtonGroup
           orientation="horizontal"
           color="primary"
           value={alignment}
           exclusive
           onChange={handlePatternChange}
           >
         {layouts.map((layout, i) => {
           return (
            <ToggleButton key={layout['id']} value={layout} onClick={() => setCurrentPattern(layout)}>{layout['pattern']} ({layout['start']})</ToggleButton>
           )
         })
         }
        <SimpleDialog disabled={addPatternDisabled} setSelectedPattern={handleAddPattern}></SimpleDialog>
        </ToggleButtonGroup>
        </Box>
        {patternControls}
      </Dialog>
      <Dialog
        fullScreen
        open={settingsDialogOpen}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', marginBottom: '40px' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              LED Strip Settings
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSaveSettings}>
              save
            </Button>
          </Toolbar>
        </AppBar>
         <Box display="flex"
          justifyContent="center"
          alignItems="center">
           <TextField id="outlined-basic" label="Number of Leds" variant="outlined" value={numLeds} onChange={handleLedNumChange}/>
         </Box>
      </Dialog>
         </Box>
   
  );
}
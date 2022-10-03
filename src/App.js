import React, { useEffect, useState} from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import ButtonAppBar from './components/ButtonAppBar'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const [scenes, setScenes] = useState([]);
  const [deleteMode, setDeleteMode] = React.useState(0);
  const [sceneButtonColor, setSceneButtonColor] = React.useState("success");
  const [workingIP, setWorkingIP] = React.useState(null);
  const [foundSceneSetters, setFoundSceneSetters] = React.useState([]);
  const [searchingForSceneSetter, setSearchingForSceneSetter] = React.useState(<Box sx={{ width: '100%' }}><LinearProgress /></Box>);

  const versionNumber = (1.00).toFixed(2);

  useEffect(() => {
    findSceneSetterPi();
  }, []);

  const getScenes = () => {
    if (workingIP !== null){
      fetch(workingIP + "/scenes",{
        method: "GET",
        headers: {
            "Content-Type": "text/plain",
        },
      }).then(responce => responce.json())
      .then(data => setScenes(data))
      .catch(e => console.log(e))
    }
  };

  React.useEffect(() => {
    getScenes();
  },[workingIP]);

  const handleStart = (sceneid) => {
    if (!deleteMode){
      fetch(workingIP + "/start/" + sceneid,{
        method: "GET",
        headers: {
            "Content-Type": "text/plain",
        },
      })
      .catch(e => console.log(e))
    }
    else if (deleteMode){
      if (window.confirm("Are you sure you want to delete?")){
        const sceneDelete = {"id": sceneid}
        fetch(workingIP + "/scenes/delete",{
          method: "DELETE",
          headers: {
              "Content-Type": "text/plain",
          },
          body: JSON.stringify(sceneDelete)
        }).then(responce => responce.json())
        .then(data => {
          getScenes();
        })
        .catch(e => console.log(e))
      }
    }
    };

  const handleStop = () => {
    fetch(workingIP + "/stop",{
      method: "GET",
      headers: {
          "Content-Type": "text/plain",
      },
    })
    .then(setDeleteMode(0))
    .catch(e => console.log(e))
    }

    React.useEffect(() => {
      deleteMode ? setSceneButtonColor("error") : setSceneButtonColor("success");
    }, [deleteMode]);
    
    const findSceneSetterPi = () => {
     let ipCount = 1;
      for (let i = 1; i < 255; i++){
        fetch("http://192.168.1." + i + ":5001/",{
          method: "GET",
          headers: {
              "Content-Type": "text/plain",
          },
        }).then(responce => responce.json())
        .then(data => {
          ipCount += 1;
          if (ipCount >= 254){
            setSearchingForSceneSetter(null);
          }
          setFoundSceneSetters(prev => [...prev, {"name": data["name"], "ip": "http://192.168.1." + i + ":5001"}]);
        })
        .catch(e => {
          ipCount += 1;
          if (ipCount >= 254){
          setSearchingForSceneSetter(null);
        }}
        )
      }
      }
        const handleSceneSetterClick = (node) => {
          setDeleteMode(0);
          setWorkingIP(node["ip"].toString());
        }
    

  return (
    <div className="App" >
      <ThemeProvider theme={darkTheme}>
      <ButtonAppBar workingIP={workingIP} version={versionNumber} scenes={scenes} updateScenes={() => getScenes()} setDeleteMode={setDeleteMode}></ButtonAppBar>
      <header  className="App-header">
        <Stack spacing={2}>
          {scenes.map((scene, i) => {
            return (
              <Button key={scene['id']} onClick={() => handleStart(scene['id'])} variant="contained" color={sceneButtonColor}>{scene['name']} </Button>
            )
          }
          )}
        </Stack>
          <br/>
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="secondary" size="large" onClick={() => handleStop()} >STOP</Button>
        </Stack>
          <br/>
          <Typography>Select SceneSetter to control:</Typography>
          {searchingForSceneSetter}
        <Stack justifyContent="center" spacing={5} alignItems="left" align direction="row">
          {foundSceneSetters.map((node, i) => {
            return (
              <Button key={i} onClick={() => handleSceneSetterClick(node)}>{node['name']}</Button>
              )
            })}
        </Stack>
      </header>
      </ThemeProvider>
    </div>
  );
}

export default App;

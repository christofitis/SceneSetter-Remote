import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateScene(props) {
    const [nameInput, setNameInput] = React.useState("");


const handleUpdateName = (name) => {
    setNameInput(name);
}

    const handleCreateScene = () => {
      const newName = {"name": nameInput};
      fetch(props.workingIP + "/scenes/create",{
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
        },
        body: JSON.stringify(newName)
      }).then(responce => responce.json())
      .then(data => {
        console.log('Success: ', data);
        props.handleClose(0);
         
    
      })
      .catch(e => console.log(e))
      }

  return (
    <div>
      
      <Dialog open={props.handleOpen} >
        <DialogTitle>Create new scene</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Scene Name"
            type="text"
            fullWidth
            variant="standard"
            autoComplete={false}
            onChange={(e) => handleUpdateName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleClose(0)}>Cancel</Button>
          <Button onClick={() => handleCreateScene()}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
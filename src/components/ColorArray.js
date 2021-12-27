import Avatar from '@mui/material/Avatar';

export default function ColorArray(props){

    return (
        
            <Avatar onClick={() => props.handleClick()} className="pixel" sx={{ bgcolor: "rgb(" + props.red + "," + props.green + "," + props.blue + ")", height: 24, width: 24 }} > </Avatar>
        
    );
}
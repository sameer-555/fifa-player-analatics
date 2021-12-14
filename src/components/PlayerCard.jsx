import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PlayerCard({player,deletePlayer,updatePlayer}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const updatePlayerObject = {player_id:player.player_id}
  const handleUpadateChange = (e) => {
    if(e.target.type === 'number'){
      updatePlayerObject[e.target.id] = parseInt(e.target.value)
    }else{
      updatePlayerObject[e.target.id] = e.target.value
    }
  }

  return (
    <Card >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Team: {player.team}
        </Typography>
        <Typography variant="h5" component="div">
          {player.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Age: {player.age}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          ID: {player.player_id}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          From: {player.nationality}
        </Typography>
      </CardContent>
      <div style={{display: 'flex'}}>
        <CardActions>
          <Button size="small" onClick={handleOpen}>Learn More</Button>
        </CardActions>
        <CardActions >
          <Button size="small" onClick={(e) => setOpenDialog(true)}>Edit</Button>
        </CardActions>
      </div>
      <CardActions>
        <Button size="small" onClick={() => deletePlayer(player.player_id)}>Delete</Button>
      </CardActions>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Position: {player.position}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Hits: {player.hits}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Overall: {player.overall}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Potential: {player.potential}
          </Typography>
        </Box>
      </Modal>

      <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>
      <DialogTitle>{player.name} update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="age"
            label="Age"
            type="number"
            variant="standard"
            onChange={handleUpadateChange}
            defaultValue={player.age}
          />
            <TextField
            autoFocus
            margin="dense"
            id="hits"
            label="Hits"
            type="number"
            variant="standard"
            onChange={handleUpadateChange}
            defaultValue={player.hits}
          />
            <TextField
            autoFocus
            margin="dense"
            id="overall"
            label="Overall"
            type="text"
            variant="standard"
            onChange={handleUpadateChange}
            defaultValue={player.overall}
          />
          <TextField
            autoFocus
            margin="dense"
            id="position"
            label="Position"
            type="text"
            variant="standard"
            onChange={handleUpadateChange}
            defaultValue={player.position}
          />
          <TextField
            autoFocus
            margin="dense"
            id="potential"
            label="Potential"
            type="number"
            variant="standard"
            onChange={handleUpadateChange}
            defaultValue={player.potential}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenDialog(false)}>Cancel</Button>
          <Button onClick={()=>updatePlayer(updatePlayerObject)}>Update</Button>
        </DialogActions>
      </Dialog>


    </Card>
  );
}

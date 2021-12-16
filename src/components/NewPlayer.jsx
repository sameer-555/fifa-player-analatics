import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import CustomizedSnackbars from './Snackbar'

const defaultValues = {
    name: "",
    age: 0,
    nationality: "",
    position:"",
    team:"",
    overall:0,
    hits:0,
    potential:0
};

const PlayerForm = () => {
    const [formValues, setFormValues] = useState(defaultValues);
    const [customMessage,setCustomMessage] = useState({message:'',type:''})
    const history = useNavigate();
    const handleInputChange = (e) => {
      let { name, value } = e.target;
      if(['age','hits','overall','potential'].includes(name)){
          if(value !== ""){
            value = parseInt(value)
          }
      }
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
    //redirect function
    const redirectFunc = () => {
      history('/');
    };
    //creating user after submitting
    const handleSubmit = async(event) => {
      event.preventDefault();
      try{
        let body = formValues
        const create_player = await axios.post(`${process.env.REACT_APP_URL}/player`,body)
        customizedMessage(`Player ${create_player.data.player_id}(${create_player.data.name}) is created successfully.`,'success')
        //redirecting the user back to home page
        setTimeout(()=>{
          redirectFunc()
        },1500)
      }catch(err){
        customizedMessage(`Some error occured while creating new player ${err}`,'error')
      }
      

    };
    const customizedMessage = (message,type) =>{
      const updateMessage = Object.assign({},customMessage)
      updateMessage.message = message
      updateMessage.type = type
      setCustomMessage(updateMessage)
    }

    return (<form onSubmit={handleSubmit}>
        <Grid container alignItems="center" direction="column">
          <Grid item>
            <TextField
              required
              id="name-input"
              name="name"
              label="Name"
              type="text"
              value={formValues.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              required  
              id="nationality-input"
              name="nationality"
              label="Nationality"
              type="text"
              value={formValues.nationality}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="position-input"
              name="position"
              label="Position"
              type="text"
              value={formValues.position}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="team-input"
              name="team"
              label="Team"
              type="text"
              value={formValues.team}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="age-input"
              name="age"
              label="Age"
              type="number"
              value={formValues.age}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="overall-input"
              name="overall"
              label="Overall"
              type="number"
              value={formValues.overall}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="hits-input"
              name="hits"
              label="Hits"
              type="number"
              value={formValues.hits}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="potential-input"
              name="potential"
              label="Potential"
              type="number"
              value={formValues.potential}
              onChange={handleInputChange}
            />
          </Grid>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
        <CustomizedSnackbars message={customMessage.message} type={customMessage.type}/>
      </form>)
}

export default PlayerForm
import React, { useState,useEffect } from "react";
import PlayerCard from './PlayerCard'
import {appHistory} from '../utils/utils-history'
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CustomizedSnackbars from './Snackbar'


function Home({redirect=false}){
    const [players,setPlayers] = useState([])
    const [count,setCount] = useState(0)
    const [offset,setOffset] = useState(10)
    const [customMessage,setCustomMessage] = useState({message:'',type:''})
    const redirectFunc = () => {
        if (redirect) {
            appHistory.push(`/books/${redirect}`);
        }
    };

    useEffect(()=>{
        const getPlayers = async() =>{
            const players_data = await axios.get(`${process.env.REACT_APP_URL}/players?offset=${offset}`)
            setPlayers(players_data.data.data)
            setCount(parseInt(players_data.data.total_count/10))
        }
        getPlayers()
    },[offset])

    const deletePlayer = async(id) => {
        const deleted_player = await axios.delete(`${process.env.REACT_APP_URL}/player/${id}`)
        const update_players = players.filter((element)=> element.player_id !== id)
        setPlayers(update_players)
        console.log(deleted_player)
    }

    const handlePagination = (e,value) => {
        setOffset(value)
    }

    const updatePlayer = async(updated_object) => {
        console.log(updated_object)
        if(Object.keys(updated_object).length !== 1){
            for (let member in updated_object) {
                if (!updated_object[member]){
                    alert("Please make sure "+member+" is not empty")
                    return
                }
            }
            await axios.put(`${process.env.REACT_APP_URL}/player/${updated_object.player_id}`,updated_object)
            const object_index = players.findIndex(player=>player.player_id === updated_object.player_id)
            const update_obj = {...players[object_index]}
            for (let member in updated_object) {
                if(updated_object[member] !== update_obj[member]){
                    update_obj[member] = updated_object[member]
                }
            }
            const new_players_object = [...players]
            new_players_object[object_index] = update_obj
            setPlayers(new_players_object)
            customizedMessage("Updated Successfully","success")
        }else{
            customizedMessage("please make sure you are updating elements","error")
        }
    }

    const customizedMessage = (message,type) =>{
        const updateMessage = Object.assign({},customMessage)
        updateMessage.message = message
        updateMessage.type = type
        setCustomMessage(updateMessage)
    }

    return (
        <>
        <Stack spacing={2} style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {players.length > 0 ? players.map((player) => {
                return (
                <Grid item xs={2} sm={4} md={4} key={player.player_id} >
                    <PlayerCard player={player} key={player.player_id} deletePlayer={deletePlayer}  updatePlayer={updatePlayer} onClick={() => redirectFunc()}/>
                </Grid>
                )
            }):<p>No players found</p>}
            </Grid>
            <Pagination count={count} color="secondary" onChange={handlePagination} />
        </Stack>
        <CustomizedSnackbars message={customMessage.message} type={customMessage.type}/>
        </>
    )
}

export default Home
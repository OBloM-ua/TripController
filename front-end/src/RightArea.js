import React, {useEffect, useState} from 'react'
import './App.css'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import IconButton from '@material-ui/core/IconButton'
import {Snackbar} from '@material-ui/core'

const RightArea = (props) => {
    const [passengerList, setPassengerList] = useState([])

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [comment, setComment] = useState('')
    const [travelId, setTravelId] = useState(0)
    const [open, setOpen] = useState(false)

    function openSnackbar() {setOpen(!open)}


    function addPassenger(name, surname, phoneNumber, address, comment, travelId) {
        axios.post('/api/addPassenger', {
            name: name,
            surname: surname,
            phoneNumber: phoneNumber,
            address: address,
            comment: comment,
            travelId: travelId
        }).then(resp => {
            if (resp.status === 200) {
                getPassengerWithTravelId()
                openSnackbar()
            }
        })
    }

    function delPassengerWithId(id) {
        axios.get('/api/delPassengerWithId?id=' + id)
            .then(getPassengerWithTravelId)
    }

    function getPassengerWithTravelId() {
        axios.get('/api/getPassengerWithTravelId?id=' + props.selectedTravelId)
            .then(resp => setPassengerList(resp.data))
    }


    useEffect(() => {
            setTravelId(props.selectedTravelId)
            getPassengerWithTravelId()

        }, [props]
    )

    return <div className='RightArea'>
        <List>
            {passengerList.map((item, index) =>
                <ListItem key={index}>
                    <ListItemText
                        primary={item.name + ' ' +
                        item.surname + ' ' +
                        item.phoneNumber + ' ' +
                        item.address + ' ' +
                        item.address + ' ' +
                        item.comment}/>
                    <IconButton aria-label='Delete' onClick={() => delPassengerWithId(item.id)}>
                        <DeleteOutlinedIcon/>
                    </IconButton>
                </ListItem>)
            }
        </List>

        <div className='addNewPassenger'>
            <div>
                <TextField
                    id='standard-name'
                    label='Name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    margin='normal'
                />

                <TextField
                    id='standard-name'
                    label='Surname'
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
                    margin='normal'
                />

                <TextField
                    id='standard-name'
                    label='PhoneNumber'
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    margin='normal'
                />

            </div>
            <div>
                <TextField
                    id='standard-name'
                    label='Address'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    margin='normal'
                />


                <TextField
                    id='standard-name'
                    label='Comment'
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    margin='normal'
                />


                <TextField
                    disabled
                    required
                    id='standard-name'
                    label='TravelId'
                    value={travelId}
                    onChange={e => setTravelId(e.target.value)}
                    margin='normal'
                />
            </div>
        </div>

        <Button variant='contained' color='primary'
                onClick={() => addPassenger(name, surname, phoneNumber, address, comment, travelId)}>
            Save
        </Button>


        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            open={open}
            autoHideDuration={2000}
            onClose={openSnackbar}
            message={<span id="message-id">Success</span>}

        />

    </div>

}

export default RightArea

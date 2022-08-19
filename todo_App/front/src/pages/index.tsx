import React, {useState, useEffect} from "react";
import io from 'socket.io-client';
import axios from "axios";

import {useSelector} from "react-redux";
import Popup from 'reactjs-popup';

import Modal from "./Modal";
import moment from "moment";

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';

let socket;
const CONNECTION_PORT = "http://localhost:8080";

function Home(){
    const ui = useSelector((state: any) => state)

    const [isConnected, setIsConnected] = useState(false);


    const [responseData, setResponse] = useState("");
    const [todoData, setTodo] = useState([]);
    const [newtodoData, setNewTodo] = useState([]);
    const [newtodoDatax, setNewTodox] = useState([]);
    const [formValue, setformValue] = useState({name: '', deadline: new Date(Date.now())});
    const [isOpen, setIsOpen] = useState(false);
    const [valueDate, setValue] = React.useState<Date | null>(new Date());

    useEffect(() => {
        const handleGetData = async () => {
            const token = localStorage.getItem('token');


            await axios({
                method: 'GET',
                url: "http://localhost:8080/todo",
                headers: {"Content-Type": "multipart/form-data", 'Authorization': 'Bearer ' + token},
            }).then((response) => {

                if (response.data.status == 'error') {
                    localStorage.clear();
                    window.location.href = '/login';
                }
                setTodo(response.data);

            }).catch(error => {
                console.log(error);
            });
        }

        handleGetData();
    }, []);

    useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);

    useEffect(() => {
        const token = localStorage.getItem('token').split('.')[1].substring(0,50);
        socket.emit('join', token, newtodoData);
    }, [newtodoData]);

    useEffect(() => {

        socket.on("count", (data : any) => {

            if (data.length > 0){
                setTodo(todoData => [...todoData,data[0]])
                console.log([todoData]);

            }
        });


        socket.on('delete', (data:any) => {
            if (data.todos){
                console.log(data.todos.id);
                setTodo(todoData => todoData.filter(i => i.id !== data.todos.id));
                //setTodo(todoData => [todo]);
            }
        });

        socket.on('update', (data:any) => {
           if (data.message){
               const todo :any = data.data;
               setTodo(todoData =>
                   todoData.map(obj => {
                       // 👇️ if id equals 2, update country property
                       if (obj.id === todo.id) {
                           return {...obj, name: todo.name};
                       }

                       // 👇️ otherwise return object as is
                       return obj;
                   }));
           }
        });

    }, []);



    const handlePostData = async (e) => {

        const token = localStorage.getItem('token');
        e.preventDefault();


        const loginFormData = new FormData();
        loginFormData.append("name", formValue.name);
        loginFormData.append('deadline', valueDate.toString());

        try {
            await axios({
                method: "post",
                url: "http://localhost:8080/todo/add",
                data: loginFormData,
                headers: {"Content-Type": "multipart/form-data", 'Authorization': 'Bearer ' + token},
            }).then((response) => {


                if (response.data.message) {
                    setNewTodo([response.data.data]);
                    setformValue({name:'', deadline: new Date(Date.now())});
                } else {
                    console.log('test 2');
                }


            }).catch((error) => {
                console.log(error);
            });
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (event) => {

        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });

    }



    const handleDelete = async (item) => {
        const token = localStorage.getItem('token');

        await axios({
            method: "delete",
            url: "http://localhost:8080/todo/delete/"+item,
            headers: {"Content-Type": "multipart/form-data", 'Authorization': 'Bearer ' + token},
        }).then((response) => {

            if (response.data.todos){
                socket.emit('join', token.split('.')[1].substring(0,50), response.data);
            }

        })

    }


    const handleUpdate = async (id,name) => {
        const token = localStorage.getItem('token');
        const loginFormData = new FormData();
        loginFormData.append("name", name)

        await axios({
            method: "put",
            url: "http://localhost:8080/todo/update/"+id,
            data:loginFormData,
            headers: {"Content-Type": "multipart/form-data", 'Authorization': 'Bearer ' + token},
        }).then((response) => {

            if (response.data.message){
                socket.emit('join', token.split('.')[1].substring(0,50), response.data);
            }

        });


    }

    const dateString =  (value) => {
        moment.locale('tr');
        const val = moment(value).format('MMMM Do YYYY, HH:mm');
        return val;
    };

    return (
        <div className="container bg-white rounded-lg mt-5 py-3 px-4 todoPage">
            <div className='row'>

                {todoData.map((data: any) =>
                    <div className='col-md-4' key={data.id}>
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">{data.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted icons d-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>

                                    {dateString(data.deadline)}
                                </h6>
                                <div className='d-flex mt-3'>
                                    <a onClick={()=>handleDelete(data.id)} className="card-link btn btn-danger ">Delete</a>
                                    <Popup open={isOpen} trigger={<a href="#" className="card-link btn btn-primary">Edit</a>}
                                           modal
                                           nested>
                                        {close => (
                                            <Modal name={data.name} test={data.id} func={handleUpdate} close={close}></Modal>
                                        )}
                                    </Popup>
                                </div>
                            </div>
                        </div>
                    </div>

                )}

                <div className='col-md-12'>
                    <form onSubmit={handlePostData}>
                        <div className="d-flex mt-2">
                            <input required type="text" className="w-75" placeholder="name" name="name"
                                   onChange={handleChange} value={formValue.name}/>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDateTimePicker
                                    minDateTime={new Date()}
                                    value={valueDate}
                                    ampm={false}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <button className='btn btn-dark ml-2' type='submit'><svg xmlns="http://www.w3.org/2000/svg" width="35" className="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg></button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Home;

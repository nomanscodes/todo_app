/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { AiFillDelete } from "react-icons/ai"
import { TiTick } from "react-icons/ti"

const AddTodo = () => {

    const [data, setData] = useState({
        title: "",
        description: ""
    })

    const [sessioonData, setSessionData] = useState([])

    console.log("sessioonData", sessioonData);

    const { title, description } = sessioonData

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const submitHandeler = () => {
        sessionStorage.setItem("todo", JSON.stringify(data))
        console.log("okey");
        getData()
    }

    const getData = () => {
        const storeData = sessionStorage.getItem("todo")
        if (storeData) {
            setSessionData(JSON.parse(storeData))
        }
    }
    return (
        <div>
            <div className='inputWrapper'>
                <div className='labelWithInput'>
                    <label htmlFor="">Title</label>
                    <input name='title'
                        value={data.title} onChange={handleChange} type="text" placeholder='What`s the title of your TO Do?' />
                </div>
                <div className='labelWithInput'>
                    <label htmlFor="">Description</label>
                    <input name='description' onChange={handleChange} value={data.description} type="text" placeholder='What`s the description of your TO Do?' />
                </div>
                <button onClick={() => submitHandeler()} className='addButton'>Add</button>
            </div>
            <div className='hr'></div>
            <div className='dubbleButton'>
                <button>To Do</button>
                <span className='completedButton'>Completed</span>
            </div>
            {sessioonData && (
                <div>
                    <div className='todoView'>
                        <div className='viewContent'>
                            <span className='title'>{data.title}</span>
                            <span className='description'>{data.description}</span>
                        </div>
                        <div className='viewAction'>
                            <AiFillDelete className='delete' color='white' size={28} />
                            <TiTick className='tik' color='green' size={34} />
                        </div>
                    </div>
                </div>
            )}


        </div>


    )
}

export default AddTodo
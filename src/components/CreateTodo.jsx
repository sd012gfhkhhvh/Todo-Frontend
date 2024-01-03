/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import { notify } from "./Toasts";
import { BASE_URL } from "../helper";

export function CreateTodo(props) {
    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)

    /*
    useState hook to initialize your title and description states in the CreateTodo component, 
    and these states are only set based on the initial props when the component is mounted. 
    The subsequent changes in the props do not automatically update the state in your component.

    To address this issue, you can use the "useEffect" hook to update the state whenever the props change. 
    Here's an updated version of your CreateTodo component:
    */
    useEffect(() => {
        // Update state when props change
        setTitle(props.title);
        setDescription(props.description);
    }, [props.title, props.description]);

    const addBtnClick = async () => {
        const response = await fetch(`${BASE_URL}/todo`, {
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        const json = await response.json();
        //toast alert with message
        { response.ok ? notify.sucess(json.msg) : notify.error(json.msg) }
        setTitle("");
        setDescription("");
        // alert(json.msg)
    }

    const editBtnClick = async () => {
        const response = await fetch(`${BASE_URL}/edit`, {
            method: "PUT",
            body: JSON.stringify({
                id: props.id,
                title: title,
                description: description
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        const json = await response.json();
        //toast alert with message
        { response.ok ? notify.sucess(json.msg) : notify.error(json.msg) }
        setTitle("");
        setDescription("");
        // alert(json.msg)
    }

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    return (
        <div className="flex flex-wrap justify-center">
            <ToastContainer />
            <input
                className="mb-2 p-4 rounded-md w-full"
                type="text" placeholder="title"
                onChange={onTitleChange}
                value={title}>
            </input> <br />
            <input
                className="mb-2 p-4 rounded-md w-full"
                type="text" placeholder="description"
                onChange={onDescriptionChange}
                value={description}>
            </input>
            <div className="p-2 flex justify-center">
                <button
                    className="py-2 px-4 mr-2 bg-slate-800 text-white rounded"
                    onClick={addBtnClick}
                >
                    Add todo
                </button>
                <button
                    className="py-2 px-4 mr-2 bg-slate-800 text-white rounded"
                    onClick={editBtnClick}
                >
                    Update todo
                </button>
            </div>
        </div>
    )
}
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ToastContainer } from 'react-toastify';
import { notify } from "./Toasts";
import { BASE_URL } from "../helper";
// eslint-disable-next-line react/prop-types
export function Todos({ todos, editTodo }) {
    //mark todos as done
    const changeMarkedState = async (_id) => {
        console.log(_id);
        const response = await fetch(`${BASE_URL}/completed`, {
            method: "PUT",
            body: JSON.stringify({
                id: _id
            }),
            headers: { "content-type": "application/json" }
        })

        const json = await response.json();
        { response.ok ? notify.sucess(json.msg) : notify.warn(json.msg) }
        // alert(json.msg)
    }
    //delet todos
    const deletTodo = async (_id) => {
        console.log(_id);
        const response = await fetch(`${BASE_URL}/completed`, {
            method: "DELETE",
            body: JSON.stringify({
                id: _id
            }),
            headers: { "content-type": "application/json" }
        })

        const json = await response.json();
        { response.ok ? notify.error(json.msg) : notify.warn(json.msg) }
        // alert(json.msg)
    }

    return (
        <div className="flex flex-wrap justify-center">
            <ToastContainer />
            {todos.map((todo) => {
                // eslint-disable-next-line react/jsx-key
                return <div className="bg-white m-2 p-4 w-80 rounded-md">
                    <h2 className="text-2xl uppercase text-slate-800 pb-2">📌{todo.title}</h2>
                    <h3 className="text-slate-600 pb-2">📝{todo.description}</h3>
                    <button
                        className="bg-slate-500 text-white rounded p-2 mr-2 text-xs"
                        onClick={() => { changeMarkedState(todo._id) }}>{todo.marked ? "completed" : "Mark as Done"}
                    </button>
                    <button
                        className="bg-slate-500 text-white rounded p-2 mr-2 text-xs"
                        onClick={() => { deletTodo(todo._id) }}>Delete
                    </button>
                    <button
                        className="bg-slate-500 text-white rounded p-2 mr-2 text-xs"
                        onClick={() => editTodo(todo._id, todo.title, todo.description)}>
                        Edit
                    </button>
                </div>
            })}
        </div>
    )
}

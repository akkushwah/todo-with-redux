import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, updateTodo, changeStatus } from './Utils/TodoSlice';
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { FaXmark } from 'react-icons/fa6';

{/* <FaCircleChevronDown /> */ }


function Home() {
  const Data = useSelector(store => store.Todo.todos);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [status, setStatus] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);




  const handleAdd = () => {
    const date = new Date().toDateString();
    if (editId !== null) {
      const EditObj = {
        id: editId,
        title, detail, status,
        date
      }
      dispatch(updateTodo(EditObj));
      setEditId(null)
    }
    else if (title !== "" && detail !== "") {
      const AddObj = {
        id: Date.now(),
        title, detail, status, date
      }
      dispatch(addTodo(AddObj));
    }
    else {
      alert("You are not adding anything, please add some task")
    }
    setDetail('');
    setTitle('')
  }

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setTitle(todo.title);
    setDetail(todo.detail);
  }

  const handleStatus = (val) => {
    // console.log("Before", val.status)
    const obj = {
      id: val.id,
      status: val.status ? false : true
    }
    dispatch(changeStatus(obj));
    // console.log(obj.status)
  }

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }


  const filterTodo = Data.filter((items) => {
    return items.title.toLowerCase().includes(search.toLowerCase()) || items.detail.toLowerCase().includes(search.toLowerCase());
  })

  return (
    <div className='text-center my-10'>
      <h1 className='text-2xl'>Todo app</h1>
      <p>
        <input type="text"
          className='border p-2 my-5 mx-3'
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          value={title} />

        <input type="text"
          className='border p-2 my-5 mx-3'
          onChange={(e) => {
            setDetail(e.target.value)
          }}
          value={detail} />
      </p>
      <p>
        <input type="text"
          placeholder='Search...'
          className='border p-2 bg-slate-200 translate-x-60'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      </p>
      <button
        className='border py-2 px-4 bg-gray-300'
        onClick={handleAdd}>{editId ? "Update" : "Add"}</button>
      <hr className='my-5' />

      <div className='border border-red-900 h-full w-full grid lg:grid-cols-2 sm:grid-cols-1'>
        {filterTodo.map((val, id) => {
          return (
            <div className='border border-gray rounded m-5'>
              <div className='cursor-pointer  pt-5 pb-2 px-5 flex justify-between'>
                <p className='text-3xl font-semibold'>{val.title}</p>
                <div className='mr-5 border border-red-800 flex gap-5'>
                  <FaTrash onClick={() => {
                    handleDelete(val.id)
                  }}
                    className='border text-blue-600 text-3xl' />
                  <FaEdit onClick={() => {
                    handleEdit(val)
                  }}
                    className='border  text-3xl text-blue-600 ' />

                  <div className='border text-3xl   rounded-lg' onClick={() => {
                    handleStatus(val)
                  }}>{val.status ? <FaCheck /> : <FaXmark />
                    }</div>
                </div>
              </div>

              <div className='px-5 py-2 text-left'>
                <p className='text-xl'>{val.detail}</p>
                <p className='text-gray-600 text-sm mt-2'>{val.date}</p>
              </div>

            </div>)

        })
        }
      </div>
      <hr />

    </div >
  )
}

export default Home

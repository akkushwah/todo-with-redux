import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, updateTodo, changeStatus } from './Utils/TodoSlice';
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { FaXmark } from 'react-icons/fa6';
import background from './images/ImageOne.avif';


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
    <div className='bg-cover bg-no-repeat bg-center h-screen w-screen flex items-center flex-col p-10 overflow-x-hidden'
      style={{ backgroundImage: `url(${background})` }}>
      <h1 className='text-6xl font-semibold text-amber-950 my-2'>Todo app</h1>
      <div className='text-center   max-h-fit'>
        <p className='py-6 w-full flex gap-5 items-center max-w-2xl mx-auto '>
          <input type="text"
            className='border px-5 py-2.5 w-[86%] rounded-xl outline-none focus:border-yellow-900 bg-transparent border-yellow-950 text-yellow-950 placeholder:text-amber-950'
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            value={title} />
          <input type="text"
            className='border px-5 py-2.5 w-[86%] rounded-xl outline-none focus:border-yellow-900 bg-transparent border-yellow-950 text-yellow-950 placeholder:text-amber-950'
            onChange={(e) => {
              setDetail(e.target.value)
            }}
            value={detail} />
          <button
            className='py-[11px] px-5 bg-yellow-950 text-white rounded-full'
            onClick={handleAdd}>{editId ? "Update" : "Add"}</button>
        </p>
        <p>
          <input type="text"
            placeholder='Search...'
            className='border border-amber-950 p-1 bg-transparent rounded text-amber-950 outline-none placeholder:text-amber-950'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        </p>
      </div>
      <hr />

      <div className='h-full w-full grid lg:grid-cols-2 sm:grid-cols-1 mt-6 mb-5 gap-10 text-center justify-items-center'>
        {filterTodo.map((val, id) => {
          return (
            <div className='border-[.1px] border-amber-900 flex flex-col rounded-2xl items-baseline h-fit w-[34rem] shadow-xl bg-opacity-20 backdrop-filter backdrop-blur-md'>
              <div className='cursor-pointer pt-5 pb-2 px-5 flex justify-between items-center w-full'>
                <p className='text-3xl font-semibold text-amber-950'>{val.title}</p>
                <div className='mr-5 flex gap-5'>
                  <div className=' text-amber-950 text-2xl rounded-lg' onClick={() => {
                    handleStatus(val)
                  }}>{val.status ? <FaCheck /> : <FaXmark />
                    }</div>
                  <FaTrash onClick={() => {
                    handleDelete(val.id)
                  }}
                    className=' text-amber-950 text-2xl' />
                  <FaEdit onClick={() => {
                    handleEdit(val)
                  }}
                    className='  text-2xl text-amber-950 ' />

                </div>
              </div>

              <div className='px-5 py-2 text-left'>
                <p className='text-lg text-[#4d2e0e]'>{val.detail}</p>
                <p className='text-[#633b11] text-sm mt-2 italic'>{val.date}</p>
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

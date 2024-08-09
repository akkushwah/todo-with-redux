import React, { useState } from 'react'
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import background from './images/ImageOne.avif';
import { addTodo } from './Utils/TodoSlice';
import { useDispatch, useSelector } from 'react-redux';

function Todo() {
  const [newtasks, setNewTasks] = useState({})
  const [title, setTitle] = useState('');


  const dispatch = useDispatch();
  const data = useSelector(store => store.Todo);

  function handleInputChange(e) {
    setTitle(e.target.value)
  }
  function handleAdd() {
    const addTask = {
      "title": title,
      "body": "Example data"
    }
    dispatch(addTodo(addTask))
  }

  return (
    <div className="bg-cover bg-no-repeat bg-center h-screen w-screen flex items-center flex-col gap-10 p-10"
      style={{ backgroundImage: `url(${background})` }}>
      <h1 className='text-6xl font-semibold text-amber-950'>Todo Desk</h1>
      <div className='p-5 w-full h-full flex gap-5 flex-col items-center' >
        <p className='mx-auto w-[80%]'>
          <input type="text"
            className='border px-5 py-2.5 w-[86%] rounded-l-full outline-none focus:border-yellow-900 bg-transparent border-yellow-950 text-yellow-950 placeholder:text-amber-950'
            value={title}
            placeholder='Enter your task..'
            onChange={handleInputChange} />
          <button
            className='py-[11px] px-5 bg-yellow-950 text-white rounded-r-full'
            onClick={handleAdd}>
            Add</button>
        </p>

        <ul className='w-full'>
          {
            data && data.map((val, i) => {
              return (
                <li
                  key={i}
                  className='my-2 px-5 py-2 justify-between w-[100%] border border-amber-900 flex rounded-3xl items-center bg-amber-900 realtive transition-all ease-in group flex-col'
                  data-collapse-target="collapseone">
                  <div className='flex justify-between w-full '>
                    <h2 className='text-lg font-medium'>{val.title}</h2>
                    <span className='flex g-5 space-x-4 text-2xl'>
                      <FaTrashAlt className='cursor-pointer ' />
                      <FaEdit className='cursor-pointer ' />
                    </span>
                  </div>
                </li>)
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Todo


{/* {
            toggleSubmit ? (<button
              className='py-[11px] px-5 bg-yellow-950 text-white rounded-r-full'
              onClick={handleAdd}
            >
              Add</button>)
              : (<button
                className='p-2 px-3 bg-yellow-800 text-white rounded'
              >
                Edit</button>)
          } */}



{/* <div className='border-t border-amber-950 text-center transition-all duration-300 ease-in-out py-2'
              data-collapse="collapseone"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias obcaecati, iusto voluptatum nisi commodi necessitatibus? Ullam asperiores modi blanditiis neque!</div> */}
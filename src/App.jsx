import React from 'react'
import { useState } from 'react'

function App() {

  const[title,setTitle] = useState('');
  const[descr,setDescriptn] =useState('')

  const[task,setTask] = useState([]);

  function submitHandler(e){
    e.preventDefault();
    const copyTask = [...task];
    copyTask.push({title,descr});
    console.log(task);
    console.log(title);
    console.log(descr);
    setTitle('');
    setDescriptn('');
    setTask(copyTask);
  }

    return (
      <>
      <div className='h-screen lg:flex bg-black text-white'>

        <form onSubmit={(e)=>{
          submitHandler(e)
        }} className='flex gap-4 lg:w-5/12 p-10 flex-col items-start'>

        <h1 className='text-4xl mb-2 font-bold'>Add Notes</h1>

        {/* heading input */}

        <input 
          type="text"
          placeholder='Enter Title' 
          className='px-5 w-full font-medium py-2 border-2 outline-none rounded' 
          value={title} 
          onChange={(e)=>{
            setTitle(e.target.value)
          }} 
        />

        {/* description input */}

        <textarea 
          type="text"
          placeholder='Add Description' 
          className='px-5 w-full font-medium h-32 py-2 flex items-start flex-row border-2 outline-none rounded' 
          value={descr} 
          onChange={(e)=>{
            setDescriptn(e.target.value)
          }}  
        /> 

        {/* Submit button */}

        <button 
          className='bg-white actice:scale-95 font-medium w-full outline-none text-black px-5 py-2 rounded' 
          onClick={(e)=>{
            submitHandler(e)
          }
          }>Add Note
        </button>

        </form>

      {/* Recent Notes */}
      
        <div className='lg:w-8/12 lg:border-l-2 p-10'>
          <h1 className='text-4xl font-bold'>Recent Notes</h1>
          <div className='flex flex-wrap items-start justify-start gap-5 mt-6 h-[90%] overflow-auto'>
            {task.map((elem, index)=>{
          
              return(
              <div 
                key={index} 
                className='flex flex-col items-start relative h-40 w-37 bg-cover rounded-xl text-black pt-4 pb-4 px-4 bg-mauve-700'>
                <h3 className='leading-tight text-xl font-bold text-amber-200'>{elem.title}</h3>
                <p className='mt-5 leading-tight text-s font-semibold text-gray-300'>{elem.descr}</p>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
    )
}

export default App

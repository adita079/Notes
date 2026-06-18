import React from 'react'
import { useState, useEffect } from 'react'
import "./App.css"
import notepad from "./assets/notp.jpeg"
import cats from "./assets/titleCat.jpg"
import peek from "./assets/peek.png"

function App() {

  const [title, setTitle] = useState('');
  const [descr, setDescriptn] = useState('');
  const [error, setError] = useState('');

  const [task, setTask] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(task));
  }, [task]);

  function submitHandler() {
    const copyTask = [...task];

    copyTask.push({
      title: title.trim(),
      descr: descr.trim()
    });

    setTitle('');
    setDescriptn('');
    setTask(copyTask);
    setError('');
  }

  return (
    <>
      <div className='h-screen lg:flex bg-black text-white'>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (title.trim() === '' && descr.trim() === '')
              setError("Please add valid title and description.");

            else if (title.trim() === '')
              setError("Please add valid title.");

            else if (descr.trim() === '')
              setError("Please add valid description.");

            else
              submitHandler();
          }}
          className='flex gap-4 lg:w-7/12 p-10 flex-col items-start'
        >

          <h1 className='flex flex-wrap text-4xl mb-2 font-bold'>
            <img className='mr-4 w-11 h-11' src={cats} alt="" />
            Add Notes
          </h1>

          {/* Title Input */}

          <input
            type="text"
            placeholder='Enter Title'
            className='px-5 w-full font-medium py-2 border-2 outline-none rounded'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
          />

          {/* Description Input */}

          <textarea
            placeholder='Add Description'
            className='px-5 w-full font-medium h-32 py-2 border-2 outline-none rounded'
            value={descr}
            onChange={(e) => {
              setDescriptn(e.target.value);
              setError('');
            }}
          />

          {/* Error Message */}

          {error && (
            <p className='text-red-600 font-medium'>
              {error}
            </p>
          )}

          {/* Submit Button */}

          <button
            className='bg-white active:scale-95 hover:opacity-35 font-medium w-full outline-none text-black px-5 py-2 rounded'
          >
            Add Note
          </button>

        </form>

        {/* Recent Notes */}

        <div
          className='lg:w-8/12 lg:border-l-2 p-10'
          style={{ backgroundColor: "#C6C6C6" }}
        >
         <h1 className='text-4xl font-bold text-black'>
            Recent Notes ({task.length})
          </h1>

          <div className='flex flex-wrap items-start justify-between gap-6 mt-4 h-[90%] overflow-y-auto hide-scrollbar'>

            {task.length === 0

              ? (
                <h1 className='flex flex-wrap items-center gap-5 text-black font-semibold text-xl mt-30'>
                  No notes yet, Add your first note!
                  <img
                    src={peek}
                    className='h-16 w-16'
                    alt="Cat peeking"
                  />
                </h1>
              )

              : task.map((elem, index) => {

                return (
                  <div
                    key={index}
                    className='flex flex-col relative h-50 w-64 bg-contain bg-no-repeat bg-center text-black pt-3 pb-2 px-4 hover:translate-y-0.5 rounded-2xl'
                    style={{ backgroundImage: `url(${notepad})` }}
                  >

                    <h3 className='leading-tight ml-2 mt-6 text-xl font-bold text-black'>
                      {elem.title}
                    </h3>

                    <p className='leading-tight ml-2 mt-2 text-sm font-semibold text-black'>
                      {elem.descr}
                    </p>

                    <button
                      className='absolute bottom-4 right-4 cursor-pointer rounded-xl hover:opacity-60 h-6 w-6 bg-red-500'
                      onClick={() => {
                        if (confirm("Are you sure you want to delete the note?")) {
                          setTask(task.filter((_, i) => i !== index));
                        }
                      }}
                    >
                    </button>

                  </div>
                );
              })
            }

          </div>
        </div>

      </div>
    </>
  )
}

export default App
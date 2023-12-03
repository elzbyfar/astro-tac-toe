export default function StartButton({setStart}: {setStart: Function}) {
  return (
    <div className="group flex box-border justify-center">
        <button onClick={() => setStart()} className="relative flex items-center tracking-wider text-base h-full z-10 transition duration-300 ease-in-out rounded-md focus:ring-2 focus:outline-none focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-white">
          <span className="relative text-blue-900 font-extralight tracking-widest border-b-2 border-transparent ease-in-out duration-300 group-hover:text-blue-400 group-hover:tracking-wide group-hover:font-bold group-hover:z-10">
            START
            <div className="bg-blue-400 h-1 w-0 group-hover:w-full ease-in-out duration-700">
            </div>
          </span>
        </button>
      </div>
  )
}
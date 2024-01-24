import { FiPlus } from "react-icons/fi"
export default function Story({username, img ,isUser}) {
  return (
    <div className="relative group cursor-pointer">
      <img src={img} alt='' className="h-14 rounded-full p-[1.5px] border-2 border-red-500 group-hover:scale-110 transition-transform duration-200 ease-out"/>
      {isUser && <FiPlus className="h-6 w-6  absolute top-4 left-4 text-white"/>}
      <p className="text-xs w-14 truncate ">{username}</p>
    </div>
  )
}

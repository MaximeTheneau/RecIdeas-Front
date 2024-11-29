import { PiCookingPotBold } from 'react-icons/pi';

export default function Spinner() {
  return (
    <div className=" flex justify-center items-center h-28">
      {/* Bulles */}
      <div className=" absolute w-28 h-28  border-solid border-8 border-blackOpacity rounded-full border-t-white animate-spin transition-transform duration-1000 ease-in-out" />
      <div className="relative h-10">
        <div className="absolute -top-2 left-5 w-0.5 h-1 bg-black rounded-full animate-bounce z-10 duration-500" />
        <div className="absolute -top-3 left-6 w-0.5 h-1 bg-black rounded-full animate-bounce z-10 duration-500" />
        <div className="absolute -top-1 left-3 w-0.5 h-1 bg-black rounded-full animate-bounce z-10 duration-500" />
        <div className="absolute -top-2 left-2 w-0.5 h-1 bg-black rounded-full animate-bounce z-10 duration-500" />
        <div className="absolute -top-4 left-3 w-0.5 h-2 bg-black rounded-full animate-bounce delay-200 z-10 duration-200" />
        <div className="absolute -top-3 left-4 w-0.5 h-2 bg-black rounded-full animate-bounce delay-400 z-10" />
      </div>

      {/* Icône de cuisine */}
      <PiCookingPotBold size={30} />

    </div>
  );
}

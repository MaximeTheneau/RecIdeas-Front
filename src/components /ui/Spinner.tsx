export default function Spinner() {
  return (
    <div className="flex justify-center ">
      <div className="dot bg-gray-900 rounded-full w-2 h-2 animate-bounce" />
      <div className="dot bg-gray-900 rounded-full w-2 h-2 animate-bounce delay-200" />
      <div className="dot bg-gray-900 rounded-full w-2 h-2 animate-bounce delay-400" />
    </div>
  );
}

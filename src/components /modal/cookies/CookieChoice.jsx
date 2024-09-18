import { FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

export default function CookieChoice({ label, checked, onClick }) {
  return (
    <tr className="cursor-pointer flex justify-around my-4 w-full">
      <td>
        <button onClick={onClick} type="button" className="inline">
          {label}
          {checked
            ? <FaCheck /> : <FaXmark />}
        </button>
      </td>
    </tr>
  );
}

import { FaEdit } from 'react-icons/fa';
const EditButton = ({ item, onEdit, className = "" }) => (
  <button 
    onClick={() => onEdit(item)}
    className={`text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors ${className}`}
    aria-label="Edit"
  >
    <FaEdit className="w-4 h-4" />
  </button>
);

export default EditButton;
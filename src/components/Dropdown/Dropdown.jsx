import { useContext } from 'react';
import './Dropdown.css';
import { Trash, Forward } from 'lucide-react';
import { DataContext } from '../../context/DataContext';

function Dropdown({ index, setDropdown, setShare }) {
  const { data, setData } = useContext(DataContext);

  function deleteHandler(index) {
    const updatedItems = data.filter((_, i) => i !== index);
    setData(updatedItems);
    setDropdown(null);
  }

  return (
    <div className="dropdown_container">
      <button id="delete_btn" onClick={() => deleteHandler(index)}>
        Delete item <Trash width={20} />
      </button>
      <button
        onClick={() => 
          setShare(true)
        }
      >
        Share <Forward width={20} />
      </button>
    </div>
  );
}

export default Dropdown;

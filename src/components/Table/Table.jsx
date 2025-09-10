import './Table.css';
import { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { EllipsisVertical } from 'lucide-react';
import useWindowWidth from '../../hook/useWindowWidth.jsx';
import Dropdown from '../Dropdown/Dropdown.jsx';
import Share from '../Share/Share.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { animation } from '../../../animations.js';

function Table() {
  const { data, loading } = useContext(DataContext);
  const windowWidth = useWindowWidth();
  
  const [dropdown, setDropdown] = useState(null);
  const [share, setShare] = useState(false);

  if (loading) {
    return <span className="loader"></span>;
  }

  const shortenText = (text) => {
    const split = text.split('');

    if (split.length >= 30) {
      return text.slice(0, 30) + '...';
    }

    return text;
  };

  return (
    <div className="table_wrapper">
      <div className="table_row header">
        <div>
          <h1> Product {`(${data.length})`}</h1>
        </div>
        <div>
          <h1>Category</h1>
        </div>
        <div>
          <h1>Price</h1>
        </div>
        <div></div>
      </div>

      {data.length ? (
        data.map((item, index) => (
          <>
            <motion.div
              variants={animation}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="table_row item"
              key={item._id}
            >
              <div className="item_grid">
                <img src={item.image_url} alt={item.name} />
                <div>
                  <h1>{item.name}</h1>

                  {windowWidth < 420 ? null : windowWidth < 660 ? (
                    <p>{shortenText(item.description)}</p>
                  ) : (
                    <p>{item.description}</p>
                  )}
                </div>
              </div>
              <p id="category">{item.category}</p>
              <p id="price">${item.price}</p>
              <EllipsisVertical
                width={20}
                id="dotted_icon"
                onClick={() => setDropdown(dropdown === index ? null : index)}
              />
              {!share && dropdown === index && (
                <Dropdown
                  index={dropdown}
                  setDropdown={setDropdown}
                  setShare={setShare}
                />
              )}
            </motion.div>
            <AnimatePresence mode="wait">
              {share && dropdown === index && (
                <Share
                  item={item}
                  setShare={setShare}
                  setDropdown={setDropdown}
                />
              )}
            </AnimatePresence>
          </>
        ))
      ) : (
        <div className="no_items_container">
          <h1>No items found</h1>
        </div>
      )}
    </div>
  );
}

export default Table;

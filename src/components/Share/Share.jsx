import './Share.css';
import { X } from 'lucide-react';
import { Facebook, Instagram, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { animation } from '../../../animations';

function Share({ item, setShare, setDropdown }) {
  return (
    <div className="overlay">
      <motion.div
        variants={animation}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="modal_wrapper"
      >
        <X
          onClick={() => {
            setShare(false);
            setDropdown(false);
          }}
          id="close_btn"
          width={20}
        />
        <div className="modal">
          <div className="modal_left_col">
            <img src={item.image_url} alt={item.name} />
          </div>
          <div className="modal_right_col">
            <span>
              <h1>{item.name}</h1>
              <p>{item.description}</p>
              <h1>${item.price}</h1>
            </span>
            <div className="btn_section">
              <button>
                Share <Facebook strokeWidth={1.25} width={20} />
              </button>
              <button>
                Share <Instagram strokeWidth={1.25} width={20} />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(item.url)
                    .then(() => {
                      toast.success('Successfully copied the link!');
                    })
                    .catch(() => {
                      toast.error('Failed to copy the link!');
                    });
                }}
              >
                Copy link <Copy strokeWidth={1.25} width={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Share;

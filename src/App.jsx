import './App.css';
import Table from './components/Table/Table.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="wrapper">
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      <Table></Table>
    </div>
  );
}

export default App;

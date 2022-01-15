import {Routes,Route} from 'react-router-dom'
import Home from './component/pages/Home'
import Edit from './component/pages/Edit';

function App() {
  return (
    <>
    <h2>Todo App</h2>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit/:id/" element={<Edit />} />
    </Routes>
    </>
  );
}

export default App;

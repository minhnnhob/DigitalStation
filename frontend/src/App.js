import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <div className='pages'>
          
          <Routes>
            {/* <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/events' element={<Events />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<NotFound />} /> */}

          </Routes>
        </div>


     </BrowserRouter>
    </div>
  );
}

export default App;

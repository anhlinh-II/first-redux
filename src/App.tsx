import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { RootState } from './redux/store'
import { increment, decrement } from './redux/counter/counter.slide';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { Button } from 'react-bootstrap';

function App() {

  const count = useAppSelector(state => state.counter)
  const dispatch = useAppDispatch();
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <h1>my current count = {count.value}</h1>
        <div>
          <button className='btn btn-primary' onClick={() => dispatch(increment())}>Increase + 1</button>
        </div>
        <div>
          <Button variant='warning' onClick={() => dispatch(decrement())}>Decrease - 1</Button>
        </div>
      </div>
    </>
  )
}

export default App


import './App.css'
import Sudoku from './logic/Create'
import {RecoilRoot} from 'recoil'
import Solve from './logic/Solve'
function App() {
  return (
    <div>
      <RecoilRoot>
        <div style={{display:'grid',placeItems:'center'}}>        
          <Sudoku />
          <Solve />
        </div>
      </RecoilRoot>
    </div>
  )
}

export default App

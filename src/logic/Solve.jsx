import { Matrix, Puzzle, ToSolve } from '../store/atoms/matrices';
import {useRecoilState, useRecoilValue} from 'recoil'

const Solve = () => {
  const matrix = useRecoilValue(Matrix)
  const puzzle = useRecoilValue(Puzzle);
  const [toSolve, setToSolve] = useRecoilState(ToSolve);

  const printMatrix2 = (x) => {
    return (
      <div>
        <hr />
        {x.map((row, i) => (
          <div key={i} className="row">
            {row.map((col, j) => (
              <span key={j} className="cell">
                {col}
              </span>
            ))}
          </div>
        ))}
        <hr />
      </div>
    );
  };

  const printMatrix = (x) => (
        <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', margin: 'auto' }}>
            <tbody>
                {x.map((row, i) => (
                    <tr key={i}>
                        {row.map((val, j) => (
                            <td key={j} style={{ textAlign: 'center', width: '30px', height: '30px' }}>
                                {val === 0 ? ' ' : val}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );


  const isSafe = (grid, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num || grid[x][col] === num) {
        return false;
      }
    }

    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }

    return true;
  };

  const solveSudoku = (grid) => {
    const findEmptyCell = () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === 0) {
            return { row, col };
          }
        }
      }
      return null;
    };

    const emptyCell = findEmptyCell();
    if (!emptyCell) {
      return true;
    }

    const { row, col } = emptyCell;

    for (let num = 1; num <= 9; num++) {
      if (isSafe(grid, row, col, num)) {
        grid[row][col] = num;

        if (solveSudoku(grid)) {
          return true;
        }

        grid[row][col] = 0;
      }
    }

    return false;
  };

  const startSolving = () => {
    const newToSolve = JSON.parse(JSON.stringify(puzzle));
    solveSudoku(newToSolve);
    setToSolve(newToSolve);
  };

  const isSame = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (toSolve[i][j] !== matrix[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <div className="App">
      <button onClick={startSolving}>Solve Sudoku</button>
      <div className="solution">
        <h2>Solution</h2>
        {printMatrix(toSolve)}
      </div>
      <div className="result">
        {isSame() ? <p>Both are Same</p> : <p>Different answers !!</p>}
      </div>
    </div>
  );
};

export default Solve;

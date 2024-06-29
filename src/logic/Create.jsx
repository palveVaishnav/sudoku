import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Count, Matrix, Puzzle } from '../store/atoms/matrices';

export default function Sudoku() {
    const [matrix, setMatrix] = useRecoilState(Matrix);
    const [puzzle, setPuzzle] = useRecoilState(Puzzle);
    const setCount = useSetRecoilState(Count)
    const getRandom = () => {
        let x;
        do {
            x = Math.floor(Math.random() * 10);
        } while (x === 0);
        return x;
    };

    const rowExist = (row, col, mat) => {
        for (let i = 0; i < 9; i++) {
            if (mat[row][i] === mat[row][col] && i !== col) {
                return true;
            }
        }
        return false;
    };

    const colExist = (row, col, mat) => {
        for (let i = 0; i < 9; i++) {
            if (mat[i][col] === mat[row][col] && i !== row) {
                return true;
            }
        }
        return false;
    };

    const boxCheck = (row, col, mat) => {
        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (mat[i + startRow][j + startCol] === mat[row][col] &&
                    (row !== i + startRow && col !== j + startCol)) {
                    return true;
                }
            }
        }
        return false;
    };

    const enterNumber = (row, col, mat) => {
        let x = getRandom();
        let attempts = 0;
        do {
            mat[row][col] = x;
            setCount(prevCount => prevCount + 1);
            x = (x % 9) + 1;
            attempts++;
            if (attempts > 9) {
                return false;
            }
        } while (rowExist(row, col, mat) || colExist(row, col, mat) || boxCheck(row, col, mat));
        return true;
    };

    const startAgain = () => {
        let newMatrix = Array(9).fill(0).map(() => Array(9).fill(0));
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (!enterNumber(i, j, newMatrix)) {
                    startAgain();
                    return;
                }
            }
        }
        setMatrix(newMatrix);
    };

    const makePuzzle = (level) => {
        let newPuzzle = JSON.parse(JSON.stringify(matrix));
        for (let k = 0; k < level; k++) {
            let i = 0;
            do {
                const j = getRandom() - 1;
                if (newPuzzle[i][j] !== 0) {
                    newPuzzle[i][j] = 0;
                    i++;
                }
            } while (i < 9);
        }
        setPuzzle(newPuzzle);
    };

    // const copyPuzzle = () => {
    //     let valid = true;
    //     setPuzzle(matrix.map((row, i) =>
    //         row.map((val, j) => {
    //             if (rowExist(i, j, matrix) || colExist(i, j, matrix) || boxCheck(i, j, matrix)) {
    //                 valid = false;
    //             }
    //             return val;
    //         })
    //     ));
    //     return valid;
    // };

    useEffect(() => {
        startAgain();
    }, []);

    // const printMatrix = (x) => (
    //     <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', margin: 'auto' }}>
    //         <tbody>
    //             {x.map((row, i) => (
    //                 <tr key={i}>
    //                     {row.map((val, j) => (
    //                         <td key={j} style={{ textAlign: 'center', width: '30px', height: '30px' }}>
    //                             {val}
    //                         </td>
    //                     ))}
    //                 </tr>
    //             ))}
    //         </tbody>
    //     </table>
    // );

    const printPuzzle = () => (
        <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', margin: 'auto' }}>
            <tbody>
                {puzzle.map((row, i) => (
                    <tr key={i}>
                        {row.map((val, j) => (
                            // <td key={j} style={{ textAlign: 'center', width: '30px', height: '30px' }}>
                            //     {val === 0 ? ' ' : val}
                            // </td>
                            <td key={j} style={{ textAlign: 'center', width: '30px', height: '30px' }}>
                                {val === 0 ? (
                                    <input
                                        type="number"
                                        min="1"
                                        max="9"
                                        // value={puzzle[i][j]}
                                        onChange={(e) => {
                                            if(e.target.value < 9){
                                                const newPuzzle = puzzle.map((r, rowIndex) =>
                                                    r.map((cell, colIndex) =>
                                                        rowIndex === i && colIndex === j ? Number(e.target.value) : cell
                                                    )
                                                );
                                                setPuzzle(newPuzzle);
                                            }
                                        }}
                                        style={{ width: '100%', height: '100%', textAlign: 'center' }}
                                    />
                                ) : (
                                    val
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
    const handleLevelChange = (e) => {
        const level = parseInt(e.target.value, 10);
        makePuzzle(level);
    };

    return (
        <div style={{ display: 'grid', placeItems: 'center' }}>
            <h1>Sudoku Generator</h1>
            <div>
                <label>
                    Level:
                    <input type="number" onChange={handleLevelChange} />
                </label>
            </div>
            <div>
                <h2>Puzzle</h2>
                {printPuzzle()}
            </div>
        </div>
    )
}

















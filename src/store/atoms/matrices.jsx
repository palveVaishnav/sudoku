import {atom} from 'recoil'

export const Matrix = atom({
    key:"Matrix",
    default: Array(9).fill(0).map(() => Array(9).fill(0))
});
export const Puzzle = atom({
    key:'Puzzle',
    default: Array(9).fill(0).map(() => Array(9).fill(0))
});

export const ToSolve = atom({
    key:'toSolve',
    default: Array(9).fill(0).map(() => Array(9).fill(0))
});

export const Count = atom({
    key:'Count',
    default:0
});


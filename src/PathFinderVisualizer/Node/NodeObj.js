export default class NodeObj {
    col; 
    row;
    isStart;
    isFinish;
    previous;

    constructor(col, row, isStart, isFinish, previous = null) {
        this.col = col;
        this.row = row;
        this.isStart = isStart;
        this.isFinish = isFinish;
        this.previous = previous;
    }

}
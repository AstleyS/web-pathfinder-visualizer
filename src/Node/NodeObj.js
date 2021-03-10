export default class NodeObj {
    col; 
    row;
    isStart;
    isFinish;
    previous;
    cost;

    constructor(
        col, row, isStart, isFinish) {
            this.col = col;
            this.row = row;
            this.isStart = isStart;
            this.isFinish = isFinish;
            this.previous = null;
            this.cost = Infinity;
    }

}
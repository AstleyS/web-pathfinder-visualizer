import React from 'react';
import './Node.css';

export default class Node extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        // Getting the attributes (Passed in PathfinderVisualizer.jsx render() <Node [atributtes]>)
        const { isStart, isFinish, coordinates } = this.props;
        const extraClassName = isStart ? 'node-start visited': isFinish ? 'node-finish' : '';

        return <div id={`${ coordinates }`} className={`node ${ extraClassName }`}></div>;
    }

}
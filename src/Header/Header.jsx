import React from 'react';
import './Header.css';

export default class Header extends React.Component {

    render() {
        return (
            <header>
                    {/* Algorithms */}
                   <ul className="algorithms"> 
                    <h5>Choose an Algorithm:</h5>
                       <li className="btn bfs">BFS</li>
                       <li className="btn dfs">DFS</li>
                       <li className="btn dijkstra">Dijkstra</li>
                       <li className="btn a-star">A*</li>
                    </ul>
                    {/* Logo + Play */}
                    <div className="logo">
                        <h2 className="title">PathFinder</h2>
                        <button className="play-btn">Play</button>
                    </div>
                    {/* Add barrier button */}
                    <div className="others-btn">
                        <button className="barrier-btn">Add Barrier</button>
                    </div>
            </header>
        )
    }

}
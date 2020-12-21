import React, { Component } from 'react'
import "./Tile.css";
export default class Tile extends Component {
    render() {
        const {id,chipType,onClick} = this.props;
        const chipClass= (chipType==="Red"? 'red chip':'blue chip');

        return (
            <div className="tile" onClick={()=>{onClick(id)}}>
                {chipType && <div className={chipClass} /> }
            </div>
        );
    }
}

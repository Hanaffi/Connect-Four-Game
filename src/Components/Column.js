import React, { Component } from 'react'
import Tile from './Tile';

export default class Column extends Component {

    render() {
        const {column,rows,chipPosition,onTileClick}=this.props;
        const tiles=[];
        for(let row=0;row<rows;row++ )
        {
            const tileID= `${row}:${column}`;
            const chipType = chipPosition[tileID];
            tiles.push(
                <Tile 
                    chipType={chipType}
                    key={tileID}
                    id={tileID}
                    onClick={onTileClick}
                />
            )
        }



        return (
            <div  className="column">
                {tiles}        
            </div>
        )
    }
}

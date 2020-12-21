import React, { Component } from 'react'
import Column from './Column'
export default class Board extends Component {
   
    render() {
        const {columns,rows,chipPosition , onTileClick} = this.props;
        const columnComponents = [];
        for(let column =0; column<columns ; column++)
        {
            columnComponents.push(
                <Column
                    key={column}
                    rows={rows}
                    column={column}
                    chipPosition={chipPosition}
                    onTileClick={onTileClick}
                />
                
            );
        }
        return (
            <div style={{backgroundColor:"#3355ff" ,
                borderRadius:"5px",
                width:"480px",
                display:"flex",
                border: "3px solid black"

            }}>
                {columnComponents}
            </div>
        )
    }
}

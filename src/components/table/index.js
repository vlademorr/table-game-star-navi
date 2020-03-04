import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {computerWin, randomTableElement, playerWin } from '../../actions';
import "./style.css";

const TableGame = ({ tableElements, gameModeClicked, playerName, currentRandomId, computerWinDispatch, randomTableElementDispatch, playerWinDispatch }) => {
    const [timer, setTimer] = useState();
    useEffect(() => {

        if(gameModeClicked && currentRandomId){
            randomTableElementDispatch(currentRandomId);

            setTimer(setTimeout(() => {
                computerWinDispatch("red");
            }, gameModeClicked.delay))
        }
    }, [currentRandomId]);

    const isGoodClick = (id) => {
        if(id === currentRandomId){
            clearTimeout(timer);
            playerWinDispatch("green");
        }
    };

    if(tableElements && playerName){
        return(
            <div>
                <div className={"choose"}>{playerName + " WIN!"}</div>
                <table>
                    <tbody>
                    {
                        tableElements.map((row, i) => {
                            return(
                                <tr key={i}>
                                    {
                                        row.map((cell, j) => {
                                            return(
                                                <td
                                                    id={cell.id}
                                                    key={ `${i} + ${j}` }
                                                    onClick={() => isGoodClick(cell.id)}
                                                    style={{"backgroundColor": cell.color}}
                                                >
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }

    return <div className={"choose"}>Choose hard level and set your name</div>
};

const mapStateToProps = (state) => {
    return {
        tableElements: state.tableElements,
        gameModeClicked: state.gameModeClicked,
        playerName: state.playerName,
        currentRandomId: state.currentRandomId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        computerWinDispatch: (color) => dispatch(computerWin(color)),
        playerWinDispatch:(color) => dispatch(playerWin(color)),
        randomTableElementDispatch: (id) => dispatch(randomTableElement(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableGame)
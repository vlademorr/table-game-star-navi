import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    computerWin, randomTableElement,
    playerWin, gameOver, winnersAction
} from '../../actions';
import winnerService from "../../services/winnersService";
import "./style.css";

const TableGame = ({
   tableElements, gameModeClicked, winner, gameOver,
   playerName, currentRandomId, computerWinDispatch,
    randomTableElementDispatch, playerWinDispatch
}) => {

    const [timer, setTimer] = useState();
    const [winCountComp, setWinCountComp] = useState(0);
    const [winCountUser, setWinCountUser] = useState(0);

    useEffect(() => {
        setWinCountComp(0);
        setWinCountUser(0);
    }, [winner]);

    useEffect(() => {
        const winScore = tableElements.length * tableElements.length / 2;
        if (winCountUser > winScore) {
            gameOver(playerName);
            return;
        }
        if (winCountComp > winScore) {
            gameOver('Computer');
            return;
        }
        if(gameModeClicked && currentRandomId){
            randomTableElementDispatch(currentRandomId);
            if(timer){
              clearTimeout(timer);
            }
            setTimer(setTimeout(() => {
                setWinCountComp(winCountComp + 1);
                computerWinDispatch("red");
            }, gameModeClicked.delay))
        }
    }, [currentRandomId]);

    const isGoodClick = (id) => {
        if(id === currentRandomId){
            playerWinDispatch("green");
            setWinCountUser(winCountUser + 1);
            clearTimeout(timer);
        }
    };

    if(tableElements.length && playerName){
        return(
            <div className="table_container">
                {winner && (<div className={"winner"}>{winner + " WIN!"}</div>)}
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

    return <div className={"choose"}>Choose a hard level <br/> and set your name</div>
};

const mapStateToProps = (state) => {
    return {
        tableElements: state.tableElements,
        gameModeClicked: state.gameModeClicked,
        playerName: state.playerName,
        currentRandomId: state.currentRandomId,
        winner: state.winner
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        gameOver: (player) => {
            dispatch(gameOver(player));
            winnerService()
                .setWinners(player)
                .then((res) => res.json())
                .then((winners) => dispatch(winnersAction(winners)))
        },
        computerWinDispatch: (color) => dispatch(computerWin(color)),
        playerWinDispatch:(color) => dispatch(playerWin(color)),
        randomTableElementDispatch: (id) => dispatch(randomTableElement(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableGame)
import React, {useEffect} from "react";
import { winnersAction } from "../../actions";
import winnerService from "../../services/winnersService";
import ListGroup from "react-bootstrap/ListGroup";
import {connect} from "react-redux";

const WinnerTable = ({ winnersDispatch, winners }) => {
    useEffect(() => {
        winnerService()
            .getWinners()
            .then((res) => res.json())
            .then((winners) => winnersDispatch(winners))
    },[]);

    if(winners){
        return(
            <>
                <h3>Leader Board</h3>
                <ListGroup>
                    {
                        winners.slice(winners.length - 4).reverse().map((item) => {
                            return(
                                <ListGroup.Item action variant="dark" key={item.date}>
                                    {item.winner} {item.date}
                                </ListGroup.Item>
                            );
                        })
                    }
                </ListGroup>
            </>
        )
    }

    return <div>loading...</div>

};


const mapStateToProps = (state) => {
    return {
        winners: state.winners,
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        winnersDispatch: (winners) => dispatch(winnersAction(winners))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(WinnerTable)
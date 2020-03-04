import React, {useEffect} from "react";
import { winnersAction } from "../../actions";
import ListGroup from "react-bootstrap/ListGroup";
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from "react-redux";

const winnersService = async () => {
    const response = await fetch(
        "https://starnavi-frontend-test-task.herokuapp.com/winners"
    );
    return response
};

const WinnerTable = ({ winnersDispatch, winners }) => {
    useEffect(() => {
        winnersService()
            .then((res) => res.json())
            .then((winners) => winnersDispatch(winners))
    },[]);

    if(winners){
        return(
            <ListGroup>
                {
                    winners.slice(winners.length - 4).map((item) => {
                        return(
                            <ListGroup.Item action variant="dark">
                                {item.winner} {item.date}
                            </ListGroup.Item>
                        );
                    })
                }
            </ListGroup>
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
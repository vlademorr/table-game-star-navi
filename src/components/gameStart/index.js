import React, { useEffect } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { gameModeAction, gameModeClicked, playerName, randomTableElement } from '../../actions';
import './style.css';
import difficultyModeService from "../../services/difficulty-mode-service";
import { getRandomElement } from "../../helpers";

const GameStart = ({ gameModeDispatch, gameModeClickedDispatch, playerNameDispatch, gameModes, tableElements, randomTableElementDispatch, currentRandomId }) => {

    useEffect(() => {
        difficultyModeService()
            .then((res) => res.json())
            .then((mode) => gameModeDispatch(mode))
    },[]);

    if(gameModes){
        const gameModeNames = Object.keys(gameModes);
        let textInput = null;

        function handleClick() {
            if(!textInput.value){
                return
            }
            const randomElement = getRandomElement(tableElements);
            randomTableElementDispatch(randomElement);

            textInput.focus();
            playerNameDispatch(textInput.value);
        }

        return(
            <div className={'firstElements'}>

                <DropdownButton id="dropdown-basic-button" title="Pick game mode">
                    {
                        gameModeNames.map((item) => {
                            return <Dropdown.Item onClick={() => gameModeClickedDispatch(gameModes[item])}>{item}</Dropdown.Item>
                        })
                    }
                </DropdownButton>

                <input type="text"
                       placeholder={'Enter your name'}
                       ref={(input) => { textInput = input; }}
                />
                <input type="button"
                       value={ currentRandomId ? "Play Again" : "Play" }
                       onClick={handleClick}
                />

            </div>
        );
    }
    
    return <div>loading...</div>
};

const mapStateToProps = (state) => {
    return {
        gameModes: state.gameModes,
        tableElements: state.tableElements,
        currentRandomId: state.currentRandomId
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        gameModeDispatch: (mode) => dispatch(gameModeAction(mode)),
        gameModeClickedDispatch: (mode) => dispatch(gameModeClicked(mode)),
        playerNameDispatch: (name) => dispatch(playerName(name)),
        randomTableElementDispatch: (id) => dispatch(randomTableElement(id))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(GameStart)
import React, { useEffect } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    gameModeAction, gameModeClicked as gameModeClickedFunc,
    playerName, randomTableElement, clearStore
} from '../../actions';
import difficultyModeService from "../../services/difficulty-mode-service";
import { getRandomElement } from "../../helpers";
import './style.css';

const GameStart = ({
   gameModeDispatch, gameModeClickedDispatch,
   playerNameDispatch, gameModes, tableElements, gameModeClicked,
   randomTableElementDispatch, currentRandomId, clearStoreDispatch
}) => {

    useEffect(() => {
        difficultyModeService()
            .then((res) => res.json())
            .then((mode) => gameModeDispatch(mode))
    },[]);

    if(gameModes){
        const gameModeNames = Object.keys(gameModes);
        let textInput = null;

        function handleClick() {
            if(!textInput.value || !gameModeClicked){
                return
            }
            clearStoreDispatch();
            const randomElement = getRandomElement(tableElements);
            randomTableElementDispatch(randomElement);
            textInput.focus();
            playerNameDispatch(textInput.value);
        }

        return(
            <div className={'first_elements'}>

                <DropdownButton id="dropdown-basic-button" title="Pick game mode">
                    {
                        gameModeNames.map((item) => (
                            <Dropdown.Item
                                key={item}
                                onClick={() => gameModeClickedDispatch(gameModes[item])}
                            >
                                {item}
                            </Dropdown.Item>
                        ))
                    }
                </DropdownButton>

                <input className="input_name"
                       type="text"
                       placeholder={'Enter your name'}
                       ref={(input) => { textInput = input; }}
                />
                <input className="play_btn"
                       type="button"
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
        currentRandomId: state.currentRandomId,
        gameModeClicked: state.gameModeClicked
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        gameModeDispatch: (mode) => dispatch(gameModeAction(mode)),
        gameModeClickedDispatch: (mode) => dispatch(gameModeClickedFunc(mode)),
        playerNameDispatch: (name) => dispatch(playerName(name)),
        randomTableElementDispatch: (id) => dispatch(randomTableElement(id)),
        clearStoreDispatch: (id) => dispatch(clearStore(id))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(GameStart)
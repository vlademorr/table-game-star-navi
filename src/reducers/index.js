import {
        getRandomElement,randomEL,
        TableElConstructor, tableFunc
        } from "../helpers";

const initialState = {
    gameModes: null,
    gameModeClicked: null,
    playerName: null,
    tableElements: [],
    winners: null,
    currentRandomId: null,
    winner: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GAME_OVER':
            return  {
                ...state,
                winner: action.payload
            };
        case 'GAME_MODE_GET_REQUEST':
            return  {
                ...state,
                gameModes: action.payload
            };
        case 'GAME_MODE_CLICKED':
            return  {
                ...state,
                gameModeClicked: action.payload,
                tableElements: tableFunc(action.payload.field, TableElConstructor)
            };
        case 'PLAYER_NAME_INPUT':
            return  {
                ...state,
                playerName: action.payload
            };
        case 'TABLE_RANDOM_ELEMENT':
            return  {
                ...state,
                tableElements: randomEL(action.payload, state.tableElements),
                currentRandomId: action.payload
            };

        case 'WINNERS_GET_REQUEST':
            return  {
                ...state,
                winners: action.payload
            };

        case 'CLEAR_GAME_DATA':
            return  {
                ...state,
                winner: '',
                tableElements: tableFunc(state.tableElements.length, TableElConstructor)
            };
        case 'COMPUTER_WIN_COLOR':
        case 'PLAYER_WIN_COLOR':
            return  {
                ...state,
                tableElements: randomEL(state.currentRandomId, state.tableElements, action.payload),
                currentRandomId: getRandomElement(state.tableElements)
            };

        default:
            return state;
    }
};

export default reducer;
const gameModeAction = (mode) => {
    return{
        type: 'GAME_MODE_GET_REQUEST',
        payload: mode
    };
};

const gameModeClicked = (mode) => {
    return{
        type: 'GAME_MODE_CLICKED',
        payload: mode
    };
};

const playerName = (name) => {
    return{
        type: 'PLAYER_NAME_INPUT',
        payload: name
    };
};

const randomTableElement = (id) => {
    return{
        type: 'TABLE_RANDOM_ELEMENT',
        payload: id
    };
};

const winnersAction = (winners) => {
    return{
        type: 'WINNERS_GET_REQUEST',
        payload: winners
    };
};

const computerWin = (color) => {
    return{
        type: 'COMPUTER_WIN_COLOR',
        payload: color
    };
};

const playerWin = (color) => {
    return{
        type: 'PLAYER_WIN_COLOR',
        payload: color
    };
};

export {
    gameModeAction,
    gameModeClicked,
    playerName,
    randomTableElement,
    winnersAction,
    computerWin,
    playerWin
};

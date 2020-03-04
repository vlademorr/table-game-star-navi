import { getRandomElement } from "../helpers";


const initialState = {
    gameModes: null,
    gameModeClicked: null,
    playerName: null,
    tableElements: null,
    winners: null,
    currentRandomId: null
};

const randomEL = (id, tableElements, color = "blue") => {

    let table = [...tableElements];
    table.forEach((row) =>{
        row.forEach((item) =>{
            if(item.id === id){
                item.isSelected = true;
                item.color = color;
            }
        });
    });
    return table
};

const TableElConstructor = function(id){
    this.color = "white";
    this.playerClicked = false;
    this.computerClicked = false;
    this.id = id;
    this.isSelected = false;
};

const tableFunc = (rows) => {
    let row = [];
    let table = [];
    for(let i = 1; i <= rows * rows; i++){
        row.push(new TableElConstructor(i))
    }

    let arr = [];

    row.forEach((item) => {
        arr.push(item);
        if(item.id % rows === 0){
            table.push(arr);
            arr = [];
        }
    });
    return table
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GAME_MODE_GET_REQUEST':
            return  {
                ...state,
                gameModes: action.payload
            };
        case 'GAME_MODE_CLICKED':
            return  {
                ...state,
                gameModeClicked: action.payload,
                tableElements: tableFunc(action.payload.field)
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
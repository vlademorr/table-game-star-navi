const getRandomElement = (tableElements) => {
    const arr = [];
    tableElements.forEach((row) =>{
        row.forEach((item) =>{
            if(!item.isSelected){
                arr.push(item.id)
            }
        });
    });

    return arr[Math.floor(Math.random() * arr.length)];
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
    this.id = id;
    this.isSelected = false;
};

const tableFunc = (rows, TableElConstructor) => {
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


export {
    getRandomElement,
    randomEL,
    TableElConstructor,
    tableFunc
}
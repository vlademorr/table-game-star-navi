export const getRandomElement = (tableElements) => {
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
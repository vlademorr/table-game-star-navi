import React from "react";
import GameStart from "../gameStart/index";
import TableGame from "../table/index";
import WinnerTable from "../winnersBlock/index"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

const App = () => {
    return(
      <div className={"app"}>
          <div className={"left_side"}>
              <GameStart/>
              <TableGame/>
          </div>
          <div className={"right_side"}>
              <WinnerTable/>
          </div>
      </div>
    );
};

export default App
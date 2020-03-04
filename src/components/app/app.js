import React from "react";
import GameStart from "../gameStart/index";
import TableGame from "../table/index";
import WinnerTable from "../winnersBlock/index"
import "./style.css";

const App = () => {
    return(
      <div className={"app"}>
          <div className={"leftSide"}>
              <GameStart/>
              <TableGame/>
          </div>
          <div className={"rightSide"}>
              <WinnerTable/>
          </div>
      </div>
    );
};

export default App
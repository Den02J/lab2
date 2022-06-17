import React, { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "./elements/DatePicker";

function App() {
  const [date, setDate] = useState([dayjs()]);

  const apply = () => {
    alert(date);
  };

  const buttonStyle = {
      width: 100,
      height: 30,
      marginTop: 20,
      marginLeft: 210,
      background: '#B5B5B5',
      borderRadius: 10,
    };

    // 'single', 'range'

  return (
      <div className="appContainer">
        <div>
          <DatePicker type={"single"} selectedDate={date} onChange={setDate} />
          <button style={buttonStyle} onClick={apply}>Select</button>
        </div>
      </div>
  );
}

export default App;


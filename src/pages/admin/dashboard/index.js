import React, { useState, useEffect } from "react";
import { mainApi } from "../../../services/dashboard";


function Index(props) {
  const [main, setMain] = useState({});
  useEffect(() => {
    (async () => {
        try {
            const res = await mainApi()
            console.log(res.data)
            setMain(res.data)
        }catch(err){
            console.log(err)
        }
    })()
  }, []);
  return (
    <div>
      <div>今日进账:{main.todayAmount}</div>
    </div>
  );
}

export default Index;

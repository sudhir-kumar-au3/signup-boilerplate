import React, { useEffect } from "react";
import Axios from "../services/api";

function Home() {
  useEffect(() => {
    Axios.get("/api/home")
      .then((res) => {
        console.log("res: ", res.data);
        return res.data;
      })
      .catch((error) => console.log(error.response));
  }, []);
  return <div>home</div>;
}

export default Home;

import { useEffect, useState } from "react";

function Hello() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then((res) => res.json())
      .then((data) => setMsg(data.message));
  }, []);

  return <h2>{msg}</h2>;
}

export default Hello;

import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
const demoUrl = "/photos-short-list?_page=1&_limit=5";
function App() {
  const [apiData, setApiData] = useState<photo[]>();
  useEffect(() => {
    const controller = new AbortController();
    const data = axios.get(demoUrl, { signal: controller.signal });
    setApiData(data);
    return () => controller.abort();
  }, []);
  return <></>;
}

export default App;

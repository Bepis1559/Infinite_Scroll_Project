import "./App.css";
import { PhotosGrid } from "./components/PhotosGrid";
import { Skeleton } from "./components/Skeleton";
import { useFetch } from "./customHooks/useFetch";

function App() {
  const url = `http://127.0.0.1:3000/photos?_page=${1}&_limit=${10}`;
  const apiData = useFetch(url);
  return (
    <>{apiData.isLoading ? <Skeleton /> : <PhotosGrid apiData={apiData} />}</>
  );
}

export default App;

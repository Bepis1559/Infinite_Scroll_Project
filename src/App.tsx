import "./App.css";
import { PhotosGrid } from "./components/PhotosGrid";
import { Skeleton } from "./components/Skeleton";
import { useFetch } from "./customHooks/useFetch";
// import { parseLinkHeader } from "./helpers/parseLinkHeader";
const demoUrl = "http://127.0.0.1:3000/photos-short-list";

function App() {
  const apiData = useFetch(demoUrl);
  return (
    <>{apiData.isLoading ? <Skeleton /> : <PhotosGrid apiData={apiData} />}</>
  );
}

export default App;

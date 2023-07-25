import { useEffect } from "react";
import "./App.css";
import { PhotosGrid } from "./components/PhotosGrid";
import { Skeleton } from "./components/Skeleton";
import { useFetch } from "./customHooks/useFetch";
// import { parseLinkHeader } from "./helpers/parseLinkHeader";

function App() {
  const url = `http://127.0.0.1:3000/photos?_page=${1}&_limit=${10}`;
  const { linksObject, isLoading, data: photos } = useFetch(url);
  useEffect(() => {
    console.log(linksObject);
  }, [linksObject]);

  return <>{isLoading ? <Skeleton /> : <PhotosGrid photos={photos ?? []} />}</>;
}

export default App;

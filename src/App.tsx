import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { PhotosGrid } from "./components/PhotosGrid";
import { useFetch } from "./customHooks/useFetch";
import { getData } from "./helpers/getData";

function App() {
  const photosLimit = useRef(15);
  const [url, setUrl] = useState(
    `http://127.0.0.1:3000/photos?_page=${1}&_limit=${photosLimit}`,
  );
  const { linksObject, isLoading, data: photos } = useFetch(url);
  const [photosArray, setPhotosArray] = useState(photos ?? []);

  const handleInitialDataLoad = useCallback(async () => {
    const controller = new AbortController();
    const { result, linksObject } = await getData(url, controller);
    setPhotosArray(result);
    setUrl(linksObject?.next ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    handleInitialDataLoad();
  }, [handleInitialDataLoad]);

  // const sentinelRef = useRef<HTMLDivElement>(null);
  function loadPhotos() {
    setPhotosArray((prev) => [...(prev ?? []), ...(photos ?? [])]);
    setUrl(linksObject?.next ?? "");
  }

  return (
    <>
      <button onClick={loadPhotos} type="button">
        Load More
      </button>
      <PhotosGrid isLoading={isLoading} photos={photosArray} />
    </>
  );
}

export default App;

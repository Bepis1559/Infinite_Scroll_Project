import { useRef, useState } from "react";
import "./App.css";
import { PhotosGrid } from "./components/PhotosGrid";
import { useFetch } from "./customHooks/useFetch";

function App() {
  // const [page, setPage] = useState(1);
  const [url, setUrl] = useState(
    `http://127.0.0.1:3000/photos?_page=${1}&_limit=${10}`,
  );
  const { linksObject, isLoading, data: photos } = useFetch(url);
  const [photosArray, setPhotosArray] = useState<photo[]>(photos ?? []);

  const sentinelRef = useRef<HTMLDivElement>(null);
  function loadMore() {
    setPhotosArray((prev) => [...(prev ?? []), ...(photos ?? [])]);
    setUrl(linksObject?.next ?? "");
  }

  return (
    <>
      <button onClick={loadMore} type="button">
        Load More
      </button>

      <PhotosGrid isLoading={isLoading} photos={photosArray ?? []} />

      <div ref={sentinelRef}>Hello</div>
    </>
  );
}

export default App;

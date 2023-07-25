import { ReactElement } from "react";
import { reducerStateType } from "../customHooks/useFetch";

type props = {
  apiData: reducerStateType;
};

export function PhotosGrid({ apiData }: props): ReactElement {
  const photos = apiData.data as photo[];
  return (
    <div className="grid">
      {photos?.map(({ id, url, thumbnailUrl }) => (
        <img key={id} src={url} alt={thumbnailUrl} />
      ))}
    </div>
  );
}

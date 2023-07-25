import { ReactElement } from "react";
import { Photo } from "./Photo";

type props = {
  photos: dataType;
  isLoading: boolean;
};

export function PhotosGrid({ photos, isLoading }: props): ReactElement {
  return (
    <div className="grid">
      {photos?.map(({ id, url, thumbnailUrl }) => (
        <Photo isLoading={isLoading} key={id} src={url} alt={thumbnailUrl} />
      ))}
    </div>
  );
}

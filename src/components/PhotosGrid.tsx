import { ReactElement } from "react";

type props = {
  photos: dataType;
};

export function PhotosGrid({ photos }: props): ReactElement {
  return (
    <div className="grid">
      {photos?.map(({ id, url, thumbnailUrl }) => (
        <img key={id} src={url} alt={thumbnailUrl} />
      ))}
    </div>
  );
}

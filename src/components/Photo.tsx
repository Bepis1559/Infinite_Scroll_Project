import { ReactElement } from "react";
import { Skeleton } from "./Skeleton";

type props = {
  src: string;
  alt: string;
  isLoading: boolean;
};

export function Photo({ src, alt, isLoading }: props): ReactElement {
  return (
    <>
      {isLoading && <Skeleton />}
      <img className="photo" src={src} alt={alt} />
    </>
  );
}

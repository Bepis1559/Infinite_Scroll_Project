type dataType = photo[];
type parsedLinksObject = {
  first: string;
  next: string;
  last: string;
};
type reducerAction = {
  type: "INITIALIZE" | "SUCCESS" | "ERROR" | "FINALLY";
  payload?: {
    parsedLinkObject: parsedLinksObject;
    data: dataType;
  };
};
type reducerStateType = {
  linksObject?: parsedLinksObject;
  data?: dataType;
  isError?: boolean;
  isLoading: boolean;
};
type postOptions = {
  method: string;
  body: string;
  headers: Headers;
};

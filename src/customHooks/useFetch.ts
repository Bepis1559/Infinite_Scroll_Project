import { useEffect, useReducer } from "react";
import { parseLinkHeader } from "../helpers/parseLinkHeader";

// type useFetchReturnType = {
//   data: dataTtpe | undefined;
//   isLoading: boolean;
//   isError: boolean;
// };

function reducer(state: reducerStateType, { type, payload }: reducerAction) {
  switch (type) {
    case "INITIALIZE":
      return {
        isError: false,
        isLoading: true,
      } as reducerStateType;
    case "SUCCESS":
      return {
        linksObject: payload?.parsedLinkObject,
        data: payload?.data,
        isLoading: false,
        isError: false,
      } as reducerStateType;
    case "ERROR":
      return {
        isLoading: false,
        isError: true,
      } as reducerStateType;

    case "FINALLY":
      return {
        ...state,
        isLoading: false,
      };
  }
}

export function useFetch(url: string, OPTIONS?: postOptions): reducerStateType {
  // const [data, setData] = useState<data>();
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    isError: false,
    isLoading: true,
  } as reducerStateType);

  useEffect(() => {
    // setIsLoading(true);
    // setIsError(false);
    dispatch({ type: "INITIALIZE" });
    const controller = new AbortController();
    async function fetchData(): Promise<void> {
      try {
        const response = await fetch(url, {
          ...OPTIONS,
          signal: controller.signal,
        });
        const linkHeader = response.headers.get("Link");
        const linksObject = parseLinkHeader(linkHeader ?? "");
        if (!response.ok) throw Error(response.statusText);
        const result = await response.json();
        dispatch({
          type: "SUCCESS",
          payload: {
            data: result,
            parsedLinkObject: linksObject as unknown as parsedLinksObject,
          },
        });
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return;
        // setIsError(true);
        dispatch({ type: "ERROR" });
      } finally {
        if (!controller.signal.aborted) {
          dispatch({ type: "FINALLY" });
        }
      }
    }
    fetchData();

    // setTimeout(() => {
    //   fetchData();
    // }, 2000);
    return () => controller.abort();
  }, [url, OPTIONS]);

  return state;
}

import { useEffect, useReducer } from "react";
import { fetchData } from "../helpers/getData";

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
  const [state, dispatch] = useReducer(reducer, {
    isError: false,
    isLoading: true,
  } as reducerStateType);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(url, controller, dispatch);
    return () => controller.abort();
  }, [url, OPTIONS]);

  return state;
}

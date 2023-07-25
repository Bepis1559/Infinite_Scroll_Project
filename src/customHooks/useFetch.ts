import { useEffect, useReducer } from "react";

type dataTtpe = photo[];

// type useFetchReturnType = {
//   data: dataTtpe | undefined;
//   isLoading: boolean;
//   isError: boolean;
// };

type reducerAction = {
  type: "INITIALIZE" | "SUCCESS" | "ERROR" | "FINALLY";
  payload?: {
    data: dataTtpe;
  };
};
export type reducerStateType = {
  data?: dataTtpe;
  isError?: boolean;
  isLoading: boolean;
};

function reducer(state: reducerStateType, { type, payload }: reducerAction) {
  switch (type) {
    case "INITIALIZE":
      return {
        isError: false,
        isLoading: true,
      } as reducerStateType;
    case "SUCCESS":
      return {
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
        if (!response.ok) throw Error(response.statusText);
        const result = await response.json();
        dispatch({ type: "SUCCESS", payload: { data: result } });
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

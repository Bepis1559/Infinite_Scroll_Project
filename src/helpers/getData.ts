import { parseLinkHeader } from "./parseLinkHeader";

export async function getData(
  url: string,
  controller: AbortController,
  OPTIONS?: postOptions,
) {
  const response = await fetch(url, { ...OPTIONS, signal: controller.signal });
  if (!response.ok) throw Error(response.statusText);
  const result = await response.json();
  const linkHeader = response.headers.get("Link");
  const linksObject = parseLinkHeader(linkHeader ?? "");
  return { result: result, linksObject: linksObject };
}

export async function fetchData(
  url: string,
  controller: AbortController,
  dispatch: React.Dispatch<reducerAction>,
): Promise<void> {
  try {
    const { result, linksObject } = await getData(url, controller);

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

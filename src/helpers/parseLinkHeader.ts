// This function takes in fetch request's `res.headers.get('Link')` value and converts it to an object with each link type as a key and the url as the value. The only value that we care about for this project is the `next` link, which we will use to fetch the next page of data (if it exists).

export function parseLinkHeader(linkHeader: string) {
  if (!linkHeader) return {};
  const links = linkHeader.split(",");
  const parsedLinks: { [key: string]: string } = {};
  links.forEach((link) => {
    const urlMatch = link.match(/<(.*)>/);
    const url = urlMatch ? urlMatch[1] : null;
    const relMatch = link.match(/rel="(.*)"/);
    const rel = relMatch ? relMatch[1] : null;
    if (url && rel) {
      parsedLinks[rel] = url;
    }
  });
  for (const key in parsedLinks) {
    console.log(parsedLinks[key]);
  }
  return parsedLinks;
}

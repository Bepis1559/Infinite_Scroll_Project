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
  return parsedLinks;
}

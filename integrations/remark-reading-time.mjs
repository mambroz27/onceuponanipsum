import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);

    // readingTime.text provides friendly text like "1 min read"
    data.astro.frontmatter.readingTime = readingTime.text;
  };
}

import type { Root } from "mdast";
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
import type { Plugin } from "unified";
import type { VFile } from "vfile";

type AstroVFile = VFile & {
  data: {
    astro: {
      frontmatter: Record<string, unknown>;
    };
  };
};

export const remarkReadingTime: Plugin<[], Root> = () => {
  return (tree, file) => {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    (file as AstroVFile).data.astro.frontmatter.minutesRead = readingTime.text;
  };
};

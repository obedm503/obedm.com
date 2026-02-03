import { renderMermaid, type RenderOptions } from "beautiful-mermaid";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const cssVarTheme: RenderOptions = {
  bg: "var(--color-background)",
  fg: "var(--color-foreground)",
  accent: "var(--color-secondary)",
  muted: "var(--color-muted-foreground)",
  line: "var(--color-border)",
  font: "JetBrains Mono",
  transparent: true,
};

export const remarkMermaid: Plugin<[], Root> = () => {
  return async tree => {
    const promises: Promise<void>[] = [];

    visit(tree, "code", (node, index, parent) => {
      if (node.lang !== "mermaid") return;
      if (index === undefined || !parent) return;

      const promise = renderMermaid(node.value, cssVarTheme).then(svg => {
        const html = `<div class="mermaid">${svg}</div>`;

        parent.children[index] = {
          type: "html",
          value: html,
        };
      });

      promises.push(promise);
    });

    await Promise.all(promises);
  };
};

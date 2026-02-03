import type { JSX } from "solid-js";

export function ExternalLink(props: {
  href: string;
  class: string;
  children: JSX.Element;
}) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={props.href}
      class={props.class}
    >
      {props.children}
    </a>
  );
}

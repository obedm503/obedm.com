import { Links } from "./links.jsx";

export function Footer() {
  return (
    <footer
      class="bg-primary text-primary-foreground mt-8 p-8 text-center"
      style="box-sizing: border-box; clip-path: ellipse(95% 100% at 30% 100%);"
    >
      <Links />

      <div>Copyright © Obed Miranda {new Date().getFullYear()}</div>
    </footer>
  );
}

import { Links } from "./links.jsx";

export function Footer() {
  return (
    <footer
      class="bg-primary text-primary-foreground mt-2 p-8 text-center md:mt-8"
      style="box-sizing: border-box; clip-path: ellipse(95% 100% at 30% 100%);"
    >
      <Links />

      <div class="pt-2">
        Copyright © Obed Miranda {new Date().getFullYear()}
      </div>
    </footer>
  );
}

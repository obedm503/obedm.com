export function Header(props: { title: string; subTitle?: string }) {
  return (
    <h1 class="mt-10 mb-24 text-center">
      <div class="text-5xl font-bold">{props.title}</div>
      {props.subTitle ? <div class="text-light">{props.subTitle}</div> : null}
    </h1>
  );
}

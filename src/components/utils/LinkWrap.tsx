import Link, { LinkProps } from "next/link";

const LinkWrap = (props: React.PropsWithChildren<LinkProps>) => (
  <Link {...props}>
    <a>{props.children}</a>
  </Link>
);

export default LinkWrap;

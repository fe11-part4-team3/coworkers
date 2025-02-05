type EmptyButtonsLinkProps = {
  href: string;
  onClick?: never;
};
type EmptyButtonsClickProps = {
  onClick: () => void;
  href?: never;
};
type EmptyButtonsProps = {
  text: string;
} & (EmptyButtonsLinkProps | EmptyButtonsClickProps);

export type { EmptyButtonsProps };

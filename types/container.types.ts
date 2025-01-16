export type ChildrenProps = {
  children: React.ReactNode;
};

export type ClassNameProps = {
  className?: string;
};

export type ContainerProps = ChildrenProps & ClassNameProps;

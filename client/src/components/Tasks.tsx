type Props = {
  title: string;
};

export function Tasks({ title }: Props) {
  return <div className="relative p-8 w-full flex-1">{title}</div>;
}

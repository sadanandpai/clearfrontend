import { Link as Anchor, LinkProps } from "@radix-ui/themes";

import Link from "next/link";

interface Props {
  href?: string;
  size?: LinkProps["size"];
  weight?: LinkProps["weight"];
  target?: LinkProps["target"];
  children: React.ReactNode;
}

export function RadixNextLink({ href = "#", size, weight, target, children }: Props) {
  return (
    <Anchor size={size} weight={weight} target={target} color="grass" asChild>
      <Link href={href} passHref>
        {children}
      </Link>
    </Anchor>
  );
}

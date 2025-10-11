import { Badge } from "@radix-ui/themes";

interface Props {
  isVerified: boolean;
}

export function VerificationBadge({ isVerified }: Props) {
  if (isVerified) {
    return (
      <Badge color="green" variant="solid">
        Verified
      </Badge>
    );
  }

  return (
    <Badge color="orange" variant="solid">
      Unverified
    </Badge>
  );
}

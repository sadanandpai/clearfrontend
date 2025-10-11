import { Text } from "@radix-ui/themes";
import { useFormStatus } from "react-dom";

interface Props {
  error?: string;
}

export function ErrorField({ error }: Props) {
  const { pending } = useFormStatus();

  if (pending) {
    return null;
  }

  if (error) {
    return (
      <Text size="2" color="red">
        {error}
      </Text>
    );
  }

  return null;
}

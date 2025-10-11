import { useEffect } from "react";
import Image from "next/image";
import { Button, Flex } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { signInWithOAuth } from "@/server/actions/auth";

const localStorageKey = "redirect";

export function OAuth() {
  const params = useSearchParams();
  const redirectURL = params.get("redirect");

  useEffect(() => {
    if (redirectURL) {
      localStorage.setItem(localStorageKey, redirectURL);
    }
  }, [redirectURL]);

  return (
    <div className="mt-8">
      <p>Or access using</p>
      <Flex justify="center" gap="6" className="mt-8">
        <form action={() => signInWithOAuth("Google")}>
          <Button type="submit" variant="ghost">
            <Image src="/google.svg" alt="Google" width={36} height={36} />
          </Button>
        </form>

        <form action={() => signInWithOAuth("Github")}>
          <Button type="submit" variant="ghost">
            <Image src="/github.svg" alt="Github" width={36} height={36} />
          </Button>
        </form>
      </Flex>
    </div>
  );
}

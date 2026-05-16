"use client";

import { useMutation } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { verifyEmailAction } from "@/server/actions/user";
import { routes } from "@/common/routes";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@radix-ui/themes";

function Banner({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen" role="alert">
      <Image src="/cfe-logo.svg" alt="Brand logo" width={30} height={30} />
      {children}
    </div>
  );
}

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const verified = searchParams.get("verified");
  const router = useRouter();
  const pathname = usePathname();

  const { mutate, data, isPending, error } = useMutation({
    mutationFn: () => verifyEmailAction(userId || "", secret || ""),
    // remove query params after completion
    onSettled: () => {
      // Update the browser URL bar seamlessly without a page refresh
      router.replace(`${pathname}?verified=true`);
    },
  });

  if (!verified && (!userId || !secret)) {
    return (
      <Banner>
        <p className="font-bold">Invalid URL</p>
        <Link href={routes.signIn} className="primary-link">
          Go to sign in
        </Link>
      </Banner>
    );
  }

  if (isPending) {
    return (
      <Banner>
        <p className="font-bold">Verifying your email...</p>
      </Banner>
    );
  }

  if (error) {
    return (
      <Banner>
        <p className="font-bold">Failed to verify your email. Please try again. 😔</p>
        <Link href={routes.signIn} className="primary-link">
          Go back to sign in
        </Link>
      </Banner>
    );
  }

  if (data) {
    return (
      <Banner>
        <p className="font-bold">Your email has been verified successfully! 🎉</p>
        <Link href={routes.signIn} className="primary-link">
          Go to sign in
        </Link>
      </Banner>
    );
  }

  if (verified) {
    return (
      <Banner>
        <p className="font-bold">Please check your email for verification link</p>
        <Link href={routes.signIn} className="primary-link">
          Go to sign in
        </Link>
      </Banner>
    );
  }

  return (
    <Banner>
      <p className="font-bold">Click to verify your email</p>
      <Button onClick={() => mutate()}>Verify Email</Button>
    </Banner>
  );
}

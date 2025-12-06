import { MessageSquareText } from "lucide-react";
import { RadixNextLink } from "../../core/radix-next-link/radix-next-link";

export const FeedbackButton = () => {
  return (
    <RadixNextLink
      className="fixed bottom-10 right-14 cursor-pointer h-12 w-12 rounded-full !p-0 flex items-center justify-center border border-[var(--gray-6)] bg-[var(--gray-2)] hover:bg-[var(--gray-3)] opacity-80 hover:opacity-100 shadow-sm transition-colors"
      href="https://forms.gle/UGG7Y1Ep6w6BZWXX7"
      target="blank"
      aria-label="Give feedback"
    >
      <MessageSquareText size={18} className="text-[var(--gray-12)]" />
    </RadixNextLink>
  );
};

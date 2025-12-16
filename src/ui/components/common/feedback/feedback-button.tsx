import { MessageCircleReply } from "lucide-react";
import { RadixNextLink } from "../../core/radix-next-link/radix-next-link";

export const FeedbackButton = () => {
  return (
    <RadixNextLink
      href="https://forms.gle/UGG7Y1Ep6w6BZWXX7"
      target="blank"
      aria-label="Give feedback"
    >
      <MessageCircleReply size={24} />
    </RadixNextLink>
  );
};

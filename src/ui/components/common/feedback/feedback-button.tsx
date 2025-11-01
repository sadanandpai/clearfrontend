
import { SquarePen } from "lucide-react";
import { RadixNextLink } from "../../core/radix-next-link/radix-next-link";

export const FeedbackButton = () => {
    return (
        <RadixNextLink className="fixed bottom-16 left-4 cursor-pointer primary-link" href="https://forms.gle/UGG7Y1Ep6w6BZWXX7" target="blank">
            <SquarePen size={16} className="text-bg-2" />
        </RadixNextLink>
    );
};

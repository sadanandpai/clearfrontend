import { Challenges } from "./challenge-list.types";

export const filterChallenges = (challenges:Challenges[],searchQuery:string) => {
    return challenges.filter((challenge) => {
        return challenge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            challenge.difficulty.toLowerCase().includes(searchQuery.toLowerCase()) ||
            challenge.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    });
};
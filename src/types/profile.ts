export type Reputation = {
    levelno: number,
    levelname: string,
    score: number
}

export type NextReputation = Reputation;

export type UserStats = {
    reviewAdded: number,
    primaryLanguage: string
}

export interface UserDashboard {
    reputation: Reputation;
    nextReputation: NextReputation;
    userStats: UserStats
}
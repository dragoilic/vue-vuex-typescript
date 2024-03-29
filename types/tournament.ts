import { TournamentState } from "../../general/types/tournament";
import { Game } from "./game";
import { Player } from "./player";

export interface Tournament {
    id: number;
    buyIn: number;
    chips: number;
    commission: number;
    name: string;
    playersLimit: PlayersLimitType;
    prizePoolMoney: number;
    sportIds: string[];
    starts: string | null;
    state: TournamentState;
    timeFrame: TimeFrame;
    games: Game[];
    players: Player[];
    prizePool: Prize[];
    liveLines: boolean;
}

export interface TournamentChat {
    id: number;
    name: string;
    state: TournamentState;
    players: Player[];
}

export enum BuyInType {
    Freeroll = "Freeroll",
    Low = "Low",
    Medium = "Medium",
    High = "High",
}

export enum TournamentType {
    Single = "Single",
    Multiple = "Multiple",
}

export enum PlayersLimitType {
    HeadsUp = "Heads-Up",
    SingleTable = "Single table",
    Unlimited = "Unlimited",
}

export enum TimeFrame {
    Daily = "Daily",
    Weekly = "Weekly",
    Monthly = "Monthly",
    SeasonLong = "Season long",
}

export interface Prize {
    maxPosition: number;
    prize: number;
}

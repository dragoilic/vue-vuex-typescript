import { Module } from "vuex";
import { RootState } from "../types";
import {
    BuyInType,
    PlayersLimitType,
    TimeFrame,
    Tournament,
    TournamentType,
} from "../../types/tournament";
import { updateField } from "../utils";

export interface TournamentHistoryListState {
    tournaments: Tournament[];
    isLoading: boolean;
    isLoaded: boolean;
    isFailed: boolean;

    buyIn: BuyInType | null;
    playersLimit: PlayersLimitType | null;
    timeFrame: TimeFrame | null;
    search: string;
    sports: number[];
    type: TournamentType | null;
    upcoming: boolean;
}

const module: Module<TournamentHistoryListState, RootState> = {
    namespaced: true,

    state: {
        tournaments: [],
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        buyIn: null,
        playersLimit: null,
        search: "",
        sports: [],
        timeFrame: null,
        type: null,
        upcoming: false,
    },

    mutations: {
        updateField,

        markAsLoading(state) {
            state.isLoading = true;
        },

        markAsLoaded(state, tournaments: Tournament[]) {
            state.isLoading = false;
            state.isLoaded = true;
            state.isFailed = false;
            state.tournaments = tournaments;
        },

        markAsFailed(state) {
            state.isLoading = false;
            state.isFailed = true;
        },

        createOrUpdateTournament(state, tournament: Tournament) {
            const existingTournament = state.tournaments.find(item => item.id === tournament.id);

            if (existingTournament) {
                state.tournaments = state.tournaments.map(item =>
                    item.id === tournament.id ? tournament : item,
                );
            } else {
                state.tournaments = [...state.tournaments, tournament];
            }
        },
    },

    actions: {
        load({ state, dispatch }) {
            if (!state.tournaments.length) {
                dispatch("reload");
            }
        },

        async reload({ commit, rootState }) {
            commit("markAsLoading");

            try {
                const tournaments = await rootState.api.getTournamentHistory();

                commit("markAsLoaded", tournaments);
            } catch (e) {
                commit("markAsFailed");
            }
        },
    },
};

export default module;

const initialState = {
  games: [],
  genres: [],
  results: [],
  pages: [],
  originalGames: [],
  gamesPerPage: 16,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GET_GAMES":
      return {
        ...state,
        games: action.payload,
        originalGames: action.payload,
      };
    case "GET_RESULTS":
      return {
        ...state,
        results: action.payload,
      };
    case "CLEAR_RESULTS":
      return {
        ...state,
        results: [],
      };
    case "SET_GAMES":
      return {
        ...state,
        games: action.payload,
      };
    case "SET_PAGES":
      return {
        ...state,
        pages: action.payload,
      };
    case "SET_GAMESPERPAGE":
      return {
        ...state,
        gamesPerPage: action.payload,
      };
    case "ADD_GAME":
      return {
        ...state,
        originalGames: state.originalGames.concat(action.payload),
      };

    default:
      return state;
  }
}

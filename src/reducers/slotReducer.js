import initialState from "./initialState";

import { WALLET_UPDATE } from "../actions/actionTypes";

export default function slot(state = initialState.slot, action) {
  let newState;
  switch (action.type) {
    case WALLET_UPDATE:
      newState = { ...state, wallet: action.wallet };
      return newState;

    default:
      return state;
  }
}

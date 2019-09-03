import * as types from "./actionTypes";

export function walletUpdate(wallet) {
  return { type: types.WALLET_UPDATE, wallet: wallet };
}

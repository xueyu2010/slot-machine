import api from "../../libs/api";

// pass in slot id, return [
// {reelId: 1, pickedStop: 2}
// { reelId: 2, pickedStop: 1}
//]
export const pull = (slotId, betAmount, uniqueIdentifier, rnd) => {
  return api
    .pureGet("api/pull", {
      params: { slotId, betAmount, uniqueIdentifier, rnd }
    })
    .map(res => {
      return res.result;
    });
};

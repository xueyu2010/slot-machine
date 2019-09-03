import api from "../../libs/api";

export const getSlotInfo = () => {
  return api.pureGet("api/slot", {}).map(res => {
    return res.result;
  });
};

// now only support cookie type user creation
// the user unique identifier is generated UUID
export const getOrCreateUser = cookies => {
  if (
    !!cookies &&
    !!cookies.get("uuid") &&
    cookies.get("uuid") !== "undefined"
  ) {
    return api
      .pureGet("api/users", {
        params: {
          uniqueIdentifier: cookies.get("uuid").toString(),
          identifierType: "cookie"
        }
      })
      .map(res => {
        return res.result;
      });
  } else {
    return api
      .purePost("api/users", {
        params: { identifierType: "cookie", name: "anonymous user" }
      })
      .map(res => {
        return res.result;
      });
  }
};

import reducer from "../auth";
import * as actionTypes from "../../actions/actionTypes";

describe("auth reducer", () => {
  const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/"
  };

  it("should return the inital state", () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it("should store the token upon login", () => {
    expect(
      reducer(initState, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: "some-token",
        userId: "some-user-id"
      })
    ).toEqual({
      token: "some-token",
      userId: "some-user-id",
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
});

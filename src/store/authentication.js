// src/store/authentication.js
import Cookies from 'js-cookie'

function loadUser() {
  const authToken = Cookies.get("token");
  if (authToken) {
    try {
      const payload = authToken.split(".")[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);
      const { data } = payloadObj;
      return data;
    } catch (e) {
      Cookies.remove("token");
    }
  }
  return {};
}

export const SET_USER = 'pokedex/authentication/SET_USER';

export const setUser = (user) => ({
  type: SET_USER,
  user
})

export const login = (email, password) => {
    return async(dispatch) => {
        // console.log(`THE PUT REQUEST: ${email}, ${password}`)
        const response = await fetch('/api/session', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json()
        dispatch(setUser(data.player));

    }
}




export default function reducer(state=loadUser(), action) {
  switch (action.type) {
    case (SET_USER): {
      return action.user;
    }
    default: {
      return state;
    }
  }
}

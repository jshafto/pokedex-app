// src/store/authentication.js
import Cookies from 'js-cookie';

export const SET_USER = 'pokedex/authentication/SET_USER';
export const REMOVE_USER = '/pokedex/authentication/REMOVE_USER';


export const setUser = (user) => ({
  type: SET_USER,
  user
})

export const removeUser = () => ({
  type: REMOVE_USER,
})

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


export const logout = (email, password) => {
  return async(dispatch) => {
      // console.log(`THE PUT REQUEST: ${email}, ${password}`)
      const response = await fetch('/api/session', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
      });

      if(response.ok){
        const data = await response.json()
        dispatch(removeUser());
      }

  }
}




export default function reducer(state=loadUser(), action) {
  switch (action.type) {
    case (SET_USER): {
      return action.user;
    }
    case REMOVE_USER: {
      return {};
    }
    default: {
      return state;
    }
  }
}

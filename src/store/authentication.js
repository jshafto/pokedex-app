export const SET_USER = 'pokedex/authentication/SET_USER';

export const setUser = (user) => ({
  type: SET_USER,
  user
})

export const login = (email, password) => {
    return async(dispatch) => {
        const response = await fetch('http://localhost:8000/api/session', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json()
        dispatch(setUser(data.player));

    }
}




export default function reducer(state={}, action) {
  switch (action.type) {
    case (SET_USER): {
      return action.user;
    }
    default: {
      return state;
    }
  }
}

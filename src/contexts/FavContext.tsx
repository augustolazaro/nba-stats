import * as React from 'react'

type State = {
  favPlayers: Array<string>,
  favTeams: Array<string>,
}
const initialState: State = {
  favPlayers: [],
  favTeams: [],
}

const reducer = (state: State, action: any) => {
  const { payload, type } = action
  const { id, fav } = payload 

  switch(type) {
    case 'add':
      // @ts-ignore
      return { ...state, [fav]: [...state[fav], id] }
    case 'remove':
      // @ts-ignore
      return { ...state, [fav]: state[fav].filter(favId => favId !== id) }
    default:
      return initialState
  }
}

const Context = React.createContext({ state: initialState, dispatch: (state: State, action: any) => {} })
function ContextProvider (props: any) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>
}

export { Context, ContextProvider }
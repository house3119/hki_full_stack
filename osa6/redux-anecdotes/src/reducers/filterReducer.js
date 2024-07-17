const filterReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'FILTER': {
      return action.payload
    }
    default: {
      return state
    }
  }
}

export const filter = (text) => {
  return {
    type: 'FILTER',
    payload: text
  }
}

export default filterReducer
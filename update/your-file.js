class Immutable {
  static execute(state, command) {
    const visitor = (state, parentKey, parentState) => ([key, command]) => {
      if (key === '$set') {
        Object.keys(state).forEach(stateKey => {
          delete state[stateKey]
        })
        Object.keys(command).forEach(commandKey => {
          state[commandKey] = command[commandKey]
        })
      }

      if (command.$set) {
        parentState[parentKey][key] = command.$set
      }

      if (key === '$push') {
        state.push(...command)
      }

      if (command.$push) {
        state[key].push(...command.$push)
      }

      if (key === '$unshift') {
        state.unshift(...command)
      }

      if (command.$unshift) {
        state[key].unshift(...command.$unshift)
      }

      if (key === '$merge') {
        Object.assign(state, command)
      }

      if (command.$merge) {
        Object.assign(state[key], command.$merge)
      }

      if (key === '$apply') {
        state = command(state)
      }

      if (command.$apply) {
        state[key] = command.$apply(state[key])
      }

      if (key === '$splice') {
        command.forEach(([startIndex, deleteCount, newElement]) => {
          state.splice(startIndex, deleteCount, newElement)
        })
      }

      if (command.$splice) {
        command.$splice.forEach(([startIndex, deleteCount, newElement]) => {
          state[key].splice(startIndex, deleteCount, newElement)
        })
      }

      if (typeof state[key] === 'object' && !Array.isArray(state[key])) {
        Object.entries(command).forEach(visitor(state[key], key, state))
      }
    }

    if (typeof state !== 'object') {
      if (command.$set) {
        return command.$set
      }

      if (command.$apply) {
        return command.$apply(state)
      }
    }

    Object.entries(command).forEach(visitor(state))
    if (typeof state === 'object' && !Array.isArray(state)) {
      return state
    }

    return state
  }
}

module.exports = Immutable.execute

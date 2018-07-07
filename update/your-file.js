const COMMAND_LIST = ['$set', '$push', '$unshift', '$merge', '$apply', '$splice']

class Command {
  static execute(state, command) {
    if (command.$set) {
      state = command.$set
      return state
    }

    if (command.$push) {
      state.push(...command.$push)
      return state
    }

    if (command.$unshift) {
      state.unshift(...command.$unshift)
      return state
    }

    if (command.$merge) {
      Object.assign(state, command.$merge)
      return state
    }

    if (command.$apply) {
      state = command.$apply(state)
      return state
    }

    if (command.$splice && Array.isArray(state)) {
      command.$splice.forEach(([index, count, newElement]) => {
        state.splice(index, count, newElement)
      })
      return state
    }

    return state
  }
}

module.exports = (state, command) => Command.execute(state, command)

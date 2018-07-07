class Immutable {
  static execute(state, command) {
    const visitor = (currentState, parentKey, parentState) => ([key, command]) => {
      const LIGHT_COMMAND_MAP = {
        $set() {
          Object.keys(currentState).forEach(stateKey => {
            delete currentState[stateKey]
          })
          Object.keys(command).forEach(commandKey => {
            currentState[commandKey] = command[commandKey]
          })
        },
        $push() {
          currentState.push(...command)
        },
        $unshift() {
          currentState.unshift(...command)
        },
        $merge() {
          Object.assign(currentState, command)
        },
        $splice() {
          command.forEach(([startIndex, deleteCount, newElement]) => {
            currentState.splice(startIndex, deleteCount, newElement)
          })
        }
      }

      if (LIGHT_COMMAND_MAP[key]) {
        LIGHT_COMMAND_MAP[key]()
        return
      }

      if (command.$set) {
        console.log({ key, currentState, parentState, parentKey })
        parentState[parentKey] = { ...parentState[parentKey], [key]: command.$set }
        console.log({ key, currentState, parentState })
      }

      if (command.$push) {
        currentState[key].push(...command.$push)
      }

      if (command.$unshift) {
        currentState[key].unshift(...command.$unshift)
      }

      if (command.$merge) {
        Object.assign(currentState[key], command.$merge)
      }

      if (command.$apply) {
        currentState[key] = command.$apply(currentState[key])
      }

      if (command.$splice) {
        command.$splice.forEach(([startIndex, deleteCount, newElement]) => {
          currentState[key].splice(startIndex, deleteCount, newElement)
        })
      }

      if (typeof currentState[key] === 'object' && !Array.isArray(currentState[key])) {
        Object.entries(command).forEach(visitor(currentState[key], key, currentState))
      }
    }

    // string/number 등 예외 케이스에 대한 예외 코드
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

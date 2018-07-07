const COMMAND_LIST = ['$set', '$push', '$unshift', '$merge', '$apply', '$splice']

class Command {
  static execute(currentState, [key, value]) {
    console.log({ currentState, key, value, children: value[key], type: typeof value })

    return currentState

    return Object.entries(value).reduce(Command.execute, currentState[key])

    // if (!value) {
    //   return currentState
    // }

    // console.log({ currentState, key, value })
    // if (value.$set) {
    //   currentState[key] = value.$set
    // }

    // if (value.$push) {
    //   currentState[key].push(value.$push)
    // }

    // if (value.$unshift) {
    //   currentState[key].unshift(value.$unshift)
    // }

    // if (value.$merge) {
    //   Object.assign(currentState[key], value.$merge)
    // }

    // if (value.$apply) {
    //   currentState[key] = value.$apply(currentState[key])
    // }

    // if (value.$splice) {
    //   value.$splice.forEach(([index, count, newElement]) => {
    //     currentState[key].splice(index, count, newElement)
    //   })
    // }
  }
}

module.exports = (state, command) => Object.entries(command).reduce(Command.execute, state)

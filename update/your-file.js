const COMMAND_LIST = ['$set', '$push', '$unshift', '$merge', '$apply', '$splice']

class Command {
  static execute(state, command) {
    console.log(state, command)
  }
}

module.exports = (state, command) => Command.execute(state, command)

// class Command {
//   static execute(state, command) {
//     Command._set(state, command)
//     Command._push(state, command)
//     Command._unshift(state, command)
//     Command._merge(state, command)
//     Command._apply(state, command)
//     Command._splice(state, command)

//     if (typeof state !== 'object') {
//       return state
//     }

//     for (const [key, value] of Object.entries(command)) {
//       Object.entries(value).reduce(Command.execute, state[key])
//     }

//     return state
//   }

//   static _set(state, command) {
//     if (!command.$set) {
//       return
//     }

//     state = command.$set
//   }

//   static _push(state, command) {
//     if (!command.$push) {
//       return
//     }

//     state.push(...command.$push)
//   }

//   static _unshift(state, command) {
//     if (!command.$unshift) {
//       return
//     }

//     state.unshift(...command.$unshift)
//   }

//   static _merge(state, command) {
//     if (!command.$merge) {
//       return
//     }

//     Object.assign(state, command.$merge)
//   }

//   static _apply(state, command) {
//     if (!command.$apply) {
//       return
//     }

//     state = command.$apply(state)
//   }

//   static _splice(state, command) {
//     if (!Array.isArray(state)) {
//       return
//     }

//     if (!command.$splice) {
//       return
//     }

//     command.$splice.forEach(([index, count, newElement]) => {
//       state.splice(index, count, newElement)
//     })
//   }
// }

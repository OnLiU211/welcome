module.exports.Immutable = class Immutable {
  static execute(state, command) {
    Object.entries(command).forEach(([key0, command0]) => {
      if (command0.$set) {
        state[key0] = command0.$set
      }

      Object.entries(command0).forEach(([key1, command1]) => {
        if (command1.$set) [(state[key0][key1] = command1.$set)]

        // Object.entries(command1).forEach(([key2, command2]) => {
        //   state[key0][key1][key2] = command2.$set
        // })
      })
    })

    return state
  }
}

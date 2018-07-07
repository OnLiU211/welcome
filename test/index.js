const { Immutable } = require('../src')

const state = {
  a: {
    b: {
      c: 1
    }
  }
}

const command = {
  a: {
    b: {
      $set: {
        c: 2
      }
    }
  }
}

const nextState = Immutable.execute(state, command)
console.log(nextState)

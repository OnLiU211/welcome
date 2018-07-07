const update = require('./your-file') // <- this is the file you make;

describe('update', () => {
  describe('has a #$set method that', () => {
    let state
    let commands
    let nextState
    beforeEach(() => {
      state = {
        a: {
          b: 22,
          c: 33
        },
        unChanged: {}
      }
      commands = { a: { c: { $set: 44 } } }
      nextState = update(state, commands)
    })

    it('changes the tree on the directive', () => {
      expect(state.a.c).not.toBe(nextState.a.c)
    })

    it('reuses state on different branches', () => {
      expect(state.unChanged).toBe(nextState.unChanged)
    })
  })

  describe.skip("can pass react's test suite", () => {
    it.skip('should support set', () => {
      expect(update({ a: 'b' }, { $set: { c: 'd' } })).toEqual({ c: 'd' })
    })

    it.skip('should support push', () => {
      expect(update([1], { $push: [7] })).toEqual([1, 7])
    })

    it.skip('should support unshift', () => {
      expect(update([1], { $unshift: [7] })).toEqual([7, 1])
    })

    it.skip('should support merge', () => {
      expect(update({ a: 'b' }, { $merge: { c: 'd' } })).toEqual({
        a: 'b',
        c: 'd'
      })
    })

    it.skip('should support apply', () => {
      expect(
        update(2, {
          $apply: function(x) {
            return x * 2
          }
        })
      ).toBe(4)
    })

    it.skip('should support deep updates', () => {
      expect(update({ a: 'b', c: { d: 'e' } }, { c: { d: { $set: 'f' } } })).toEqual({
        a: 'b',
        c: { d: 'f' }
      })
    })

    it.skip('should support splice', () => {
      expect(update([1, 4, 3], { $splice: [[1, 1, 2]] })).toEqual([1, 2, 3])
    })
  })
})

const { Engine } = require('@truong8864/json-rules-engine')


/**
 * Setup a new engine
 */
let engine = new Engine()

// Add rule 1
engine.addRule({
  conditions: {
    any: [{
      all: [{
        fact: 'gameDuration',
        operator: 'equal',
        value: 40
      }, {
        fact: 'personalFoulCount',
        operator: 'greaterThanInclusive',
        value: 5
      }]
    }, {
      all: [{
        fact: 'gameDuration',
        operator: 'equal',
        value: 48
      }, {
        fact: 'personalFoulCount',
        operator: 'greaterThanInclusive',
        value: 6
      }]
    }]
  },
  event: {  // define the event to fire when the conditions evaluate truthy
    type: 'fouledOutRule1',
    params: {
      message: 'Player has fouled out!'
    }
  }
})

// Add rule 2
engine.addRule({
  conditions: {
    any: [{
      all: [{
        fact: 'gameDuration',
        operator: 'equal',
        value: 40
      }, {
        fact: 'personalFoulCount',
        operator: 'greaterThanInclusive',
        value: 5
      }]
    }, {
      all: [{
        fact: 'gameDuration',
        operator: 'equal',
        value: 48
      }, {
        fact: 'personalFoulCount',
        operator: 'greaterThanInclusive',
        value: 6
      }]
    }]
  },
  event: {  // define the event to fire when the conditions evaluate truthy
    type: 'fouledOutRule2',
    params: {
      message: 'Player has fouled out!'
    }
  }
})

/**
 * Define facts the engine will use to evaluate the conditions above.
 * Facts may also be loaded asynchronously at runtime; see the advanced example below
 */
let facts = {
  personalFoulCount: 6,
  gameDuration: 40
}

// Run synchronous the engine to evaluate
async function testRunSync () {
  for await (const result of engine.runSync(facts)) {
    if (result.result) {
      console.log('SUCCESS', result)
    } else {
      console.log('FAILURE', result)
    }

    break; // Closes iterator, triggers return
  }
}
testRunSync()


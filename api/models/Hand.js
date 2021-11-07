const mongoose = require('mongoose') 


// como hacer nested schema?
// https://stackoverflow.com/questions/39596625/nested-objects-in-mongoose-schemas
// lo hice utilizando un convertidor de JSON to MONGOOSE SCHEMA
const HandSchema = new mongoose.Schema( 
  {
    "preflop": {
      "heroCards": {
        "type": [
          "Mixed"
        ]
      },
      "heroPosition": {
        "type": "String"
      },
      "notes": {
        "type": [
          "String"
        ]
      }
    },
    "flop": {
      "situation": {
        "type": "String"
      },
      "boardCards": {
        "type": [
          "Mixed"
        ]
      },
      "boardType": {
        "type": "String"
      },
      "decision": {
        "type": "String"
      },
      "villainType": {
        "type": "String"
      },
      "notes": {
        "type": [
          "String"
        ]
      }
    },
    "turn": {
      "situation": {
        "type": "String"
      },
      "boardCards": {
        "carta": {
          "type": "Number"
        },
        "color": {
          "type": "String"
        }
      },
      "boardType": {
        "type": "String"
      },
      "decision": {
        "type": "String"
      },
      "villainType": {
        "type": "String"
      },
      "notes": {
        "type": [
          "String"
        ]
      }
    },
    "river": {
      "situation": {
        "type": "String"
      },
      "boardCards": {
        "carta": {
          "type": "Number"
        },
        "color": {
          "type": "String"
        }
      },
      "boardType": {
        "type": "String"
      },
      "decision": {
        "type": "String"
      },
      "villainType": {
        "type": "String"
      },
      "notes": {
        "type": [
          "String"
        ]
      }
    }
  }


);

module.exports = mongoose.model('Hand', HandSchema)
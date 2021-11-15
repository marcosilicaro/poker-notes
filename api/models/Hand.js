const mongoose = require('mongoose') 


// como hacer nested schema?
// https://stackoverflow.com/questions/39596625/nested-objects-in-mongoose-schemas
// lo hice utilizando un convertidor de JSON to MONGOOSE SCHEMA
const HandSchema = new mongoose.Schema( 
  {
    "preflop": {"type": "Mixed"
    },
    "flop":  {"type": "Mixed"
  },
    "turn":  {"type": "Mixed"
  },
    "river": {"type": "Mixed"
  }
  }


);

module.exports = mongoose.model('Hand', HandSchema)
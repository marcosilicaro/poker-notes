import './addhands.css'
import HandSelector from '../HandSelector/HandSelector'

function Addhands() {
    return (
    <div className="featured">
      <div className="featuredItem">
        <center>
        <span className="featuredTitle">
            Preflop
        </span>
          <HandSelector/>
        </center>
      </div>      
    </div>
    )
}

export default Addhands

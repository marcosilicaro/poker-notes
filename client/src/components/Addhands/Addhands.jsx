import './addhands.css'
import axios from '../../axios'

function Addhands() {


  const handleSubmit = (e) => {
    e.preventDefault();
     axios.post("/createHand", {
        "preflop": {
          "heroCards": [
            {
              "carta": document.getElementById("carta-1-preflop").value,
              "color": document.getElementById("colorCarta-1-preflop").value
            },
            {
              "carta": document.getElementById("carta-2-preflop").value,
              "color": document.getElementById("colorCarta-2-preflop").value
            }
          ],
          "heroIniciativa": document.getElementById("heroIniciativa").value,
          "heroPosition":  document.getElementById("heroPosition").value,
          "heroExactPosition": document.getElementById("heroExactPosition").value,
          "notes": [
            document.getElementById("preflopNotes").value
          ]
        },
        "flop": {
          "situation": "pfhor",
          "boardCards": [
            {
              "carta": "2",
              "color": "azul"
            },
            {
              "carta": "J",
              "color": "negro"
            },
            {
              "carta": "6",
              "color": "verde"
            }
          ],
          "heroIniciativa": "CI",
          "boardType": "seco",
          "decision": "xxx",
          "villainType": "aggro",
          "notes": [
            "xxx"
          ]
        },
        "turn": {
          "boardCards": {
            "carta": 3,
            "color": "rojo"
          },
          "heroIniciativa": "CI",
          "situation": "fh2b",
          "boardType": "seco",
          "decision": "xxx",
          "villainType": "aggro",
          "notes": [
            "call a todo porque es aggro"
          ]
        },
        "river": {
          "boardCards": {
            "carta": "A",
            "color": "rojo"
          },
          "heroIniciativa": "CI",
          "situation": "th3b",
          "boardType": "ofensivo",
          "decision": "check",
          "villainType": "aggro",
          "notes": [
            "xxx"
          ]
        }
    });
  };

    return (
      <div className="newProduct">

        <h1 className="addProductTitle">New Hand</h1>

        <h2>Preflop</h2>
          <form className="addProductForm preflop">
            <div className="addProductItem">
              <label>Posicion</label>
              <select name="Posicion" id="heroPosition" defaultValue='-' >
                <option value="-">-</option>
                <option value="OOP">OOP</option>
                <option value="IP">IP</option>
              </select>
              <label>Table Position</label>
              <select name="Table Position" id="heroExactPosition" defaultValue='-'  >
                <option value="-">-</option>
                <option value="SB">SB</option>
                <option value="BB">BB</option>
                <option value="UTG">UTG</option>
                <option value="HJ">HJ</option>
                <option value="CO">CO</option>
                <option value="BTN">BTN</option>
              </select>
              <label>Iniciativa</label>
              <select name="Iniciativa" id="heroIniciativa" defaultValue='-'  >
                <option value="-">-</option>
                <option value="SI">SIN INICIATIVA</option>
                <option value="CI">CON INICIATIVA</option>
              </select>
              <label>Notes</label>
              <textarea
                type="text"
                placeholder="Notas-preflop"
                name="Notas-preflop"
                className="notes"
                id="preflopNotes"
              />
            </div>
            <div className="addProductItem cartas-box">
              <label>Carta 1 PREFLOP</label>
              <select name="Iniciativa" id="carta-1-preflop" defaultValue='-'  >
                <option value="-">-</option> 
                <option value="A" >A</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="T">T</option>
                <option value="J">J</option>
                <option value="Q">Q</option>
                <option value="K">K</option>
              </select>
              <select name="Iniciativa" id="colorCarta-1-preflop" defaultValue='-'  >
                <option value="-">-</option>
                <option value="negro">PICAS - NEGRO</option>
                <option value="verde">TREBOLES - VERDE</option>
                <option value="azul">DIAMANTES - AZUL</option>
                <option value="rojo">CORAZONES - ROJO</option>
              </select>
              <label>Carta 2 PREFLOP</label>
              <select name="Iniciativa" id="carta-2-preflop"  defaultValue='-'  >
                <option value="-">-</option>
                <option value="A" >A</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="T">T</option>
                <option value="J">J</option>
                <option value="Q">Q</option>
                <option value="K">K</option>
              </select>
              <select name="Iniciativa" id="colorCarta-2-preflop"  defaultValue='-'  >
                <option value="-">-</option>
                <option value="negro">PICAS - NEGRO</option>
                <option value="verde">TREBOLES - VERDE</option>
                <option value="azul">DIAMANTES - AZUL</option>
                <option value="rojo">CORAZONES - ROJO</option>
              </select>
              <br/>
              <button onClick={handleSubmit}>SEND</button>
            </div>
          </form>
          
          <h2>Flop</h2>
          <form className="addProductForm preflop">
            <div className="addProductItem">
              <label>Iniciativa</label>
              <select name="Iniciativa" id="Iniciativa" >
                <option value="SI">SIN INICIATIVA</option>
                <option value="CI">CON INICIATIVA</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Carta 1 PREFLOP</label>
              <select name="Iniciativa" id="Iniciativa" >
                <option value="A" >A</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="T">T</option>
                <option value="J">J</option>
                <option value="Q">Q</option>
                <option value="K">K</option>
              </select>
              <select name="Iniciativa" id="Iniciativa" >
                <option value="negro">PICAS - NEGRO</option>
                <option value="verde">TREBOLES - VERDE</option>
                <option value="azul">DIAMANTES - AZUL</option>
                <option value="rojo">CORAZONES - ROJO</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Carta 2 PREFLOP</label>
              <select name="Iniciativa" id="Iniciativa" >
                <option value="A" >A</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="T">T</option>
                <option value="J">J</option>
                <option value="Q">Q</option>
                <option value="K">K</option>
              </select>
              <select name="Iniciativa" id="Iniciativa" >
                <option value="negro">PICAS - NEGRO</option>
                <option value="verde">TREBOLES - VERDE</option>
                <option value="azul">DIAMANTES - AZUL</option>
                <option value="rojo">CORAZONES - ROJO</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Notes</label>
              <input
                type="text"
                placeholder="Notas-preflop"
                name="Notas-preflop"
              />
            </div>
          </form>

    </div>
    )
}

export default Addhands

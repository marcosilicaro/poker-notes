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
          "heroIniciativa": document.getElementById("preflop.heroIniciativa").value,
          "heroPosition":  document.getElementById("heroPosition").value,
          "heroExactPosition": document.getElementById("heroExactPosition").value,
          "notes": [
            document.getElementById("preflopNotes").value
          ]
        },
        "flop": {
          "situation": document.getElementById("flopSituation").value,
          "boardCards": [
            {
              "carta": document.getElementById("carta-1-flop").value,
              "color": document.getElementById("colorCarta-1-flop").value
            },
            {
              "carta": document.getElementById("carta-2-flop").value,
              "color": document.getElementById("colorCarta-2-flop").value
            },
            {
              "carta": document.getElementById("carta-3-flop").value,
              "color": document.getElementById("colorCarta-3-flop").value
            }
          ],
          "heroIniciativa": document.getElementById("flop.heroIniciativa").value,
          "boardType": document.getElementById("flop.boardType").value,
          "decision": document.getElementById("flop.decision").value,
          "villainType": "",
          "notes": [
            document.getElementById("flop.notes").value
          ]
        },
        "turn": {
          "boardCards": {
            "carta": document.getElementById("carta-1-turn").value,
            "color": document.getElementById("colorCarta-1-turn").value
          },
          "heroIniciativa": document.getElementById("turn.heroIniciativa").value,
          "situation": document.getElementById("turnSituation").value,
          "boardType": document.getElementById("turn.boardType").value,
          "decision": document.getElementById("turn.decision").value,
          "villainType": "",
          "notes": [
            document.getElementById("turn.notes").value
          ]
        },
        "river": {
          "boardCards": {
            "carta": document.getElementById("carta-1-river").value,
            "color": document.getElementById("colorCarta-1-river").value
          },
          "heroIniciativa": document.getElementById("river.heroIniciativa").value,
          "situation": document.getElementById("riverSituation").value,
          "boardType": document.getElementById("river.boardType").value,
          "decision": document.getElementById("river.decision").value,
          "villainType": "",
          "notes": [
            document.getElementById("river.notes").value
          ]
        }
    });
  };

    return (
      <div className="newProduct">
        <h1 className="addProductTitle">New Hand</h1>
          <form className="addProductForm">

          <h2>Preflop</h2><br/>
          <div className='divider'>
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
              <select name="Iniciativa" id="preflop.heroIniciativa" defaultValue='-'  >
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
              <select name="carta-1-preflop" id="carta-1-preflop" defaultValue='-'  >
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
              <select name="colorCarta-1-preflop" id="colorCarta-1-preflop" defaultValue='-'  >
                <option value="-">-</option>
                <option value="negro">PICAS - NEGRO</option>
                <option value="verde">TREBOLES - VERDE</option>
                <option value="azul">DIAMANTES - AZUL</option>
                <option value="rojo">CORAZONES - ROJO</option>
              </select>
              <label>Carta 2 PREFLOP</label>
              <select name="carta-2-preflop" id="carta-2-preflop"  defaultValue='-'  >
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
            </div>
          </div>
            
          <h2>Flop</h2>
          <div className='divider'>
            <div className="addProductItem cartas-box">
              <label>Carta 1 FLOP</label>
              <select name="carta-1-flop" id="carta-1-flop" defaultValue='-'  >
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
              <select name="colorCarta-1-flop" id="colorCarta-1-flop" defaultValue='-'  >
                <option value="-">-</option>
                <option value="negro">PICAS - NEGRO</option>
                <option value="verde">TREBOLES - VERDE</option>
                <option value="azul">DIAMANTES - AZUL</option>
                <option value="rojo">CORAZONES - ROJO</option>
              </select>
              <label>Carta 2 FLOP</label>
              <select name="carta-2-flop" id="carta-2-flop"  defaultValue='-'  >
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
              <select name="colorCarta-2-flop" id="colorCarta-2-flop" defaultValue='-'  >
                <option value="-">-</option>
                <option value="negro">PICAS - NEGRO</option>
                <option value="verde">TREBOLES - VERDE</option>
                <option value="azul">DIAMANTES - AZUL</option>
                <option value="rojo">CORAZONES - ROJO</option>
              </select>
              <label>Carta 3 FLOP</label>
              <select name="carta-3-flop" id="carta-3-flop"  defaultValue='-'  >
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
              <select name="colorCarta-3-flop" id="colorCarta-3-flop"  defaultValue='-'  >
                <option value="-">-</option>
                <option value="negro">PICAS - NEGRO</option>
                <option value="verde">TREBOLES - VERDE</option>
                <option value="azul">DIAMANTES - AZUL</option>
                <option value="rojo">CORAZONES - ROJO</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Iniciativa</label>
              <select name="Iniciativa" id="flop.heroIniciativa" defaultValue='-'  >
                <option value="-">-</option>
                <option value="SI">SIN INICIATIVA</option>
                <option value="CI">CON INICIATIVA</option>
              </select>
              <label>Situacion</label>
              <select name="Situation" id="flopSituation" defaultValue='-'  >
                <option value="-">-</option>
                <optgroup label="IP-Con Iniciativa">
                    <option value="H OR en preflop">H OR en preflop</option>
                    <option value="H 3bet en preflop">H 3bet en preflop</option>
                    <option value="H 4bet en preflop">H 4bet en preflop</option>
                </optgroup>
                <optgroup label="IP-Sin Iniciativa">
                    <option value="vs OR en preflop">vs OR en preflop</option>
                    <option value="vs 3bet en preflop">vs 3bet en preflop</option>
                    <option value="vs 4bet en preflop">vs 4bet en preflop</option>
                </optgroup>
                <optgroup label="OOP-Con Iniciativa">
                    <option value="H OR en preflop">H OR en preflop</option>
                    <option value="H 3bet en preflop">H 3bet en preflop</option>
                    <option value="H 4bet en preflop">H 4bet en preflop</option>
                </optgroup>
                <optgroup label="OOP-Sin Iniciativa">
                    <option value="vs OR en preflop">vs OR en preflop</option>
                    <option value="vs 3bet en preflop">vs 3bet en preflop</option>
                    <option value="vs 4bet en preflop">vs 4bet en preflop</option>
                </optgroup>
              </select>
              <label>Board Type</label>
              <select name="Board Type" id="flop.boardType" defaultValue='-'  >
                <option value="-">-</option>
                <option value="SECO">SECO</option>
                <option value="SEMI MOJADO">SEMI MOJADO</option>
                <option value="OFENSIVO">OFENSIVO</option>
                <option value="MOJADO">MOJADO</option>
              </select>
              <label>Decision</label>
              <select name="Decision" id="flop.decision" defaultValue='-'  >
                <option value="-">-</option>
                <option value="SI">CHECK/CALL</option>
                <option value="CI">CHECK/FOLD</option>
                <option value="CI">CHECK/RAISE</option>
                <option value="CI">CHECK BEHIND</option>
                <option value="CI">BET</option>
              </select>
              
              <label>Notes</label>
              <textarea
                type="text"
                placeholder="Notas-preflop"
                name="Notas-preflop"
                className="notes"
                id="flop.notes"
              />
            </div>
          </div>

          <h2>Turn</h2>
          <div className='divider'>
            <div className="addProductItem cartas-box">
              <label>Carta 1 TURN</label>
              <select name="carta-1-turn" id="carta-1-turn" defaultValue='-'  >
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
              <select name="colorCarta-1-turn" id="colorCarta-1-turn" defaultValue='-'  >
                <option value="-">-</option>
                <option value="negro">PICAS - NEGRO</option>
                <option value="verde">TREBOLES - VERDE</option>
                <option value="azul">DIAMANTES - AZUL</option>
                <option value="rojo">CORAZONES - ROJO</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Iniciativa</label>
              <select name="Iniciativa" id="turn.heroIniciativa" defaultValue='-'  >
                <option value="-">-</option>
                <option value="SI">SIN INICIATIVA</option>
                <option value="CI">CON INICIATIVA</option>
              </select>
              <label>Situacion</label>
              <select name="Situation" id="turnSituation" defaultValue='-'  >
                <option value="-">-</option>
                <optgroup label="IP-Con Iniciativa">
                    <option value="H 2nd barrel en flop">H 2nd barrel en flop</option>
                    <option value="H 3bet en flop">H 3bet en flop</option>
                    <option value="H 4bet en flop">H 4bet en flop</option>
                </optgroup>
                <optgroup label="IP-Sin Iniciativa">
                    <option value="vs 2nd barrel en flop">vs 2nd barrel en flop</option>
                    <option value="vs 3bet en flop">vs 3bet en flop</option>
                    <option value="vs 4bet en flop">vs 4bet en flop</option>
                </optgroup>
                <optgroup label="OOP-Con Iniciativa">
                    <option value="H 2nd barrel en flop">H 2nd barrel en flop</option>
                    <option value="H 3bet en flop">H 3bet en flop</option>
                    <option value="H 4bet en flop">H 4bet en flop</option>
                </optgroup>
                <optgroup label="OOP-Sin Iniciativa">
                    <option value="vs 2nd barrel en flop">vs 2nd barrel en flop</option>
                    <option value="vs 3bet en flop">vs 3bet en flop</option>
                    <option value="vs 4bet en flop">vs 4bet en flop</option>
                </optgroup>
              </select>
              <label>Board Type</label>
              <select name="Board Type" id="turn.boardType" defaultValue='-'  >
                <option value="-">-</option>
                <option value="SECO">SECO</option>
                <option value="SEMI MOJADO">SEMI MOJADO</option>
                <option value="OFENSIVO">OFENSIVO</option>
                <option value="MOJADO">MOJADO</option>
              </select>
              <label>Decision</label>
              <select name="Decision" id="turn.decision" defaultValue='-'  >
                <option value="-">-</option>
                <option value="SI">CHECK/CALL</option>
                <option value="CI">CHECK/FOLD</option>
                <option value="CI">CHECK/RAISE</option>
                <option value="CI">CHECK BEHIND</option>
                <option value="CI">BET</option>
              </select>
              
              <label>Notes</label>
              <textarea
                type="text"
                placeholder="Notas-preflop"
                name="Notas-preflop"
                className="notes"
                id="turn.notes"
              />
            </div>
          </div> 

          <h2>River</h2>
          <div className='divider'>
            <div className="addProductItem cartas-box">
              <label>Carta 1 RIVER</label>
              <select name="carta-1-river" id="carta-1-river" defaultValue='-'  >
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
              <select name="colorCarta-1-river" id="colorCarta-1-river" defaultValue='-'  >
                <option value="-">-</option>
                <option value="negro">PICAS - NEGRO</option>
                <option value="verde">TREBOLES - VERDE</option>
                <option value="azul">DIAMANTES - AZUL</option>
                <option value="rojo">CORAZONES - ROJO</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Iniciativa</label>
              <select name="Iniciativa" id="river.heroIniciativa" defaultValue='-'  >
                <option value="-">-</option>
                <option value="SI">SIN INICIATIVA</option>
                <option value="CI">CON INICIATIVA</option>
              </select>
              <label>Situacion</label>
              <select name="Situation" id="riverSituation" defaultValue='-'  >
                <option value="-">-</option>
                <optgroup label="IP-Con Iniciativa">
                    <option value="H 3rd barrel en turn">H 3rd barrel en turn</option>
                    <option value="H 3bet en turn">H 3bet en turn</option>
                    <option value="H 4bet en turn">H 4bet en turn</option>
                </optgroup>
                <optgroup label="IP-Sin Iniciativa">
                    <option value="vs 3rd barrel en turn">vs 3rd barrel en turn</option>
                    <option value="vs 3bet en turn">vs 3bet en turn</option>
                    <option value="vs 4bet en turn">vs 4bet en turn</option>
                </optgroup>
                <optgroup label="OOP-Con Iniciativa">
                    <option value="H 3rd barrel en turn">H 3rd barrel en turn</option>
                    <option value="H 3bet en turn">H 3bet en turn</option>
                    <option value="H 4bet en turn">H 4bet en turn</option>
                </optgroup>
                <optgroup label="OOP-Sin Iniciativa">
                    <option value="vs 3rd barrel en turn">vs 3rd barrel en turn</option>
                    <option value="vs 3bet en turn">vs 3bet en turn</option>
                    <option value="vs 4bet en turn">vs 4bet en turn</option>
                </optgroup>
              </select>
              <label>Board Type</label>
              <select name="Board Type" id="river.boardType" defaultValue='-'  >
                <option value="-">-</option>
                <option value="SECO">SECO</option>
                <option value="SEMI MOJADO">SEMI MOJADO</option>
                <option value="OFENSIVO">OFENSIVO</option>
                <option value="MOJADO">MOJADO</option>
              </select>
              <label>Decision</label>
              <select name="Decision" id="river.decision" defaultValue='-'  >
                <option value="-">-</option>
                <option value="SI">CHECK/CALL</option>
                <option value="CI">CHECK/FOLD</option>
                <option value="CI">CHECK/RAISE</option>
                <option value="CI">CHECK BEHIND</option>
                <option value="CI">BET</option>
              </select>
              
              <label>Notes</label>
              <textarea
                type="text"
                placeholder="Notas"
                name="Notas"
                className="notes"
                id="river.notes"
              />
            </div>
          </div> 
            
              <button onClick={handleSubmit}>SEND</button>
              <br/><br/><br/><br/>
          </form>
        </div>
    )
}

export default Addhands

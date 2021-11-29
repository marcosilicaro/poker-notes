import './addhands.css'
import axios from '../../axios'
import { useState } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';


function Addhands() {




  const [positionExist, setpositionExist] = useState('-')

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
        "heroPosition": document.getElementById("heroPosition").value,
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
        "boardType": document.getElementById("flop.boardType").value.toLowerCase(),
        "decision": document.getElementById("flop.decision").value,
        "flopCheckCall": document.getElementById("flopCheckCall").value,
        "flopCheckFold": document.getElementById("flopCheckFold").value,
        "flopCheckRaise": document.getElementById("flopCheckRaise").value,
        "flopCheckBehind": document.getElementById("flopCheckBehind").value,
        "flopBet": document.getElementById("flopBet").value,
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
        "boardType": document.getElementById("turn.boardType").value.toLowerCase(),
        "decision": document.getElementById("turn.decision").value,
        "turnCheckCall": document.getElementById("turnCheckCall").value,
        "turnCheckFold": document.getElementById("turnCheckFold").value,
        "turnCheckRaise": document.getElementById("turnCheckRaise").value,
        "turnCheckBehind": document.getElementById("turnCheckBehind").value,
        "turnBet": document.getElementById("turnBet").value,
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
        "boardType": document.getElementById("river.boardType").value.toLowerCase(),
        "decision": document.getElementById("river.decision").value,
        "riverCheckCall": document.getElementById("riverCheckCall").value,
        "riverCheckFold": document.getElementById("riverCheckFold").value,
        "riverCheckRaise": document.getElementById("riverCheckRaise").value,
        "riverCheckBehind": document.getElementById("riverCheckBehind").value,
        "riverBet": document.getElementById("riverBet").value,
        "villainType": "",
        "notes": [
          document.getElementById("river.notes").value
        ]
      }
    });
    alert('mano subida')

    window.scrollTo(0, 0)
    window.location.reload()

  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Hand</h1>
      <form className="addProductForm">
        {/* PREFLOP SECTION */}
        <h2>Preflop</h2><br />
        <div className='divider'>
          {/* CARTAS PREFLOP */}
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
            <select name="carta-2-preflop" id="carta-2-preflop" defaultValue='-'  >
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
            <select name="Iniciativa" id="colorCarta-2-preflop" defaultValue='-'  >
              <option value="-">-</option>
              <option value="negro">PICAS - NEGRO</option>
              <option value="verde">TREBOLES - VERDE</option>
              <option value="azul">DIAMANTES - AZUL</option>
              <option value="rojo">CORAZONES - ROJO</option>
            </select>
          </div>
          {/* POS - TABLE POS - INI */}
          <div className="addProductItem" >
            <label>Posicion</label>
            <select
              name="heroPosition"
              id="heroPosition"
              defaultValue='-'
              className={positionExist === '-' ? 'background-rojo' : 'background-negro'}
              onChange={(e) => {
                document.getElementById("heroPositionPija").value = e.currentTarget.value
                document.getElementById("heroPositionPija2").value = e.currentTarget.value
                document.getElementById("heroPositionPija3").value = e.currentTarget.value
                setpositionExist('true')
              }
              }>
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

          </div>
          {/* NOTES */}
          <div className="addProductItem">
            <label>Notes</label>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Notas-preflop"
              name="Notas-preflop"
              id="preflopNotes"
              style={{ width: 400 }}
            />
          </div>
        </div>
        {/* FLOP SECTION */}
        <h2>Flop</h2>
        {/* PRIMERA LINEA */}
        <div className='divider'>
          {/* CARTAS FLOP */}
          <div className="addProductItem cartas-box">
            <label>Carta 1 FLOP</label>
            <select name="carta-1-flop" id="carta-1-flop"  >
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
            <select name="carta-2-flop" id="carta-2-flop" defaultValue='-'  >
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
            <select name="carta-3-flop" id="carta-3-flop" defaultValue='-'  >
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
            <select name="colorCarta-3-flop" id="colorCarta-3-flop" defaultValue='-'  >
              <option value="-">-</option>
              <option value="negro">PICAS - NEGRO</option>
              <option value="verde">TREBOLES - VERDE</option>
              <option value="azul">DIAMANTES - AZUL</option>
              <option value="rojo">CORAZONES - ROJO</option>
            </select>
          </div>
          {/* POS - INI - SIT - BOARD - DECI */}
          <div className="addProductItem">
            <label>Posicion</label>
            <select name="heroPosition" id="heroPositionPija" defaultValue='-' className={positionExist === '-' ? 'background-rojo' : 'background-negro'}>
              <option value="-">-</option>
              <option value="OOP">OOP</option>
              <option value="IP">IP</option>
            </select>
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
                <option value="H OR preflop">H OR preflop</option>
                <option value="H OR preflop -> vs re-raise">H OR preflop -> vs re-raise</option>
              </optgroup>
              <optgroup label="IP-Sin Iniciativa">

                <option value="vs check behind">vs check behind</option>
              </optgroup>
              <optgroup label="OOP-Con Iniciativa">
              </optgroup>
              <optgroup label="OOP-Sin Iniciativa">
                <option value="vs 2nd barrel">vs 2nd barrel</option>
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
              <option value="CHECK/CALL">CHECK/CALL</option>
              <option value="CHECK/FOLD">CHECK/FOLD</option>
              <option value="CHECK/RAISE">CHECK/RAISE</option>
              <option value="CHECK BEHIND">CHECK BEHIND</option>
              <option value="BET">BET</option>
            </select>


          </div>
          {/* NOTES */}
          <div className="addProductItem">
            <label>Notes</label>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Notas-flop"
              name="Notas-flop"
              id="flop.notes"
              style={{ width: 400 }}
            />
          </div>
        </div>
        {/* SEGUNDA LINEA */}
        <div className="addProductItem">
          <div className="notesOnDecisions">
            <div className="top-decision">
              <div className="check-call">
                <label>Check-call</label>
                <textarea
                  type="text"
                  name="check-call"
                  className="check-call"
                  id="flopCheckCall"
                  defaultValue=''
                />
              </div>
              <div className="check-fold">
                <label>Check-fold</label>
                <textarea
                  type="text"
                  name="check-fold"
                  className="check-fold"
                  id="flopCheckFold"
                  defaultValue=''
                />
              </div>
              <div className="check-raise">
                <label>Check-raise</label>
                <textarea
                  type="text"
                  name="check-raise"
                  className="check-raise"
                  id="flopCheckRaise"
                  defaultValue=''
                />
              </div>
              <div className="check-behind">
                <label>Check-behind</label><br />
                <textarea
                  type="text"
                  name="check-behind"
                  className="check-behind"
                  id="flopCheckBehind"
                  defaultValue=''
                />
              </div>
              <div className="bet">
                <label>Bet</label><br />
                <textarea
                  type="text"
                  name="bet"
                  className="bet"
                  id="flopBet"
                  defaultValue=''
                />
              </div>
            </div>
          </div>
        </div>
        {/* TURN SECTION */}
        <h2>Turn</h2>
        {/* PRIMERA LINEA */}
        <div className='divider'>
          {/* CARTAS TURN */}
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
          {/* POS - INI - SIT - BOARD - DEC */}
          <div className="addProductItem">
            <label>Posicion</label>
            <select name="heroPosition" id="heroPositionPija2" defaultValue='-' className={positionExist === '-' ? 'background-rojo' : 'background-negro'}>
              <option value="-">-</option>
              <option value="OOP">OOP</option>
              <option value="IP">IP</option>
            </select>
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
                <option value="H probe bet en flop">H probe bet en flop</option>
                <option value="h cbet en flop">h cbet en flop</option>
              </optgroup>
              <optgroup label="IP-Sin Iniciativa">
                <option value="vs check behind">vs check behind</option>
                <option value="vs cbet V dps de retomar iniciativa en flop">vs cbet V dps de retomar iniciativa en flop</option>
                <option value="vs cbet de V dps d checkraise en flop">vs cbet de V dps d checkraise en flop</option>
                <option value="vs bet de V despues de su check behind en flop">vs bet de V despues de su check behind en flop</option>
              </optgroup>
              <optgroup label="OOP-Con Iniciativa">
                <option value="H checkraise en flop">H checkraise en flop</option>
              </optgroup>
              <optgroup label="OOP-Sin Iniciativa">
                <option value="vs 3rd barrel">vs 3rd barrel</option>
                <option value="vs V check behind en flop">vs V check behind en flop</option>
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
              <option value="CHECK/CALL">CHECK/CALL</option>
              <option value="CHECK/FOLD">CHECK/FOLD</option>
              <option value="CHECK/RAISE">CHECK/RAISE</option>
              <option value="CHECK BEHIND">CHECK BEHIND</option>
              <option value="BET">BET</option>
            </select>


          </div>
          {/* NOTES */}
          <div className="addProductItem">
            <label>Notes</label>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Notas-flop"
              name="Notas-flop"
              id="turn.notes"
              style={{ width: 400 }}
            />
          </div>
        </div>
        {/* SEGUNDA LINEA */}
        <div className="addProductItem">
          <div className="top-decision">
            <div className="top-decision">
              <div className="check-call">
                <label>Check-call</label>
                <textarea
                  type="text"
                  name="check-call"
                  className="check-call"
                  id="turnCheckCall"
                  defaultValue=''
                />
              </div>
              <div className="check-fold">
                <label>Check-fold</label>
                <textarea
                  type="text"
                  name="check-fold"
                  className="check-fold"
                  id="turnCheckFold"
                  defaultValue=''
                />
              </div>
              <div className="check-raise">
                <label>Check-raise</label>
                <textarea
                  type="text"
                  name="check-raise"
                  className="check-raise"
                  id="turnCheckRaise"
                  defaultValue=''
                />
              </div>
              <div className="check-behind">
                <label>Check-behind</label><br />
                <textarea
                  type="text"
                  name="check-behind"
                  className="check-behind"
                  id="turnCheckBehind"
                  defaultValue=''
                />
              </div>
              <div className="bet">
                <label>Bet</label><br />
                <textarea
                  type="text"
                  name="bet"
                  className="bet"
                  id="turnBet"
                  defaultValue=''
                />
              </div>
            </div>
          </div>
        </div>
        {/* RIVER SECTION */}
        <h2>River</h2>
        {/* PRIMERA LINEA */}
        <div className='divider'>
          {/* CARTAS RIVER */}
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
          {/* POS.. */}
          <div className="addProductItem">
            <label>Posicion</label>
            <select name="heroPosition" id="heroPositionPija3" defaultValue='-' className={positionExist === '-' ? 'background-rojo' : 'background-negro'}>
              <option value="-">-</option>
              <option value="OOP">OOP</option>
              <option value="IP">IP</option>
            </select>
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
                <option value="vs check de V ante check behind de H en turn">vs check de V ante check behind de H en turn   </option>
              </optgroup>
              <optgroup label="IP-Sin Iniciativa">
                <option value="vs check behind">vs check behind   </option>
                <option value="vs cbet de V">vs cbet de V</option>
                <option value="vs cbet de V dps de retomar iniciativa en turn">vs cbet de V dps de retomar iniciativa en turn</option>
              </optgroup>
              <optgroup label="OOP-Con Iniciativa">
                <option value="h cbet en turn">h cbet en turn</option>
                <option value="check behind en turn">h check behind en turn</option>
                <option value="h probe bet en turn">h probe bet en turn</option>
                <option value="h checkraise en turn">h checkraise en turn</option>
              </optgroup>
              <optgroup label="OOP-Sin Iniciativa">
                <option value="vs 4th barrel">vs 4th barrel</option>
                <option value="vs check behind de V en turn">vs check behind de V en turn</option>
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
              <option value="CHECK/CALL">CHECK/CALL</option>
              <option value="CHECK/FOLD">CHECK/FOLD</option>
              <option value="CHECK/RAISE">CHECK/RAISE</option>
              <option value="CHECK BEHIND">CHECK BEHIND</option>
              <option value="BET">BET</option>
            </select>


          </div>
          {/* NOTES */}
          <div className="addProductItem">
            <label>Notes</label>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Notas"
              name="Notas"
              id="river.notes"
              style={{ width: 400 }}
            />
          </div>
        </div>
        {/* SEGUNDA LINEA */}
        <div className="addProductItem">
          <div className="notesOnDecisions">
            <div className="top-decision">
              <div className="check-call">
                <label>Check-call</label>
                <textarea
                  type="text"
                  name="check-call"
                  className="check-call"
                  id="riverCheckCall"
                  defaultValue=''
                />
              </div>
              <div className="check-fold">
                <label>Check-fold</label>
                <textarea
                  type="text"
                  name="check-fold"
                  className="check-fold"
                  id="riverCheckFold"
                  defaultValue=''
                />
              </div>
              <div className="check-raise">
                <label>Check-raise</label>
                <textarea
                  type="text"
                  name="check-raise"
                  className="check-raise"
                  id="riverCheckRaise"
                  defaultValue=''
                />
              </div>
              <div className="check-behind">
                <label>Check-behind</label><br />
                <textarea
                  type="text"
                  name="check-behind"
                  className="check-behind"
                  id="riverCheckBehind"
                  defaultValue=''
                />
              </div>
              <div className="bet">
                <label>Bet</label><br />
                <textarea
                  type="text"
                  name="bet"
                  className="bet"
                  id="riverBet"
                  defaultValue=''
                />
              </div>
            </div>
          </div>
        </div>
        {/* BOTON SUBMIT */}
        <button onClick={handleSubmit}>SEND</button>
        <br /><br /><br /><br />
      </form>
    </div>
  )
}

export default Addhands



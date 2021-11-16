import React, { useState } from 'react'
import axios from '../../axios'
import './edithand.css'
import { useEffect } from "react";



function EditHand({ ElObjetoSelecto }) {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("/" + ElObjetoSelecto._id, {
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
    alert('mano updated')
  };

  const handleErase = (e) => {
    e.preventDefault();
    axios.delete("/" + ElObjetoSelecto._id);
    alert('mano erased')
  };

  const [preflopHeroCard1, setpreflopHeroCard1] = useState(ElObjetoSelecto.preflop.heroCards[0].carta)
  const [preflopHeroCard1Color, setpreflopHeroCard1Color] = useState(ElObjetoSelecto.preflop.heroCards[0].color)
  const [preflopHeroCard2, setpreflopHeroCard2] = useState(ElObjetoSelecto.preflop.heroCards[1].carta)
  const [preflopHeroCard2Color, setpreflopHeroCard2Color] = useState(ElObjetoSelecto.preflop.heroCards[1].color)

  const [flopBoardCard1, setflopBoardCard1] = useState(ElObjetoSelecto.flop.boardCards[0].carta)
  const [flopBoardCard1Color, setflopBoardCard1Color] = useState(ElObjetoSelecto.flop.boardCards[0].color)
  const [flopBoardCard2, setflopBoardCard2] = useState(ElObjetoSelecto.flop.boardCards[1].carta)
  const [flopBoardCard2Color, setflopBoardCard2Color] = useState(ElObjetoSelecto.flop.boardCards[1].color)
  const [flopBoardCard3, setflopBoardCard3] = useState(ElObjetoSelecto.flop.boardCards[2].carta)
  const [flopBoardCard3Color, setflopBoardCard3Color] = useState(ElObjetoSelecto.flop.boardCards[2].color)

  const [turnBoardCard, setturnBoardCard] = useState(ElObjetoSelecto.turn.boardCards.carta)
  const [turnBoardCardColor, setturnBoardCardColor] = useState(ElObjetoSelecto.turn.boardCards.color)

  const [riverBoardCard, setriverBoardCard] = useState(ElObjetoSelecto.river.boardCards.carta)
  const [riverBoardCardColor, setriverBoardCardColor] = useState(ElObjetoSelecto.river.boardCards.color)

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Edit Hand</h1>
      <form className="addProductForm">

        <h2>Preflop</h2><br />
        <div className='divider'  >
          <div className="addProductItem cartas-box">
            <label>Carta 1 PREFLOP</label>
            <select
              name="carta-1-preflop"
              id="carta-1-preflop"
              defaultValue='-'
              onChange={(e) => {
                setpreflopHeroCard1(e.currentTarget.value)
              }}
            >
              <option value={preflopHeroCard1}>{preflopHeroCard1}</option>
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
            <select
              name="colorCarta-1-preflop"
              id="colorCarta-1-preflop"
              defaultValue='-'
              onChange={(e) => {
                setpreflopHeroCard1Color(e.currentTarget.value)
              }}
            >
              <option value={preflopHeroCard1Color}>{preflopHeroCard1Color}</option>
              <option value="negro">PICAS - NEGRO</option>
              <option value="verde">TREBOLES - VERDE</option>
              <option value="azul">DIAMANTES - AZUL</option>
              <option value="rojo">CORAZONES - ROJO</option>
            </select>
            <label>Carta 2 PREFLOP</label>
            <select
              name="carta-2-preflop"
              id="carta-2-preflop"
              defaultValue='-'
              onChange={(e) => {
                setpreflopHeroCard2(e.currentTarget.value)
              }}
            >
              <option value={preflopHeroCard2}>{preflopHeroCard2}</option>
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
            <select
              name="Iniciativa"
              id="colorCarta-2-preflop"
              defaultValue='-'
              onChange={(e) => {
                setpreflopHeroCard2Color(e.currentTarget.value)
              }}
            >
              <option value={preflopHeroCard2Color}>{preflopHeroCard2Color}</option>
              <option value="negro">PICAS - NEGRO</option>
              <option value="verde">TREBOLES - VERDE</option>
              <option value="azul">DIAMANTES - AZUL</option>
              <option value="rojo">CORAZONES - ROJO</option>
            </select>
          </div>
          <div className="addProductItem" >
            <label>Posicion</label>
            <select
              name="heroPosition"
              id="heroPosition"
              defaultValue='-'
            >
              <option value={ElObjetoSelecto.preflop.heroPosition}>{ElObjetoSelecto.preflop.heroPosition}</option>
              <option value="OOP">OOP</option>
              <option value="IP">IP</option>
            </select>
            <label>Table Position</label>
            <select name="Table Position" id="heroExactPosition" defaultValue='-'  >
              <option value={ElObjetoSelecto.preflop.heroExactPosition}>{ElObjetoSelecto.preflop.heroExactPosition}</option>
              <option value="SB">SB</option>
              <option value="BB">BB</option>
              <option value="UTG">UTG</option>
              <option value="HJ">HJ</option>
              <option value="CO">CO</option>
              <option value="BTN">BTN</option>
            </select>
            <label>Iniciativa</label>
            <select name="Iniciativa" id="preflop.heroIniciativa" defaultValue='-'  >
              <option value={ElObjetoSelecto.preflop.heroIniciativa}>{ElObjetoSelecto.preflop.heroIniciativa}</option>
              <option value="SI">SIN INICIATIVA</option>
              <option value="CI">CON INICIATIVA</option>
            </select>
          </div>

          <div className="addProductItem" >
            <label>Notes</label>
            <textarea
              type="text"
              defaultValue={ElObjetoSelecto.preflop.notes[0]}
              name="Notas-preflop"
              className="notes"
              id="preflopNotes"
            />
          </div>

        </div>

        <div className='divider'><h2>Flop</h2> <button onClick={handleSubmit}>UPDATE</button></div>
        <div className='divider'>
          <div className="addProductItem cartas-box">
            <label>Carta 1 FLOP</label>
            <select
              name="carta-1-flop"
              id="carta-1-flop"
              onChange={(e) => {
                setflopBoardCard1(e.currentTarget.value)
              }}
            >
              <option value={flopBoardCard1}>{flopBoardCard1}</option>
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
            <select
              name="colorCarta-1-flop"
              id="colorCarta-1-flop"
              defaultValue='-'
              onChange={(e) => {
                setflopBoardCard1Color(e.currentTarget.value)
              }}
            >
              <option value={flopBoardCard1Color}>{flopBoardCard1Color}</option>
              <option value="negro">PICAS - NEGRO</option>
              <option value="verde">TREBOLES - VERDE</option>
              <option value="azul">DIAMANTES - AZUL</option>
              <option value="rojo">CORAZONES - ROJO</option>
            </select>
            <label>Carta 2 FLOP</label>
            <select
              name="carta-2-flop"
              id="carta-2-flop"
              defaultValue='-'
              onChange={(e) => {
                setflopBoardCard2(e.currentTarget.value)
              }}
            >
              <option value={flopBoardCard2}>{flopBoardCard2}</option>
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
            <select
              name="colorCarta-2-flop"
              id="colorCarta-2-flop"
              defaultValue='-'
              onChange={(e) => {
                setflopBoardCard2Color(e.currentTarget.value)
              }}>
              <option value={flopBoardCard2Color}>{flopBoardCard2Color}</option>
              <option value="negro">PICAS - NEGRO</option>
              <option value="verde">TREBOLES - VERDE</option>
              <option value="azul">DIAMANTES - AZUL</option>
              <option value="rojo">CORAZONES - ROJO</option>
            </select>
            <label>Carta 3 FLOP</label>
            <select
              name="carta-3-flop"
              id="carta-3-flop"
              defaultValue='-'
              onChange={(e) => {
                setflopBoardCard3(e.currentTarget.value)
              }}>
              <option value={flopBoardCard3}>{flopBoardCard3}</option>
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
            <select
              name="colorCarta-3-flop"
              id="colorCarta-3-flop"
              defaultValue='-'
              onChange={(e) => {
                setflopBoardCard3Color(e.currentTarget.value)
              }}>
              <option value={flopBoardCard3Color}>{flopBoardCard3Color}</option>
              <option value="negro">PICAS - NEGRO</option>
              <option value="verde">TREBOLES - VERDE</option>
              <option value="azul">DIAMANTES - AZUL</option>
              <option value="rojo">CORAZONES - ROJO</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Posicion</label>
            <select name="heroPosition" id="heroPositionPija" defaultValue='-' >
              <option value={ElObjetoSelecto.preflop.heroPosition}>{ElObjetoSelecto.preflop.heroPosition}</option>
              <option value="OOP">OOP</option>
              <option value="IP">IP</option>
            </select>
            <label>Iniciativa</label>
            <select name="Iniciativa" id="flop.heroIniciativa" defaultValue='-'  >
              <option value={ElObjetoSelecto.flop.heroIniciativa}>{ElObjetoSelecto.flop.heroIniciativa}</option>
              <option value="SI">SIN INICIATIVA</option>
              <option value="CI">CON INICIATIVA</option>
            </select>
            <label>Situacion</label>
            <select name="Situation" id="flopSituation" defaultValue='-'  >
              <option value={ElObjetoSelecto.flop.situation}>{ElObjetoSelecto.flop.situation}</option>
              <optgroup label="IP-Con Iniciativa">
              </optgroup>
              <optgroup label="IP-Sin Iniciativa">
              </optgroup>
              <optgroup label="OOP-Con Iniciativa">
              </optgroup>
              <optgroup label="OOP-Sin Iniciativa">
                <option value="vs 2nd barrel">vs 2nd barrel</option>
              </optgroup>
            </select>
            <label>Board Type</label>
            <select name="Board Type" id="flop.boardType" defaultValue='-'  >
              <option value={ElObjetoSelecto.flop.boardType}>{ElObjetoSelecto.flop.boardType}</option>
              <option value="SECO">SECO</option>
              <option value="SEMI MOJADO">SEMI MOJADO</option>
              <option value="OFENSIVO">OFENSIVO</option>
              <option value="MOJADO">MOJADO</option>
            </select>
            <label>Decision</label>
            <select name="Decision" id="flop.decision" defaultValue='-'  >
              <option value={ElObjetoSelecto.flop.decision}>{ElObjetoSelecto.flop.decision}</option>
              <option value="CHECK/CALL">CHECK/CALL</option>
              <option value="CHECK/FOLD">CHECK/FOLD</option>
              <option value="CHECK/RAISE">CHECK/RAISE</option>
              <option value="CHECK BEHIND">CHECK BEHIND</option>
              <option value="BET">BET</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Notes</label>
            <textarea
              type="text"
              name="Notas-preflop"
              className="notes"
              id="flop.notes"
              defaultValue={ElObjetoSelecto.flop.notes[0]}
            />
          </div>
        </div>
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
                  defaultValue={ElObjetoSelecto.flop.flopCheckCall ? ElObjetoSelecto.flop.flopCheckCall : ""}
                />
              </div>
              <div className="check-fold">
                <label>Check-fold</label>
                <textarea
                  type="text"
                  name="check-fold"
                  className="check-fold"
                  id="flopCheckFold"
                  defaultValue={ElObjetoSelecto.flop.flopCheckFold ? ElObjetoSelecto.flop.flopCheckFold : ""}
                />
              </div>
              <div className="check-raise">
                <label>Check-raise</label>
                <textarea
                  type="text"
                  name="check-raise"
                  className="check-raise"
                  id="flopCheckRaise"
                  defaultValue={ElObjetoSelecto.flop.flopCheckRaise ? ElObjetoSelecto.flop.flopCheckRaise : ""}
                />
              </div>
              <div className="check-behind">
                <label>Check-behind</label><br />
                <textarea
                  type="text"
                  name="check-behind"
                  className="check-behind"
                  id="flopCheckBehind"
                  defaultValue={ElObjetoSelecto.flop.flopCheckBehind ? ElObjetoSelecto.flop.flopCheckBehind : ""}
                />
              </div>
              <div className="bet">
                <label>Bet</label><br />
                <textarea
                  type="text"
                  name="bet"
                  className="bet"
                  id="flopBet"
                  defaultValue={ElObjetoSelecto.flop.flopBet ? ElObjetoSelecto.flop.flopBet : ""}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="divider"><h2>Turn</h2> <button onClick={handleSubmit}>UPDATE</button></div>

        <div className='divider'>
          <div className="addProductItem cartas-box">
            <label>Carta 1 TURN</label>
            <select
              name="carta-1-turn"
              id="carta-1-turn"
              defaultValue='-'
              onChange={(e) => {
                setturnBoardCard(e.currentTarget.value)
              }}
            >
              <option value={turnBoardCard}>{turnBoardCard}</option>
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
            <select
              name="colorCarta-1-turn"
              id="colorCarta-1-turn"
              defaultValue='-'
              onChange={(e) => {
                setturnBoardCardColor(e.currentTarget.value)
              }}>
              <option value={turnBoardCardColor}>{turnBoardCardColor}</option>
              <option value="negro">PICAS - NEGRO</option>
              <option value="verde">TREBOLES - VERDE</option>
              <option value="azul">DIAMANTES - AZUL</option>
              <option value="rojo">CORAZONES - ROJO</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Posicion</label>
            <select name="heroPosition" id="heroPositionPija2" defaultValue='-' >
              <option value={ElObjetoSelecto.preflop.heroPosition}>{ElObjetoSelecto.preflop.heroPosition}</option>
              <option value="OOP">OOP</option>
              <option value="IP">IP</option>
            </select>
            <label>Iniciativa</label>
            <select name="Iniciativa" id="turn.heroIniciativa" defaultValue='-'  >
              <option value={ElObjetoSelecto.turn.heroIniciativa}>{ElObjetoSelecto.turn.heroIniciativa}</option>
              <option value="SI">SIN INICIATIVA</option>
              <option value="CI">CON INICIATIVA</option>
            </select>
            <label>Situacion</label>
            <select name="Situation" id="turnSituation" defaultValue='-'  >
              <option value={ElObjetoSelecto.turn.situation}>{ElObjetoSelecto.turn.situation}</option>
              <optgroup label="IP-Con Iniciativa">
              </optgroup>
              <optgroup label="IP-Sin Iniciativa">
              </optgroup>
              <optgroup label="OOP-Con Iniciativa">
              </optgroup>
              <optgroup label="OOP-Sin Iniciativa">
                <option value="vs 3rd barrel">vs 3rd barrel</option>
              </optgroup>
            </select>
            <label>Board Type</label>
            <select name="Board Type" id="turn.boardType" defaultValue='-'  >
              <option value={ElObjetoSelecto.turn.boardType}>{ElObjetoSelecto.turn.boardType}</option>
              <option value="SECO">SECO</option>
              <option value="SEMI MOJADO">SEMI MOJADO</option>
              <option value="OFENSIVO">OFENSIVO</option>
              <option value="MOJADO">MOJADO</option>
            </select>
            <label>Decision</label>
            <select name="Decision" id="turn.decision" defaultValue='-'  >
              <option value={ElObjetoSelecto.turn.decision}>{ElObjetoSelecto.turn.decision}</option>
              <option value="CHECK/CALL">CHECK/CALL</option>
              <option value="CHECK/FOLD">CHECK/FOLD</option>
              <option value="CHECK/RAISE">CHECK/RAISE</option>
              <option value="CHECK BEHIND">CHECK BEHIND</option>
              <option value="BET">BET</option>
            </select>

          </div>
          <div className="addProductItem">
            <label>Notes</label>
            <textarea
              type="text"
              defaultValue={ElObjetoSelecto.turn.notes[0]}
              name="Notas-preflop"
              className="notes"
              id="turn.notes"
            />
          </div>
        </div>
        <div className="addProductItem">
          <div className="notesOnDecisions">
            <div className="bottom-decisions">
              <div className="check-call">
                <label>Check-call</label>
                <textarea
                  type="text"
                  name="check-call"
                  className="check-call"
                  id="turnCheckCall"
                  defaultValue={ElObjetoSelecto.turn.turnCheckCall ? ElObjetoSelecto.turn.turnCheckCall : ""}
                />
              </div>
              <div className="check-fold">
                <label>Check-fold</label>
                <textarea
                  type="text"
                  name="check-fold"
                  className="check-fold"
                  id="turnCheckFold"
                  defaultValue={ElObjetoSelecto.turn.turnCheckFold ? ElObjetoSelecto.turn.turnCheckFold : ""}
                />
              </div>
              <div className="check-raise">
                <label>Check-raise</label>
                <textarea
                  type="text"
                  name="check-raise"
                  className="check-raise"
                  id="turnCheckRaise"
                  defaultValue={ElObjetoSelecto.turn.turnCheckRaise ? ElObjetoSelecto.turn.turnCheckRaise : ""}
                />
              </div><div className="check-behind">
                <label>Check-behind</label><br />
                <textarea
                  type="text"
                  name="check-behind"
                  className="check-behind"
                  id="turnCheckBehind"
                  defaultValue={ElObjetoSelecto.turn.turnCheckBehind ? ElObjetoSelecto.turn.turnCheckBehind : ""}
                />
              </div>
              <div className="bet">
                <label>Bet</label><br />
                <textarea
                  type="text"
                  name="bet"
                  className="bet"
                  id="turnBet"
                  defaultValue={ElObjetoSelecto.turn.turnBet ? ElObjetoSelecto.turn.turnBet : ""}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="divider"><h2>River</h2> <button onClick={handleSubmit}>UPDATE</button></div>
        <div className='divider'>
          <div className="addProductItem cartas-box">
            <label>Carta 1 RIVER</label>
            <select
              name="carta-1-river"
              id="carta-1-river"
              defaultValue='-'
              onChange={(e) => {
                setriverBoardCard(e.currentTarget.value)
              }}>
              <option value={riverBoardCard}>{riverBoardCard}</option>
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
            <select
              name="colorCarta-1-river"
              id="colorCarta-1-river"
              defaultValue='-'
              onChange={(e) => {
                setriverBoardCardColor(e.currentTarget.value)
              }}
            >
              <option value={riverBoardCardColor}>{riverBoardCardColor}</option>
              <option value="negro">PICAS - NEGRO</option>
              <option value="verde">TREBOLES - VERDE</option>
              <option value="azul">DIAMANTES - AZUL</option>
              <option value="rojo">CORAZONES - ROJO</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Posicion</label>
            <select name="heroPosition" id="heroPositionPija3" defaultValue='-' >
              <option value={ElObjetoSelecto.preflop.heroPosition}>{ElObjetoSelecto.preflop.heroPosition}</option>
              <option value="OOP">OOP</option>
              <option value="IP">IP</option>
            </select>
            <label>Iniciativa</label>
            <select name="Iniciativa" id="river.heroIniciativa" defaultValue='-'  >
              <option value={ElObjetoSelecto.river.heroIniciativa}>{ElObjetoSelecto.river.heroIniciativa}</option>
              <option value="SI">SIN INICIATIVA</option>
              <option value="CI">CON INICIATIVA</option>
            </select>
            <label>Situacion</label>
            <select name="Situation" id="riverSituation" defaultValue='-'  >
              <option value={ElObjetoSelecto.river.situation}>{ElObjetoSelecto.river.situation}</option>
              <optgroup label="IP-Con Iniciativa">
              </optgroup>
              <optgroup label="IP-Sin Iniciativa">
              </optgroup>
              <optgroup label="OOP-Con Iniciativa">
              </optgroup>
              <optgroup label="OOP-Sin Iniciativa">
                <option value="vs 4th barrel">vs 4th barrel</option>
              </optgroup>
            </select>
            <label>Board Type</label>
            <select name="Board Type" id="river.boardType" defaultValue='-'  >
              <option value={ElObjetoSelecto.river.boardType}>{ElObjetoSelecto.river.boardType}</option>
              <option value="SECO">SECO</option>
              <option value="SEMI MOJADO">SEMI MOJADO</option>
              <option value="OFENSIVO">OFENSIVO</option>
              <option value="MOJADO">MOJADO</option>
            </select>
            <label>Decision</label>
            <select name="Decision" id="river.decision" defaultValue='-'  >
              <option value={ElObjetoSelecto.river.decision}>{ElObjetoSelecto.river.decision}</option>
              <option value="CHECK/CALL">CHECK/CALL</option>
              <option value="CHECK/FOLD">CHECK/FOLD</option>
              <option value="CHECK/RAISE">CHECK/RAISE</option>
              <option value="CHECK BEHIND">CHECK BEHIND</option>
              <option value="BET">BET</option>
            </select>




          </div>
          <div className="addProductItem">
            <label>Notes</label>
            <textarea
              type="text"
              defaultValue={ElObjetoSelecto.river.notes[0]}
              name="Notas"
              className="notes"
              id="river.notes"
            />
          </div>
        </div>
        <div className="addProductItem">
          <div className="notesOnDecisions">
            <div className="bottom-decisions">
              <div className="check-call">
                <label>Check-call</label>
                <textarea
                  type="text"
                  name="check-call"
                  className="check-call"
                  id="riverCheckCall"
                  defaultValue={ElObjetoSelecto.river.riverCheckCall ? ElObjetoSelecto.river.riverCheckCall : ""}
                />
              </div>
              <div className="check-fold">
                <label>Check-fold</label>
                <textarea
                  type="text"
                  name="check-fold"
                  className="check-fold"
                  id="riverCheckFold"
                  defaultValue={ElObjetoSelecto.river.riverCheckFold ? ElObjetoSelecto.river.riverCheckFold : ""}
                />
              </div>
              <div className="check-raise">
                <label>Check-raise</label>
                <textarea
                  type="text"
                  name="check-raise"
                  className="check-raise"
                  id="riverCheckRaise"
                  defaultValue={ElObjetoSelecto.river.riverCheckRaise ? ElObjetoSelecto.river.riverCheckRaise : ""}
                />
              </div>
              <div className="check-behind">
                <label>Check-behind</label><br />
                <textarea
                  type="text"
                  name="check-behind"
                  className="check-behind"
                  id="riverCheckBehind"
                  defaultValue={ElObjetoSelecto.river.riverCheckBehind ? ElObjetoSelecto.river.riverCheckBehind : ""}
                />
              </div>
              <div className="bet">
                <label>Bet</label><br />
                <textarea
                  type="text"
                  name="bet"
                  className="bet"
                  id="riverBet"
                  defaultValue={ElObjetoSelecto.river.riverBet ? ElObjetoSelecto.river.riverBet : ""}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="topDecisions visibleCards footer">
          <span className={`${preflopHeroCard1Color} `}>{preflopHeroCard1}</span>
          <span className={`${preflopHeroCard2Color} `}>{preflopHeroCard2}</span>
          <span>     //       </span>
          <span className={`${flopBoardCard1Color} `}>{flopBoardCard1}</span>
          <span className={`${flopBoardCard2Color} `}>{flopBoardCard2}</span>
          <span className={`${flopBoardCard3Color} `}>{flopBoardCard3}</span>
          <span> - </span>
          <span className={`${turnBoardCardColor} `}>{turnBoardCard}</span>
          <span> - </span>
          <span className={`${riverBoardCardColor} `}>{riverBoardCard}</span>
        </div>


        <button onClick={handleSubmit}>UPDATE</button>
        <button onClick={handleErase}>ERASE</button><br /><br /><br /><br />

        <br /><br /><br />
      </form>
    </div>
  )
}

export default EditHand

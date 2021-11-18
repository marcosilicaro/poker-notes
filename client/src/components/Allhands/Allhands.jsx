
import React, { useState } from 'react'
import './allhands.css'
import axios from '../../axios'
import { useEffect } from "react";
import { Settings } from "@material-ui/icons";

import { Link } from "react-router-dom";
import _ from 'lodash';



function Allhands({ setObjetoSelecto }) {

    const [handsData, sethandsData] = useState([])

    const [posicion, setPosicion] = useState('')
    const [iniciativa, setIniciativa] = useState('')
    const [instancia, setInstancia] = useState('')
    const [boardType, setBoardType] = useState('')
    const [situation, setSituation] = useState('')

    const [showFlopNotes, setShowFlopNotes] = useState(false)
    const [showTurnNotes, setShowTurnNotes] = useState(false)
    const [showRiverNotes, setShowRiverNotes] = useState(false)
    const [idClicked, setidClicked] = useState('')

    const [flopTitleClicked, setflopTitleClicked] = useState(false)
    const [turnTitleClicked, setturnTitleClicked] = useState(false)
    const [riverTitleClicked, setriverTitleClicked] = useState(false)


    // cada vez que se re-renderiza el componente (la app) 
    useEffect(() => {
        // se ejecuta get all
        axios.get("/").then((res) => {
            sethandsData(res.data)
        })

        // scroll to top on refresh
        window.scrollTo(0, 0)
    }, [])

    // get specific list of objects with filters
    const clickButton = () => {
        axios.get("/" + posicion + '-' + instancia + '-' + iniciativa + '-' + boardType + '-' + situation).then((res) => {
            // el array filtrado se guarda en handsData que despues es utilizado en la tabla
            sethandsData(res.data)
        })
    }


    // cuantos colores iguales tienen una instancia de una array
    const howManyColors = (array, instancia, nroColores) => {
        let handsEnColores = []
        if (instancia === 'flop') {
            array.forEach((hand) => {
                let handEnColores = {}
                let negroCounter = 0
                let verdeCounter = 0
                let azulCounter = 0
                let rojoCounter = 0
                // contas colores flop
                if (hand.flop.boardCards[0].color === 'negro') { negroCounter = negroCounter + 1 }
                if (hand.flop.boardCards[1].color === 'negro') { negroCounter = negroCounter + 1 }
                if (hand.flop.boardCards[2].color === 'negro') { negroCounter = negroCounter + 1 }
                if (hand.flop.boardCards[0].color === 'verde') { verdeCounter = verdeCounter + 1 }
                if (hand.flop.boardCards[1].color === 'verde') { verdeCounter = verdeCounter + 1 }
                if (hand.flop.boardCards[2].color === 'verde') { verdeCounter = verdeCounter + 1 }
                if (hand.flop.boardCards[0].color === 'azul') { azulCounter = azulCounter + 1 }
                if (hand.flop.boardCards[1].color === 'azul') { azulCounter = azulCounter + 1 }
                if (hand.flop.boardCards[2].color === 'azul') { azulCounter = azulCounter + 1 }
                if (hand.flop.boardCards[0].color === 'rojo') { rojoCounter = rojoCounter + 1 }
                if (hand.flop.boardCards[1].color === 'rojo') { rojoCounter = rojoCounter + 1 }
                if (hand.flop.boardCards[2].color === 'rojo') { rojoCounter = rojoCounter + 1 }
                // dividis la cuenta y la pusheas en una array
                handEnColores.negroCounter = negroCounter
                handEnColores.verdeCounter = verdeCounter
                handEnColores.azulCounter = azulCounter
                handEnColores.rojoCounter = rojoCounter
                handEnColores.id = hand._id
                handsEnColores.push(handEnColores)
            }
            )
        } else if (instancia === 'turn') {
            array.forEach((hand) => {
                if (hand.turn.boardCards.color != '-') {
                    let handEnColores = {}
                    let negroCounter = 0
                    let verdeCounter = 0
                    let azulCounter = 0
                    let rojoCounter = 0
                    // contas colores flop
                    if (hand.flop.boardCards[0].color === 'negro') { negroCounter = negroCounter + 1 }
                    if (hand.flop.boardCards[1].color === 'negro') { negroCounter = negroCounter + 1 }
                    if (hand.flop.boardCards[2].color === 'negro') { negroCounter = negroCounter + 1 }
                    if (hand.flop.boardCards[0].color === 'verde') { verdeCounter = verdeCounter + 1 }
                    if (hand.flop.boardCards[1].color === 'verde') { verdeCounter = verdeCounter + 1 }
                    if (hand.flop.boardCards[2].color === 'verde') { verdeCounter = verdeCounter + 1 }
                    if (hand.flop.boardCards[0].color === 'azul') { azulCounter = azulCounter + 1 }
                    if (hand.flop.boardCards[1].color === 'azul') { azulCounter = azulCounter + 1 }
                    if (hand.flop.boardCards[2].color === 'azul') { azulCounter = azulCounter + 1 }
                    if (hand.flop.boardCards[0].color === 'rojo') { rojoCounter = rojoCounter + 1 }
                    if (hand.flop.boardCards[1].color === 'rojo') { rojoCounter = rojoCounter + 1 }
                    if (hand.flop.boardCards[2].color === 'rojo') { rojoCounter = rojoCounter + 1 }
                    // contas colores turn
                    if (hand.turn.boardCards.color === 'negro') { negroCounter = negroCounter + 1 }
                    if (hand.turn.boardCards.color === 'verde') { verdeCounter = verdeCounter + 1 }
                    if (hand.turn.boardCards.color === 'azul') { azulCounter = azulCounter + 1 }
                    if (hand.turn.boardCards.color === 'rojo') { rojoCounter = rojoCounter + 1 }
                    // dividis la cuenta y la pusheas en una array
                    handEnColores.negroCounter = negroCounter
                    handEnColores.verdeCounter = verdeCounter
                    handEnColores.azulCounter = azulCounter
                    handEnColores.rojoCounter = rojoCounter
                    handEnColores.id = hand._id
                    handsEnColores.push(handEnColores)
                }
            }
            )
        } else if (instancia === 'river') {
            array.forEach((hand) => {
                if (hand.river.boardCards.color != '-') {
                    let handEnColores = {}
                    let negroCounter = 0
                    let verdeCounter = 0
                    let azulCounter = 0
                    let rojoCounter = 0
                    // contas colores flop
                    if (hand.flop.boardCards[0].color === 'negro') { negroCounter = negroCounter + 1 }
                    if (hand.flop.boardCards[1].color === 'negro') { negroCounter = negroCounter + 1 }
                    if (hand.flop.boardCards[2].color === 'negro') { negroCounter = negroCounter + 1 }
                    if (hand.flop.boardCards[0].color === 'verde') { verdeCounter = verdeCounter + 1 }
                    if (hand.flop.boardCards[1].color === 'verde') { verdeCounter = verdeCounter + 1 }
                    if (hand.flop.boardCards[2].color === 'verde') { verdeCounter = verdeCounter + 1 }
                    if (hand.flop.boardCards[0].color === 'azul') { azulCounter = azulCounter + 1 }
                    if (hand.flop.boardCards[1].color === 'azul') { azulCounter = azulCounter + 1 }
                    if (hand.flop.boardCards[2].color === 'azul') { azulCounter = azulCounter + 1 }
                    if (hand.flop.boardCards[0].color === 'rojo') { rojoCounter = rojoCounter + 1 }
                    if (hand.flop.boardCards[1].color === 'rojo') { rojoCounter = rojoCounter + 1 }
                    if (hand.flop.boardCards[2].color === 'rojo') { rojoCounter = rojoCounter + 1 }
                    // contas colores turn
                    if (hand.turn.boardCards.color === 'negro') { negroCounter = negroCounter + 1 }
                    if (hand.turn.boardCards.color === 'verde') { verdeCounter = verdeCounter + 1 }
                    if (hand.turn.boardCards.color === 'azul') { azulCounter = azulCounter + 1 }
                    if (hand.turn.boardCards.color === 'rojo') { rojoCounter = rojoCounter + 1 }
                    // contas colores river
                    if (hand.river.boardCards.color === 'negro') { negroCounter = negroCounter + 1 }
                    if (hand.river.boardCards.color === 'verde') { verdeCounter = verdeCounter + 1 }
                    if (hand.river.boardCards.color === 'azul') { azulCounter = azulCounter + 1 }
                    if (hand.river.boardCards.color === 'rojo') { rojoCounter = rojoCounter + 1 }
                    // dividis la cuenta y la pusheas en una array
                    handEnColores.negroCounter = negroCounter
                    handEnColores.verdeCounter = verdeCounter
                    handEnColores.azulCounter = azulCounter
                    handEnColores.rojoCounter = rojoCounter
                    handEnColores.id = hand._id
                    handsEnColores.push(handEnColores)
                }
            }
            )
        }
        let handsEnColoresAzul = _.filter(handsEnColores, ['azulCounter', nroColores])
        let handsEnColoresVerde = _.filter(handsEnColores, ['verdeCounter', nroColores])
        let handsEnColoresNegro = _.filter(handsEnColores, ['negroCounter', nroColores])
        let handsEnColoresRojo = _.filter(handsEnColores, ['rojoCounter', nroColores])

        let handsEnColoresFiltradas = handsEnColoresAzul.concat(handsEnColoresVerde).concat(handsEnColoresNegro).concat(handsEnColoresRojo)
        handsEnColoresFiltradas = [...new Set(handsEnColoresFiltradas)]
        let handsFiltradas = []
        handsEnColoresFiltradas.forEach(hand => {
            handsData.forEach(eachHand => {
                if (hand.id === eachHand._id) {
                    handsFiltradas.push(eachHand)
                }
            })
        })
        sethandsData(handsFiltradas)
    }


    // lista de situaciones sacada de handsData
    let situationListforFlop = []
    let situationListforTurn = []
    let situationListforRiver = []
    handsData.forEach((hand) => {
        if (hand.flop.situation != '-') { situationListforFlop.push(hand.flop.situation) }
        if (hand.turn.situation != '-') { situationListforTurn.push(hand.turn.situation) }
        if (hand.river.situation != '-') { situationListforRiver.push(hand.river.situation) }
    })
    const [uniquesituationList, setuniquesituationList] = useState([])


    // prueba lodash
    //let reemplazoDeCarta = 'carta'
    //let primerFiltrado = _.filter(handsData, ['turn.situation', 'vs 3rd barrel']);
    //let segundoFiltrado = _.filter(primerFiltrado, ['preflop.heroCards[0]' + reemplazoDeCarta, '3'] || ['preflop.heroCards[1].carta', 'A']);
    //console.log(segundoFiltrado)


    return (
        <div className='table-container' >

            <h2>Filters</h2>
            {/* Botones */}
            <button onClick={(e) => { clickButton() }}> SEND</button>
            <button onClick={(e) => {
                setPosicion('')
                setBoardType('')
                setIniciativa('')
                setInstancia('')
                setSituation('')
                axios.get("/").then((res) => {
                    sethandsData(res.data)
                })
            }}> RESET</button><br /><br />
            {posicion} - {instancia} - {iniciativa} - {boardType} - {situation}
            {/* Checkboxes de filtrado */}
            <div className=' checkbox-boardTypes'>
                {/* Posicion */}
                <div>
                    <h4>Posicion</h4>
                    OOP  <input type="radio" name="posicion" value='OOP' onClick={(e) => {
                        setPosicion(e.currentTarget.value)
                    }} /><br /><br />
                    IP  <input type="radio" name="posicion" value='IP' onClick={(e) => {
                        setPosicion(e.currentTarget.value)
                    }} /><br /><br />
                </div>
                {/* Instancia */}
                <div>
                    <h4>Instancia</h4>
                    FLOP  <input type="radio" name='instancia' value="flop" onClick={(e) => {
                        setInstancia(e.currentTarget.value)
                        setuniquesituationList([...new Set(situationListforFlop)])
                    }} /><br /><br />
                    TURN  <input type="radio" name='instancia' value="turn" onClick={(e) => {
                        setInstancia(e.currentTarget.value)
                        setuniquesituationList([...new Set(situationListforTurn)])
                    }} /><br /><br />
                    RIVER  <input type="radio" name='instancia' value="river" onClick={(e) => {
                        setInstancia(e.currentTarget.value)
                        setuniquesituationList([...new Set(situationListforRiver)])
                    }} /><br /><br />
                </div>
                {/* Iniciativa */}
                <div>
                    <h4>Iniciativa</h4>
                    Sin iniciativa  <input type="radio" value="SI" name='iniciativa' onClick={(e) => {
                        setIniciativa(e.currentTarget.value)
                    }} /><br /><br />
                    Con iniciativa  <input type="radio" value="CI" name='iniciativa' onClick={(e) => {
                        setIniciativa(e.currentTarget.value)
                    }} /><br /><br />
                </div>
                {/* Board Type */}
                <div>
                    <h4>Board Type</h4>
                    Seco  <input type="radio" name="boardType" value='seco' onClick={(e) => {
                        setBoardType(e.currentTarget.value)
                    }} /><br /><br />
                    Semi-mojado  <input type="radio" name="boardType" value='semi mojado' onClick={(e) => {
                        setBoardType(e.currentTarget.value)
                    }} /><br /><br />
                    Ofensivo  <input type="radio" name="boardType" value='ofensivo' onClick={(e) => {
                        setBoardType(e.currentTarget.value)
                    }} /><br /><br />
                    Mojado  <input type="radio" name="boardType" value='mojado' onClick={(e) => {
                        setBoardType(e.currentTarget.value)
                    }} /><br /><br />
                </div>
                {/* Situation */}
                <div>
                    <h4>Situation</h4>
                    {uniquesituationList.map((item) => (
                        <div>
                            {item}{' '}
                            <input
                                type="radio"
                                name='situation'
                                value={item}
                                onClick={(e) => {
                                    setSituation(e.currentTarget.value)
                                }} />
                        </div>
                    ))
                    }
                </div>
            </div>
            <div className=' checkbox-boardTypes'>
                {/* Colores */}
                <div>
                    <h4>Colores</h4>
                    2 colores  <input type="radio" name="colores" value='2colores' onClick={(e) => {
                        howManyColors(handsData, instancia, 2)
                    }} /><br /><br />
                    3 colores  <input type="radio" name="colores" value='3colores' onClick={(e) => {
                        howManyColors(handsData, instancia, 3)
                    }} /><br /><br />
                </div>
            </div>
            <br />
            {/* Tabla */}
            <table className='table table-bordered'>
                <thead>
                    <th className='th-preflop' >Preflop</th>
                    <th className='th-flop' onClick={(e) => { flopTitleClicked === false ? setflopTitleClicked(true) : setflopTitleClicked(false) }}>Flop</th>
                    <th className='th-turn' onClick={(e) => { turnTitleClicked === false ? setturnTitleClicked(true) : setturnTitleClicked(false) }}>Turn</th>
                    <th className='th-river' onClick={(e) => { riverTitleClicked === false ? setriverTitleClicked(true) : setriverTitleClicked(false) }}>River</th>
                </thead>
                <tbody>
                    {/* Mapeado de objetos */}
                    {handsData.map((objeto) => (
                        <tr >
                            {/* Primera columna */}
                            <td
                                className='greyBackground'
                                onClick={(e) => {
                                    setObjetoSelecto(objeto)

                                }}
                            >
                                <div className='alignCenter '>
                                    <span className={`${objeto.preflop.heroCards[0].color} cardStyling`}>{objeto.preflop.heroCards[0].carta}</span>
                                    <span className={`${objeto.preflop.heroCards[1].color} cardStyling`}>{objeto.preflop.heroCards[1].carta}</span>
                                    <Link to="/edithand"><div className="settings"><Settings /></div></Link>
                                </div>
                            </td>
                            {/* Segunda columna */}
                            <td >
                                <div onClick={(e) => {
                                    setidClicked(objeto._id)
                                    showFlopNotes === true ? setShowFlopNotes(false) : setShowFlopNotes(true)
                                }}>
                                    <span className={`${objeto.flop.boardCards[0].color}  cardStyling`}>{objeto.flop.boardCards[0].carta}</span>
                                    <span className={`${objeto.flop.boardCards[1].color}  cardStyling`}>{objeto.flop.boardCards[1].carta}</span>
                                    <span className={`${objeto.flop.boardCards[2].color}  cardStyling`}>{objeto.flop.boardCards[2].carta}</span>
                                    <div id='flop-notes' className={showFlopNotes === true && idClicked === objeto._id || flopTitleClicked === true ? 'preflopNotes-active' : 'preflopNotes'} >

                                        {objeto.flop.notes[0] === '' ? '' : <div><h5>Notes</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.flop.notes[0]}></textarea></div>}
                                        {objeto.flop.flopCheckCall === '' ? '' : <div><h5>CHECK/CALL</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.flop.flopCheckCall}></textarea></div>}
                                        {objeto.flop.flopCheckFold === '' ? '' : <div><h5>CHECK/FOLD</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.flop.flopCheckFold}></textarea></div>}
                                        {objeto.flop.flopCheckRaise === '' ? '' : <div><h5>CHECK/RAISE</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.flop.flopCheckRaise}></textarea></div>}
                                        {objeto.flop.flopCheckBehind === '' ? '' : <div><h5>CHECK/BEHIND</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.flop.flopCheckBehind}></textarea></div>}
                                        {objeto.flop.flopBet === '' ? '' : <div ><h5>BET</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.flop.flopBet}></textarea></div>}<br />
                                    </div>
                                </div>

                            </td>
                            {/* Tercera columna */}
                            <td >
                                <div onClick={(e) => {
                                    setidClicked(objeto._id)
                                    showTurnNotes === true ? setShowTurnNotes(false) : setShowTurnNotes(true)
                                }}>
                                    <span className={`${objeto.turn.boardCards.color}  cardStyling`}>{objeto.turn.boardCards.carta}</span>
                                    <div id='turn-notes' className={showTurnNotes === true && idClicked === objeto._id || turnTitleClicked === true ? 'preflopNotes-active' : 'preflopNotes'} >
                                        {objeto.turn.notes[0] === '' ? '' : <div><h5>Notes</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.turn.notes[0]}></textarea></div>}
                                        {objeto.turn.turnCheckCall === '' ? '' : <div><h5>CHECK/CALL</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.turn.turnCheckCall}></textarea></div>}
                                        {objeto.turn.turnCheckFold === '' ? '' : <div><h5>CHECK/FOLD</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.turn.turnCheckFold}></textarea></div>}
                                        {objeto.turn.turnCheckRaise === '' ? '' : <div><h5>CHECK/RAISE</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.turn.turnCheckRaise}></textarea></div>}
                                        {objeto.turn.turnCheckBehind === '' ? '' : <div><h5>CHECK/BEHIND</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.turn.turnCheckBehind}></textarea></div>}
                                        {objeto.turn.turnBet === '' ? '' : <div ><h5>BET</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.turn.turnBet}></textarea></div>}<br />
                                    </div>
                                </div>

                            </td>
                            {/* Cuarta columna */}
                            <td >
                                <div onClick={(e) => {
                                    setidClicked(objeto._id)
                                    showRiverNotes === true ? setShowRiverNotes(false) : setShowRiverNotes(true)
                                }}>
                                    <span className={`${objeto.river.boardCards.color}  cardStyling`}>{objeto.river.boardCards.carta}</span>
                                    <div id='river-notes' className={showRiverNotes === true && idClicked === objeto._id || riverTitleClicked === true ? 'preflopNotes-active' : 'preflopNotes'} >

                                        {objeto.river.notes[0] === '' ? '' : <div><h5>Notes</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.river.notes[0]}></textarea></div>}
                                        {objeto.river.riverCheckCall === '' ? '' : <div><h5>CHECK/CALL</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.river.riverCheckCall}></textarea></div>}
                                        {objeto.river.riverCheckFold === '' ? '' : <div><h5>CHECK/FOLD</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.river.riverCheckFold}></textarea></div>}
                                        {objeto.river.riverCheckRaise === '' ? '' : <div><h5>CHECK/RAISE</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.river.riverCheckRaise}></textarea></div>}
                                        {objeto.river.riverCheckBehind === '' ? '' : <div><h5>CHECK/BEHIND</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.river.riverCheckBehind}></textarea></div>}
                                        {objeto.river.riverBet === '' ? '' : <div ><h5>BET</h5><textarea type="text" className='borderBlack fitHeightNotes' defaultValue={objeto.river.riverBet}></textarea></div>}
                                    </div>
                                </div>

                            </td>
                        </tr>
                    )
                    )
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Allhands


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
            console.log(posicion + '-' + instancia + '-' + iniciativa + '-' + boardType + '-' + situation)
        })
    }

    // lista de situaciones sacada de handsData
    let situationList = []
    handsData.forEach((hand) => {
        situationList.push(hand.flop.situation)
        situationList.push(hand.turn.situation)
        situationList.push(hand.river.situation)
    })
    let uniqueSituations = [...new Set(situationList)];


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
                    OOP  <input type="radio" name="posicion" value='OOP' onChange={(e) => {
                        setPosicion(e.currentTarget.value)
                    }} /><br /><br />
                    IP  <input type="radio" name="posicion" value='IP' onChange={(e) => {
                        setPosicion(e.currentTarget.value)
                    }} /><br /><br />
                </div>
                {/* Instancia */}
                <div>
                    <h4>Instancia</h4>
                    FLOP  <input type="radio" name='instancia' value="flop" onChange={(e) => {
                        setInstancia(e.currentTarget.value)
                    }} /><br /><br />
                    TURN  <input type="radio" name='instancia' value="turn" onChange={(e) => {
                        setInstancia(e.currentTarget.value)
                    }} /><br /><br />
                    RIVER  <input type="radio" name='instancia' value="river" onChange={(e) => {
                        setInstancia(e.currentTarget.value)
                    }} /><br /><br />
                </div>
                {/* Iniciativa */}
                <div>
                    <h4>Iniciativa</h4>
                    Sin iniciativa  <input type="radio" value="SI" name='iniciativa' onChange={(e) => {
                        setIniciativa(e.currentTarget.value)
                    }} /><br /><br />
                    Con iniciativa  <input type="radio" value="CI" name='iniciativa' onChange={(e) => {
                        setIniciativa(e.currentTarget.value)
                    }} /><br /><br />
                </div>
                {/* Board Type */}
                <div>
                    <h4>Board Type</h4>
                    Seco  <input type="radio" name="boardType" value='seco' onChange={(e) => {
                        setBoardType(e.currentTarget.value)
                    }} /><br /><br />
                    Semi-mojado  <input type="radio" name="boardType" value='semi mojado' onChange={(e) => {
                        setBoardType(e.currentTarget.value)
                    }} /><br /><br />
                    Ofensivo  <input type="radio" name="boardType" value='ofensivo' onChange={(e) => {
                        setBoardType(e.currentTarget.value)
                    }} /><br /><br />
                    Mojado  <input type="radio" name="boardType" value='mojado' onChange={(e) => {
                        setBoardType(e.currentTarget.value)
                    }} /><br /><br />
                </div>
                {/* Situation */}
                <div>
                    <h4>Situation</h4>
                    <input
                        type="text"
                        name="situationFilter"
                        id="situationFilter"
                        onChange={(e) => {
                            setSituation(e.currentTarget.value)
                        }}
                    /><br /><br />
                    {uniqueSituations.map((item) => (<p className='clickableSituations' onClick={(e) => {
                        document.getElementById("situationFilter").value = e.currentTarget.innerHTML
                        setSituation(e.currentTarget.innerHTML)
                    }}>{item}</p>))}
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

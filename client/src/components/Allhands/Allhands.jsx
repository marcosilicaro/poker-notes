
import React, {useState} from 'react'
import './allhands.css'
import axios from '../../axios'
import { useEffect } from "react";

 

function Allhands() {

    const [handsData, sethandsData] = useState([])

    const [posicion, setPosicion] = useState('')
    const [iniciativa, setIniciativa] = useState('')
    const [instancia, setInstancia] = useState('')
    const [boardType, setBoardType] = useState('')
    const [situation, setSituation] = useState('')

// cada vez que se re-renderiza el componente (la app) se ejecuta get all
  useEffect(() => {
    axios.get("/").then((res)=>{
        sethandsData(res.data)
    })
  }, [])

  const clickButton = () => {
    axios.get("/"+posicion+'-'+instancia+'-'+iniciativa+'-'+boardType+'-'+situation).then((res)=>{
        sethandsData(res.data)
        console.log(posicion+'-'+instancia+'-'+iniciativa+'-'+boardType+'-'+situation)
    })
  }

    
    return ( 
        <div className='table-container' >
            <h2>Filters</h2>
            <div className='checkbox checkbox-boardTypes'>
                <div>
                    <h4>Posicion</h4>
                    OOP  <input type="checkbox" name="OOP"  onChange={(e) => {
                            setPosicion(e.currentTarget.name)
                        }}/><br/><br/>
                    IP  <input type="checkbox" name="IP" onChange={(e) => {
                            setPosicion(e.currentTarget.name)
                        }}/><br/><br/>
                </div>
                <div>
                    <h4>Instancia</h4>
                    PREFLOP  <input type="checkbox" name="preflop" onChange={(e) => {
                            setInstancia(e.currentTarget.name)
                        }}/><br/><br/>
                    FLOP  <input type="checkbox" name="flop" onChange={(e) => {
                            setInstancia(e.currentTarget.name)
                        }}/><br/><br/>
                    TURN  <input type="checkbox" name="turn" onChange={(e) => {
                            setInstancia(e.currentTarget.name)
                        }}/><br/><br/>
                    RIVER  <input type="checkbox" name="river" onChange={(e) => {
                            setInstancia(e.currentTarget.name)
                        }}/><br/><br/>
                </div>
                <div>
                    <h4>Iniciativa</h4>
                    Sin iniciativa  <input type="checkbox" name="SI" onChange={(e) => {
                            setIniciativa(e.currentTarget.name)
                        }}/><br/><br/>
                    Con iniciativa  <input type="checkbox" name="CI" onChange={(e) => {
                        setIniciativa(e.currentTarget.name)
                        }}/><br/><br/>
                </div>
                <div>
                    <h4>Board Type</h4>
                    Seco  <input type="checkbox" name="seco" onChange={(e) => {
                            setBoardType(e.currentTarget.name)
                        }}/><br/><br/>
                    Semi-mojado  <input type="checkbox" name="semimojado" onChange={(e) => {
                            setBoardType(e.currentTarget.name)
                        }}/><br/><br/>
                    Ofensivo  <input type="checkbox" name="ofensivo" onChange={(e) => {
                            setBoardType(e.currentTarget.name)
                        }}/><br/><br/>
                    Mojado  <input type="checkbox" name="mojado" onChange={(e) => {
                            setBoardType(e.currentTarget.name)
                        }}/><br/><br/>
                </div>
                <div>
                    <h4>Situation</h4>
                    vs 2nd barrel  <input type="checkbox" name="vs2ndbarrel" onChange={(e) => {
                            setSituation(e.currentTarget.name)
                        }}/><br/><br/>
                    vs 3rd barrel  <input type="checkbox" name="vs3rdbarrel" onChange={(e) => {
                            setSituation(e.currentTarget.name)
                        }}/><br/><br/>
                    vs 4th barrel  <input type="checkbox" name="vs4thbarrel" onChange={(e) => {
                            setSituation(e.currentTarget.name)
                        }}/><br/><br/>
                </div>
            </div>

            <button onClick={(e) => {clickButton()}}> SEND</button>
            <button onClick={(e) => {
                setPosicion('')
                setBoardType('')
                setIniciativa('')
                setInstancia('')
                setSituation('')
            }}> RESET</button>


            <table className='table table-bordered'>
                <thead>
                    <th>Preflop</th>
                    <th>Flop</th>
                    <th>Turn</th>
                    <th>River</th>
                </thead>
                <tbody>

                {handsData.map((objeto)=>(
                            <tr >
                                <td className='greyBackground'> 
                                    <span className={`${objeto.preflop.heroCards[0].color} cardStyling`}>{objeto.preflop.heroCards[0].carta}</span> 
                                    <span className={`${objeto.preflop.heroCards[1].color} cardStyling`}>{objeto.preflop.heroCards[1].carta}</span>
                                </td>
                                <td > 
                                    <span className={`${objeto.flop.boardCards[0].color}  cardStyling`}>{objeto.flop.boardCards[0].carta}</span> 
                                    <span className={`${objeto.flop.boardCards[1].color}  cardStyling`}>{objeto.flop.boardCards[1].carta}</span>
                                    <span className={`${objeto.flop.boardCards[2].color}  cardStyling`}>{objeto.flop.boardCards[2].carta}</span>
                                </td>
                                <td > 
                                    <span className={`${objeto.turn.boardCards.color}  cardStyling`}>{objeto.turn.boardCards.carta}</span>
                                </td>
                                <td > 
                                    <span className={`${objeto.river.boardCards.color}  cardStyling`}>{objeto.river.boardCards.carta}</span>
                                </td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
            {posicion} - {instancia} - {iniciativa} - {boardType} - {situation}
        </div>
    )
}

export default Allhands


import React, {useState} from 'react'
import './table.css'
import axios from '../../axios'
import { useEffect } from "react";

const data = [{
    "id": 1,
    "preflop": {
        "heroCards": [{"carta":'A', "color":"azul"},{"carta":'A', "color":"negro"}],
        "heroPosition": "BB",
        "betFlow": {
            "SB": [0.5,'F'],
            "BB": [1,9],
            "UTG": [3,9],
            "HJ": ['F'],
            "CO": ['F'],
            "BTN": [9]
        },
        "notes": ['Las notas de preflop son casi inexistentes']
    },
    "flop": {
        "betFlow": {
            "SB": [],
            "BB": ['C',10],
            "UTG": ['C','F'],
            "HJ": [],
            "CO": [],
            "BTN": [10]
        },
        "situation": "2nd-barrel",
        "boardCards": [{"carta":'A', "color":"azul"},{"carta":'A', "color":"verde"}, {"carta":'K', "color":"negro"}],
        "boardType": 'ofensivo',
        "decision": "call con quads",
        "villainType": "aggro",
        "notes": ['tenes quads, no hay mucho que hacerle mas que hacer crecer el pot lo mas posible. Este vendria a ser el ejemplo de la mejor mano que puedas tener']
    },
    "turn": {
        "betFlow": {
            "SB": [],
            "BB": ['C',30],
            "UTG": [],
            "HJ": [],
            "CO": [],
            "BTN": [30]
        },
        "situation": "3rd-barrel",
        "boardCards": {"carta":2, "color":"azul"},
        "boardType": 'ofensivo',
        "decision": "call",
        "villainType": "aggro",
        "notes": ['call a todo porque es aggro']
    },
    "river": {
        "betFlow": {
            "SB": [],
            "BB": [100],
            "UTG": [],
            "HJ": [],
            "CO": [],
            "BTN": [100]
        },
        "situation": "4th-barrel",
        "boardCards": {"carta":6, "color":"rojo"},
        "boardType": 'ofensivo',
        "decision": "all in de cara",
        "villainType": "aggro",
        "notes": ['anda all in de cara porque sabes que te va a querer']
    }
},
{
    "id": 2,
    "preflop": {
        "heroCards": [{"carta":'Q', "color":"rojo"},{"carta":'Q', "color":"negro"}],
        "heroPosition": "BB",
        "betFlow": {
            "SB": [0.5,'F'],
            "BB": [1,9],
            "UTG": [3,9],
            "HJ": ['F'],
            "CO": ['F'],
            "BTN": [9]
        },
        "notes": ['Las notas de preflop son casi inexistentes']
    },
    "flop": {
        "betFlow": {
            "SB": [],
            "BB": ['C',10],
            "UTG": ['C','F'],
            "HJ": [],
            "CO": [],
            "BTN": [10]
        },
        "situation": "vs-check-behind",
        "boardCards": [{"carta":'2', "color":"verde"},{"carta":'7', "color":"rojo"}, {"carta":'2', "color":"azul"}],
        "boardType": 'seco',
        "decision": "call con top pair",
        "villainType": "aggro",
        "notes": ['tenes top pair en board seco, hay que hacer call']
    },
    "turn": {
        "betFlow": {
            "SB": [],
            "BB": ['C'],
            "UTG": [],
            "HJ": [],
            "CO": [],
            "BTN": ['C']
        },
        "situation": "vs-check-behind",
        "boardCards": {"carta":4, "color":"negro"},
        "boardType": 'seco',
        "decision": "call con top pair",
        "villainType": "aggro",
        "notes": ['es un board seco y V es agro -> seguro renuncio']
    },
    "river": {
        "betFlow": {
            "SB": [],
            "BB": [100],
            "UTG": [],
            "HJ": [],
            "CO": [],
            "BTN": [100]
        },
        "situation": "vs-check-behind",
        "boardCards": {"carta":'A', "color":"rojo"},
        "boardType": 'ofensivo',
        "decision": "pot bet o +",
        "villainType": "aggro",
        "notes": ['en la gran mayoria de los casos tenes top pair -> aunque el pueda tener sets, definitivamente vale la pena ir fuerte']
    }
}, 
{
    "id": 3,
    "preflop": {
        "heroCards": [{"carta":'J', "color":"azul"},{"carta":'Q', "color":"negro"}],
        "heroPosition": "BB",
        "betFlow": {
            "SB": [0.5,'F'],
            "BB": [1,9],
            "UTG": [3,9],
            "HJ": ['F'],
            "CO": ['F'],
            "BTN": [9]
        },
        "notes": ['Las notas de preflop son casi inexistentes']
    },
    "flop": {
        "betFlow": {
            "SB": [],
            "BB": ['C',10],
            "UTG": ['C','F'],
            "HJ": [],
            "CO": [],
            "BTN": [10]
        },
        "situation": "2nd-barrel",
        "boardCards": [{"carta":'3', "color":"verde"},{"carta":'7', "color":"negro"}, {"carta":'9', "color":"rojo"}],
        "boardType": 'seco',
        "decision": "call con top pair",
        "villainType": "aggro",
        "notes": ['tenes top pair en board seco, hay que hacer call']
    },
    "turn": {
        "betFlow": {
            "SB": [],
            "BB": ['C'],
            "UTG": [],
            "HJ": [],
            "CO": [],
            "BTN": ['C']
        },
        "situation": "vs-check-behind",
        "boardCards": {"carta":2, "color":"negro"},
        "boardType": 'seco',
        "decision": "call con top pair",
        "villainType": "aggro",
        "notes": ['es un board seco y V es agro -> seguro renuncio']
    },
    "river": {
        "betFlow": {
            "SB": [],
            "BB": [100],
            "UTG": [],
            "HJ": [],
            "CO": [],
            "BTN": [100]
        },
        "situation": "vs-check-behind",
        "boardCards": {"carta":'A', "color":"rojo"},
        "boardType": 'ofensivo',
        "decision": "pot bet o +",
        "villainType": "aggro",
        "notes": ['en la gran mayoria de los casos tenes top pair -> aunque el pueda tener sets, definitivamente vale la pena ir fuerte']
    }
}]

 

function Table() {

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
    axios.get("/"+posicion+'-'+instancia+'-'+iniciativa+'-'+boardType).then((res)=>{
        sethandsData(res.data)
        console.log(posicion+'-'+iniciativa+'-'+instancia+'-'+boardType)
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
                    vs 2nd barrel  <input type="checkbox" name="2ndbarrel" onChange={(e) => {
                            setSituation(e.currentTarget.name)
                        }}/><br/><br/>
                    vs 3rd barrel  <input type="checkbox" name="3rdbarrel" onChange={(e) => {
                            setSituation(e.currentTarget.name)
                        }}/><br/><br/>
                    vs 4th barrel  <input type="checkbox" name="4thbarrel" onChange={(e) => {
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

export default Table

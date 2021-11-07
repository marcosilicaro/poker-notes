
import React, {useState} from 'react'
import './table.css'

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

    const [notesOn, setNotesOn] = useState('')
    const [idClicked, setIdClicked] = useState('')

    const [anyCheckboxChecked, setAnyCheckboxChecked] = useState(false)
    const [levelFiltered, setlevelFiltered] = useState()
    const [boardTypeFiltered, setboardTypeFiltered] = useState()
    const [situationFiltered, setsituationFiltered] = useState()

    const handleChange  = (e, boardFiltered, levelFiltered, situationFiltered) =>{
        setAnyCheckboxChecked(e.currentTarget.checked)
        setboardTypeFiltered(boardFiltered)
        setlevelFiltered(levelFiltered)
        setsituationFiltered(situationFiltered)
    }

    const refreshData = () => {
        return data
    }

    

    const filterBySituation = () => {
        if (situationFiltered){
            return data.filter(objeto => objeto[levelFiltered].situation===situationFiltered)
        } 
    }

    const filterByBoardType = ()=> {
        // si esta chequeado por board type
        if(boardTypeFiltered){
            return data.filter(objeto => objeto[levelFiltered].boardType===boardTypeFiltered)
        } 
    }


    

    if(anyCheckboxChecked===true && boardTypeFiltered){
        return ( 
            <div className='table-container' >
                <h2>Filter by Board Types</h2>
                <div className='checkbox checkbox-boardTypes'>
                    <div>
                        <h4>Flop</h4>
                        Seco  <input type="checkbox" name="seco" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setboardTypeFiltered('seco')
                        }}/><br/>
                        Semi-mojado  <input type="checkbox" name="semi-mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setboardTypeFiltered('semi-mojado')
                        }}/><br/>
                        Ofensivo  <input type="checkbox" name="ofensivo" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setboardTypeFiltered('ofensivo')
                        }}/><br/>
                        Mojado  <input type="checkbox" name="mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setboardTypeFiltered('mojado')
                        }}/><br/>
                    </div>
                    <div>
                        <h4>Turn</h4>
                        Seco  <input type="checkbox" name="seco" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('turn')
                            setboardTypeFiltered('seco')
                        }}/><br/>
                        Semi-mojado  <input type="checkbox" name="semi-mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('turn')
                            setboardTypeFiltered('semi-mojado')
                        }}/><br/>
                        Ofensivo  <input type="checkbox" name="ofensivo" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('turn')
                            setboardTypeFiltered('ofensivo')
                        }}/><br/>
                        Mojado  <input type="checkbox" name="mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('turn')
                            setboardTypeFiltered('mojado')
                        }}/><br/>
                    </div>
                    <div>
                        <h4>River</h4>
                        Seco  <input type="checkbox" name="seco" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('river')
                            setboardTypeFiltered('seco')
                        }}/><br/>
                        Semi-mojado  <input type="checkbox" name="semi-mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('river')
                            setboardTypeFiltered('semi-mojado')
                        }}/><br/>
                        Ofensivo  <input type="checkbox" name="ofensivo" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('river')
                            setboardTypeFiltered('ofensivo')
                        }}/><br/>
                        Mojado  <input type="checkbox" name="mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('river')
                            setboardTypeFiltered('mojado')
                        }}/><br/>
                    </div>
                </div>
                <hr class="dashed"/>
                <br/>
                <h2>Filter by Situation</h2>
                <div className="checkbox checkbox-situation">
                <div>
                        <h4>Flop</h4>
                        vs 2nd Barrel  <input type="checkbox" name="2nd-barrel" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setsituationFiltered('2nd-barrel')
                        }}/><br/>
                        vs Check Behind<input type="checkbox" name="vs-check-behind" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setsituationFiltered('vs-check-behind')
                        }}/><br/>
                    </div>
                    <div>
                        <h4>Turn</h4>
                        3rd Barrel  <input type="checkbox" name="3rd-barrel" onChange={(e) => handleChange(e, 'turn')}/><br/>
                        vs Check Behind  <input type="checkbox" name="vs-check-behind" onChange={(e) => handleChange(e, 'turn')}  /><br/>
                    </div>
                    <div>
                        <h4>River</h4>
                        4th Barrel  <input type="checkbox" name="4th-barrel" onChange={(e) => handleChange(e, 'river')}/><br/>
                        vs Check Behind  <input type="checkbox" name="vs-check-behind" onChange={(e) => handleChange(e, 'river')}  /><br/><br/><br/>
                    </div>
                </div>
    
    
                <table className='table table-bordered'>
                    <thead>
                        <th>Preflop</th>
                        <th>Flop</th>
                        <th>Turn</th>
                        <th>River</th>
                    </thead>
                    <tbody>
    
                    {filterByBoardType(anyCheckboxChecked,levelFiltered,boardTypeFiltered,situationFiltered)
                    .map((objeto)=>(
                                <tr key= {objeto.id} onClick={() => setIdClicked(objeto.id)}>
                                    <td className='greyBackground'> 
                                        <span onClick={() => setNotesOn("preflop")}><span className={`${objeto.preflop.heroCards[0].color}  cardStyling`}>{objeto.preflop.heroCards[0].carta}</span> <span className={`${objeto.preflop.heroCards[1].color} cardStyling`}>{objeto.preflop.heroCards[1].carta}</span></span>
                                        <div onClick={() => setNotesOn("")} className={` ${notesOn==='preflop' && objeto.id===idClicked? 'preflopNotes-active' : 'preflopNotes'}`}>
                                            {objeto.preflop.notes}
                                        </div>
                                    </td>
                                    <td> <div onClick={() => setNotesOn("flop") } id="flopDiv"><span className={`${objeto.flop.boardCards[0].color} cardStyling`}>{objeto.flop.boardCards[0].carta}</span> <span className={`${objeto.flop.boardCards[1].color} cardStyling`}>{objeto.flop.boardCards[1].carta}</span> <span className={`${objeto.flop.boardCards[2].color} cardStyling`}>{objeto.flop.boardCards[2].carta}</span></div>
                                        <div onClick={() => setNotesOn("")} className={` ${notesOn==='flop' && objeto.id===idClicked ? 'flopNotes-active' : 'flopNotes'}`}>
                                            {objeto.flop.notes}
                                        </div>
                                    </td>
                                    <td > <span onClick={() => setNotesOn("turn")}><span className={`${objeto.turn.boardCards.color} cardStyling`}>{objeto.turn.boardCards.carta}</span></span>
                                        <div onClick={() => setNotesOn("")} className={` ${notesOn==='turn' && objeto.id===idClicked ? 'turnNotes-active' : 'turnNotes'}`}>
                                            {objeto.turn.notes}
                                        </div>
                                    </td>
                                    <td > <span onClick={() => setNotesOn("river")}><span className={`${objeto.river.boardCards.color} cardStyling`}>{objeto.river.boardCards.carta}</span></span>
                                        <div onClick={() => setNotesOn("")} className={` ${notesOn==='river' && objeto.id===idClicked ?  'riverNotes-active' : 'riverNotes'}`}>
                                            {objeto.river.notes}
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
    } else if (anyCheckboxChecked===true && situationFiltered){
        return ( 
            <div className='table-container' >
                <h2>Filter by Board Types</h2>
                <div className='checkbox checkbox-boardTypes'>
                    <div>
                        <h4>Flop</h4>
                        Seco  <input type="checkbox" name="seco" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setboardTypeFiltered('seco')
                        }}/><br/>
                        Semi-mojado  <input type="checkbox" name="semi-mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setboardTypeFiltered('semi-mojado')
                        }}/><br/>
                        Ofensivo  <input type="checkbox" name="ofensivo" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setboardTypeFiltered('ofensivo')
                        }}/><br/>
                        Mojado  <input type="checkbox" name="mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setboardTypeFiltered('mojado')
                        }}/><br/>
                    </div>
                    <div>
                        <h4>Turn</h4>
                        Seco  <input type="checkbox" name="seco" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('turn')
                            setboardTypeFiltered('seco')
                        }}/><br/>
                        Semi-mojado  <input type="checkbox" name="semi-mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('turn')
                            setboardTypeFiltered('semi-mojado')
                        }}/><br/>
                        Ofensivo  <input type="checkbox" name="ofensivo" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('turn')
                            setboardTypeFiltered('ofensivo')
                        }}/><br/>
                        Mojado  <input type="checkbox" name="mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('turn')
                            setboardTypeFiltered('mojado')
                        }}/><br/>
                    </div>
                    <div>
                        <h4>River</h4>
                        Seco  <input type="checkbox" name="seco" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('river')
                            setboardTypeFiltered('seco')
                        }}/><br/>
                        Semi-mojado  <input type="checkbox" name="semi-mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('river')
                            setboardTypeFiltered('semi-mojado')
                        }}/><br/>
                        Ofensivo  <input type="checkbox" name="ofensivo" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('river')
                            setboardTypeFiltered('ofensivo')
                        }}/><br/>
                        Mojado  <input type="checkbox" name="mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('river')
                            setboardTypeFiltered('mojado')
                        }}/><br/>
                    </div>
                </div>
                <hr class="dashed"/>
                <br/>
                <h2>Filter by Situation</h2>
                <div className="checkbox checkbox-situation">
                <div>
                        <h4>Flop</h4>
                        vs 2nd Barrel  <input type="checkbox" name="2nd-barrel" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setsituationFiltered('2nd-barrel')
                        }}/><br/>
                        vs Check Behind<input type="checkbox" name="vs-check-behind" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setsituationFiltered('vs-check-behind')
                        }}/><br/>
                    </div>
                    <div>
                        <h4>Turn</h4>
                        3rd Barrel  <input type="checkbox" name="3rd-barrel" onChange={(e) => handleChange(e, 'turn')}/><br/>
                        vs Check Behind  <input type="checkbox" name="vs-check-behind" onChange={(e) => handleChange(e, 'turn')}  /><br/>
                    </div>
                    <div>
                        <h4>River</h4>
                        4th Barrel  <input type="checkbox" name="4th-barrel" onChange={(e) => handleChange(e, 'river')}/><br/>
                        vs Check Behind  <input type="checkbox" name="vs-check-behind" onChange={(e) => handleChange(e, 'river')}  /><br/><br/><br/>
                    </div>
                </div>
    
    
                <table className='table table-bordered'>
                    <thead>
                        <th>Preflop</th>
                        <th>Flop</th>
                        <th>Turn</th>
                        <th>River</th>
                    </thead>
                    <tbody>
    
                    {filterBySituation(anyCheckboxChecked,levelFiltered,boardTypeFiltered,situationFiltered)
                    .map((objeto)=>(
                                <tr key= {objeto.id} onClick={() => setIdClicked(objeto.id)}>
                                    <td className='greyBackground'> 
                                        <span onClick={() => setNotesOn("preflop")}><span className={`${objeto.preflop.heroCards[0].color}  cardStyling`}>{objeto.preflop.heroCards[0].carta}</span> <span className={`${objeto.preflop.heroCards[1].color} cardStyling`}>{objeto.preflop.heroCards[1].carta}</span></span>
                                        <div onClick={() => setNotesOn("")} className={` ${notesOn==='preflop' && objeto.id===idClicked? 'preflopNotes-active' : 'preflopNotes'}`}>
                                            {objeto.preflop.notes}
                                        </div>
                                    </td>
                                    <td> <div onClick={() => setNotesOn("flop") } id="flopDiv"><span className={`${objeto.flop.boardCards[0].color} cardStyling`}>{objeto.flop.boardCards[0].carta}</span> <span className={`${objeto.flop.boardCards[1].color} cardStyling`}>{objeto.flop.boardCards[1].carta}</span> <span className={`${objeto.flop.boardCards[2].color} cardStyling`}>{objeto.flop.boardCards[2].carta}</span></div>
                                        <div onClick={() => setNotesOn("")} className={` ${notesOn==='flop' && objeto.id===idClicked ? 'flopNotes-active' : 'flopNotes'}`}>
                                            {objeto.flop.notes}
                                        </div>
                                    </td>
                                    <td > <span onClick={() => setNotesOn("turn")}><span className={`${objeto.turn.boardCards.color} cardStyling`}>{objeto.turn.boardCards.carta}</span></span>
                                        <div onClick={() => setNotesOn("")} className={` ${notesOn==='turn' && objeto.id===idClicked ? 'turnNotes-active' : 'turnNotes'}`}>
                                            {objeto.turn.notes}
                                        </div>
                                    </td>
                                    <td > <span onClick={() => setNotesOn("river")}><span className={`${objeto.river.boardCards.color} cardStyling`}>{objeto.river.boardCards.carta}</span></span>
                                        <div onClick={() => setNotesOn("")} className={` ${notesOn==='river' && objeto.id===idClicked ?  'riverNotes-active' : 'riverNotes'}`}>
                                            {objeto.river.notes}
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
    } else if (anyCheckboxChecked===true && situationFiltered && boardTypeFiltered){
        return ( 
            <div className='table-container' >
                <h2>Filter by Board Types</h2>
                <div className='checkbox checkbox-boardTypes'>
                    <div>
                        <h4>Flop</h4>
                        Seco  <input type="checkbox" name="seco" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setboardTypeFiltered('seco')
                        }}/><br/>
                        Semi-mojado  <input type="checkbox" name="semi-mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setboardTypeFiltered('semi-mojado')
                        }}/><br/>
                        Ofensivo  <input type="checkbox" name="ofensivo" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setboardTypeFiltered('ofensivo')
                        }}/><br/>
                        Mojado  <input type="checkbox" name="mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setboardTypeFiltered('mojado')
                        }}/><br/>
                    </div>
                    <div>
                        <h4>Turn</h4>
                        Seco  <input type="checkbox" name="seco" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('turn')
                            setboardTypeFiltered('seco')
                        }}/><br/>
                        Semi-mojado  <input type="checkbox" name="semi-mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('turn')
                            setboardTypeFiltered('semi-mojado')
                        }}/><br/>
                        Ofensivo  <input type="checkbox" name="ofensivo" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('turn')
                            setboardTypeFiltered('ofensivo')
                        }}/><br/>
                        Mojado  <input type="checkbox" name="mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('turn')
                            setboardTypeFiltered('mojado')
                        }}/><br/>
                    </div>
                    <div>
                        <h4>River</h4>
                        Seco  <input type="checkbox" name="seco" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('river')
                            setboardTypeFiltered('seco')
                        }}/><br/>
                        Semi-mojado  <input type="checkbox" name="semi-mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('river')
                            setboardTypeFiltered('semi-mojado')
                        }}/><br/>
                        Ofensivo  <input type="checkbox" name="ofensivo" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('river')
                            setboardTypeFiltered('ofensivo')
                        }}/><br/>
                        Mojado  <input type="checkbox" name="mojado" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('river')
                            setboardTypeFiltered('mojado')
                        }}/><br/>
                    </div>
                </div>
                <hr class="dashed"/>
                <br/>
                <h2>Filter by Situation</h2>
                <div className="checkbox checkbox-situation">
                <div>
                        <h4>Flop</h4>
                        vs 2nd Barrel  <input type="checkbox" name="2nd-barrel" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setsituationFiltered('2nd-barrel')
                        }}/><br/>
                        vs Check Behind<input type="checkbox" name="vs-check-behind" onChange={(e) => {
                            setAnyCheckboxChecked(e.currentTarget.checked)
                            setlevelFiltered('flop')
                            setsituationFiltered('vs-check-behind')
                        }}/><br/>
                    </div>
                    <div>
                        <h4>Turn</h4>
                        3rd Barrel  <input type="checkbox" name="3rd-barrel" onChange={(e) => handleChange(e, 'turn')}/><br/>
                        vs Check Behind  <input type="checkbox" name="vs-check-behind" onChange={(e) => handleChange(e, 'turn')}  /><br/>
                    </div>
                    <div>
                        <h4>River</h4>
                        4th Barrel  <input type="checkbox" name="4th-barrel" onChange={(e) => handleChange(e, 'river')}/><br/>
                        vs Check Behind  <input type="checkbox" name="vs-check-behind" onChange={(e) => handleChange(e, 'river')}  /><br/><br/><br/>
                    </div>
                </div>
    
    
                <table className='table table-bordered'>
                    <thead>
                        <th>Preflop</th>
                        <th>Flop</th>
                        <th>Turn</th>
                        <th>River</th>
                    </thead>
                    <tbody>
    
                    {filterBySituation(filterByBoardType())
                    .map((objeto)=>(
                                <tr key= {objeto.id} onClick={() => setIdClicked(objeto.id)}>
                                    <td className='greyBackground'> 
                                        <span onClick={() => setNotesOn("preflop")}><span className={`${objeto.preflop.heroCards[0].color}  cardStyling`}>{objeto.preflop.heroCards[0].carta}</span> <span className={`${objeto.preflop.heroCards[1].color} cardStyling`}>{objeto.preflop.heroCards[1].carta}</span></span>
                                        <div onClick={() => setNotesOn("")} className={` ${notesOn==='preflop' && objeto.id===idClicked? 'preflopNotes-active' : 'preflopNotes'}`}>
                                            {objeto.preflop.notes}
                                        </div>
                                    </td>
                                    <td> <div onClick={() => setNotesOn("flop") } id="flopDiv"><span className={`${objeto.flop.boardCards[0].color} cardStyling`}>{objeto.flop.boardCards[0].carta}</span> <span className={`${objeto.flop.boardCards[1].color} cardStyling`}>{objeto.flop.boardCards[1].carta}</span> <span className={`${objeto.flop.boardCards[2].color} cardStyling`}>{objeto.flop.boardCards[2].carta}</span></div>
                                        <div onClick={() => setNotesOn("")} className={` ${notesOn==='flop' && objeto.id===idClicked ? 'flopNotes-active' : 'flopNotes'}`}>
                                            {objeto.flop.notes}
                                        </div>
                                    </td>
                                    <td > <span onClick={() => setNotesOn("turn")}><span className={`${objeto.turn.boardCards.color} cardStyling`}>{objeto.turn.boardCards.carta}</span></span>
                                        <div onClick={() => setNotesOn("")} className={` ${notesOn==='turn' && objeto.id===idClicked ? 'turnNotes-active' : 'turnNotes'}`}>
                                            {objeto.turn.notes}
                                        </div>
                                    </td>
                                    <td > <span onClick={() => setNotesOn("river")}><span className={`${objeto.river.boardCards.color} cardStyling`}>{objeto.river.boardCards.carta}</span></span>
                                        <div onClick={() => setNotesOn("")} className={` ${notesOn==='river' && objeto.id===idClicked ?  'riverNotes-active' : 'riverNotes'}`}>
                                            {objeto.river.notes}
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
    }else if(anyCheckboxChecked===false) {

        return ( 
        <div className='table-container' >
            <h2>Filter by Board Types</h2>
            <div className='checkbox checkbox-boardTypes'>
                <div>
                    <h4>Flop</h4>
                    Seco  <input type="checkbox" name="seco" onChange={(e) => {
                        setAnyCheckboxChecked(e.currentTarget.checked)
                        setlevelFiltered('flop')
                        setboardTypeFiltered('seco')
                    }}/><br/>
                    Semi-mojado  <input type="checkbox" name="semi-mojado" onChange={(e) => {
                        setAnyCheckboxChecked(e.currentTarget.checked)
                        setlevelFiltered('flop')
                        setboardTypeFiltered('semi-mojado')
                    }}/><br/>
                    Ofensivo  <input type="checkbox" name="ofensivo" onChange={(e) => {
                        setAnyCheckboxChecked(e.currentTarget.checked)
                        setlevelFiltered('flop')
                        setboardTypeFiltered('ofensivo')
                    }}/><br/>
                    Mojado  <input type="checkbox" name="mojado" onChange={(e) => {
                        setAnyCheckboxChecked(e.currentTarget.checked)
                        setlevelFiltered('flop')
                        setboardTypeFiltered('mojado')
                    }}/><br/>
                </div>
                <div>
                    <h4>Turn</h4>
                    Seco  <input type="checkbox" name="seco" onChange={(e) => {
                        setAnyCheckboxChecked(e.currentTarget.checked)
                        setlevelFiltered('turn')
                        setboardTypeFiltered('seco')
                    }}/><br/>
                    Semi-mojado  <input type="checkbox" name="semi-mojado" onChange={(e) => {
                        setAnyCheckboxChecked(e.currentTarget.checked)
                        setlevelFiltered('turn')
                        setboardTypeFiltered('semi-mojado')
                    }}/><br/>
                    Ofensivo  <input type="checkbox" name="ofensivo" onChange={(e) => {
                        setAnyCheckboxChecked(e.currentTarget.checked)
                        setlevelFiltered('turn')
                        setboardTypeFiltered('ofensivo')
                    }}/><br/>
                    Mojado  <input type="checkbox" name="mojado" onChange={(e) => {
                        setAnyCheckboxChecked(e.currentTarget.checked)
                        setlevelFiltered('turn')
                        setboardTypeFiltered('mojado')
                    }}/><br/>
                </div>
                <div>
                    <h4>River</h4>
                    Seco  <input type="checkbox" name="seco" onChange={(e) => {
                        setAnyCheckboxChecked(e.currentTarget.checked)
                        setlevelFiltered('river')
                        setboardTypeFiltered('seco')
                    }}/><br/>
                    Semi-mojado  <input type="checkbox" name="semi-mojado" onChange={(e) => {
                        setAnyCheckboxChecked(e.currentTarget.checked)
                        setlevelFiltered('river')
                        setboardTypeFiltered('semi-mojado')
                    }}/><br/>
                    Ofensivo  <input type="checkbox" name="ofensivo" onChange={(e) => {
                        setAnyCheckboxChecked(e.currentTarget.checked)
                        setlevelFiltered('river')
                        setboardTypeFiltered('ofensivo')
                    }}/><br/>
                    Mojado  <input type="checkbox" name="mojado" onChange={(e) => {
                        setAnyCheckboxChecked(e.currentTarget.checked)
                        setlevelFiltered('river')
                        setboardTypeFiltered('mojado')
                    }}/><br/>
                </div>
            </div>
            <hr class="dashed"/>
            <br/>
            <h2>Filter by Situation</h2>
            <div className="checkbox checkbox-situation">
            <div>
                    <h4>Flop</h4>
                    vs 2nd Barrel  <input type="checkbox" name="2nd-barrel" onChange={(e) => {
                        setAnyCheckboxChecked(e.currentTarget.checked)
                        setlevelFiltered('flop')
                        setsituationFiltered('2nd-barrel')
                    }}/><br/>
                    vs Check Behind<input type="checkbox" name="vs-check-behind" onChange={(e) => {
                        setAnyCheckboxChecked(e.currentTarget.checked)
                        setlevelFiltered('flop')
                        setsituationFiltered('vs-check-behind')
                    }}/><br/>
                </div>
                <div>
                    <h4>Turn</h4>
                    3rd Barrel  <input type="checkbox" name="3rd-barrel" onChange={(e) => handleChange(e, 'turn')}/><br/>
                    vs Check Behind  <input type="checkbox" name="vs-check-behind" onChange={(e) => handleChange(e, 'turn')}  /><br/>
                </div>
                <div>
                    <h4>River</h4>
                    4th Barrel  <input type="checkbox" name="4th-barrel" onChange={(e) => handleChange(e, 'river')}/><br/>
                    vs Check Behind  <input type="checkbox" name="vs-check-behind" onChange={(e) => handleChange(e, 'river')}  /><br/><br/><br/>
                </div>
            </div>


            <table className='table table-bordered'>
                <thead>
                    <th>Preflop</th>
                    <th>Flop</th>
                    <th>Turn</th>
                    <th>River</th>
                </thead>
                <tbody>

                {refreshData()
                .map((objeto)=>(
                            <tr key= {objeto.id} onClick={() => setIdClicked(objeto.id)}>
                                <td className='greyBackground'> 
                                    <span onClick={() => setNotesOn("preflop")}><span className={`${objeto.preflop.heroCards[0].color}  cardStyling`}>{objeto.preflop.heroCards[0].carta}</span> <span className={`${objeto.preflop.heroCards[1].color} cardStyling`}>{objeto.preflop.heroCards[1].carta}</span></span>
                                    <div onClick={() => setNotesOn("")} className={` ${notesOn==='preflop' && objeto.id===idClicked? 'preflopNotes-active' : 'preflopNotes'}`}>
                                        {objeto.preflop.notes}
                                    </div>
                                </td>
                                <td> <div onClick={() => setNotesOn("flop") } id="flopDiv"><span className={`${objeto.flop.boardCards[0].color} cardStyling`}>{objeto.flop.boardCards[0].carta}</span> <span className={`${objeto.flop.boardCards[1].color} cardStyling`}>{objeto.flop.boardCards[1].carta}</span> <span className={`${objeto.flop.boardCards[2].color} cardStyling`}>{objeto.flop.boardCards[2].carta}</span></div>
                                    <div onClick={() => setNotesOn("")} className={` ${notesOn==='flop' && objeto.id===idClicked ? 'flopNotes-active' : 'flopNotes'}`}>
                                        {objeto.flop.notes}
                                    </div>
                                </td>
                                <td > <span onClick={() => setNotesOn("turn")}><span className={`${objeto.turn.boardCards.color} cardStyling`}>{objeto.turn.boardCards.carta}</span></span>
                                    <div onClick={() => setNotesOn("")} className={` ${notesOn==='turn' && objeto.id===idClicked ? 'turnNotes-active' : 'turnNotes'}`}>
                                        {objeto.turn.notes}
                                    </div>
                                </td>
                                <td > <span onClick={() => setNotesOn("river")}><span className={`${objeto.river.boardCards.color} cardStyling`}>{objeto.river.boardCards.carta}</span></span>
                                    <div onClick={() => setNotesOn("")} className={` ${notesOn==='river' && objeto.id===idClicked ?  'riverNotes-active' : 'riverNotes'}`}>
                                        {objeto.river.notes}
                                    </div>
                                </td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
        </div>
    )}
}

export default Table

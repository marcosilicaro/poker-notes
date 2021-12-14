import './addhands.css'
import axios from '../../axios'
import { useState } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Selector from '../Selector/Selector';
import Button from '@mui/material/Button';


function Addhands() {

  const [positionExist, setpositionExist] = useState('-')

  const [preflopCarta1, setpreflopCarta1] = useState({ carta: '', color: '' })
  const [preflopCarta2, setpreflopCarta2] = useState({ carta: '', color: '' })

  const [flopCarta1, setflopCarta1] = useState({ carta: '', color: '' })
  const [flopCarta2, setflopCarta2] = useState({ carta: '', color: '' })
  const [flopCarta3, setflopCarta3] = useState({ carta: '', color: '' })

  const [turnCarta, setturnCarta] = useState({ carta: '', color: '' })

  const [riverCarta, setriverCarta] = useState({ carta: '', color: '' })

  const [posicion, setPosicion] = useState('')
  const [heroPosicion, setheroPosicion] = useState('')

  const [iniciativaPreflop, setIniciativaPreflop] = useState('')

  const [iniciativaFlop, setIniciativaFlop] = useState('')
  const [situacionFlop, setsituacionFlop] = useState('')
  const [boardTypeFlop, setBoardTypeFlop] = useState('')

  const [iniciativaTurn, setIniciativaTurn] = useState('')
  const [situacionTurn, setsituacionTurn] = useState('')
  const [boardTypeTurn, setBoardTypeTurn] = useState('')

  const [iniciativaRiver, setIniciativaRiver] = useState('')
  const [situacionRiver, setsituacionRiver] = useState('')
  const [boardTypeRiver, setBoardTypeRiver] = useState('')

  const [author, setauthor] = useState('david diaz')


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/createHand", {
      "preflop": {
        "heroCards": [
          {
            "carta": preflopCarta1.carta,
            "color": preflopCarta1.color
          },
          {
            "carta": preflopCarta2.carta,
            "color": preflopCarta2.color
          }
        ],
        "heroIniciativa": iniciativaPreflop,
        "heroPosition": posicion,
        "heroExactPosition": heroPosicion,
        "author": author,
        "notes": [
          document.getElementById("preflopNotes").value
        ]
      },
      "flop": {
        "situation": situacionFlop,
        "boardCards": [
          {
            "carta": flopCarta1.carta,
            "color": flopCarta1.color
          },
          {
            "carta": flopCarta2.carta,
            "color": flopCarta2.color
          },
          {
            "carta": flopCarta3.carta,
            "color": flopCarta3.color
          }
        ],
        "heroIniciativa": iniciativaFlop,
        "boardType": boardTypeFlop.toLowerCase(),
        "flopCheckCall": document.getElementById("flopCheckCall").value,
        "flopCheckFold": document.getElementById("flopCheckFold").value,
        "flopCheckRaise": document.getElementById("flopCheckRaise").value,
        "flopCheckBehind": document.getElementById("flopCheckBehind").value,
        "flopBet": document.getElementById("flopBet").value,
        "notes": [
          document.getElementById("flop.notes").value
        ]
      },
      "turn": {
        "boardCards": {
          "carta": turnCarta.carta,
          "color": turnCarta.color
        },
        "heroIniciativa": iniciativaTurn,
        "situation": situacionTurn,
        "boardType": boardTypeTurn,
        "turnCheckCall": document.getElementById("turnCheckCall").value,
        "turnCheckFold": document.getElementById("turnCheckFold").value,
        "turnCheckRaise": document.getElementById("turnCheckRaise").value,
        "turnCheckBehind": document.getElementById("turnCheckBehind").value,
        "turnBet": document.getElementById("turnBet").value,
        "notes": [
          document.getElementById("turn.notes").value
        ]
      },
      "river": {
        "boardCards": {
          "carta": riverCarta.carta,
          "color": riverCarta.color,
        },
        "heroIniciativa": iniciativaRiver,
        "situation": situacionRiver,
        "boardType": boardTypeRiver,
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
      <Button
        variant={author === 'david diaz' ? 'contained' : 'outlined'}
        onClick={(e) => {
          setauthor('david diaz')
        }}
      >
        Manos david diaz
      </Button>
      <form className="addProductForm">
        {/* PREFLOP SECTION */}
        <h2>Preflop</h2>
        <Button
          variant='contained'
          onClick={handleSubmit}
        >
          Send
        </Button>
        <Selector
          setpreflopCarta1={setpreflopCarta1}
          preflopCarta1={preflopCarta1}
          setpreflopCarta2={setpreflopCarta2}
          preflopCarta2={preflopCarta2}
          instancia='preflop'
        />

        {/* POS - TABLE POS - INI */}
        <div className='featured'>
          <div className="item">
            <h6>Posicion</h6>
            <Button
              name="heroPosition"
              variant={posicion === 'OOP' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setpositionExist('true')
                setPosicion(e.currentTarget.innerText)
              }}
            >
              OOP
            </Button>
            <br />
            <Button
              name="heroPosition"
              variant={posicion === 'IP' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setpositionExist('true')
                setPosicion(e.currentTarget.innerText)
              }}
            >
              IP
            </Button>
          </div>
          <div className="item">
            <h6>Table Position</h6>
            <Button
              name="Table Position"
              variant={heroPosicion === 'SB' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setheroPosicion(e.currentTarget.innerText)
              }}
            >
              SB
            </Button>
            <Button
              name="Table Position"
              variant={heroPosicion === 'BB' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setheroPosicion(e.currentTarget.innerText)
              }}
            >
              BB
            </Button>
            <Button
              name="Table Position"
              variant={heroPosicion === 'UTG' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setheroPosicion(e.currentTarget.innerText)
              }}
            >
              UTG
            </Button>
            <Button
              name="Table Position"
              variant={heroPosicion === 'HJ' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setheroPosicion(e.currentTarget.innerText)
              }}
            >
              HJ
            </Button>
            <Button
              name="Table Position"
              variant={heroPosicion === 'CO' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setheroPosicion(e.currentTarget.innerText)
              }}
            >
              CO
            </Button>
            <Button
              name="Table Position"
              variant={heroPosicion === 'BTN' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setheroPosicion(e.currentTarget.innerText)
              }}
            >
              BTN
            </Button>
          </div>
          <div className="item">
            <h6>Iniciativa</h6>
            <Button
              name="Iniciativa"
              variant={iniciativaPreflop === 'SI' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setIniciativaPreflop(e.currentTarget.innerText)
              }}
            >
              SI
            </Button>
            <br />
            <Button
              name="Iniciativa"
              variant={iniciativaPreflop === 'CI' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setIniciativaPreflop(e.currentTarget.innerText)
              }}
            >
              CI
            </Button>
          </div>
          <div className="item">
            <h6>Notes</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Notas-preflop"
              name="Notas-preflop"
              id="preflopNotes"
              style={{ width: 400 }}
            />
          </div>
        </div>
        <br />
        <hr />
        {/* FLOP SECTION */}
        <h2>Flop</h2>
        <Button
          variant='contained'
          onClick={handleSubmit}
        >
          Send
        </Button>
        {/* PRIMERA LINEA */}
        <Selector
          setflopCarta1={setflopCarta1}
          flopCarta1={flopCarta1}
          setflopCarta2={setflopCarta2}
          flopCarta2={flopCarta2}
          setflopCarta3={setflopCarta3}
          flopCarta3={flopCarta3}
          instancia='flop'
        />
        <div className="featured">
          <div className="item">
            <h6>Iniciativa Flop</h6>
            <Button
              name="Iniciativa"
              variant={iniciativaFlop === 'SI' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setIniciativaFlop(e.currentTarget.innerText)
              }}
            >
              SI
            </Button>
            <br />
            <Button
              name="Iniciativa"
              variant={iniciativaFlop === 'CI' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setIniciativaFlop(e.currentTarget.innerText)
              }}
            >
              CI
            </Button>
          </div>
          <div className="item">
            <h6>Situacion Flop</h6>
            <Button
              name="Situation"
              variant={situacionFlop === 'H or preflop' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionFlop('H or preflop')
              }}
            >H or preflop</Button>
            <Button
              name="Situation"
              variant={situacionFlop === 'vs V reraise flop' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionFlop('vs V reraise flop')
              }}
            >
              vs V reraise flop
            </Button>
            <Button
              name="Situation"
              variant={situacionFlop === 'vs 2nd barrel' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionFlop('vs 2nd barrel')
              }}
            >
              vs 2nd barrel
            </Button>
            <Button
              name="Situation"
              variant={situacionFlop === 'vs check behind' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionFlop('vs check behind')
              }}
            >
              vs check behind
            </Button>
          </div>
          <div className="item displayNone">
            <h6>Board Type</h6>
            <Button
              variant={boardTypeFlop === 'seco' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setBoardTypeFlop('seco')
              }}
            >seco</Button>
            <Button
              variant={boardTypeFlop === 'semi mojado' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setBoardTypeFlop('semi mojado')
              }}
            >
              semi mojado
            </Button>
            <Button
              variant={boardTypeFlop === 'ofensivo' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setBoardTypeFlop('ofensivo')
              }}
            >
              ofensivo
            </Button>
            <Button
              variant={boardTypeFlop === 'mojado' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setBoardTypeFlop('mojado')
              }}
            >
              mojado
            </Button>
          </div>
          <div className="item">
            <h6>Notes</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Notas-flop"
              name="Notas-flop"
              id="flop.notes"
              style={{ width: 400 }}
            />
          </div>
        </div>
        <br />
        {/* SEGUNDA LINEA */}
        <div className="featured">
          <div className="item">
            <h6>Check-call</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="check-call"
              name="check-call"
              id="flopCheckCall"
              style={{ width: 400 }}
            />
          </div>
          <div className="item">
            <h6>Check-fold</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="check-fold"
              name="check-fold"
              id="flopCheckFold"
              style={{ width: 400 }}
            />
          </div>


        </div>
        <div className="featured">
          <div className="item">
            <h6>Check-behind</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="check-behind"
              name="check-behind"
              id="flopCheckBehind"
              style={{ width: 400 }}
            />
          </div>
          <div className="item">
            <h6>Check-raise</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="check-raise"
              name="check-raise"
              id="flopCheckRaise"
              style={{ width: 400 }}
            />
          </div>

        </div>
        <div className="featured">
          <div className="item">
            <h6>Bet</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="bet"
              name="bet"
              id="flopBet"
              style={{ width: 400 }}
            />
          </div>
        </div>
        <br />
        <hr />





        {/* TURN SECTION */}
        <h2>Turn</h2>
        <Button
          variant='contained'
          onClick={handleSubmit}
        >
          Send
        </Button>
        {/* PRIMERA LINEA */}
        <Selector
          turnCarta={turnCarta}
          setturnCarta={setturnCarta}
          instancia='turn'
        />
        <div className="featured">
          <div className="item ">
            <h6>Iniciativa Turn</h6>
            <Button
              name="Iniciativa"
              variant={iniciativaTurn === 'SI' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setIniciativaTurn(e.currentTarget.innerText)
              }}
            >
              SI
            </Button>
            <br />
            <Button
              name="Iniciativa"
              variant={iniciativaTurn === 'CI' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setIniciativaTurn(e.currentTarget.innerText)
              }}
            >
              CI
            </Button>
          </div>
          <div className="item situation">
            <h6>Situacion Turn</h6>
            <Button
              name="Situation"
              variant={situacionTurn === 'H probe bet en flop' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionTurn('H probe bet en flop')
              }}
            >H probe bet en flop</Button>
            <Button
              name="Situation"
              variant={situacionTurn === 'h cbet en flop' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionTurn('h cbet en flop')
              }}
            >
              h cbet en flop
            </Button>
            <Button
              name="Situation"
              variant={situacionTurn === 'H checkraise en flop' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionTurn('H checkraise en flop')
              }}
            >
              H checkraise en flop
            </Button>
            <Button
              name="Situation"
              variant={situacionTurn === 'H check behind en el flop' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionTurn('H check behind en el flop')
              }}
            >
              H check behind en el flops
            </Button>
            <Button
              name="Situation"
              variant={situacionTurn === 'H check behind en flop -> V check en flop' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionTurn('H check behind en flop -> V check en flop')
              }}
            >
              H check behind en flop -> V check en flop
            </Button>
          </div>
          <div className='item situation'>
            <h6>-</h6>
            <Button
              name="Situation"
              variant={situacionTurn === 'vs check behind' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionTurn('vs check behind')
              }}
            >
              vs check behind
            </Button>
            <Button
              name="Situation"
              variant={situacionTurn === 'vs cbet V dps de retomar iniciativa en flop' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionTurn('vs cbet V dps de retomar iniciativa en flop')
              }}
            >
              vs cbet V dps de retomar iniciativa en flop
            </Button>
            <Button
              name="Situation"
              variant={situacionTurn === 'vs cbet de V dps d checkraise en flop' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionTurn('vs cbet de V dps d checkraise en flop')
              }}
            >
              vs cbet de V dps d checkraise en flop
            </Button>
            <Button
              name="Situation"
              variant={situacionTurn === 'vs bet de V despues de su check behind en flop' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionTurn('vs bet de V despues de su check behind en flop')
              }}
            >
              vs bet de V despues de su check behind en flop
            </Button>
            <Button
              name="Situation"
              variant={situacionTurn === 'vs 3rd barrel' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionTurn('vs 3rd barrel')
              }}
            >
              vs 3rd barrel
            </Button>
            <Button
              name="Situation"
              variant={situacionTurn === 'vs probe bet de V dps de CB de H en flop' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionTurn('vs probe bet de V dps de CB de H en flop')
              }}
            >
              vs probe bet de V dps de CB de H en flop
            </Button>
            <Button
              name="Situation"
              variant={situacionTurn === 'vs V check behind en flop' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionTurn('vs V check behind en flop')
              }}
            >
              vs V check behind en flop
            </Button>
          </div>
          <div className="item displayNone">
            <h6>Board Type</h6>
            <Button
              variant={boardTypeTurn === 'seco' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setBoardTypeTurn('seco')
              }}
            >seco</Button>
            <Button
              variant={boardTypeTurn === 'semi mojado' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setBoardTypeTurn('semi mojado')
              }}
            >
              semi mojado
            </Button>
            <Button
              variant={boardTypeTurn === 'ofensivo' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setBoardTypeTurn('ofensivo')
              }}
            >
              ofensivo
            </Button>
            <Button
              variant={boardTypeTurn === 'mojado' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setBoardTypeTurn('mojado')
              }}
            >
              mojado
            </Button>
          </div>
        </div>
        <div className="item">
          <h6>Notes</h6>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Notas-flop"
            name="Notas-flop"
            id="turn.notes"
            style={{ width: 400 }}
          />
        </div>
        <br />
        {/* SEGUNDA LINEA */}
        <div className="featured">
          <div className="item">
            <h6>Check-call</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="check-call"
              name="check-call"
              id="turnCheckCall"
              style={{ width: 400 }}
            />
          </div>
          <div className="item">
            <h6>Check-fold</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="check-fold"
              name="check-fold"
              id="turnCheckFold"
              style={{ width: 400 }}
            />
          </div>

        </div>
        <br />
        <div className="featured">
          <div className="item">
            <h6>Check-behind</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="check-behind"
              name="check-behind"
              id="turnCheckBehind"
              style={{ width: 400 }}
            />
          </div>
          <div className="item">
            <h6>Check-raise</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="check-raise"
              name="check-raise"
              id="turnCheckRaise"
              style={{ width: 400 }}
            />
          </div>
        </div>
        <br />
        <div className="featured">
          <div className="item">
            <h6>Bet</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="bet"
              name="bet"
              id="turnBet"
              style={{ width: 400 }}
            />
          </div>
        </div>
        <hr />







        {/* RIVER SECTION */}
        <h2>River</h2>
        <Button
          variant='contained'
          onClick={handleSubmit}
        >
          Send
        </Button>
        {/* PRIMERA LINEA */}
        <Selector
          riverCarta={riverCarta}
          setriverCarta={setriverCarta}
          instancia='river'
        />
        <div className="featured">
          <div className="item ">
            <h6>Iniciativa River</h6>
            <Button
              name="Iniciativa"
              variant={iniciativaRiver === 'SI' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setIniciativaRiver(e.currentTarget.innerText)
              }}
            >
              SI
            </Button>
            <br />
            <Button
              name="Iniciativa"
              variant={iniciativaRiver === 'CI' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setIniciativaRiver(e.currentTarget.innerText)
              }}
            >
              CI
            </Button>
          </div>
          <div className="item situation">
            <h6>Situacion River</h6>
            <Button
              name="Situation"
              variant={situacionRiver === 'h cbet en turn' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionRiver('h cbet en turn')
              }}
            >h cbet en turn</Button>
            <Button
              name="Situation"
              variant={situacionRiver === 'h check behind en turn' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionRiver('h check behind en turn')
              }}
            >
              h check behind en turn
            </Button>
            <Button
              name="Situation"
              variant={situacionRiver === 'h probe bet en turn' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionRiver('h probe bet en turn')
              }}
            >
              h probe bet en turn
            </Button>
            <Button
              name="Situation"
              variant={situacionRiver === 'h checkraise en turn' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionRiver('h checkraise en turn')
              }}
            >
              h checkraise en turn
            </Button>
          </div>
          <div className='item situation'>
            <h6>-</h6>
            <Button
              name="Situation"
              variant={situacionRiver === 'vs check de V ante check behind de H en turn' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionRiver('vs check de V ante check behind de H en turn')
              }}
            >
              vs check de V ante check behind de H en turn
            </Button>
            <Button
              name="Situation"
              variant={situacionRiver === 'vs check behind' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionRiver('vs check behind')
              }}
            >
              vs check behind
            </Button>
            <Button
              name="Situation"
              variant={situacionRiver === 'vs cbet de V' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionRiver('vs cbet de V')
              }}
            >
              vs cbet de V
            </Button>
            <Button
              name="Situation"
              variant={situacionRiver === 'vs cbet de V dps de retomar iniciativa en turn' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionRiver('vs cbet de V dps de retomar iniciativa en turn')
              }}
            >
              vs cbet de V dps de retomar iniciativa en turn
            </Button>
            <Button
              name="Situation"
              variant={situacionRiver === 'vs 4th barrel' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionRiver('vs 4th barrel')
              }}
            >
              vs 4th barrel
            </Button>
            <Button
              name="Situation"
              variant={situacionRiver === 'vs V probe bet' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionRiver('vs V probe bet')
              }}
            >
              vs V probe bet
            </Button>
            <Button
              name="Situation"
              variant={situacionRiver === 'vs check behind de V en turn' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setsituacionRiver('vs check behind de V en turn')
              }}
            >
              vs check behind de V en turn
            </Button>
          </div>
          <div className="item displayNone">
            <h6>Board Type</h6>
            <Button
              variant={boardTypeRiver === 'seco' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setBoardTypeRiver('seco')
              }}
            >seco</Button>
            <Button
              variant={boardTypeRiver === 'semi mojado' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setBoardTypeRiver('semi mojado')
              }}
            >
              semi mojado
            </Button>
            <Button
              variant={boardTypeRiver === 'ofensivo' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setBoardTypeRiver('ofensivo')
              }}
            >
              ofensivo
            </Button>
            <Button
              variant={boardTypeRiver === 'mojado' ? 'contained' : 'outlined'}
              onClick={(e) => {
                setBoardTypeRiver('mojado')
              }}
            >
              mojado
            </Button>
          </div>
        </div>
        <div className='divider'>
          {/* NOTES */}
          <div className="item">
            <h6>Notes</h6>
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
        <div className="featured">
          <div className="item">
            <h6>Check-call</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="check-call"
              name="check-call"
              id="riverCheckCall"
              style={{ width: 400 }}
            />
          </div>
          <div className="item">
            <h6>Check-fold</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="check-fold"
              name="check-fold"
              id="riverCheckFold"
              style={{ width: 400 }}
            />
          </div>

        </div>
        <br />
        <div className="featured">
          <div className="item">
            <h6>Check-behind</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="check-behind"
              name="check-behind"
              id="riverCheckBehind"
              style={{ width: 400 }}
            />
          </div>
          <div className="item">
            <h6>Check-raise</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="check-raise"
              name="check-raise"
              id="riverCheckRaise"
              style={{ width: 400 }}
            />
          </div>
        </div>
        <br />
        <div className="featured">
          <div className="item">
            <h6>Bet</h6>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="bet"
              name="bet"
              id="riverBet"
              style={{ width: 400 }}
            />
          </div>
        </div>

        {/* BOTON SUBMIT */}
        <button onClick={handleSubmit}>SEND</button>
        <br /><br /><br /><br />
      </form>
    </div >
  )
}

export default Addhands



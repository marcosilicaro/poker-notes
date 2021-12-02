import React from 'react'
import './selector.css'
import Button from '@mui/material/Button';

function Selector({
    setpreflopCarta1,
    setpreflopCarta2,
    preflopCarta1,
    preflopCarta2,
    instancia,
    setflopCarta1,
    flopCarta1,
    setflopCarta2,
    flopCarta2,
    setflopCarta3,
    flopCarta3,
    turnCarta,
    setturnCarta,
    riverCarta,
    setriverCarta
}) {
    //
    const paloToColor = palo => {
        if (palo === 'picas') { return 'negro' }
        if (palo === 'treboles') { return 'verde' }
        if (palo === 'diamantes') { return 'azul' }
        if (palo === 'corazones') { return 'rojo' }
    }

    // 
    const eventToParent = (e) => {
        if (instancia === 'preflop') {
            if (preflopCarta1.carta === '') {
                setpreflopCarta1({
                    carta: e.currentTarget.innerHTML,
                    color: paloToColor(e.currentTarget.className)
                })
                e.currentTarget.className += " addBorder"
                e.currentTarget.id = "selectedPreflopFirst"
                console.log('carta 1 seteada')
            } else if (preflopCarta2.carta === '') {
                setpreflopCarta2({
                    carta: e.currentTarget.innerHTML,
                    color: paloToColor(e.currentTarget.className)
                })
                e.currentTarget.className += " addBorder"
                e.currentTarget.id = "selectedPreflopSecond"
                console.log('carta 2 seteada')
            }
        } else if (instancia === 'flop') {
            if (flopCarta1.carta === '') {
                setflopCarta1({
                    carta: e.currentTarget.innerHTML,
                    color: paloToColor(e.currentTarget.className)
                })
                e.currentTarget.className += " addBorder"
                e.currentTarget.id = "selectedFlopFirst"
                console.log('carta 1 flop seteada')
            } else if (flopCarta2.carta === '') {
                setflopCarta2({
                    carta: e.currentTarget.innerHTML,
                    color: paloToColor(e.currentTarget.className)
                })
                e.currentTarget.className += " addBorder"
                e.currentTarget.id = "selectedFlopSecond"
                console.log('carta 2 flop seteada')
            } else if (flopCarta3.carta === '') {
                setflopCarta3({
                    carta: e.currentTarget.innerHTML,
                    color: paloToColor(e.currentTarget.className)
                })
                e.currentTarget.className += " addBorder"
                e.currentTarget.id = "selectedFlopThird"
                console.log('carta 3 flop seteada')
            }
        } else if (instancia === 'turn') {
            if (turnCarta.carta === '') {
                setturnCarta({
                    carta: e.currentTarget.innerHTML,
                    color: paloToColor(e.currentTarget.className)
                })
                e.currentTarget.className += " addBorder"
                e.currentTarget.id = "selectedTurn"
                console.log('carta turn seteada')
            }
        } else if (instancia === 'river') {
            if (riverCarta.carta === '') {
                setriverCarta({
                    carta: e.currentTarget.innerHTML,
                    color: paloToColor(e.currentTarget.className)
                })
                e.currentTarget.className += " addBorder"
                e.currentTarget.id = "selectedRiver"
                console.log('carta river seteada')
            }
        }
    }

    //
    const resetCards = () => {
        if (instancia === 'preflop') {
            setpreflopCarta1({ carta: '', color: '' })
            setpreflopCarta2({ carta: '', color: '' })
            document.getElementById("selectedPreflopFirst").classList.remove('addBorder')
            document.getElementById("selectedPreflopFirst").removeAttribute('id')
            document.getElementById("selectedPreflopSecond").classList.remove('addBorder')
            document.getElementById("selectedPreflopSecond").removeAttribute('id')
            console.log('cartas preflop reseteadas')

        } else if (instancia === 'flop') {
            setflopCarta1({ carta: '', color: '' })
            setflopCarta2({ carta: '', color: '' })
            setflopCarta3({ carta: '', color: '' })

            document.getElementById("selectedFlopFirst").classList.remove('addBorder')
            document.getElementById("selectedFlopFirst").removeAttribute('id')

            document.getElementById("selectedFlopSecond").classList.remove('addBorder')
            document.getElementById("selectedFlopSecond").removeAttribute('id')

            document.getElementById("selectedFlopThird").classList.remove('addBorder')
            document.getElementById("selectedFlopThird").removeAttribute('id')

            console.log('cartas preflop reseteadas')

        } else if (instancia === 'turn') {
            setturnCarta({ carta: '', color: '' })
            document.getElementById("selectedTurn").classList.remove('addBorder')
            document.getElementById("selectedTurn").removeAttribute('id')

            console.log('carta turn reseteadas')

        } else if (instancia === 'river') {
            setturnCarta({ carta: '', color: '' })
            document.getElementById("selectedRiver").classList.remove('addBorder')
            document.getElementById("selectedRiver").removeAttribute('id')

            console.log('carta river reseteadas')

        }
    }

    return (
        <div className='selector-container'>

            <Button
                variant="contained"
                color="success"
                onClick={e => resetCards()}
            >
                Reset
            </Button>
            <div className="picas">
                <div className="negro" onClick={e => {
                    eventToParent(e)
                }}>A</div>
                <div className="negro" onClick={e => {
                    eventToParent(e)
                }}>2</div>
                <div className="negro" onClick={e => {
                    eventToParent(e)
                }}>3</div>
                <div className="negro" onClick={e => {
                    eventToParent(e)
                }}>4</div>
                <div className="negro" onClick={e => {
                    eventToParent(e)
                }}>5</div>
                <div className="negro" onClick={e => {
                    eventToParent(e)
                }}>6</div>
                <div className="negro" onClick={e => {
                    eventToParent(e)
                }}>7</div>
                <div className="negro" onClick={e => {
                    eventToParent(e)
                }}>8</div>
                <div className="negro" onClick={e => {
                    eventToParent(e)
                }}>9</div>
                <div className="negro" onClick={e => {
                    eventToParent(e)
                }}>T</div>
                <div className="negro" onClick={e => {
                    eventToParent(e)
                }}>J</div>
                <div className="negro" onClick={e => {
                    eventToParent(e)
                }}>Q</div>
                <div className="negro" onClick={e => {
                    eventToParent(e)
                }}>K</div>
            </div>
            <div className="treboles">
                <div className="treboles" onClick={e => {
                    eventToParent(e)
                }}>A</div>
                <div className="treboles" onClick={e => {
                    eventToParent(e)
                }}>2</div>
                <div className="treboles" onClick={e => {
                    eventToParent(e)
                }}>3</div>
                <div className="treboles" onClick={e => {
                    eventToParent(e)
                }}>4</div>
                <div className="treboles" onClick={e => {
                    eventToParent(e)
                }}>5</div>
                <div className="treboles" onClick={e => {
                    eventToParent(e)
                }}>6</div>
                <div className="treboles" onClick={e => {
                    eventToParent(e)
                }}>7</div>
                <div className="treboles" onClick={e => {
                    eventToParent(e)
                }}>8</div>
                <div className="treboles" onClick={e => {
                    eventToParent(e)
                }}>9</div>
                <div className="treboles" onClick={e => {
                    eventToParent(e)
                }}>T</div>
                <div className="treboles" onClick={e => {
                    eventToParent(e)
                }}>J</div>
                <div className="treboles" onClick={e => {
                    eventToParent(e)
                }}>Q</div>
                <div className="treboles" onClick={e => {
                    eventToParent(e)
                }}>K</div>
            </div>
            <div className="corazones">
                <div className="corazones" onClick={e => {
                    eventToParent(e)
                }}>A</div>
                <div className="corazones" onClick={e => {
                    eventToParent(e)
                }}>2</div>
                <div className="corazones" onClick={e => {
                    eventToParent(e)
                }}>3</div>
                <div className="corazones" onClick={e => {
                    eventToParent(e)
                }}>4</div>
                <div className="corazones" onClick={e => {
                    eventToParent(e)
                }}>5</div>
                <div className="corazones" onClick={e => {
                    eventToParent(e)
                }}>6</div>
                <div className="corazones" onClick={e => {
                    eventToParent(e)
                }}>7</div>
                <div className="corazones" onClick={e => {
                    eventToParent(e)
                }}>8</div>
                <div className="corazones" onClick={e => {
                    eventToParent(e)
                }}>9</div>
                <div className="corazones" onClick={e => {
                    eventToParent(e)
                }}>T</div>
                <div className="corazones" onClick={e => {
                    eventToParent(e)
                }}>J</div>
                <div className="corazones" onClick={e => {
                    eventToParent(e)
                }}>Q</div>
                <div className="corazones" onClick={e => {
                    eventToParent(e)
                }}>K</div>
            </div>
            <div className="diamantes">
                <div className="diamantes" onClick={e => {
                    eventToParent(e)
                }}>A</div>
                <div className="diamantes" onClick={e => {
                    eventToParent(e)
                }}>2</div>
                <div className="diamantes" onClick={e => {
                    eventToParent(e)
                }}>3</div>
                <div className="diamantes" onClick={e => {
                    eventToParent(e)
                }}>4</div>
                <div className="diamantes" onClick={e => {
                    eventToParent(e)
                }}>5</div>
                <div className="diamantes" onClick={e => {
                    eventToParent(e)
                }}>6</div>
                <div className="diamantes" onClick={e => {
                    eventToParent(e)
                }}>7</div>
                <div className="diamantes" onClick={e => {
                    eventToParent(e)
                }}>8</div>
                <div className="diamantes" onClick={e => {
                    eventToParent(e)
                }}>9</div>
                <div className="diamantes" onClick={e => {
                    eventToParent(e)
                }}>T</div>
                <div className="diamantes" onClick={e => {
                    eventToParent(e)
                }}>J</div>
                <div className="diamantes" onClick={e => {
                    eventToParent(e)
                }}>Q</div>
                <div className="diamantes" onClick={e => {
                    eventToParent(e)
                }}>K</div>
            </div>
            <br />
        </div>
    )
}

export default Selector

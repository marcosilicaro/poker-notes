
import React, { useState } from 'react'
import './allhands.css'
import axios from '../../axios'
import { useEffect } from "react";
import { Settings } from "@material-ui/icons";
import Button from '@mui/material/Button';

import { Link } from "react-router-dom";
import _ from 'lodash';



function Allhands({ setObjetoSelecto }) {

    const [handsData, sethandsData] = useState([])
    const [originalHandsData, setoriginalHandsData] = useState([])
    const [situaciones, setSituaciones] = useState(['ninguna situacion'])

    const [posicion, setPosicion] = useState('')
    const [iniciativa, setIniciativa] = useState('')
    const [instancia, setInstancia] = useState('')
    const [boardType, setBoardType] = useState('')
    const [situation, setSituation] = useState('')

    const [colores, setcolores] = useState('')
    const [repeticiones, setrepeticiones] = useState('')
    const [conexiones, setconexiones] = useState('')


    const [showFlopNotes, setShowFlopNotes] = useState(false)
    const [showTurnNotes, setShowTurnNotes] = useState(false)
    const [showRiverNotes, setShowRiverNotes] = useState(false)
    const [idClicked, setidClicked] = useState('')

    const [flopTitleClicked, setflopTitleClicked] = useState(false)
    const [turnTitleClicked, setturnTitleClicked] = useState(false)
    const [riverTitleClicked, setriverTitleClicked] = useState(false)

    const [buttonCounter, setbuttonCounter] = useState(0)


    // set situations
    const setSituations = (hands, instance) => {
        let listaSituations = []
        if (instance === 'flop') {
            hands.forEach(hand => {
                if (hand.flop.situation != '-' && hand.flop.situation != '') {
                    listaSituations.push(hand.flop.situation)
                }

            })
        } else if (instance === 'turn') {
            hands.forEach(hand => {
                if (hand.turn.situation != '-' && hand.turn.situation != '') {
                    listaSituations.push(hand.turn.situation)
                }
            })
        } else if (instance === 'river') {
            hands.forEach(hand => {
                if (hand.river.situation != '-' && hand.river.situation != '') {
                    listaSituations.push(hand.river.situation)
                }
            })
        }
        setSituaciones([...new Set(listaSituations)])
    }

    // filter by author
    const filterByAuthor = (autor) => {
        const arrayFilteredByAuthor = []
        handsData.forEach(hand => {
            if (autor === 'zeros') {
                if (!hand.preflop.author || hand.preflop.author === '') {
                    arrayFilteredByAuthor.push(hand)
                }
            } else {
                if (hand.preflop.author === autor) {
                    arrayFilteredByAuthor.push(hand)
                }
            }

        }
        )
        sethandsData(arrayFilteredByAuthor)
    }

    //
    const filterHandsByCards = (cardsToHave, type) => {
        let handsDataFiltered = []
        handsData.forEach(hand => {
            let countcardsToHave = 0
            for (let i = 0; i < cardsToHave.length; i++) {
                // en flop
                for (let a = 0; a < 3; a++) {
                    if (cardsToHave[i] === hand.flop.boardCards[a].carta) {
                        countcardsToHave = countcardsToHave + 1
                    }
                }

                // en turn
                if (instancia === 'turn') {
                    if (cardsToHave[i] === hand.turn.boardCards.carta) {
                        countcardsToHave = countcardsToHave + 1
                    }
                }

                // en river
                if (instancia === 'river') {
                    if (cardsToHave[i] === hand.turn.boardCards.carta) {
                        countcardsToHave = countcardsToHave + 1
                    }
                    if (cardsToHave[i] === hand.river.boardCards.carta) {
                        countcardsToHave = countcardsToHave + 1
                    }
                }
            }
            if (type === 'have') {
                if (countcardsToHave > 0) {
                    handsDataFiltered.push(hand)
                }
            }
            if (type === 'notHave') {
                if (countcardsToHave === 0) {
                    handsDataFiltered.push(hand)
                }
            }

        })
        sethandsData(handsDataFiltered)
    }

    //
    const orderBoardCards = (flopBoardCards) => {
        let orderderCards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
        let cartasOrdenadas = []

        for (let i = 0; i < orderderCards.length; i++) {
            for (let a = 0; a < flopBoardCards.length; a++) {
                if (orderderCards[i] === flopBoardCards[a].carta) {
                    cartasOrdenadas.push(flopBoardCards[a])
                }
            }
        }


        return (
            <div>
                <span className={`${cartasOrdenadas[0].color}  cardStyling`}>{cartasOrdenadas[0].carta}</span>
                <span className={`${cartasOrdenadas[1].color}  cardStyling`}>{cartasOrdenadas[1].carta}</span>
                <span className={`${cartasOrdenadas[2].color}  cardStyling`}>{cartasOrdenadas[2].carta}</span>
                {cartasOrdenadas[3] != null ? <span className={`${cartasOrdenadas[3].color}  cardStyling`}>{cartasOrdenadas[3].carta}</span> : <div></div>}
                {cartasOrdenadas[4] != null ? <span className={`${cartasOrdenadas[4].color}  cardStyling`}>{cartasOrdenadas[4].carta}</span> : <div></div>}
            </div>

        )
    }

    // cada vez que se re-renderiza el componente (la app) 
    useEffect(() => {
        // se ejecuta get all
        axios.get("/").then((res) => {
            sethandsData(res.data)
            setoriginalHandsData(res.data)
        })

        // scroll to top on refresh
        window.scrollTo(0, 0)

        document.getElementById("flopButton").click();


    }, [])

    // get specific list of objects with filters
    const clickButton = (e) => {
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
        handsEnColoresAzul = _.filter(handsEnColoresAzul, ({ verdeCounter }) => verdeCounter <= nroColores)
        handsEnColoresAzul = _.filter(handsEnColoresAzul, ({ negroCounter }) => negroCounter <= nroColores)
        handsEnColoresAzul = _.filter(handsEnColoresAzul, ({ rojoCounter }) => rojoCounter <= nroColores)

        let handsEnColoresVerde = _.filter(handsEnColores, ['verdeCounter', nroColores])
        handsEnColoresVerde = _.filter(handsEnColoresVerde, ({ azulCounter }) => azulCounter <= nroColores)
        handsEnColoresVerde = _.filter(handsEnColoresVerde, ({ negroCounter }) => negroCounter <= nroColores)
        handsEnColoresVerde = _.filter(handsEnColoresVerde, ({ rojoCounter }) => rojoCounter <= nroColores)

        let handsEnColoresNegro = _.filter(handsEnColores, ['negroCounter', nroColores])
        handsEnColoresNegro = _.filter(handsEnColoresNegro, ({ azulCounter }) => azulCounter <= nroColores)
        handsEnColoresNegro = _.filter(handsEnColoresNegro, ({ verdeCounter }) => verdeCounter <= nroColores)
        handsEnColoresNegro = _.filter(handsEnColoresNegro, ({ rojoCounter }) => rojoCounter <= nroColores)

        let handsEnColoresRojo = _.filter(handsEnColores, ['rojoCounter', nroColores])
        handsEnColoresRojo = _.filter(handsEnColoresRojo, ({ azulCounter }) => azulCounter <= nroColores)
        handsEnColoresRojo = _.filter(handsEnColoresRojo, ({ negroCounter }) => negroCounter <= nroColores)
        handsEnColoresRojo = _.filter(handsEnColoresRojo, ({ verdeCounter }) => verdeCounter <= nroColores)


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

    // filtradoPorRepeticion
    const filtradoPorRepeticion = (array, instancia, nroRepeticiones) => {
        let handsEnNumeros = []
        if (instancia === 'flop') {
            array.forEach((hand) => {


                let handEnNumeros = {}


                let asCounter = 0
                let dosCounter = 0
                let tresCounter = 0
                let cuatroCounter = 0
                let cincoCounter = 0
                let seisCounter = 0
                let sieteCounter = 0
                let ochoCounter = 0
                let nueveCounter = 0
                let diezCounter = 0
                let jotaCounter = 0
                let cuCounter = 0
                let kaCounter = 0


                // contas colores flop
                for (let i = 0; i < 3; i++) {
                    if (hand.flop.boardCards[i].carta === 'A') { asCounter = asCounter + 1 }
                    if (hand.flop.boardCards[i].carta === '2') { dosCounter = dosCounter + 1 }
                    if (hand.flop.boardCards[i].carta === '3') { tresCounter = tresCounter + 1 }
                    if (hand.flop.boardCards[i].carta === '4') { cuatroCounter = cuatroCounter + 1 }
                    if (hand.flop.boardCards[i].carta === '5') { cincoCounter = cincoCounter + 1 }
                    if (hand.flop.boardCards[i].carta === '6') { seisCounter = seisCounter + 1 }
                    if (hand.flop.boardCards[i].carta === '7') { sieteCounter = sieteCounter + 1 }
                    if (hand.flop.boardCards[i].carta === '8') { ochoCounter = ochoCounter + 1 }
                    if (hand.flop.boardCards[i].carta === '9') { nueveCounter = nueveCounter + 1 }
                    if (hand.flop.boardCards[i].carta === 'T') { diezCounter = diezCounter + 1 }
                    if (hand.flop.boardCards[i].carta === 'J') { jotaCounter = jotaCounter + 1 }
                    if (hand.flop.boardCards[i].carta === 'Q') { cuCounter = cuCounter + 1 }
                    if (hand.flop.boardCards[i].carta === 'K') { kaCounter = kaCounter + 1 }
                }


                // dividis la cuenta y la pusheas en una array
                handEnNumeros.asCounter = asCounter
                handEnNumeros.dosCounter = dosCounter
                handEnNumeros.tresCounter = tresCounter
                handEnNumeros.cuatroCounter = cuatroCounter
                handEnNumeros.cincoCounter = cincoCounter
                handEnNumeros.seisCounter = seisCounter
                handEnNumeros.sieteCounter = sieteCounter
                handEnNumeros.ochoCounter = ochoCounter
                handEnNumeros.nueveCounter = nueveCounter
                handEnNumeros.diezCounter = diezCounter
                handEnNumeros.jotaCounter = jotaCounter
                handEnNumeros.cuCounter = cuCounter
                handEnNumeros.kaCounter = kaCounter


                handEnNumeros.id = hand._id
                handsEnNumeros.push(handEnNumeros)
            }
            )
        } else if (instancia === 'turn') {
            // para cada una de las hands en la array
            array.forEach((hand) => {
                // si la hand tiene cartas en el turn
                if (hand.turn.boardCards.carta != '-') {

                    let handEnNumeros = {}


                    let asCounter = 0
                    let dosCounter = 0
                    let tresCounter = 0
                    let cuatroCounter = 0
                    let cincoCounter = 0
                    let seisCounter = 0
                    let sieteCounter = 0
                    let ochoCounter = 0
                    let nueveCounter = 0
                    let diezCounter = 0
                    let jotaCounter = 0
                    let cuCounter = 0
                    let kaCounter = 0

                    // contador de repetidores en el flop
                    for (let i = 0; i < 3; i++) {
                        if (hand.flop.boardCards[i].carta === 'A') { asCounter = asCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '2') { dosCounter = dosCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '3') { tresCounter = tresCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '4') { cuatroCounter = cuatroCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '5') { cincoCounter = cincoCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '6') { seisCounter = seisCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '7') { sieteCounter = sieteCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '8') { ochoCounter = ochoCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '9') { nueveCounter = nueveCounter + 1 }
                        if (hand.flop.boardCards[i].carta === 'T') { diezCounter = diezCounter + 1 }
                        if (hand.flop.boardCards[i].carta === 'J') { jotaCounter = jotaCounter + 1 }
                        if (hand.flop.boardCards[i].carta === 'Q') { cuCounter = cuCounter + 1 }
                        if (hand.flop.boardCards[i].carta === 'K') { kaCounter = kaCounter + 1 }
                    }

                    // contador de repetidores en el turn
                    if (hand.turn.boardCards.carta === 'A') { asCounter = asCounter + 1 }
                    if (hand.turn.boardCards.carta === '2') { dosCounter = dosCounter + 1 }
                    if (hand.turn.boardCards.carta === '3') { tresCounter = tresCounter + 1 }
                    if (hand.turn.boardCards.carta === '4') { cuatroCounter = cuatroCounter + 1 }
                    if (hand.turn.boardCards.carta === '5') { cincoCounter = cincoCounter + 1 }
                    if (hand.turn.boardCards.carta === '6') { seisCounter = seisCounter + 1 }
                    if (hand.turn.boardCards.carta === '7') { sieteCounter = sieteCounter + 1 }
                    if (hand.turn.boardCards.carta === '8') { ochoCounter = ochoCounter + 1 }
                    if (hand.turn.boardCards.carta === '9') { nueveCounter = nueveCounter + 1 }
                    if (hand.turn.boardCards.carta === 'T') { diezCounter = diezCounter + 1 }
                    if (hand.turn.boardCards.carta === 'J') { jotaCounter = jotaCounter + 1 }
                    if (hand.turn.boardCards.carta === 'Q') { cuCounter = cuCounter + 1 }
                    if (hand.turn.boardCards.carta === 'K') { kaCounter = kaCounter + 1 }



                    // dentro del objeto handEnNumeros creas propiedades con el contador de repeticion
                    handEnNumeros.asCounter = asCounter
                    handEnNumeros.dosCounter = dosCounter
                    handEnNumeros.tresCounter = tresCounter
                    handEnNumeros.cuatroCounter = cuatroCounter
                    handEnNumeros.cincoCounter = cincoCounter
                    handEnNumeros.seisCounter = seisCounter
                    handEnNumeros.sieteCounter = sieteCounter
                    handEnNumeros.ochoCounter = ochoCounter
                    handEnNumeros.nueveCounter = nueveCounter
                    handEnNumeros.diezCounter = diezCounter
                    handEnNumeros.jotaCounter = jotaCounter
                    handEnNumeros.cuCounter = cuCounter
                    handEnNumeros.kaCounter = kaCounter

                    // dentro del objeto handEnNumeros creas id
                    handEnNumeros.id = hand._id

                    // mandas el objeto handEnNumeros a la array handsEnNumeros
                    handsEnNumeros.push(handEnNumeros)
                }
            }
            )
        } else if (instancia === 'river') {
            // para cada una de las hands en la array
            array.forEach((hand) => {
                // si la hand tiene cartas en el river
                if (hand.river.boardCards.carta != '-') {

                    let handEnNumeros = {}


                    let asCounter = 0
                    let dosCounter = 0
                    let tresCounter = 0
                    let cuatroCounter = 0
                    let cincoCounter = 0
                    let seisCounter = 0
                    let sieteCounter = 0
                    let ochoCounter = 0
                    let nueveCounter = 0
                    let diezCounter = 0
                    let jotaCounter = 0
                    let cuCounter = 0
                    let kaCounter = 0

                    // contador de repetidores en el flop
                    for (let i = 0; i < 3; i++) {
                        if (hand.flop.boardCards[i].carta === 'A') { asCounter = asCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '2') { dosCounter = dosCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '3') { tresCounter = tresCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '4') { cuatroCounter = cuatroCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '5') { cincoCounter = cincoCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '6') { seisCounter = seisCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '7') { sieteCounter = sieteCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '8') { ochoCounter = ochoCounter + 1 }
                        if (hand.flop.boardCards[i].carta === '9') { nueveCounter = nueveCounter + 1 }
                        if (hand.flop.boardCards[i].carta === 'T') { diezCounter = diezCounter + 1 }
                        if (hand.flop.boardCards[i].carta === 'J') { jotaCounter = jotaCounter + 1 }
                        if (hand.flop.boardCards[i].carta === 'Q') { cuCounter = cuCounter + 1 }
                        if (hand.flop.boardCards[i].carta === 'K') { kaCounter = kaCounter + 1 }
                    }

                    // contador de repetidores en el turn
                    if (hand.turn.boardCards.carta === 'A') { asCounter = asCounter + 1 }
                    if (hand.turn.boardCards.carta === '2') { dosCounter = dosCounter + 1 }
                    if (hand.turn.boardCards.carta === '3') { tresCounter = tresCounter + 1 }
                    if (hand.turn.boardCards.carta === '4') { cuatroCounter = cuatroCounter + 1 }
                    if (hand.turn.boardCards.carta === '5') { cincoCounter = cincoCounter + 1 }
                    if (hand.turn.boardCards.carta === '6') { seisCounter = seisCounter + 1 }
                    if (hand.turn.boardCards.carta === '7') { sieteCounter = sieteCounter + 1 }
                    if (hand.turn.boardCards.carta === '8') { ochoCounter = ochoCounter + 1 }
                    if (hand.turn.boardCards.carta === '9') { nueveCounter = nueveCounter + 1 }
                    if (hand.turn.boardCards.carta === 'T') { diezCounter = diezCounter + 1 }
                    if (hand.turn.boardCards.carta === 'J') { jotaCounter = jotaCounter + 1 }
                    if (hand.turn.boardCards.carta === 'Q') { cuCounter = cuCounter + 1 }
                    if (hand.turn.boardCards.carta === 'K') { kaCounter = kaCounter + 1 }

                    // contador de repetidores en el river
                    if (hand.river.boardCards.carta === 'A') { asCounter = asCounter + 1 }
                    if (hand.river.boardCards.carta === '2') { dosCounter = dosCounter + 1 }
                    if (hand.river.boardCards.carta === '3') { tresCounter = tresCounter + 1 }
                    if (hand.river.boardCards.carta === '4') { cuatroCounter = cuatroCounter + 1 }
                    if (hand.river.boardCards.carta === '5') { cincoCounter = cincoCounter + 1 }
                    if (hand.river.boardCards.carta === '6') { seisCounter = seisCounter + 1 }
                    if (hand.river.boardCards.carta === '7') { sieteCounter = sieteCounter + 1 }
                    if (hand.river.boardCards.carta === '8') { ochoCounter = ochoCounter + 1 }
                    if (hand.river.boardCards.carta === '9') { nueveCounter = nueveCounter + 1 }
                    if (hand.river.boardCards.carta === 'T') { diezCounter = diezCounter + 1 }
                    if (hand.river.boardCards.carta === 'J') { jotaCounter = jotaCounter + 1 }
                    if (hand.river.boardCards.carta === 'Q') { cuCounter = cuCounter + 1 }
                    if (hand.river.boardCards.carta === 'K') { kaCounter = kaCounter + 1 }



                    // dentro del objeto handEnNumeros creas propiedades con el contador de repeticion
                    handEnNumeros.asCounter = asCounter
                    handEnNumeros.dosCounter = dosCounter
                    handEnNumeros.tresCounter = tresCounter
                    handEnNumeros.cuatroCounter = cuatroCounter
                    handEnNumeros.cincoCounter = cincoCounter
                    handEnNumeros.seisCounter = seisCounter
                    handEnNumeros.sieteCounter = sieteCounter
                    handEnNumeros.ochoCounter = ochoCounter
                    handEnNumeros.nueveCounter = nueveCounter
                    handEnNumeros.diezCounter = diezCounter
                    handEnNumeros.jotaCounter = jotaCounter
                    handEnNumeros.cuCounter = cuCounter
                    handEnNumeros.kaCounter = kaCounter

                    // dentro del objeto handEnNumeros creas id
                    handEnNumeros.id = hand._id

                    // mandas el objeto handEnNumeros a la array handsEnNumeros
                    handsEnNumeros.push(handEnNumeros)
                }
            }
            )
        }


        // creas variables con hands filtradas dependiendo del numero de repeticion de los contadores
        // si el nroRepeticiones es 2
        // se van a crear 13 variables que van a tener aquellas handsEnNumeros con la cantidad de Repeticiones definidas
        let handsFilteredByAs = _.filter(handsEnNumeros, ['asCounter', nroRepeticiones])
        let handsFilteredByDos = _.filter(handsEnNumeros, ['dosCounter', nroRepeticiones])
        let handsFilteredByTres = _.filter(handsEnNumeros, ['tresCounter', nroRepeticiones])
        let handsFilteredByCuatro = _.filter(handsEnNumeros, ['cuatroCounter', nroRepeticiones])
        let handsFilteredByCinco = _.filter(handsEnNumeros, ['cincoCounter', nroRepeticiones])
        let handsFilteredBySeis = _.filter(handsEnNumeros, ['seisCounter', nroRepeticiones])
        let handsFilteredBySiete = _.filter(handsEnNumeros, ['sieteCounter', nroRepeticiones])
        let handsFilteredByOcho = _.filter(handsEnNumeros, ['ochoCounter', nroRepeticiones])
        let handsFilteredByNueve = _.filter(handsEnNumeros, ['nueveCounter', nroRepeticiones])
        let handsFilteredByDiez = _.filter(handsEnNumeros, ['diezCounter', nroRepeticiones])
        let handsFilteredByJota = _.filter(handsEnNumeros, ['jotaCounter', nroRepeticiones])
        let handsFilteredByCu = _.filter(handsEnNumeros, ['cuCounter', nroRepeticiones])
        let handsFilteredByKa = _.filter(handsEnNumeros, ['kaCounter', nroRepeticiones])

        // concatenas todas las hands que tengan las repeticiones declaradas y las filtras por duplicados
        let handsFilteredByRepetitions = handsFilteredByAs.concat(handsFilteredByDos).concat(handsFilteredByTres).concat(handsFilteredByCuatro).concat(handsFilteredByCinco).concat(handsFilteredBySeis).concat(handsFilteredBySiete).concat(handsFilteredByOcho).concat(handsFilteredByNueve).concat(handsFilteredByDiez).concat(handsFilteredByJota).concat(handsFilteredByCu).concat(handsFilteredByKa)
        handsFilteredByRepetitions = [...new Set(handsFilteredByRepetitions)]

        // transformas hands en numeros en hands reales mediante id
        let handsFiltradas = []
        handsFilteredByRepetitions.forEach(hand => {
            handsData.forEach(eachHand => {
                if (hand.id === eachHand._id) {
                    handsFiltradas.push(eachHand)
                }
            })
        })


        sethandsData(handsFiltradas)
    }

    //
    const filtradoPorConexion = (array, cartasConectadas) => {
        let arraySoloBoardCards = []

        if (instancia === 'flop') {
            array.forEach(hand => {
                console.log('flop clickeado')
                let eachHand = {}
                let cartas = []
                cartas.push(hand.flop.boardCards[0].carta === 'A' ? '1' : hand.flop.boardCards[0].carta === 'K' ? '13' : hand.flop.boardCards[0].carta === 'Q' ? '12' : hand.flop.boardCards[0].carta === 'J' ? '11' : hand.flop.boardCards[0].carta)
                cartas.push(hand.flop.boardCards[1].carta === 'A' ? '1' : hand.flop.boardCards[1].carta === 'K' ? '13' : hand.flop.boardCards[1].carta === 'Q' ? '12' : hand.flop.boardCards[1].carta === 'J' ? '11' : hand.flop.boardCards[1].carta)
                cartas.push(hand.flop.boardCards[2].carta === 'A' ? '1' : hand.flop.boardCards[2].carta === 'K' ? '13' : hand.flop.boardCards[2].carta === 'Q' ? '12' : hand.flop.boardCards[2].carta === 'J' ? '11' : hand.flop.boardCards[2].carta)
                for (let i = 0; i < cartas.length; i++) {
                    if (cartas[i] === 'T') { cartas[i] = 10 }
                    cartas[i] = Number(cartas[i])
                }
                eachHand.cartas = cartas.sort(function (a, b) {
                    return a - b;
                });
                eachHand.cartas = [...new Set(eachHand.cartas)]
                eachHand.id = hand._id
                arraySoloBoardCards.push(eachHand)
                eachHand.dosConectadas = 0
                eachHand.tresConectadas = 0
                eachHand.cuatroConectadas = 0
                for (let i = 0; i < eachHand.cartas.length; i++) {
                    if (eachHand.cartas[i + 1] - eachHand.cartas[i] === 1) {
                        if (eachHand.cartas[i + 2] - eachHand.cartas[i + 1] === 1) {
                            if (eachHand.cartas[i + 3] - eachHand.cartas[i + 2] === 1) {
                                eachHand.cuatroConectadas = eachHand.cuatroConectadas + 1
                                eachHand.dosConectadas = 0
                                i++
                            } else if (eachHand.cartas[i + 1] - eachHand.cartas[i] === 1 && eachHand.cartas[i + 2] - eachHand.cartas[i + 1] === 1 && eachHand.cartas[i + 3] - eachHand.cartas[i + 2] !== 1) {
                                eachHand.tresConectadas = eachHand.tresConectadas + 1
                                i++
                            }
                        } else {
                            if (eachHand.cuatroConectadas === 1) {
                                eachHand.dosConectadas = 0

                            } else {
                                eachHand.dosConectadas = eachHand.dosConectadas + 1
                                i++
                            }

                        }
                    }
                }
            })
        } else if (instancia === 'turn') {
            array.forEach(hand => {
                console.log('turn clickeado')
                let eachHand = {}
                let cartas = []
                cartas.push(hand.flop.boardCards[0].carta === 'A' ? '1' : hand.flop.boardCards[0].carta === 'K' ? '13' : hand.flop.boardCards[0].carta === 'Q' ? '12' : hand.flop.boardCards[0].carta === 'J' ? '11' : hand.flop.boardCards[0].carta)
                cartas.push(hand.flop.boardCards[1].carta === 'A' ? '1' : hand.flop.boardCards[1].carta === 'K' ? '13' : hand.flop.boardCards[1].carta === 'Q' ? '12' : hand.flop.boardCards[1].carta === 'J' ? '11' : hand.flop.boardCards[1].carta)
                cartas.push(hand.flop.boardCards[2].carta === 'A' ? '1' : hand.flop.boardCards[2].carta === 'K' ? '13' : hand.flop.boardCards[2].carta === 'Q' ? '12' : hand.flop.boardCards[2].carta === 'J' ? '11' : hand.flop.boardCards[2].carta)
                cartas.push(hand.turn.boardCards.carta === 'A' ? '1' : hand.turn.boardCards.carta === 'K' ? '13' : hand.turn.boardCards.carta === 'Q' ? '12' : hand.turn.boardCards.carta === 'J' ? '11' : hand.turn.boardCards.carta)

                eachHand.id = hand._id
                for (let i = 0; i < cartas.length; i++) {
                    if (cartas[i] === 'T') { cartas[i] = 10 }
                    cartas[i] = Number(cartas[i])
                }
                eachHand.cartas = cartas.sort(function (a, b) {
                    return a - b;
                });
                eachHand.cartas = [...new Set(eachHand.cartas)]
                arraySoloBoardCards.push(eachHand)
                eachHand.dosConectadas = 0
                eachHand.tresConectadas = 0
                eachHand.cuatroConectadas = 0
                for (let i = 0; i < eachHand.cartas.length; i++) {
                    if (eachHand.cartas[i + 1] - eachHand.cartas[i] === 1) {
                        if (eachHand.cartas[i + 2] - eachHand.cartas[i + 1] === 1) {
                            if (eachHand.cartas[i + 3] - eachHand.cartas[i + 2] === 1) {
                                eachHand.cuatroConectadas = eachHand.cuatroConectadas + 1
                                eachHand.dosConectadas = 0
                                i++
                            } else if (eachHand.cartas[i + 1] - eachHand.cartas[i] === 1 && eachHand.cartas[i + 2] - eachHand.cartas[i + 1] === 1 && eachHand.cartas[i + 3] - eachHand.cartas[i + 2] !== 1) {
                                eachHand.tresConectadas = eachHand.tresConectadas + 1
                                i++
                            }
                        } else {
                            if (eachHand.cuatroConectadas === 1) {
                                eachHand.dosConectadas = 0

                            } else {
                                eachHand.dosConectadas = eachHand.dosConectadas + 1
                                i++
                            }

                        }
                    }
                }
            })
        } else if (instancia === 'river') {
            array.forEach(hand => {
                console.log('river clickeado')
                let eachHand = {}
                let cartas = []
                cartas.push(hand.flop.boardCards[0].carta === 'A' ? '1' : hand.flop.boardCards[0].carta === 'K' ? '13' : hand.flop.boardCards[0].carta === 'Q' ? '12' : hand.flop.boardCards[0].carta === 'J' ? '11' : hand.flop.boardCards[0].carta)
                cartas.push(hand.flop.boardCards[1].carta === 'A' ? '1' : hand.flop.boardCards[1].carta === 'K' ? '13' : hand.flop.boardCards[1].carta === 'Q' ? '12' : hand.flop.boardCards[1].carta === 'J' ? '11' : hand.flop.boardCards[1].carta)
                cartas.push(hand.flop.boardCards[2].carta === 'A' ? '1' : hand.flop.boardCards[2].carta === 'K' ? '13' : hand.flop.boardCards[2].carta === 'Q' ? '12' : hand.flop.boardCards[2].carta === 'J' ? '11' : hand.flop.boardCards[2].carta)
                cartas.push(hand.turn.boardCards.carta === 'A' ? '1' : hand.turn.boardCards.carta === 'K' ? '13' : hand.turn.boardCards.carta === 'Q' ? '12' : hand.turn.boardCards.carta === 'J' ? '11' : hand.turn.boardCards.carta)
                cartas.push(hand.river.boardCards.carta === 'A' ? '1' : hand.river.boardCards.carta === 'K' ? '13' : hand.river.boardCards.carta === 'Q' ? '12' : hand.river.boardCards.carta === 'J' ? '11' : hand.river.boardCards.carta)
                for (let i = 0; i < cartas.length; i++) {
                    if (cartas[i] === 'T') { cartas[i] = 10 }
                    cartas[i] = Number(cartas[i])
                }
                eachHand.cartas = cartas.sort(function (a, b) {
                    return a - b;
                });

                eachHand.cartas = [...new Set(eachHand.cartas)]
                eachHand.id = hand._id
                arraySoloBoardCards.push(eachHand)
                eachHand.dosConectadas = 0
                eachHand.tresConectadas = 0
                eachHand.cuatroConectadas = 0
                for (let i = 0; i < eachHand.cartas.length; i++) {
                    if (eachHand.cartas[i + 1] - eachHand.cartas[i] === 1) {
                        if (eachHand.cartas[i + 2] - eachHand.cartas[i + 1] === 1) {
                            if (eachHand.cartas[i + 3] - eachHand.cartas[i + 2] === 1) {
                                eachHand.cuatroConectadas = eachHand.cuatroConectadas + 1
                                eachHand.dosConectadas = 0
                                i++
                            } else if (eachHand.cartas[i + 1] - eachHand.cartas[i] === 1 && eachHand.cartas[i + 2] - eachHand.cartas[i + 1] === 1 && eachHand.cartas[i + 3] - eachHand.cartas[i + 2] !== 1) {
                                eachHand.tresConectadas = eachHand.tresConectadas + 1
                                i++
                            }
                        } else {
                            if (eachHand.cuatroConectadas === 1) {
                                eachHand.dosConectadas = 0

                            } else {
                                eachHand.dosConectadas = eachHand.dosConectadas + 1
                                i++
                            }

                        }
                    }
                }
            })

        }

        if (cartasConectadas === 2) { arraySoloBoardCards = _.filter(arraySoloBoardCards, ['dosConectadas', 2]).concat(_.filter(arraySoloBoardCards, ['dosConectadas', 1])) }
        if (cartasConectadas === 3) { arraySoloBoardCards = _.filter(arraySoloBoardCards, ['tresConectadas', 1]) }
        if (cartasConectadas === 4) { arraySoloBoardCards = _.filter(arraySoloBoardCards, ['cuatroConectadas', 1]) }
        if (cartasConectadas === 0) {
            arraySoloBoardCards = _.filter(arraySoloBoardCards, ['cuatroConectadas', 0])
            arraySoloBoardCards = _.filter(arraySoloBoardCards, ['tresConectadas', 0])
            arraySoloBoardCards = _.filter(arraySoloBoardCards, ['dosConectadas', 0])

        }

        // transformas hands en numeros en hands reales mediante id
        let handsFiltradas = []
        arraySoloBoardCards.forEach(hand => {
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



    // submit on enter press
    //document.getElementById('root').addEventListener("keyup", function (e) {
    //    e.preventDefault();
    //    if (e.code === "KeyI") {
    //
    //        document.getElementById("sendButton").click();
    //
    //    }
    //});

    //document.getElementById('root').addEventListener("keyup", function (e) {
    //    e.preventDefault();
    //    if (e.code === "KeyO") {
    //
    //        sethandsData(_.filter(handsData, ['turn.situation', 'vs 3rd barrel']))
    //
    //    }
    //});

    // prueba lodash
    //let reemplazoDeCarta = 'carta'
    //let primerFiltrado = _.filter(handsData, ['turn.situation', 'vs 3rd barrel']);
    //let segundoFiltrado = _.filter(primerFiltrado, ['preflop.heroCards[0]' + reemplazoDeCarta, '3'] || ['preflop.heroCards[1].carta', 'A']);
    //console.log(segundoFiltrado)
    //_.filter(handsData, [instancia + '.situation', 'vs 3rd barrel'])

    return (
        <div className='table-container'>

            <h2>Filters</h2>
            <div className="urlInfo">
                <h4>
                    Url Info:
                </h4>
                <span>
                    {posicion} + {instancia} + {iniciativa} + {boardType} + {situation}
                </span>
            </div>
            {/* Botones */}
            <div className="sendResetButtons">
                <Button
                    id='sendButton'
                    variant="contained"
                    onClick={(e) => {
                        clickButton(e)
                        setbuttonCounter(0)
                    }}
                    color="success"
                >
                    Send
                </Button>
                <Button
                    variant="outlined"
                    onClick={(e) => {
                        setPosicion('')
                        setBoardType('')
                        setIniciativa('')
                        setInstancia('flop')
                        setSituation('')
                        setcolores('')
                        setrepeticiones('')
                        setconexiones('')
                        setuniquesituationList([])
                        setbuttonCounter(0)
                        sethandsData(originalHandsData)
                    }}
                    color="success"
                >
                    Reset
                </Button>
            </div>
            <br />
            {/* Checkboxes de filtrado */}
            {/* Primera linea */}
            <div className=' checkbox-boardTypes'>
                {/* Posicion */}
                <div>
                    <h4>Posicion</h4>
                    <Button
                        variant={posicion === 'OOP' ? "contained" : "outlined"}
                        name="posicion"
                        value='OOP'
                        onClick={(e) => {
                            setPosicion(e.currentTarget.value)
                            sethandsData(_.filter(handsData, ['preflop.heroPosition', 'OOP']))
                        }}
                    >
                        OOP
                    </Button>
                    <br /><br />
                    <Button
                        variant={posicion === 'IP' ? "contained" : "outlined"}
                        name="posicion"
                        value='IP'
                        onClick={(e) => {
                            setPosicion(e.currentTarget.value)
                            sethandsData(_.filter(handsData, ['preflop.heroPosition', 'IP']))
                        }}
                    >
                        IP
                    </Button>
                </div>
                {/* Iniciativa */}
                <div className=''>
                    <h4 >Iniciativa</h4>
                    <Button
                        variant={iniciativa === 'SI' ? "contained" : "outlined"}
                        name="iniciativa"
                        value='SI'
                        onClick={(e) => {
                            setIniciativa(e.currentTarget.value)
                            sethandsData(_.filter(handsData, [instancia + '.heroIniciativa', 'SI']))
                        }}
                    >
                        Sin iniciativa
                    </Button>
                    <br /><br />
                    <Button
                        variant={iniciativa === 'CI' ? "contained" : "outlined"}
                        name="iniciativa"
                        value='CI'
                        onClick={(e) => {
                            setIniciativa(e.currentTarget.value)
                            sethandsData(_.filter(handsData, [instancia + '.heroIniciativa', 'CI']))
                        }}
                    >
                        Con iniciativa
                    </Button>
                </div>
                {/* Instancia */}
                <div>
                    <h4>Instancia</h4>
                    <Button
                        id='flopButton'
                        variant={instancia === 'flop' ? "contained" : "outlined"}
                        name="instancia"
                        value='flop'
                        onClick={(e) => {
                            setInstancia(e.currentTarget.value)
                            setSituations(handsData, 'flop')
                        }}
                    >
                        FLOP
                    </Button>
                    <br /><br />
                    <Button
                        id='turnButton'
                        variant={instancia === 'turn' ? "contained" : "outlined"}
                        name="instancia"
                        value='turn'
                        onClick={(e) => {
                            setInstancia(e.currentTarget.value)
                            setSituations(handsData, 'turn')
                        }}
                    >
                        TURN
                    </Button>
                    <br /><br />
                    <Button
                        variant={instancia === 'river' ? "contained" : "outlined"}
                        name="instancia"
                        value='river'
                        onClick={(e) => {
                            setInstancia(e.currentTarget.value)
                            setSituations(handsData, 'river')
                        }}
                    >
                        RIVER
                    </Button>
                </div>

                {/* Board Type */}
                <div className='settings'>
                    <h4>Board Type</h4>
                    <Button
                        variant={boardType === 'seco' ? "contained" : "outlined"}
                        name="boardType"
                        value='seco'
                        onClick={(e) => {
                            setBoardType(e.currentTarget.value)
                        }}
                    >
                        Seco
                    </Button>
                    <br /><br />
                    <Button
                        variant={boardType === 'semi mojado' ? "contained" : "outlined"}
                        name="boardType"
                        value='semi mojado'
                        onClick={(e) => {
                            setBoardType(e.currentTarget.value)
                        }}
                    >
                        Semi-mojado
                    </Button>
                    <br /><br />
                    <Button
                        variant={boardType === 'ofensivo' ? "contained" : "outlined"}
                        name="boardType"
                        value='ofensivo'
                        onClick={(e) => {
                            setBoardType(e.currentTarget.value)
                        }}
                    >
                        Ofensivo
                    </Button>
                    <br /><br />
                    <Button
                        variant={boardType === 'mojado' ? "contained" : "outlined"}
                        name="boardType"
                        value='mojado'
                        onClick={(e) => {
                            setBoardType(e.currentTarget.value)
                        }}
                    >
                        Mojado
                    </Button>
                </div>
                {/* Situation */}
                <div>
                    <h4>Situation</h4>
                    <Button
                        variant="outlined"
                        onClick={(e) => {
                            setuniquesituationList(_.filter(uniquesituationList, function (situation) {
                                return (situation.charAt(0) != 'v' && situation.charAt(0) != 'V');
                            }))
                        }}
                    >
                        h
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={(e) => {
                            setuniquesituationList(_.filter(uniquesituationList, function (situation) {
                                return (situation.charAt(0) != 'h' && situation.charAt(0) != 'H');
                            }))
                        }}
                    >
                        vs
                    </Button>
                    <br /><br />
                    {situaciones.map((item) => (
                        <div className='situationButton'>
                            <Button
                                variant={situation === item ? "contained" : "outlined"}
                                value={item}
                                size="small"
                                onClick={(e) => {
                                    setSituation(e.currentTarget.value)
                                    sethandsData(_.filter(handsData, [instancia + '.situation', e.currentTarget.value]))
                                }}
                            >
                                {item}
                            </Button>
                        </div>
                    ))}
                </div>
                {/* Author */}
                <div>
                    <h4>Author</h4>
                    <Button
                        variant={'outlined'}
                        onClick={(e) => {
                            filterByAuthor('zeros')

                        }}
                    >
                        Manos zeros
                    </Button>
                    <br /><br />
                    <Button
                        variant={'outlined'}
                        onClick={(e) => {
                            filterByAuthor('david diaz')

                        }}
                    >
                        Manos DD
                    </Button>
                </div>
            </div>
            <br />
            {/* Segunda linea */}
            <div className=' checkbox-boardTypes'>
                {/* Colores */}
                <div>
                    <h4>Colores</h4>
                    <Button
                        variant={colores === '1' ? "contained" : "outlined"}
                        name="colores"
                        value='1colores'
                        onClick={(e) => {
                            howManyColors(handsData, instancia, 1)
                            setcolores('1')
                        }}
                    >
                        Rainbow
                    </Button>
                    <br /><br />
                    <Button
                        variant={colores === '2' ? "contained" : "outlined"}
                        name="colores"
                        value='2colores'
                        onClick={(e) => {
                            howManyColors(handsData, instancia, 2)
                            setcolores('2')
                        }}
                    >
                        2 colores
                    </Button>
                    <br /><br />
                    <Button
                        variant={colores === '3' ? "contained" : "outlined"}
                        name="colores"
                        value='3colores'
                        onClick={(e) => {
                            howManyColors(handsData, instancia, 3)
                            setcolores('3')
                        }}
                    >
                        3 colores
                    </Button>
                    <br /><br />
                    <Button
                        variant={colores === '4' ? "contained" : "outlined"}
                        name="colores"
                        value='4colores'
                        onClick={(e) => {
                            howManyColors(handsData, instancia, 4)
                            setcolores('4')
                        }}
                    >
                        4 colores
                    </Button>
                </div>
                {/* Repeticion */}
                <div>
                    <h4>Repeticiones</h4>
                    <Button
                        variant={repeticiones === '2' ? "contained" : "outlined"}
                        name="repeticion"
                        value='2colores'
                        onClick={(e) => {
                            filtradoPorRepeticion(handsData, instancia, 2)
                            setrepeticiones('2')
                        }}
                    >
                        2 repetidas
                    </Button>
                    <br /><br />
                    <Button
                        variant={repeticiones === '3' ? "contained" : "outlined"}
                        name="repeticion"
                        value='3colores'
                        onClick={(e) => {
                            filtradoPorRepeticion(handsData, instancia, 3)
                            setrepeticiones('3')
                        }}
                    >
                        3 repetidas
                    </Button>
                </div>
                {/* Conexion */}
                <div>
                    <h4>Conexiones</h4>
                    <Button
                        variant={conexiones === '0' ? "contained" : "outlined"}
                        name="conexion"
                        value='3colores'
                        onClick={(e) => {
                            filtradoPorConexion(handsData, 0)
                            setconexiones('0')
                        }}
                    >
                        0 cartas conectadas
                    </Button>
                    <br /><br />
                    <Button
                        variant={conexiones === '2' ? "contained" : "outlined"}
                        name="conexion"
                        onClick={(e) => {
                            filtradoPorConexion(handsData, 2)
                            setconexiones('2')
                        }}
                    >
                        2 cartas conectadas
                    </Button>
                    <br /><br />
                    <Button
                        variant={conexiones === '3' ? "contained" : "outlined"}
                        name="conexion"
                        onClick={(e) => {
                            filtradoPorConexion(handsData, 3)
                            setconexiones('3')
                        }}
                    >
                        3 cartas conectadas
                    </Button><br /><br />
                    <Button
                        variant={conexiones === '4' ? "contained" : "outlined"}
                        name="conexion"
                        onClick={(e) => {
                            filtradoPorConexion(handsData, 4)
                            setconexiones('4')
                        }}
                    >
                        4 cartas conectadas
                    </Button>
                </div>
                {/* Board Type */}
                <div>
                    <h4>Board highest card</h4>
                    <Button
                        variant={"outlined"}
                        onClick={(e) => {
                            filterHandsByCards(['A', 'K'], 'have')
                        }}
                    >
                        A, K
                    </Button>
                    <br /><br />
                    <Button
                        variant={"outlined"}
                        onClick={(e) => {
                            setbuttonCounter(buttonCounter + 1)
                            if (buttonCounter === 0) {
                                filterHandsByCards(['A', 'K'], 'notHave')
                            }
                            if (buttonCounter > 0) {
                                filterHandsByCards(['Q', 'J', 'T'], 'have')
                            }
                        }}
                    >
                        Q, J, T
                    </Button>
                    <br /><br />
                    <Button
                        variant={"outlined"}
                        onClick={(e) => {
                            setbuttonCounter(buttonCounter + 1)
                            if (buttonCounter === 0) {
                                filterHandsByCards(['A', 'K', 'Q', 'J', 'T'], 'notHave')
                            }
                            if (buttonCounter > 0) {
                                filterHandsByCards(['9', '8', '7'], 'have')
                            }
                        }}
                    >
                        9, 8, 7
                    </Button>
                    <br /><br />
                    <Button
                        variant={"outlined"}
                        onClick={(e) => {
                            setbuttonCounter(buttonCounter + 1)
                            if (buttonCounter === 0) {
                                filterHandsByCards(['A', 'K', 'Q', 'J', 'T', '9', '8', '7'], 'notHave')
                            }
                        }}
                    >
                        6-
                    </Button>
                </div>
                <div className="listaDeManosBuenas">
                    <h4>Manos</h4>
                    <p>flush</p>
                    <p>straight</p>
                    <p>trio</p>
                    <p>set</p>
                    <p>top pair</p>
                    <p>second pair</p>
                    <p>third pair</p>
                    <p>fourth pair</p>
                </div>
                <div className="listDeManosMalas">
                    <h4>Proyectos</h4>
                    <p>combo draw</p>
                    <p>p9 + p8</p>
                    <p>p9</p>
                    <p>p8</p>
                    <p>gutshot</p>
                    <p>bk fl + bk st</p>
                    <p>bk</p>
                    <p>high card</p>
                </div>
            </div>
            <br /><br />

            <br />
            {/* Tabla */}
            <table className='table table-bordered' id='wholeTable'>
                <thead>
                    <th className='th-preflop' >Preflop</th>
                    <th className={`${instancia === 'flop' ? 'preflopNotes-active' : 'preflopNotes'}`} onClick={(e) => { flopTitleClicked === false ? setflopTitleClicked(true) : setflopTitleClicked(false) }}>Flop</th>
                    <th className={`${instancia === 'turn' ? 'preflopNotes-active' : 'preflopNotes'}`} onClick={(e) => { turnTitleClicked === false ? setturnTitleClicked(true) : setturnTitleClicked(false) }}>Turn</th>
                    <th className={`${instancia === 'river' ? 'preflopNotes-active' : 'preflopNotes'}`} onClick={(e) => { riverTitleClicked === false ? setriverTitleClicked(true) : setriverTitleClicked(false) }}>River</th>
                </thead>
                <tbody>
                    {/* Mapeado de objetos */}
                    {handsData.map((objeto) => (

                        <tr >
                            {/* Preflop */}
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
                            {/* Flop */}
                            <td className={instancia === 'flop' ? 'preflopNotes-active' : 'preflopNotes'}>
                                <div className='checkbox-boardTypes' onClick={(e) => {
                                    setidClicked(objeto._id)
                                    showFlopNotes === true ? setShowFlopNotes(false) : setShowFlopNotes(true)
                                }}>
                                    {instancia === 'flop' ? orderBoardCards(objeto.flop.boardCards) : <div></div>}
                                    <div id='flop-notes' className={showFlopNotes === true && idClicked === objeto._id || flopTitleClicked === true ? 'preflopNotes-active table-notes' : 'preflopNotes-active table-notes'} >
                                        {objeto.flop.notes[0] === '' ? '' : <div><strong>Notes</strong>{objeto.flop.notes[0].split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                        {objeto.flop.flopCheckCall === '' ? '' : <div><strong>CHECK/CALL</strong>: {objeto.flop.flopCheckCall.split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                        {objeto.flop.flopCheckFold === '' ? '' : <div><strong>CHECK/FOLD:</strong>{objeto.flop.flopCheckFold.split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                        {objeto.flop.flopCheckRaise === '' ? '' : <div><strong>CHECK/RAISE:</strong>{objeto.flop.flopCheckRaise.split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                        {objeto.flop.flopCheckBehind === '' ? '' : <div><strong>CHECK/BEHIND:</strong>{objeto.flop.flopCheckBehind.split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                        {objeto.flop.flopBet === '' ? '' : <div ><strong>BET:</strong>{objeto.flop.flopBet.split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}<br />
                                    </div>
                                </div>

                            </td>
                            {/* Turn */}
                            <td className={instancia === 'turn' ? 'preflopNotes-active ' : 'preflopNotes'}>
                                <div className='checkbox-boardTypes' onClick={(e) => {
                                    setidClicked(objeto._id)
                                    showTurnNotes === true ? setShowTurnNotes(false) : setShowTurnNotes(true)
                                }}>


                                    {orderBoardCards(objeto.flop.boardCards.concat(objeto.turn.boardCards))}
                                    <div id='turn-notes' className={showTurnNotes === true && idClicked === objeto._id || turnTitleClicked === true ? 'preflopNotes-active table-notes' : 'preflopNotes-active table-notes'} >
                                        {objeto.turn.notes[0] === '' ? '' : <div><strong>Notes</strong>{objeto.turn.notes[0].split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                        {objeto.turn.turnCheckCall === '' ? '' : <div><strong>CHECK/CALL</strong>{objeto.turn.turnCheckCall.split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                        {objeto.turn.turnCheckFold === '' ? '' : <div><strong>CHECK/FOLD</strong>{objeto.turn.turnCheckFold.split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                        {objeto.turn.turnCheckRaise === '' ? '' : <div><strong>CHECK/RAISE</strong>{objeto.turn.turnCheckRaise.split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                        {objeto.turn.turnCheckBehind === '' ? '' : <div><strong>CHECK/BEHIND</strong>{objeto.turn.turnCheckBehind.split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                        {objeto.turn.turnBet === '' ? '' : <div ><strong>BET</strong>{objeto.turn.turnBet.split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}<br />
                                    </div>
                                </div>

                            </td>
                            {/* River */}
                            <td className={instancia === 'river' ? 'preflopNotes-active' : 'preflopNotes'}>
                                <div className='checkbox-boardTypes' onClick={(e) => {
                                    setidClicked(objeto._id)
                                    showRiverNotes === true ? setShowRiverNotes(false) : setShowRiverNotes(true)
                                }}>
                                    {orderBoardCards(objeto.flop.boardCards.concat(objeto.turn.boardCards).concat(objeto.river.boardCards))}
                                    <div id='river-notes' className={showRiverNotes === true && idClicked === objeto._id || riverTitleClicked === true ? 'preflopNotes-active table-notes' : 'preflopNotes-active table-notes'} >

                                        {objeto.river.notes[0] === '' ? '' : <div ><strong>Notes</strong>{objeto.river.notes[0].split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                        {objeto.river.riverCheckCall === '' ? '' : <div><strong>CHECK/CALL</strong>{objeto.river.riverCheckCall.split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                        {objeto.river.riverCheckFold === '' ? '' : <div><strong>CHECK/FOLD</strong>{objeto.river.riverCheckFold.split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                        {objeto.river.riverCheckRaise === '' ? '' : <div><strong>CHECK/RAISE</strong>{objeto.river.riverCheckRaise.split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                        {objeto.river.riverCheckBehind === '' ? '' : <div><strong>CHECK/BEHIND</strong>{objeto.river.riverCheckBehind.split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                        {objeto.river.riverBet === '' ? '' : <div ><strong>BET</strong>{objeto.river.riverBet.split("\n").map(item => {
                                            return (
                                                <tr>
                                                    <td>{item}</td>
                                                </tr>
                                            );
                                        })}</div>}
                                    </div>
                                </div>

                            </td>
                        </tr>
                    )
                    )
                    }
                </tbody>
            </table>

        </div >
    )
}

export default Allhands

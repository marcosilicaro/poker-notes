
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
                    1 colores  <input type="radio" name="colores" value='1colores' onClick={(e) => {
                        howManyColors(handsData, instancia, 1)
                    }} /><br /><br />
                    2 colores  <input type="radio" name="colores" value='2colores' onClick={(e) => {
                        howManyColors(handsData, instancia, 2)
                    }} /><br /><br />
                    3 colores  <input type="radio" name="colores" value='3colores' onClick={(e) => {
                        howManyColors(handsData, instancia, 3)
                    }} /><br /><br />
                    4 colores  <input type="radio" name="colores" value='4colores' onClick={(e) => {
                        howManyColors(handsData, instancia, 4)
                    }} /><br /><br />
                </div>
                {/* Repeticion */}
                <div>
                    <h4>Repeticiones</h4>
                    Doblado  <input type="radio" name="colores" value='2colores' onClick={(e) => {
                        filtradoPorRepeticion(handsData, instancia, 2)
                    }} /><br /><br />
                    Triplicado  <input type="radio" name="colores" value='3colores' onClick={(e) => {
                        filtradoPorRepeticion(handsData, instancia, 3)
                    }} /><br /><br />
                </div>
                {/* Conexion */}
                <div>
                    <h4>Conexiones</h4>
                    2 cartas conectadas  <input type="radio" name="colores" value='2colores' onClick={(e) => {
                        filtradoPorConexion(handsData, 2)
                    }} /><br /><br />
                    3 cartas conectadas  <input type="radio" name="colores" value='3colores' onClick={(e) => {
                        filtradoPorConexion(handsData, 3)
                    }} /><br /><br />
                    4 cartas conectadas  <input type="radio" name="colores" value='4colores' onClick={(e) => {
                        filtradoPorConexion(handsData, 4)
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

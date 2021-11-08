import './addhands.css'

function Addhands() {
    return (
      <div className="newProduct">

        <h1 className="addProductTitle">New Hand</h1>
        <h2>Preflop</h2>
          <form className="addProductForm preflop">
            <div className="addProductItem">
              <label>Posicion</label>
              <select name="Posicion" id="Posicion" >
                <option value="OOP">OOP</option>
                <option value="IP">IP</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Iniciativa</label>
              <select name="Iniciativa" id="Iniciativa" >
                <option value="SI">SIN INICIATIVA</option>
                <option value="CI">CON INICIATIVA</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Carta 1 PREFLOP</label>
              <select name="Iniciativa" id="Iniciativa" >
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
              <select name="Iniciativa" id="Iniciativa" >
                <option value="negro">PICAS - NEGRO</option>
                <option value="verde">TREBOLES - VERDE</option>
                <option value="azul">DIAMANTES - AZUL</option>
                <option value="rojo">CORAZONES - ROJO</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Carta 2 PREFLOP</label>
              <select name="Iniciativa" id="Iniciativa" >
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
              <select name="Iniciativa" id="Iniciativa" >
                <option value="negro">PICAS - NEGRO</option>
                <option value="verde">TREBOLES - VERDE</option>
                <option value="azul">DIAMANTES - AZUL</option>
                <option value="rojo">CORAZONES - ROJO</option>
              </select>
            </div>

            <div className="addProductItem">
              <label>Notes</label>
              <input
                type="text"
                placeholder="Notas-preflop"
                name="Notas-preflop"
              />
            </div>
          </form>
          <h2>Flop</h2>
          <form className="addProductForm preflop">
            <div className="addProductItem">
              <label>Iniciativa</label>
              <select name="Iniciativa" id="Iniciativa" >
                <option value="SI">SIN INICIATIVA</option>
                <option value="CI">CON INICIATIVA</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Carta 1 PREFLOP</label>
              <select name="Iniciativa" id="Iniciativa" >
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
              <select name="Iniciativa" id="Iniciativa" >
                <option value="negro">PICAS - NEGRO</option>
                <option value="verde">TREBOLES - VERDE</option>
                <option value="azul">DIAMANTES - AZUL</option>
                <option value="rojo">CORAZONES - ROJO</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Carta 2 PREFLOP</label>
              <select name="Iniciativa" id="Iniciativa" >
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
              <select name="Iniciativa" id="Iniciativa" >
                <option value="negro">PICAS - NEGRO</option>
                <option value="verde">TREBOLES - VERDE</option>
                <option value="azul">DIAMANTES - AZUL</option>
                <option value="rojo">CORAZONES - ROJO</option>
              </select>
            </div>

            <div className="addProductItem">
              <label>Notes</label>
              <input
                type="text"
                placeholder="Notas-preflop"
                name="Notas-preflop"
              />
            </div>
          </form>

    </div>
    )
}

export default Addhands

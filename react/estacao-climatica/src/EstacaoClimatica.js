import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class EstacaoClimatica extends Component {
  state = {
    data: null
  }
  
  timer = null

  componentDidMount(){
    this.timer = setInterval(() => {
      console.log("É..está executando...")
      this.setState({data: new Date().toLocaleTimeString()})  
    }, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.timer)
  }

  render() {
    return (
      <div className='card'>
        <div
          className='card-body'>
          <div
            className='d-flex align-items-center justify-content-center'>
            <i className={`${this.props.icone} fa-5x`}></i>
            <p className='w-75 ms-3 text-center fs-1'>{this.props.estacao}</p>
          </div>
          <p className='text-center'>
            {
              this.props.latitude ?
                `Coordenadas: ${this.props.latitude}, ${this.props.longitude}. Data: ${this.state.data}` :
                this.props.mensagemDeErro ?
                  `${this.props.mensagemDeErro}` :
                  `Clique no botão para saber a sua estação climática`
            }
          </p>
          <button
            onClick={this.props.obterLocalizacao}
            className='btn btn-outline-primary w-100 mt-2'>
            Qual a minha estação?
          </button>
          <button
            className='btn btn-outline-danger w-100 mt-2'
            onClick={() => {
              ReactDOM.unmountComponentAtNode(
                document.querySelector('#root')
              )
            }}>
            Desmontar...
          </button>
        </div>
      </div>
    )
  }
}

export default EstacaoClimatica
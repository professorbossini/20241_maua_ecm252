import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import bootstrap from 'bootstrap/dist/js/bootstrap'
import '@fortawesome/fontawesome-free/css/all.min.css'
// import Modal from './Modal'
import EstacaoClimatica from './EstacaoClimatica'
import Loading from './Loading'
class App extends React.Component{
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     latitude: null,
  //     longitude: null,
  //     estacao: null,
  //     data: null,
  //     icone: null,
  //     mensagemDeErro: null
  //   }
  //   console.log('constructor')
  // }

  state = {
      latitude: null,
      longitude: null,
      estacao: null,
      data: null,
      icone: null,
      mensagemDeErro: null
  }

  componentDidMount(){
    //console.log('componentDidMount')
    // this.obterLocalizacao()
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')
  }

  componentWillUnmount(){
    console.log('componentWillUnmount')
  }

  icones = {
    'Outono': 'fa-brands fa-canadian-maple-leaf',
    'Primavera': 'fa-solid fa-clover',
    'Verão': 'fa-solid umbrella-beach',
    'Inverno': 'fa-regular fa-snowflake'
  }

  obterEstacao = (data, latitude) => {
    const anoAtual = data.getFullYear()
    //21/06 
    const d1 = new Date(anoAtual, 5, 21)
    //24/09
    const d2 = new Date(anoAtual, 8, 24)
    //22/12
    const d3 = new Date(anoAtual, 11, 22)
    //21/03
    const d4 = new Date(anoAtual, 2, 21)
    const estouNoSul = latitude < 0 
    if(data >= d1 && data < d2)
      return estouNoSul ? 'Inverno' : 'Verão'
    if(data >= d2 && data < d3)
      return estouNoSul ? 'Primavera' : 'Outono'
    if (data > d3 || data < d4)
      return estouNoSul ? 'Verão' : 'Inverno'
    return estouNoSul ? 'Outono' : 'Primavera'
  }

  componentDidMount(){
    this.obterLocalizacao()
  }

  obterLocalizacao = () => {
    //1 Obter a localização do usuário
    window.navigator.geolocation.getCurrentPosition(
      position => {
        //2 Obter a data atual do sistema
        const dataAtual = new Date()
        //3 Obter a estação climática do usuário
        const estacao = this.obterEstacao(dataAtual, position.coords.latitude)
        console.log(position.coords)
        //4 Obter o nome do ícone
        const icone = this.icones[estacao]
        //5 Usar a função setState (qualifique com this) atualizando o estado da aplicação
        //entregue um objeto à função setState 
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          icone: icone,
          estacao: estacao,
          data: dataAtual
        })
      },
      err => {
        //não faça isso
        // this.state.mensagemDeErro = "Jovem usuário, permita o acesso à localização"
        //faça isso
        this.setState({
          mensagemDeErro: 'Jovem usuário, permita o acesso à localização'
        })
        // const myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
        // myModal.show()
        
      }
  )

  

  }
  render(){
    console.log('render')
    return(
      <div
        className='container mt-2'>
        <div className='row justify-content-center'>
          <div className='col-sm-12 col-md-8'>
            {
              (!this.state.latitude && !this.state.mensagemDeErro) ?

                <Loading mensagem="Permita acesso à localização"/>                
              :

              this.state.mensagemDeErro ?
                <p className='border rounded p-2 fs-1 text-center'>
                  É preciso dar a permissão...
                </p>
              :

              <EstacaoClimatica 
                icone={this.state.icone}
                estacao={this.state.estacao}
                latitude={this.state.latitude}
                longitude={this.state.longitude}
                data={this.state.data}
                mensagemDeErro={this.state.mensagemDeErro}
                obterLocalizacao={this.obterLocalizacao}/>
            }
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
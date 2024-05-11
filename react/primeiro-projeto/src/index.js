import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
//classes ou funções

const App = () => {

  const estilosDoBotao = { marginTop: 12, paddingTop: 8, paddingBottom: 8, backgroundColor: 'blueviolet', color: 'white', border: 'none', width: '100%', borderRadius: 8 }

  const textoDoRotulo = 'Nome:'

  const obterTextoDoBotao = () => {
    return 'Enviar'
  }

  const clicou = () => alert('clicou')

  return (
    <div style={{margin: 'auto', width: 768, backgroundColor: '#EEE', padding: 12, borderRadius: 8}}>
      <label className='rotulo' htmlFor='nome' style={{display: 'block', marginBottom: 4}}>{textoDoRotulo}</label>
      <input type='text' id='nome' style={{paddingTop: 8, paddingBottom: 8, borderStyle: 'hidden', width: '100%', borderRadius: 8, outline: 'none', boxSizing: 'border-box'}}/>
      <button 
        style={estilosDoBotao}
        onClick={clicou}>
        {obterTextoDoBotao()}
      </button>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)


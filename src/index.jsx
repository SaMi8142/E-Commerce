import ReactDOM from 'react-dom'
import App from './App'
import './styles/styles.css'
import GlobalStateProvider from './GlobalStateProvider'

ReactDOM.render(
    <GlobalStateProvider>
        <App />
    </GlobalStateProvider>,
    document.getElementById('root'))
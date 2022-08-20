import { useState, useEffect } from 'react'
import axios from 'axios'
import Coin from './components/Coin'

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false

function App() {
  const [coins, setCoins] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // fetch coin data
  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(res => setCoins(res.data))
      .catch(err => console.log(err));
  })

  // filter coins according to search term
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  )


  return (
    <div className="App">
      <div className="search">
        <h1 className="search-header">Search a currency</h1>
        <form>
          <input
            type="text"
            placeholder='Search...'
            className='search-input'
            onChange={e => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin key={coin.id} coin={coin} />
        )
      })}
    </div>
  );
}

export default App;

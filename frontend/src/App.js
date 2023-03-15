import react, {useState, useEffect} from 'react'
import axios from 'axios';
import data from './data.json'

function App() {
  const [dataFetch, setDataFeatch] = useState(data)

 

  return (
    <div className="App">
      
      {dataFetch.map((data, i) => {
        return(
          <div key={i}>
            <h2>{data.title}</h2>
            <p>{data.content}</p>
          </div>
        )
      })}
    </div>
  );
}
export default App;

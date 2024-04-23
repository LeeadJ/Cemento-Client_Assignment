import { useState, useEffect } from 'react'
import './App.css'
import DataTable from './Components/DataTable/DataTable'


function App() {
  const [tableData, setTableData] = useState(null);

  // const dataSet = '../public/tableData.json';
  const dataSet = '../public/largeDataSet.json'

  useEffect(() => {
    fetch(dataSet)
      .then(response => response.json())
      .then(data => setTableData(data))
      .catch(error => console.error('Error fetching data', error));
  }, []);

  return (
    <div className='main'>
      <div className='titleBar'>
        <img src={'./public/cemento.png'} alt="Logo" className="logo" />  
        <h1>Client Side - Assignment 1</h1>
         
      </div>
      {tableData && (
        <DataTable columns={tableData.columns} data={tableData.data}/>
      )}
    </div>
  )
}

export default App

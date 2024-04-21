import { useState } from "react";
import PropTypes from 'prop-types';
import './DataTable.css'


function DataTable({ columns, data }) {
    
    const [visColumns, setVisColumns] = useState(columns.map(column => column.id));
    const [dataEdit, setDataEdit] = useState(data);
    
    const handleVisualColumn = (columnID) => {
        setVisColumns(
            visColumns.includes(columnID) ? 
            visColumns.filter(id => id !== columnID) :
            [...visColumns, columnID]
        )
    }

    const handleDataEdit = (rowID, colID, value) => {
        setDataEdit(prevData => {
            return prevData.map(row => {
                if(row.id === rowID){
                    return {...row, [colID]: value};
                }
                return row;
            });
        });
    }

    const saveTableLocally = () => {
        const json = JSON.stringify(dataEdit, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'table_data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="dataTable-main">
            
            <button type="button" onClick={saveTableLocally} className="saveBtn">
                <span className="material-symbols-outlined">save</span>
                <span>Save Changes</span>
            </button>
            

            <div className="columnLabels">
                <label htmlFor="columnSelect"><strong>Selected Colmns: </strong></label>
                {columns.map(column => (
                    <lable key={column.id} style={{marginRight: '10px'}}>
                        <input
                            type="checkbox"
                            checked={visColumns.includes(column.id)}
                            onChange={() => handleVisualColumn(column.id)}
                            style={{marginRight: '7px'}}
                        />
                        {column.title}
                    </lable>
                ))}
            </div>
            <div className="tableContianer">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {columns
                                .filter(column => visColumns.includes(column.id))
                                .map(column => (
                                    <th key={column.id}>{column.title}</th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataEdit.map(row => (
                            <tr key={row.id}>
                                <th key={row.id}>{row.id.substring(3)}</th>
                                {columns
                                    .filter(column => visColumns.includes(column.id))
                                    .map(column => (
                                    <td key={column.id}>
                                        <input
                                            type={column.type === 'number' ? 'number' : 'text'}
                                            value={row[column.id]}
                                            onChange={(event) => handleDataEdit(row.id, column.id, event.target.value)}
                                        />
                                        </td>
                                ))}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            

        </div>
    )
    
}


DataTable.propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.any.isRequired,
      })
    ).isRequired,
    data: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool,
        ])
      )
    ).isRequired,
  };

export default DataTable;
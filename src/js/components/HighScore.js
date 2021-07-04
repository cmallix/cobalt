import { useMemo } from "react";
import { useTable, useSortBy } from 'react-table'

export default function HighScore(props) {
    const {tableData, tableStructure } = props;

    const data = useMemo(
        () => tableData,
        [tableData]
    )

    const columns = useMemo(
        () => tableStructure,
        [tableStructure]
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy)

    return (
        <div className="highScore">
            <table {...getTableProps()} >
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span className="sortIc">{column.isSorted ? (column.isSortedDesc ? '⬆️' : '⬇️') : ''}</span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

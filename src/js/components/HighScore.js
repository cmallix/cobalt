import { useMemo } from "react";
import { useTable, useSortBy } from 'react-table'

export default function HighScore() {
    const data = useMemo(
        () => [
            {
                name: 'Chris',
                score: 123,
                clicks: 5,
                average: 24.60,
            },
            {
                name: 'Mathew',
                score: 424,
                clicks: 6,
                average: 70.67,
            },
            {
                name: 'John',
                score: 234,
                clicks: 10,
                average: 23.40,
            },
            {
                name: 'Alex',
                score: 390,
                clicks: 9,
                average: 43.33,
            },
            {
                name: 'Michelle',
                score: 134,
                clicks: 4,
                average: 33.50,
            },
            {
                name: 'Claire',
                score: 242,
                clicks: 2,
                average: 121.00,
            },
            {
                name: 'Helen',
                score: 101,
                clicks: 8,
                average: 12.63,
            },
            {
                name: 'Mimi',
                score: 89,
                clicks: 3,
                average: 29.67,
            },
            {
                name: 'Phillip',
                score: 78,
                clicks: 5,
                average: 15.60,
            },
            {
                name: 'Peter',
                score: 31,
                clicks: 2,
                average: 15.50,
            },
        ],
        []
    )

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Score',
                accessor: 'score',
            },
            {
                Header: 'Clicks',
                accessor: 'clicks',
            },
            {
                Header: 'Average score per click',
                accessor: 'average',
            }
        ],
        []
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

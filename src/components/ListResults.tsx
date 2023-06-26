import { styled } from "styled-components"

interface ListResultsProps {
    data: Result[]
    setResult: (id: number) => void,
    
}

// interface ResultFunction {
//     
// }

export type Result = {
    id: number,
    text: string,
}

export default function ListResults({ data, setResult }: ListResultsProps) {
    return(<div className="border px-2 w-100 absolute bg-white">
        { data.map( e => {
            return(<ul key={e.id}  className="divide-y divide-gray-100 group">
                    <li className="flex justify-between  p-2 cursor-pointer 
                    hover:bg-lime-400 
                    "
                    onClick={() => setResult(e.id)}
                    >
                        <div className="min-w-0 flex-auto ">
                            <p className="text-sm leading-6 w-100 h-100 text-gray-900 hover:text-white ">
                                {`${e.id} - ${e.text}`}
                            </p>
                        </div>
                    </li>
                </ul>
            )
        })}
    </div>)
}

const Container = styled.div`
    padding: 5px;
    border-radius: 5px;
`
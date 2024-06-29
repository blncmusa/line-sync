import { useStore } from "../../store/useStore"
import { formatTimestamp } from "../../utils/formatTimestamp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"


interface Line {
    timestamp: number
}

export default function Timestamp({ line, index }: { line: Line, index: number}){

    const { setTimeStampForCurrentLine, deleteTimestampForLine, incrementTimestamp, decrementTimestamp } = useStore()

    const handleDeleteTimestamp = () => {
        deleteTimestampForLine(index);
    }

    const addOneSecond = () => {
        incrementTimestamp(index)
    }

    const subtractOneSecond = () => {
        decrementTimestamp(index)
    }

    return (
        <div className="flex gap-3 items-center">
            <FontAwesomeIcon 
            icon={faTrashCan} 
            onClick={handleDeleteTimestamp}
            className="text-slate-500 hover:text-red-400 transition-all duration-100 cursor-pointer"/>
            <div className="flex items-center text-sm text-gray-300 bg-slate-600 rounded-[25px] p-3 w-[120px] gap-3">
                <p className="cursor-pointer text-md" onClick={subtractOneSecond}>-</p>
                <p className="text-center">
                    {formatTimestamp(line.timestamp)}
                </p>
                <p className="cursor-pointer text-md" onClick={addOneSecond}>+</p>
            </div>
        </div>
    )
}
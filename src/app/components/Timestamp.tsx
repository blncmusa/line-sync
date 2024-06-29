import { useStore } from "../../store/useStore"
import { formatTimestamp } from "../../utils/formatTimestamp"


interface Line {
    timestamp: number
}

export default function Timestamp({ line }: { line: Line }){


    return (
        <p className="text-sm text-gray-300 bg-slate-600 rounded-[25px] p-3 w-[85px] text-center">
            {formatTimestamp(line.timestamp)}
        </p>
    )
}
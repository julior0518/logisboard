


interface Props {
    data: any,

}

const StatusColor= ({data, }: Props) => {

    let color: string = "24FF00"
    if (data.status === "ARRIVED"){
        color = "green"
    } else if (data.status === "TRANSPORT_ERROR"){
        color = "red"
    } else if (data.status === "IN_TRANSIT"){
        color = "blue"
    } else if (data.status === "ROLL_OVER"){
        color = "yellow"
    } else if (data.status === "CANCELLED"){
        color = "grey"
    } else if (data.status === "CUSTOMS_HOLD"){
        color = "orange"
    }

    return(
        <div>
            <div 
                className="dotSlot"
                style={{display:"flex" , flexDirection: "row", margin:"0 5px 0 10px", padding:"5px", height: "1vh", aspectRatio: "1/1" , borderRadius: "360px" , backgroundColor: color, opacity: "80%"}}>
            </div>
        </div>
    )
}

export default StatusColor
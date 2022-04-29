import '../App.css'
import StatusColor from './StatusColor'
import Loader from 'react-loader-spinner'
import { useTheme } from "@material-ui/core"
import {useState} from 'react'


    



interface Props {
    data: any,
    selectedView: any
}




const SelectionDetails= ({data, selectedView}: Props) => {
    const theme = useTheme()
    let color: string = "24FF00"
    if (selectedView.status === "ARRIVED"){
        color = "green"
    } else if (selectedView.status === "TRANSPORT_ERROR"){
        color = "red"
    } else if (selectedView.status === "IN_TRANSIT"){
        color = "blue"
    } else if (selectedView.status === "ROLL_OVER"){
        color = "yellow"
    } else if (selectedView.status === "CANCELLED"){
        color = "grey"
    } else if (selectedView.status === "CUSTOMS_HOLD"){
        color = "orange"
    }
    let totalShippingDays:number = (new Date(selectedView.estimatedArrival).getTime()- new Date( selectedView.estimatedDeparture).getTime())/1000/60/60/24;
    let currentShippingDays:number = (new Date().getTime()- new Date( selectedView.estimatedDeparture).getTime())/1000/60/60/24;
    let barFill:any

    if(totalShippingDays - currentShippingDays < 1){
        barFill = "100%"
    } else if (currentShippingDays < 1) {
        barFill = "3%"
    } else if (currentShippingDays > 1){
        let a = (1 - ((totalShippingDays - currentShippingDays)/totalShippingDays)) * 100
        barFill = `${a}%`
    }

    let detailRender
        =
        selectedView?.id 
        ?
        <div style={{ height:"100px", display:'flex', width:"100%", flexDirection:"column", }}>
            <div style={{display: "flex", flexDirection:"row", justifyContent:"space-between", }}>
                <h1>{selectedView.client}</h1>
                <h1 style={{opacity:"50%"}}>{selectedView.houseBillNumber}</h1>
            </div>
            <div style={{display: "flex", alignItems:"center"}}>
                <h3 style={{margin:"10px"}}>By </h3>
                <p style={{margin:"10px"}}>{selectedView.mode}</p>
                <h3 style={{margin:"10px"}}>From </h3>
                <p style={{margin:"10px"}}>{selectedView.origin}</p>
                <h3 style={{margin:"10px"}}>To </h3>
                <p style={{margin:"10px"}}>{selectedView.destination}</p>
            </div>
            <div >
                <div style={{ margin:"0 10px", height: "10px", width:"98%",backgroundColor:"gray", opacity:"30%", borderRadius:"20px"}}></div>
                <div style={{ margin:"0 10px", height: "10px", width: barFill, backgroundColor: color, borderRadius:"20px", position:"relative", top:"-10px", opacity:"100%"}}></div>
            </div>
            <div style={{display:"flex", justifyContent:"space-between", margin:"0 0 0 10px"}}>
                <h3>{selectedView.estimatedDeparture}</h3>
                <h3>{selectedView.estimatedArrival}</h3>
            </div>
            <div style={{display:"flex", justifyContent: "space-between"}}>
                <div style={{display:"flex"}}>
                    <StatusColor data={selectedView} />
                    {selectedView.status}
                </div>
                {selectedView.id}
            </div>
        </div>
        :
        <div style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Loader type="Grid" color={theme.palette.primary.main} />
        </div>
        ;

    return (
        <div style={{height:"100%", display:"flex", justifyContent:"center", }}>
            {detailRender}
        </div>
    )
}

export default SelectionDetails;
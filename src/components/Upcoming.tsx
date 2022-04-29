import '../App.css'
import { format } from 'date-fns'
import StatusColor from './StatusColor'



interface Props {
    data: any,
    setSelectedView:any
}


const Upcoming= ({data, setSelectedView}: Props) => {
    const today:any = format(new Date(), "MM/dd/yy")

    let upcomingData = data.filter((e:any,o:number)=>(
        e.estimatedArrival >= today 
    )) 


    return (
        <div id='scroll' style={{ margin: "10px", height: "90%"}} >
                {upcomingData.map((e:any,  i:number)=>{
                    return(
                        <div onClick={()=>setSelectedView(e)} key={i} style={{width: "100%", display:"flex", padding: "10px",  height:"5vh", borderBottom:"2px solid #80baac", alignItems:"center", fontWeight:"300"}}>
                            <StatusColor  data={e}/>
                            <div style={{ display:"flex", cursor:"pointer"}}>
                                    {e.status}
                                    <div style={{margin:"0 20px",fontWeight:"500"}}> {e.houseBillNumber } </div>
                                    <div style={{margin:"0 20px"}}> {e.mode} </div>
                            </div>
                            <div  style={{margin:"0 20px", fontSize:"small"}}> {`Sent on ${e.estimatedDeparture} to arrive on ${e.estimatedArrival}`} </div>

                        </div>
                    )
                })}
        </div>
    )
}   

export default Upcoming;

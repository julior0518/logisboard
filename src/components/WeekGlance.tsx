import { format } from 'date-fns'
import '../App.css'
import StatusColor from './StatusColor'
import Upcoming from './Upcoming'
import SelectionDetails from './SelectionDetails'
import { useState } from 'react'

interface Props {
    data: any
}

const WeekGlance= ({data}: Props) => {
    const [selectedView, setSelectedView] = useState({})
    const todayCalc:any = new Date()

    data.sort((a:any,b:any)=>{
        const da:any = Date.parse(a.estimatedArrival)
        const db:any = Date.parse(b.estimatedArrival)
        return da-db
    })

    function weekSet (){   
        let week = []
        let deliveryDay 

        for (let i:number = 0; i <= 6 ; i ++){
            const g = i===0 ? todayCalc : todayCalc.setDate(todayCalc.getDate() + 1);

            const todayDynamic = format(g, "MM/dd/yy")
            deliveryDay = data.filter((e:any,o:number)=>(
                e.estimatedArrival === todayDynamic 
            )) 
            let dayOftheWeek:number = new Date(todayDynamic).getDay()
            let dayOftheWeekString = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", 'Sunday']
           
            week[i] = (
                <div id={`dayOn`}  key={i} style={{minWidth: "10%" , margin:"5px 10px 5px 0", padding:"3px 10px 3px 0", borderRight: "4px solid #60baac",  }}>
                    <div style={{display:"flex", justifyContent: "space-between",margin:"5px", padding:"5px", alignItems: "center", color: "black", opacity:'90%'}}>
                        <div style={{display:"flex",flexDirection: "column"}}>
                            <h3  style={{margin:"0 5px 0 0"}}>
                                {dayOftheWeekString[dayOftheWeek]}
                            </h3>
                            <div style={{fontSize:"small", opacity:'40%',}}>{todayDynamic}</div>
                        </div>
                        <div style={{fontSize: "xx-large", display: "grid", color: "grey", opacity:"40%", margin:"0 0 0 10px"}}>
                            {deliveryDay.length}
                        </div>
                    </div>
                    <div style={{display:"flex" , flexDirection: "row",}}>
                        {
                            deliveryDay.map((e:any,o:number)=>{
                                return (
                                    <div key={o} id="scroll" >
                                            <StatusColor data={e} />
                                    </div>
                            )}) 
                        }
                    </div>
                </div>
            )
        }
        return week
    }

    return (
        <div className='WeekGlance' >
            <div className="WeekGlanceDays widget  " >
            {weekSet()}
            </div>
            <div className="WeekDetails" >
                <div className='Upcoming widget'>
                    <Upcoming data={data} setSelectedView={setSelectedView}/>
                </div>
                <div className='SelectionDetails ' style={{backgroundColor:"none"}}>
                    <SelectionDetails data={data} selectedView={selectedView}/>
                </div>
               
            </div>
          
        </div>
    )
}

export default WeekGlance;

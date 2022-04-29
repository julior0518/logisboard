    import { ReactElement, useEffect, useState, FC } from "react"
    import { Box, makeStyles, useTheme } from "@material-ui/core"
    import Loader from 'react-loader-spinner'
    import { fetchShipments, FetchShipmentsResult } from "../data/fetch-shipments"
    import  WeekGlance  from "../components/WeekGlance"
    
    const useStyles = makeStyles({
        loader: {
            margin: 'auto',
            width: 'fit-content',
            marginTop: 200
        }
     
    })
    
    type LoadingResult = {
        status: 'LOADING'
    }

    const INITIAL_RESULT: LoadingResult = {
        status: 'LOADING'
    }
    
    export const DashboardPage: React.FC = () => {
        const classes = useStyles()
        const theme = useTheme()
        const [fetchShipmentsResult, setFetchShipmentsResult] = useState<FetchShipmentsResult | LoadingResult>(INITIAL_RESULT)

        useEffect(() => {
            fetchShipments()
                .then(result => {
                    setFetchShipmentsResult(result)
                })
        }, [])

        let component: ReactElement
        switch (fetchShipmentsResult.status) {
            case 'SUCCESS':
                component = <WeekGlance data={fetchShipmentsResult.shipments} />
                            
                break;
            case 'LOADING':
                component = <Box className={classes.loader}>
                    <Loader type="Grid" color={theme.palette.primary.main} />
                </Box >
                break
            case 'ERROR':
                component = <p>Error</p>
                break
           
        }
    
        return component
    }
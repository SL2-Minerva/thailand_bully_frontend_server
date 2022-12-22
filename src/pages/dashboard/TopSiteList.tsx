import { Table, TableRow, TableHead, TableCell, TableContainer, Button } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CloseCircleOutline from 'mdi-material-ui/CloseCircleOutline';
import { useState } from "react";
import DailyMessageDetail from "./DailyMessageDetail";

interface Props {
    topsites: any
}

const TopSiteList = ({topsites} : Props) => {
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [current, setCurrent] = useState<any>({})

    return (
        <Card sx={{ maxHeight: 360,minHeight: 360 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <CardHeader
                    title='Top Sites'
                    titleTypographyProps={{ variant: 'h6' }}
                />
                {
                    showDetail ? 
                    <Button style={{ marginTop: '20px', marginRight: '10px' }} 
                        color="primary" onClick={()=>{setShowDetail(false)}} size="small">
                        <CloseCircleOutline fontSize='large'/>
                    </Button>
                    :
                    ""
                }
            </div>
            <CardContent>
               
                <TableContainer sx={{ maxHeight: 250,minHeight: 250 }}>
                    <Table stickyHeader={true} size="small">
                        <TableHead sx={{ backgroundColor: "lightgrey !important" }}>
                            <TableCell variant="head" sx={{ backgroundColor: "white !important" }}>  </TableCell>
                            <TableCell variant="head"> No. of Messages </TableCell>
                            <TableCell variant="head"> % </TableCell>
                        </TableHead>

                        {
                            (topsites || [])?.map((topsite :any, index:any) => {
                                return(
                                    <TableRow key={index} onClick={()=>{setShowDetail(true); setCurrent({})}}>
                                        <TableCell sx={{ backgroundColor: "lightslategrey !important", color:'white' }}>{topsite?.site_domain}</TableCell>
                                        <TableCell>{topsite?.no_of_message}</TableCell>
                                        <TableCell>{topsite?.percentage}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </Table>
                </TableContainer>
                <DailyMessageDetail 
                    show={showDetail}
                    setShow={setShowDetail}
                    current={current}
                />
            </CardContent>
        </Card>
        
    )
}

export default TopSiteList
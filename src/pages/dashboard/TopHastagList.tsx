import { Table, TableRow, TableHead, TableCell, TableContainer, Button } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TopKeywordDetail from "./TopKeywordDetail";
import CloseCircleOutline from 'mdi-material-ui/CloseCircleOutline';
import { useState } from "react";

interface Props {
    topHashtags : any
}

const TopHashtagList = ({topHashtags} : Props) => {
    const [showDetail, setShowDetail] = useState<boolean>(false);
    
    return (
        <Card sx={{ maxHeight: 360,minHeight: 360 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <CardHeader
                    title='Top Hashtag'
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
            {
                    showDetail ? 
                        <TopKeywordDetail/>
                    :
                        <TableContainer sx={{ maxHeight: 250, minHeight: 250 }}>
                            <Table stickyHeader={true} size="small">
                                <TableHead sx={{ backgroundColor: "lightgrey !important" }}>
                                    <TableCell variant="head" sx={{ backgroundColor: "white !important" }}>  </TableCell>
                                    <TableCell variant="head"> No. of Messages </TableCell>
                                    <TableCell variant="head"> % </TableCell>
                                </TableHead>
                                {
                                    (topHashtags || [])?.map((hashtag:any, index:any) => {
                                        return(
                                            <TableRow key={index} onClick={()=>{setShowDetail(true)}}>
                                                <TableCell sx={{ backgroundColor: "lightslategrey !important", color:'white'}}>{hashtag?.hashtag}</TableCell>
                                                <TableCell>{hashtag?.no_of_message}</TableCell>
                                                <TableCell>{hashtag?.percentage}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </Table>
                         </TableContainer>
                }
            </CardContent>
        </Card>
        
    )
}

export default TopHashtagList
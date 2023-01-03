import { Table, TableRow, TableHead, TableCell, TableContainer } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useState } from "react";
import DailyMessageDetail from "./DailyMessageDetail";
import { StyledTooltip } from "./overall";
import { Information } from "mdi-material-ui";

interface Props {
    topHashtags : any,
    params : any
    chartId : string
}

const TopHashtagList = ({topHashtags, params, chartId} : Props) => {
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [keywordId, setKeywordId] = useState<number>();
    
    return (
        <Card sx={{ maxHeight: 360,minHeight: 360 }}>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                    title='Top Hashtag'
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <StyledTooltip arrow title={chartId}>
                    <Information  style={{marginTop: '21px', fontSize: '29px'}} />
                </StyledTooltip>
            </span>
            <CardContent>
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
                                    <TableRow key={index} onClick={()=>{setShowDetail(true);setKeywordId(hashtag?.keyword_id)}}>
                                        <TableCell sx={{ backgroundColor: "lightslategrey !important", color:'white'}}>{hashtag?.hashtag}</TableCell>
                                        <TableCell>{hashtag?.no_of_message}</TableCell>
                                        <TableCell>{hashtag?.percentage}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </Table>
                    </TableContainer>
                    <DailyMessageDetail 
                    show={showDetail}
                    setShow={setShowDetail}
                    params={params}
                    keywordId={keywordId}
                    setKeywordId = {setKeywordId}
                />
            </CardContent>
        </Card>
        
    )
}

export default TopHashtagList
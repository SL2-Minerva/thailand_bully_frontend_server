import { Table, TableRow, TableHead, TableCell, TableContainer, TableBody, LinearProgress } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useState } from "react";
import DailyMessageDetail from "./DailyMessageDetail";
import { StyledTooltip } from "./overall";
import { Information } from "mdi-material-ui";
import { GetTopKeywords } from "src/services/api/dashboards/overall/overallDashboardApi";

interface Props {
    params : any
    chartId : string
}

const TopHashtagList = ({params, chartId} : Props) => {
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [keywordId, setKeywordId] = useState<number>();
    const { resultTopKeywords, loadingFilterData } = GetTopKeywords(params?.campaign, params?.platformId, params?.date, params?.endDate, params?.period, params?.previousDate, params?.previousEndDate, params?.keywordIds);
    const reportNo = '1.2.015';

    const chartTitle = chartId + ", Report Level 2(" + reportNo + ")";

    return (
        <Card sx={{ maxHeight: 360,minHeight: 360 }}>
            {loadingFilterData && (
                <LinearProgress
                    style={{ width: "100%" }}
                />
                )}
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                    title='Top Hashtag'
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <StyledTooltip arrow title={chartTitle || ""}>
                    <Information  style={{marginTop: '21px', fontSize: '29px'}} />
                </StyledTooltip>
            </span>
            <CardContent>
                <TableContainer sx={{ maxHeight: 250, minHeight: 250 }}>
                    <Table stickyHeader={true} size="small">
                        <TableHead sx={{ backgroundColor: "lightgrey !important" }}>
                            <TableRow>
                                <TableCell variant="head" sx={{ backgroundColor: "white !important" }}>  </TableCell>
                                <TableCell variant="head"> No. of Messages </TableCell>
                                <TableCell variant="head"> % </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                (resultTopKeywords?.top_hastag || [])?.map((hashtag:any, index:any) => {
                                    return(
                                        <TableRow style={{ cursor: 'pointer' }} key={index} onClick={()=>{setShowDetail(true);setKeywordId(hashtag?.keyword_id)}}>
                                            <TableCell sx={{ backgroundColor: "lightslategrey !important", color:'white'}}>{hashtag?.hashtag}</TableCell>
                                            <TableCell>{hashtag?.no_of_message}</TableCell>
                                            <TableCell>{hashtag?.percentage}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    </TableContainer>
                    {
                        params?.campaign ? 
                        <DailyMessageDetail 
                            show={showDetail}
                            setShow={setShowDetail}
                            params={params}
                            keywordId={keywordId}
                            setKeywordId = {setKeywordId}
                            reportNo = {reportNo}
                            title = "Top Hashtag: Messages Transaction"
                            networkTitle="Top Hashtag: Social Network Analysis"
                        /> : ""
                    }
            </CardContent>
        </Card>
        
    )
}

export default TopHashtagList
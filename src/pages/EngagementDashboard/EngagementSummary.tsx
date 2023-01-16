import { Table, TableRow, TableHead, TableCell, TableBody, TableContainer, Box, Pagination } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from "../dashboard/overall";
import { Information } from "mdi-material-ui";
import { GetSummary } from "src/services/api/dashboards/engagement/EngagementApi";
import { useEffect, useState } from "react";

const EngagementSummary = ({ topKeyword, params, chartId, highlight} : {topKeyword: string, params:any, chartId: string, highlight:boolean}) => {
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState<number>(0);

    const { resultSummary, totalSummary } = GetSummary(topKeyword, params?.campaignType, params?.date, params?.endDate, params?.period, page); 
    const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value-1);
    };

    useEffect(()=> {
        if (totalSummary > 0) {
         setPageCount(Math.ceil(totalSummary / 10));
        }
    }, [totalSummary]);

    const reportNo = '4.2.025';

     const title = chartId + ", Report Level 2(" + reportNo + ")";

    return (
        <Card>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                    title='Summary Engagement by Account'
                    titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
                />
                <StyledTooltip arrow title={title || ""}>
                    <Information style={{marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de'}} />
                </StyledTooltip>
            </span>
            <CardContent>
            <TableContainer sx={{ maxHeight: 250 }}>
            <Table size="small" stickyHeader={true}>
                    <TableHead style={{ backgroundColor: "green"}}>
                        <TableRow>
                            <TableCell variant="head"> Influencer </TableCell>
                            <TableCell variant="head"> Total </TableCell>
                            <TableCell variant="head"> Share </TableCell>
                            <TableCell variant="head"> Comment </TableCell>
                            <TableCell variant="head"> Reaction </TableCell>
                            <TableCell variant="head"> Period over Period </TableCell>
                            <TableCell variant="head"> Period over Period (%) </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (resultSummary||[])?.map((summary: any, index:any) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell><b>{summary.infulencer}</b></TableCell>
                                        <TableCell>{summary.total}</TableCell>
                                        <TableCell>{summary.share}</TableCell>
                                        <TableCell>{summary.comment}</TableCell>
                                        <TableCell>{summary.reaction}</TableCell>
                                        <TableCell>{summary.period_over_preiod}</TableCell>
                                        <TableCell>{summary.period_over_period_percentage} %</TableCell>

                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                    
            </Table>
            </TableContainer>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center'}}> 
            {
                totalSummary > 0 ? 
                <Pagination count={pageCount} page={page+1} onChange={handleChangePagination} variant='outlined' color='primary'/>
                : ""
            }
            </Box>
            </CardContent>
        </Card>
        
    )
}

export default EngagementSummary
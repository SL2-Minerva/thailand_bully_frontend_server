import { Table, TableRow, TableHead, TableCell, TableBody, TableContainer, Grid, Button, Box, Pagination } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgressBar from "./LinearProgressBar";
import { StyledTooltip } from "../dashboard/overall";
import { Information } from "mdi-material-ui";
import { GetSummaryByKeywords } from "src/services/api/dashboards/sentiment/sentimentDashboard";
import { useEffect, useState } from "react";

const SummaryByKeywords = ({params, chartId, highlight} :
     {params: any, chartId: string, highlight: boolean}) => {
    
    const [ topKeyword, setTopKeyword ] = useState<string>('all');
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState<number>(0);
    
    const { resultSummaryByKeywords, total } = GetSummaryByKeywords(topKeyword, params?.campaign, params?.date, params?.endDate, params?.period, page);
    const handleTopKeyword = (data: string) => {
        setTopKeyword(data);
    }
    const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value-1);
    };

    useEffect(()=> {
        if (total > 0) {
        setPageCount(Math.ceil(total / 10));
        }
    }, [total]);

    const reportNo = '5.2.019';

    const title = chartId + ", Report Level 2(" + reportNo + ")";

    return (
        <Card>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                    title='Sentiment Type by Keyword'
                    titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
                />
                <StyledTooltip arrow title={title || ""}>
                    <Information style={{marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de'}} />
                </StyledTooltip>
            </span>
            <CardContent>
            <Grid container spacing={3} mt ={2} mb={3}> 
                <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <span  style={{marginTop: '7px', marginRight: '20px', fontSize: '20px' }}> Select </span>
                    <Button variant="contained" color={topKeyword === 'top10' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }}
                    onClick={() => {handleTopKeyword("top10")}}> Top 10</Button>
                    <Button variant="contained" color={topKeyword === 'top20' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }} onClick={() => {handleTopKeyword("top20")}}> Top 20</Button>
                    <Button variant="contained" color={topKeyword === 'top50' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }} onClick={() => {handleTopKeyword("top50")}}> Top 50</Button>
                    <Button variant="contained" color={topKeyword === 'top100' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }} onClick={() => {handleTopKeyword("top100")}}> Top 100</Button>
                    <Button variant="contained" color={topKeyword === 'all' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }} onClick={() => {handleTopKeyword("all")}}> ALL </Button>
                </Grid>
            </Grid>
            <TableContainer sx={{ maxHeight: 500 }}>
            <Table size="small" stickyHeader={true}>
                    <TableHead style={{ backgroundColor: "green"}}>
                        <TableRow>
                            <TableCell variant="head"> Keywords </TableCell>
                            <TableCell variant="head"> Total Message </TableCell>
                            <TableCell variant="head"> % </TableCell>
                            <TableCell variant="head"> Positive </TableCell>
                            <TableCell variant="head"> Neutral </TableCell>
                            <TableCell variant="head"> Negative </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (resultSummaryByKeywords||[])?.map((summary: any, index:any) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell><b>{summary.keyword}</b></TableCell>
                                        <TableCell>{summary.total_messages}</TableCell>
                                        <TableCell>{summary.percentage}%</TableCell>
                                        <TableCell>
                                            <LinearProgressBar value={summary.positive} />
                                        </TableCell>
                                        <TableCell>
                                            <LinearProgressBar value={summary.neutral} />
                                        </TableCell>
                                        <TableCell>
                                             <LinearProgressBar value= {summary.negative} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                    
            </Table>
            </TableContainer>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center'}}> 
                {
                    total > 0 ? 
                    <Pagination count={pageCount} page={page+1} onChange={handleChangePagination} variant='outlined' color='primary'/>
                    : ""
                }
            </Box>
            </CardContent>
        </Card>
        
    )
}

export default SummaryByKeywords
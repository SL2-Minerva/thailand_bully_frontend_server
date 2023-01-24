import { Grid, Button, LinearProgress } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from "../dashboard/overall";
import { Information } from "mdi-material-ui";
import { useEffect, useState } from "react";
import { GetSummaryByAccount } from "src/services/api/dashboards/sentiment/sentimentDashboard";
import { renderProgress } from "./SummaryByKeywords";
import { DataGrid } from "@mui/x-data-grid";

const SummaryByAccount = ({ params, chartId, highlight} : 
    {params: any, chartId: string, highlight: boolean}) => {
    
    const [ topAccount, setTopAccount ] = useState<string>('all');
    
    // const [page, setPage] = useState(0);
    // const [pageCount, setPageCount] = useState<number>(0);

    const { resultSummaryByAccount, total, loadingSummaryByAccount } = GetSummaryByAccount(topAccount, params?.campaign, params?.date, params?.endDate, params?.period, 0, params?.keywordIds);

    const handleTopAccounts = (data: string) => {
        setTopAccount(data);
    }

    // const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    //     setPage(value-1);
    // };

    useEffect(()=> {
        if (total > 0) {
        // setPageCount(Math.ceil(total / 10));
        }
    }, [total]);

    const reportNo = '5.2.017';

   const title = chartId + ", Report Level 2(" + reportNo + ")";

   const columns = [
    { field: 'infulencer', headerName: 'Influencer',flex: 1 , sortable: false },
    { field: 'sentiment_score', headerName: 'Sentiment Score ', flex: 1  },
    { field: 'positive', headerName: ' Positive', flex: 1  ,
        renderCell: renderProgress
    },
    { field: 'neutral', headerName: ' Neutral', flex: 1  ,
        renderCell: renderProgress
    },
    { field: 'negative', headerName: ' Negative', flex: 1  ,
        renderCell: renderProgress
    }
  ];

    return (
        <Card>
            {loadingSummaryByAccount && (
            <LinearProgress
                style={{ width: "100%" }}
            />
            )}
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                    title='Summary Sentiment Score by Account'
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
                    <Button variant="contained" color={topAccount === 'top10' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }}
                    onClick={() => {handleTopAccounts("top10")}}> Top 10</Button>
                    <Button variant="contained" color={topAccount === 'top20' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }} onClick={() => {handleTopAccounts("top20")}}> Top 20</Button>
                    <Button variant="contained" color={topAccount === 'top50' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }} onClick={() => {handleTopAccounts("top50")}}> Top 50</Button>
                    <Button variant="contained" color={topAccount === 'top100' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }} onClick={() => {handleTopAccounts("top100")}}> Top 100</Button>
                    <Button variant="contained" color={topAccount === 'all' ? "warning" : 'inherit'} size="medium" sx={{ marginRight: '20px' }} onClick={() => {handleTopAccounts("all")}}> ALL </Button>
                </Grid>
            </Grid>
            {/* <TableContainer sx={{ maxHeight: 500 }}>
            <Table size="small" stickyHeader={true}>
                    <TableHead style={{ backgroundColor: "green"}}>
                        <TableRow>
                            <TableCell variant="head"> Influencer </TableCell>
                            <TableCell variant="head"> Sentiment Score </TableCell>
                            <TableCell variant="head"> Positive </TableCell>
                            <TableCell variant="head"> Neutral </TableCell>
                            <TableCell variant="head"> Negative </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (resultSummaryByAccount||[])?.map((summary: any, index:any) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell><b>{summary.infulencer}</b></TableCell>
                                        <TableCell>{summary.sentiment_score}</TableCell>
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
            </Box> */}

            {
                resultSummaryByAccount ? 
                <DataGrid
                    autoHeight
                    rows={resultSummaryByAccount}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.id} 
                /> : ""
            }
            </CardContent>
        </Card>
        
    )
}

export default SummaryByAccount
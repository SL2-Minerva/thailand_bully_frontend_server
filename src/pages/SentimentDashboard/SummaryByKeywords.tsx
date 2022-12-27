import { Table, TableRow, TableHead, TableCell, TableBody, TableContainer, Grid, Button } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgressBar from "./LinearProgressBar";
import { StyledTooltip } from "../dashboard/overall";
import { Information } from "mdi-material-ui";

const SummaryByKeywords = ({resultSummary, topKeyword, setTopKeyword, chartId} :
     {resultSummary: any, topKeyword : string, setTopKeyword : any, chartId: string}) => {
    const handleTopKeyword = (data: string) => {
        setTopKeyword(data);
    }

    return (
        <Card>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                    title='Keywords'
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <StyledTooltip arrow title={chartId}>
                    <Information style={{marginTop: '22px', fontSize: '29px'}} />
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
                        <TableCell variant="head"> Keywords </TableCell>
                        <TableCell variant="head"> Total Message </TableCell>
                        <TableCell variant="head"> % </TableCell>
                        <TableCell variant="head"> Positive </TableCell>
                        <TableCell variant="head"> Neutral </TableCell>
                        <TableCell variant="head"> Negative </TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            (resultSummary||[])?.map((summary: any, index:any) => {
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
            </CardContent>
        </Card>
        
    )
}

export default SummaryByKeywords
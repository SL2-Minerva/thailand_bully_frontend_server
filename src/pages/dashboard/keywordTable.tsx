import { Table, TableRow, TableHead, TableCell, TableBody, TableContainer } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from "./overall";
import { Information } from "mdi-material-ui";

const KeywordTable = ({resultKeywords, chartId} : {resultKeywords: any, chartId: string}) => {
    
    return (
        <Card>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                    title='KeyWords'
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <StyledTooltip arrow title={chartId}>
                    <Information  style={{marginTop: '22px', fontSize: '29px'}} />
                </StyledTooltip>
            </span>
            <CardContent>
            <TableContainer sx={{ maxHeight: 250 }}>
            <Table size="small" stickyHeader={true}>
                    <TableHead sx={{ backgroundColor: "lightgrey !important"}}>
                        <TableCell variant="head" style={{ backgroundColor: 'white' }}> </TableCell>
                        <TableCell variant="head"> Message </TableCell>
                        <TableCell variant="head"> Engagement </TableCell>
                        <TableCell variant="head"> Accounts </TableCell>
                        <TableCell variant="head"> Average message per day </TableCell>
                        <TableCell variant="head"> Average Engagement per day </TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            (resultKeywords||[])?.map((keyword: any, index:any) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell sx={{ backgroundColor: "lightgrey !important" }}><b>{keyword.keyword}</b></TableCell>
                                        <TableCell>{keyword.message}</TableCell>
                                        <TableCell>{keyword.engagement}</TableCell>
                                        <TableCell>{keyword.accounts}</TableCell>
                                        <TableCell>{keyword.average_message}</TableCell>
                                        <TableCell>{keyword.average_engagement}</TableCell>
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

export default KeywordTable
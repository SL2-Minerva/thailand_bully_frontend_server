import { Table, TableRow, TableHead, TableCell } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const KeywordTable = () => {
    
    return (
        <Card>
            <CardHeader
                title='KeyWords'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
            <Table>
                    <TableHead sx={{ backgroundColor: "lightgrey !important" }}>
                        <TableCell variant="head" sx={{ backgroundColor: "white !important" }}>  </TableCell>
                        <TableCell variant="head"> Message </TableCell>
                        <TableCell variant="head"> Engagement </TableCell>
                        <TableCell variant="head"> Accounts </TableCell>
                        <TableCell variant="head"> Average message per day </TableCell>
                        <TableCell variant="head"> Average Engagement per day </TableCell>
                    </TableHead>
                    <TableRow>
                        <TableCell variant="head" sx={{ backgroundColor: "lightgrey !important" }}>KeyWord 1</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>20,000</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>9.5</TableCell>
                        <TableCell>954.89</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" sx={{ backgroundColor: "lightgrey !important" }}>KeyWord 2</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>20,000</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>9.5</TableCell>
                        <TableCell>954.89</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" sx={{ backgroundColor: "lightgrey !important" }}>KeyWord 3</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>20,000</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>9.5</TableCell>
                        <TableCell>954.89</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" sx={{ backgroundColor: "lightgrey !important" }}>KeyWord 4</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>20,000</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>9.5</TableCell>
                        <TableCell>954.89</TableCell>
                    </TableRow>
                </Table>
            </CardContent>
        </Card>
        
    )
}

export default KeywordTable
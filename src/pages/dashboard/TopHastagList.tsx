import { Table, TableRow, TableHead, TableCell } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const TopHashtagList = () => {
    
    return (
        <Card>
            <CardHeader
                title='Top Hashtag'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
            <Table>
                    <TableHead sx={{ backgroundColor: "lightgrey !important" }}>
                        <TableCell variant="head" sx={{ backgroundColor: "white !important" }}>  </TableCell>
                        <TableCell variant="head"> No. of Messages </TableCell>
                        <TableCell variant="head"> % </TableCell>
                    </TableHead>
                    <TableRow>
                        <TableCell variant="head" sx={{ backgroundColor: "lightslategrey !important", color:'white'  }}>#1</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>18%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" sx={{ backgroundColor: "lightslategrey !important", color:'white'  }}>#2</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>18%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" sx={{ backgroundColor: "lightslategrey !important", color:'white'  }}>#3</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>18%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" sx={{ backgroundColor: "lightslategrey !important", color:'white'  }}>#4</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>18%</TableCell>
                    </TableRow>
                </Table>
            </CardContent>
        </Card>
        
    )
}

export default TopHashtagList
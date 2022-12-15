import { Table, TableRow, TableHead, TableCell, TableContainer } from "@mui/material"; 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

interface Props {
    topHashtags : any
}

const TopHashtagList = ({topHashtags} : Props) => {
    
    return (
        <Card sx={{ maxHeight: 360,minHeight: 360 }}>
            <CardHeader
                title='Top Hashtag'
                titleTypographyProps={{ variant: 'h6' }}
            />
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
                                <TableRow key={index}>
                                    <TableCell sx={{ backgroundColor: "lightslategrey !important", color:'white'}}>{hashtag?.hashtag}</TableCell>
                                    <TableCell>{hashtag?.no_of_message}</TableCell>
                                    <TableCell>{hashtag?.percentage}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </Table>
            </TableContainer>
            
            </CardContent>
        </Card>
        
    )
}

export default TopHashtagList
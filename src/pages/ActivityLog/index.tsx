import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  TextField,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  Chip,
  Table,
  TableRow
} from '@mui/material'
import { useState } from 'react'
import Paper from '@mui/material/Paper'

const ActivityLog = () => {
  const [keyword, setKeyword] = useState('')

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Filter' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    value={keyword}
                    label='Search'
                    onChange={e => setKeyword(e.target.value)}
                    placeholder='Search'
                    autoComplete='off'
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Activity Log' />
          <CardContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>No.</TableCell>
                    <TableCell align='center'>Endpoint</TableCell>
                    <TableCell align='center'>Error Code</TableCell>
                    <TableCell align='center'> Timestamp </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align='center'>1</TableCell>
                    <TableCell align='center'>Info not found</TableCell>
                    <TableCell align='center'>
                      <Chip label='404' variant='outlined' color='error' />
                    </TableCell>
                    <TableCell align='center'>02/05/2023 12:12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>2</TableCell>
                    <TableCell align='center'>Info not authorized</TableCell>
                    <TableCell align='center'>
                      <Chip label='401' variant='outlined' color='error' />
                    </TableCell>
                    <TableCell align='center'>02/05/2023 12:12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>3</TableCell>
                    <TableCell align='center'>xxxxx</TableCell>
                    <TableCell align='center'>
                      <Chip label='500' variant='outlined' color='error' />
                    </TableCell>
                    <TableCell align='center'>02/05/2023 12:12</TableCell>

                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>4</TableCell>
                    <TableCell align='center'>xxxxxx</TableCell>
                    <TableCell align='center'>
                      <Chip label='403' variant='outlined' color='error' />
                    </TableCell>
                    <TableCell align='center'>02/05/2023 12:12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>5</TableCell>
                    <TableCell align='center'>Info not found</TableCell>
                    <TableCell align='center'>
                      <Chip label='404' variant='outlined' color='error' />
                    </TableCell>
                    <TableCell align='center'>02/05/2023 13:13</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ActivityLog

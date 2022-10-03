// ** React Imports
import { useState, useCallback } from 'react'

// ** MUI Imports
import { Grid , Card, CardHeader, CardContent } from "@mui/material";
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Switch from '@mui/material/Switch'
import { PencilOutline } from 'mdi-material-ui'
import DialogRoleInfo from './DialogRoleInfo';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import DatePicker from '@mui/lab/DatePicker'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import { ThemeColor } from 'src/@core/layouts/types'
import CustomChip from 'src/@core/components/mui/chip'


  const createData = (id: number, name: string, email: string,
                      phone_number: number, company: string,
                      date: string, approved : boolean, expired_date: string, status: string) => {
    return {id, name, email, phone_number, company, date, approved, expired_date, status }
  }

  const rows = [
    createData(1, 'บุญมา ศรีสุข', 'Boonma@gmail.com', 1, 'AAA', '25/09/2022', false, '25/10/2022', 'New'),
    createData(2, 'บุญมี บัวงาม', 'Boonme@gmail.com', 3, 'BBB', '26/08/2022', true, '10/09/2022', 'Expired'),
    createData(3, 'สมบูรณ์ วิไลโรชน์', 'Soboon@gmail.com', 2, 'CC', '03/09/2022', true, '19/09/2022', 'Expired')
  ]

interface StatusType {
    [key: string]: ThemeColor
  }

const StatusObj: StatusType = {
    New: 'success',
    Expired: 'warning'
  }


const RegisterManagement = () => {
    const [ showDialog , setShowDialog ] = useState<boolean>(false)
    const [ addRoleOpen, setAddRoleOpen ] = useState<boolean>(false)
    const toggleAddRole = () => setAddRoleOpen(!addRoleOpen)
    const [ date, setDate ] = useState<Date | null>(new Date())
    const [ endDate, setEndDate ] = useState<Date | null>(new Date())
    const [status, setStatus] = useState<string>('')

    const handleStatusChange = useCallback((e: SelectChangeEvent) => {
        setStatus(e.target.value)
      }, [])

  return (
    <Grid container>
        <Grid item xs={12}> 
        <Card>
          <CardHeader title='Register Management' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6} mt={2}>
                <Grid item sm={3} xs={12}>
                    <FormControl fullWidth>
                    <InputLabel id='status-select'>Select Status</InputLabel>
                    <Select
                        fullWidth
                        value={status}
                        id='select-status'
                        label='Select Status'
                        labelId='status-select'
                        onChange={handleStatusChange}
                        inputProps={{ placeholder: 'Select Status' }}
                    >
                        <MenuItem value=''>Select Status</MenuItem>
                        <MenuItem value='new'>New</MenuItem>
                        <MenuItem value='expired'>Expired</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label='Start Date'
                        value={date}
                        onChange={newValue => setDate(newValue)}
                        renderInput={params => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label='End Date'
                        value={endDate}
                        onChange={newValue => setEndDate(newValue)}
                        renderInput={params => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12} mt={2}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        
                  <Button sx={{ mb: 2 }} onClick={()=>{console.log("search")}} variant='contained'>
                    search
                  </Button>
                </Box>
              </Grid>
            </Grid>

          </CardContent>
        </Card>
        </Grid>
        <Grid item xs={12} mt={3}>  
            <Card>
                 <CardHeader title='Registered List' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                            <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align='center'>Name</TableCell>
                                <TableCell align='center'>Email</TableCell>
                                <TableCell align='center'>Phone No.</TableCell>
                                <TableCell align='center'>Company</TableCell>
                                <TableCell align='center'>Date</TableCell>
                                <TableCell align='center'>Approved</TableCell>
                                <TableCell align='center'>Expired Date</TableCell>
                                <TableCell align='center'>Status</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map(row => (
                                <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-of-type td, &:last-of-type th': {
                                    border: 0
                                    }
                                }}
                                >
                                <TableCell component='th' scope='row'>
                                    {row.id}
                                </TableCell>
                                <TableCell align='center'>{row.name}</TableCell>
                                <TableCell align='center'>{row.email}</TableCell>
                                <TableCell align='center'>{row.phone_number}</TableCell>
                                <TableCell align='center'>{row.company}</TableCell>
                                <TableCell align='center'>{row.date}</TableCell>
                                <TableCell align='center'>
                                    <Switch  checked={row.approved}/>
                                </TableCell>
                                <TableCell align='center'>{row.expired_date}</TableCell>
                                <TableCell align='center'>
                                    <CustomChip
                                        skin='light'
                                        size='small'
                                        label={row.status}
                                        color={StatusObj[row.status]}
                                        sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
                                    />
                                </TableCell>

                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <DialogRoleInfo show={showDialog} setShow={setShowDialog} action="edit"/>
                    <DialogRoleInfo show={addRoleOpen} setShow={setAddRoleOpen} action="create"/>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
  )
}

export default RegisterManagement

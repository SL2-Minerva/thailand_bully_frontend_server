// ** React Imports
import { useState } from 'react'

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
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DialogDomain from './dialogDomain';

const createData = (name: string, description: string, status : boolean) => {
  return { name, description, status }
}

const rows = [
  createData('การรักษาความสงบ', "ข้อมูลไม่เหมาะสม, หลอกลวง, หมิ่นประมาท, ก่อการร้าย", true),
  createData('การเมือง', "เลือกตั้ง, หาเสียง, นโยบาย", true),
  createData('เศรฐกิจ', "หุ้น, การลงทุน, การค้าขาย", false),
  createData('สังคม', "จิตวิทยา, ความยากจน, กระแส", true)
]

const DomainManagement = () => {
  const [ showEdit , setShowEdit ] = useState<boolean>(false)
  const [ showCreate, setShowCreate ] = useState<boolean>(false)
  const toggleCreate = () => setShowCreate(!showCreate)

  return (
    <Grid container spacing={6}>
      <Grid item md={12} xs={12}>
        <Card>
          <CardHeader title='Domain Management' />
          <CardContent>
          <TableContainer component={Paper}>
                  <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                      
                          <Button sx={{ mb: 2 }} onClick={toggleCreate} variant='contained'>
                              Add
                          </Button>
                      </Box>
                  </Box>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                      <TableRow>
                          <TableCell>Domain Name</TableCell>
                          <TableCell align='center'>Description</TableCell>
                          <TableCell align='center'>Status</TableCell>
                          <TableCell align='center'>Action</TableCell>
                      </TableRow>
                      </TableHead>
                      <TableBody>
                      {rows.map(row => (
                          <TableRow
                          key={row.name}
                          sx={{
                              '&:last-of-type td, &:last-of-type th': {
                              border: 0
                              }
                          }}
                          >
                          <TableCell component='th' scope='row'>
                              {row.name}
                          </TableCell>
                          <TableCell align='center'>{row.description}</TableCell>
                          <TableCell align='center'>
                              <Switch  checked={row.status}/>
                          </TableCell>
                          <TableCell align='center'>
                              <PencilOutline onClick={()=> { setShowEdit(true) }}/>
                          </TableCell>
                          </TableRow>
                      ))}
                      </TableBody>
                  </Table>
          </TableContainer>
          <DialogDomain show={showEdit} setShow={setShowEdit} action="edit"/>
          <DialogDomain show={showCreate} setShow={setShowCreate} action="action"/>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DomainManagement

// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent } from '@mui/material'
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
import DialogSource from './dialogSource'
import SourceService from 'src/services/api/source/SourceApi'
import axios from 'axios'
import authConfig from '../../../configs/auth'

const SourceManagement = () => {
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [showCreate, setShowCreate] = useState<boolean>(false)

  const [reload, setReload] = useState<boolean>(false)
  const [current, setCurrent] = useState<any>({})
  const [action, setAction] = useState<string>('create')

  const toggleCreate = () => {
    setAction('create')
    setShowCreate(!showCreate)
    setCurrent({})
  }

  const { result_source_list } = SourceService(reload)

  useEffect(() => {
    setReload(!reload)
    setTableData(result_source_list)
  }, [showCreate, showEdit])

  function handleChange(index: number, i: number, event: any) {
    axios.put(
      authConfig.updateSource,
      { id: i, status: event.target.checked },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
        }
      }
    )

    const values = [...result_source_list]
    values[index].status = event.target.checked
    setTableData(values)
    setReload(!reload)
  }

  function handleEdit(i: number) {
    setAction('edit')
    setCurrent(result_source_list[i])
    setShowEdit(true)
    setTableData(result_source_list)
  }
  const [tableData, setTableData] = useState(result_source_list)

  return (
    <Grid container spacing={6}>
      <Grid item md={12} xs={12}>
        <Card>
          <CardHeader title='Source Management' />
          <CardContent>
            <TableContainer component={Paper}>
              <Box
                sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}
              >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button sx={{ mb: 2 }} onClick={toggleCreate} variant='contained'>
                    Add
                  </Button>
                </Box>
              </Box>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Source</TableCell>
                    <TableCell align='center'>Description</TableCell>
                    <TableCell align='center'>Status</TableCell>
                    <TableCell align='center'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result_source_list &&
                    result_source_list.map((row: any, index: number) => (
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
                          <Switch key={index} checked={row.status} onChange={e => handleChange(index, row.id, e)} />
                        </TableCell>
                        <TableCell align='center'>
                          <PencilOutline
                            onClick={() => {
                              handleEdit(index)
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <DialogSource
              table={tableData}
              show={action === 'create' ? showCreate : showEdit}
              setShow={action === 'create' ? setShowCreate : setShowEdit}
              action={action}
              current={current}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SourceManagement

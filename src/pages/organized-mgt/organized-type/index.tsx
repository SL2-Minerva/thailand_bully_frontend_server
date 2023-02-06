// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Pagination } from '@mui/material'
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
import DialogOrganizationType from './typeDialog'
import OrganizationTypeService from 'src/services/api/organization/OrganizationApi'
import axios from 'axios'
import authConfig from '../../../configs/auth'
import { useRouter } from 'next/router'

const OrganizationType = () => {
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [reload, setReload] = useState<boolean>(false)
  const [current, setCurrent] = useState<any>({})
  const [action, setAction] = useState<string>('create')
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState<number>(0);

  const toggleCreate = () => {
    setAction('create')
    setShowCreate(!showCreate)
    setCurrent({})
  }

  const { result_organization_type_list, total, error_domain_list } = OrganizationTypeService(reload, page)
  const router = useRouter()
  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value-1);
  };

  useEffect(()=> {
      if (total > 0) {
      setPageCount(Math.ceil(total / 10));
      }
  }, [total]);

  useEffect(()=> {
    if(error_domain_list) {
      window.localStorage.removeItem('userData')
      router.push('/login')
    }
  }, [error_domain_list])

  useEffect(() => {
    setReload(!reload)
    setTableData(result_organization_type_list)
  }, [showCreate, showEdit])

  function handleChange(index: number, i: number, event: any) {
    axios.put(
      authConfig.updateOrgType,
      { id: i, status: event.target.checked },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
        }
      }
    ).then(() => {
      const values = [...result_organization_type_list]
      values[index].status = event.target.checked
      setTableData(values)
  
      setReload(!reload)
    })

    
  }

  function handleEdit(i: number) {
    setAction('edit')
    setCurrent(result_organization_type_list[i])
    setShowEdit(true)
  }

  const [tableData, setTableData] = useState(result_organization_type_list)

  return (
    <Grid container spacing={6}>
      <Grid item md={12} xs={12}>
        <Card>
          <CardHeader title='Organization Type Management' />
          <CardContent>
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
                      <TableCell>Organizaton Type</TableCell>
                      <TableCell align='center'>Description</TableCell>
                      <TableCell align='center'>Status</TableCell>
                      <TableCell align='center'>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {result_organization_type_list &&
                      result_organization_type_list.map((row: any, index: number) => {
                        return (
                          <TableRow
                            key={row.organization_type_name}
                            sx={{
                              '&:last-of-type td, &:last-of-type th': {
                                border: 0
                              }
                            }}
                          >
                            <TableCell component='th' scope='row'>
                              {row.organization_type_name}
                            </TableCell>
                            <TableCell align='center'>{row.organization_type_description}</TableCell>
                            <TableCell align='center'>
                              <Switch key={index} checked={row.status === 1 ? true : row.status ? true : false} onChange={e => handleChange(index, row.id, e)} />
                            </TableCell>
                            <TableCell align='center'>
                              <PencilOutline
                                onClick={() => {
                                  handleEdit(index)
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center'}}> 
                {
                    total > 0 ? 
                    <Pagination count={pageCount} page={page+1} onChange={handleChangePagination} variant='outlined' color='primary'/>
                    : ""
                }
              </Box>
              {
                action === 'create' ? 
                <DialogOrganizationType
                  table={tableData}
                  show={showCreate}
                  setShow={setShowCreate}
                  action={action}
                  current={current}
                /> :
                <DialogOrganizationType
                  table={tableData}
                  show={showEdit}
                  setShow={setShowEdit}
                  action={action}
                  current={current}
                />
              }
              
            </CardContent>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OrganizationType

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  TextField,
  SelectChangeEvent,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Pagination,
  Box
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { GetActivityLog } from 'src/services/api/activityLog/ActivityLog'
import { useRouter } from 'next/router'
import Translations from 'src/layouts/components/Translations'
import moment from 'moment'
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid'

const ActivityLog = () => {
  const router = useRouter()

  const [keyword, setKeyword] = useState('')
  const [statusCode, setStatusCode] = useState('')
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState<number>(0)
  const { resultActivityLog, errorActivityLog, total } = GetActivityLog(keyword, statusCode, page)

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  useEffect(() => {
    if (errorActivityLog) {
      window.localStorage.removeItem('userData')
      window.localStorage.clear()
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorActivityLog])

  const handleStatusCode = useCallback((e: SelectChangeEvent) => {
    setStatusCode(e.target.value)
  }, [])

  function renderStatusCode(params: any) {
    return params.value === 200 ? (
      <Chip label={params.value} variant='outlined' color='success' />
    ) : (
      <Chip label={params.value} variant='outlined' color='error' />
    )
  }

  function renderMethod(params: any) {
    return <span style={{ color: '#4e1eec' }}>{params.value}</span>
  }

  function renderStatusText(params: any) {
    return params.value === 'สถานะปกติ' ? (
      <span style={{ color: '#4fac24' }}>{params.value}</span>
    ) : (
      <span style={{ color: '#FF4D49' }}>{params.value}</span>
    )
  }

  const columns = [
    {
      field: 'id',
      headerName: '#'
    },
    {
      field: 'feature',
      headerName: 'Feature',
      flex: 1
    },
    {
      field: 'method',
      headerName: 'Method',
      flex: 1,
      renderCell: renderMethod
    },
    {
      field: 'end_point',
      headerName: 'Endpoint',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: renderStatusText
    },
    {
      field: 'status_code',
      headerName: 'Status Code',
      flex: 1,
      renderCell: renderStatusCode
    },
    {
      field: 'request_by_name',
      headerName: 'Requested By',
      flex: 1
    },
    {
      field: 'created_at',
      headerName: 'Timestamp',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => `${moment(params.row.created_at).format('DD-MM-YYYY HH:mm')}`
    }
  ]

  useEffect(() => {
    if (total > 0) {
      setPageCount(Math.ceil(total / 10))
    }
  }, [total])

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
                    onChange={e => {
                      setKeyword(e.target.value)
                      setPage(0)
                    }}
                    placeholder='Search'
                    autoComplete='off'
                  />
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>
                    <Translations text='Status Code' />
                  </InputLabel>
                  <Select
                    fullWidth
                    value={statusCode}
                    id='select-status'
                    label='Select Status Code'
                    labelId='statusCode-select'
                    onChange={e => {
                      handleStatusCode(e)
                    }}
                    inputProps={{ placeholder: 'Select Status Code' }}
                  >
                    <MenuItem value=''>All</MenuItem>
                    <MenuItem value='200'>200</MenuItem>
                    <MenuItem value='400'>400</MenuItem>
                    <MenuItem value='401'>401</MenuItem>
                    <MenuItem value='403'>403</MenuItem>
                    <MenuItem value='404'>404</MenuItem>
                    <MenuItem value='500'>500</MenuItem>
                  </Select>
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
            {resultActivityLog ? (
              <DataGrid
                autoHeight
                rows={resultActivityLog}
                columns={columns}
                getRowId={row => row.id}
                hideFooterPagination = {true}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            ) : (
              ''
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {total > 0 ? (
                <Pagination
                  count={pageCount}
                  page={page + 1}
                  onChange={handleChangePagination}
                  variant='outlined'
                  color='primary'
                />
              ) : (
                ''
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ActivityLog

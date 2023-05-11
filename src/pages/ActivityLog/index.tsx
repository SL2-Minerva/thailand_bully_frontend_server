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
  TableRow,
  Box,
  Pagination,
  SelectChangeEvent,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import { GetActivityLog } from 'src/services/api/activityLog/ActivityLog'
import { useRouter } from 'next/router'
import Translations from 'src/layouts/components/Translations'
import moment from 'moment'

const ActivityLog = () => {
  const router = useRouter()

  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState<number>(0)
  const [statusCode, setStatusCode] = useState('')
  const { resultActivityLog, total, errorActivityLog } = GetActivityLog(page, keyword, statusCode)

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  useEffect(() => {
    if (total > 0) {
      setPageCount(Math.ceil(total / 10))
    }
  }, [total])

  useEffect(() => {
    if (errorActivityLog) {
      window.localStorage.removeItem('userData')
      window.localStorage.clear()
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorActivityLog])

  useEffect(() => {
    setPage(0)
  }, [keyword, statusCode])

  const handleStatusCode = useCallback((e: SelectChangeEvent) => {
    setStatusCode(e.target.value)
  }, [])

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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>No.</TableCell>
                    <TableCell align='center'>Feature</TableCell>
                    <TableCell align='center'>Method</TableCell>
                    <TableCell align='center'>Endpoint</TableCell>
                    <TableCell align='center'>Status</TableCell>
                    <TableCell align='center'>Status Code</TableCell>
                    <TableCell align='center'>Requested By</TableCell>
                    <TableCell align='center'> Timestamp </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(resultActivityLog || []).map((activityLog: any, index: number) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align='center'>{index + 1 + page * 10}</TableCell>
                        <TableCell align='center'>{activityLog.feature}</TableCell>
                        <TableCell align='center'>
                          <span style={{ color: '#4e1eec' }}>{activityLog.method}</span>
                        </TableCell>
                        <TableCell align='center'>{activityLog.end_point}</TableCell>
                        <TableCell align='center'>
                          {activityLog.status_code === 200 ? (
                            <span style={{ color: '#4fac24' }}>{activityLog.status}</span>
                          ) : (
                            <span style={{ color: '#FF4D49' }}>{activityLog.status}</span>
                          )}
                        </TableCell>

                        <TableCell align='center'>
                          {activityLog.status_code === 200 ? (
                            <Chip label={activityLog.status_code} variant='outlined' color='success' />
                          ) : (
                            <Chip label={activityLog.status_code} variant='outlined' color='error' />
                          )}
                        </TableCell>
                        <TableCell align='center'>{activityLog.request_by_name}</TableCell>
                        <TableCell align='center'>
                          {' '}
                          {moment(activityLog.created_at).format('DD-MM-YYYY HH:mm')}{' '}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
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

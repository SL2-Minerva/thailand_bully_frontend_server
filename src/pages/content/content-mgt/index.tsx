import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination
} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Switch from '@mui/material/Switch'
import { ContentLists } from 'src/services/api/content/ContentAPI'
import DialogContents from './DialogContents'
import { PencilOutline } from 'mdi-material-ui'
import { ContentList } from 'src/types/content/ContentType'
import axios from 'axios'
import authConfig from '../../../configs/auth'
import { useRouter } from 'next/router'
import moment from 'moment'

const ContentManagement = () => {
  const router = useRouter()
  const [contentName, setContentName] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [date, setDate] = useState<Date | null>(null)
  const [action, setAction] = useState<string>('create')
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [current, setCurrent] = useState<any>({})
  const [reload, setReload] = useState<boolean>(false)
  const [updateStatus, setUpdateStatus] = useState<boolean>(false)
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState<number>(0)

  const params = {
    date: date ? moment(date)?.format('YYYY-MM-DD') : '',
    status: status,
    title: contentName,
    content_id: content, 
    page: page, 
    limit: 10
  }
  const { resultContents, total, errorCampaiganList } = ContentLists(params, reload)

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const handleCotent = useCallback((e: SelectChangeEvent) => {
    setContent(e.target.value)
  }, [])

  const handleChange = (index: number, i: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const values = [...resultContents]
    values[index].status = event.target.checked

    axios.post(
      authConfig.updateContent,
      { id: i, status: event.target.checked, title: values[index].title, content_text: values[index].content_text },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
        }
      }
    )
    setUpdateStatus(!updateStatus)
  }

  function handleEdit(i: number) {
    setAction('edit')
    setShowEdit(true)
    setCurrent(resultContents[i])
  }

  const toggleCreate = () => {
    setAction('create')
    setShowCreate(!showCreate)
  }

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  useEffect(() => {
    if (total > 0) {
      setPageCount(Math.ceil(total / 10))
    }
  }, [total])

  useEffect(() => {
    setReload(!reload)
  }, [showEdit, showCreate, updateStatus])

  useEffect(() => {
    if (errorCampaiganList) {
      window.localStorage.removeItem('userData')
      window.localStorage.removeItem(authConfig.storageTokenKeyName)
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorCampaiganList])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Content Management' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Content #ID </InputLabel>
                  <Select
                    fullWidth
                    value={content}
                    id='select-content'
                    label='Select content'
                    labelId='content-select'
                    onChange={handleCotent}
                    inputProps={{ placeholder: 'Select content' }}
                  >
                    <MenuItem value=''>
                      <span>ALL</span>
                    </MenuItem>
                    <MenuItem value='1'>Content 1</MenuItem>
                    <MenuItem value='2'>Content 2</MenuItem>
                    <MenuItem value='3'>Content 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id='contentName'
                    label='Content Topic'
                    value={contentName}
                    onChange={e => {
                      setContentName(e.target.value)
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
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
                    <MenuItem value='1'>Active</MenuItem>
                    <MenuItem value='0'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={6} mt={2}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label='Date'
                      value={date}
                      onChange={newValue => setDate(newValue)}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12} mt={2}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button
                    sx={{ mb: 2 }}
                    onClick={() => {
                      console.log('search')
                    }}
                    variant='contained'
                  >
                    search
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
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
                    <TableCell>ID</TableCell>
                    <TableCell>Topic</TableCell>
                    <TableCell>Content</TableCell>
                    <TableCell>Picture</TableCell>
                    <TableCell align='center'>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align='center'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultContents &&
                    resultContents.map((contentList: ContentList, index: number) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-of-type td, &:last-of-type th': {
                            border: 0
                          }
                        }}
                      >
                        <TableCell>{index + 1 + page * 10}</TableCell>
                        <TableCell>
                          <div dangerouslySetInnerHTML={{ __html: contentList.title }} />
                        </TableCell>
                        <TableCell>
                          <div dangerouslySetInnerHTML={{ __html: contentList.content_text || '-' }} />
                        </TableCell>
                        <TableCell>{contentList.picture || '-'}</TableCell>
                        <TableCell align='center'>
                          <Switch
                            key={index}
                            checked={contentList.status === 1 ? true : contentList.status ? true : false}
                            onChange={e => handleChange(index, contentList.id, e)}
                          />
                        </TableCell>
                        <TableCell>{contentList.date}</TableCell>
                        <TableCell align='center'>
                          <a href='#' style={{ color: 'grey' }}>
                            <PencilOutline
                              onClick={() => {
                                handleEdit(index)
                              }}
                            />
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
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

        <DialogContents
          show={action === 'create' ? showCreate : showEdit}
          setShow={action === 'create' ? setShowCreate : setShowEdit}
          action={action}
          current={current}
        />
      </Grid>
    </Grid>
  )
}

export default ContentManagement

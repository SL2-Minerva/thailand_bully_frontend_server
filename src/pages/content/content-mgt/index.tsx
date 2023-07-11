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
import { ContentDelete, ContentLists } from 'src/services/api/content/ContentAPI'
import DialogContents from './DialogContents'
import { PencilOutline, TrashCanOutline } from 'mdi-material-ui'
import { ContentList } from 'src/types/content/ContentType'
import axios from 'axios'
import authConfig from '../../../configs/auth'
import { useRouter } from 'next/router'
import moment from 'moment'
import { UserPermission } from 'src/services/api/users/role'
import Swal from 'sweetalert2'
import 'react-quill/dist/quill.bubble.css'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p> })

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
  const { resultPermission, errorUserPermission, resultIsAdmin } = UserPermission()
  const { removeContent } = ContentDelete()

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
    setPage(0)
  }, [date, status, contentName, content])

  useEffect(() => {
    if (errorCampaiganList || errorUserPermission) {
      window.localStorage.removeItem('userData')
      window.localStorage.removeItem(authConfig.storageTokenKeyName)
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorCampaiganList, errorUserPermission])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Content Management' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Contents</InputLabel>
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
                    <MenuItem value='1'>News</MenuItem>
                    <MenuItem value='2'>Announcement</MenuItem>
                    <MenuItem value='3'>Content</MenuItem>
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
              {resultPermission?.content_mgt?.authorized_create || resultIsAdmin ? (
                <Box
                  sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}
                >
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button sx={{ mb: 2 }} onClick={toggleCreate} variant='contained'>
                      Add
                    </Button>
                  </Box>
                </Box>
              ) : (
                ''
              )}

              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Topic</TableCell>
                    <TableCell>Content</TableCell>
                    <TableCell>Picture</TableCell>
                    <TableCell align='center'>Status</TableCell>
                    <TableCell>Date</TableCell>
                    {resultPermission?.content_mgt?.authorized_edit || resultIsAdmin ? (
                      <TableCell align='center'>Action</TableCell>
                    ) : (
                      ''
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultContents &&
                    resultContents.map((contentList: ContentList, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1 + page * 10}</TableCell>
                        <TableCell>
                          {/* <div dangerouslySetInnerHTML={{ __html:  }} /> */}
                          <ReactQuill value={contentList.title || '-'} readOnly={true} theme='bubble' style={{maxWidth: '300px'}} /> 
                        </TableCell>
                        <TableCell>
                          <ReactQuill value={contentList.content_text || '-'} readOnly={true} theme='bubble' style={{maxWidth: '330px'}} /> 
                        </TableCell>
                        <TableCell>
                          {contentList.picture ? (
                            <Box sx={{ height: '200px', marginLeft: '1rem' }}>
                              <img
                                style={{ width: 150, height: 150 }}
                                alt='Image'
                                src={'https://cornea-analysis.com/storage/' + contentList.picture}
                              />
                            </Box>
                          ) : (
                            '-'
                          )}
                        </TableCell>

                        {resultPermission?.content_mgt?.authorized_edit || resultIsAdmin ? (
                          <>
                            <TableCell align='center'>
                              <Switch
                                key={index}
                                checked={contentList.status === 1 ? true : contentList.status ? true : false}
                                onChange={e => handleChange(index, contentList.id, e)}
                              />
                            </TableCell>
                          </>
                        ) : (
                          <TableCell align='center'>
                            <Switch
                              key={index}
                              checked={contentList.status === 1 ? true : contentList.status ? true : false}
                            />
                          </TableCell>
                        )}
                        <TableCell sx={{ minWidth: 130 }}>{contentList.date}</TableCell>
                        {resultPermission?.content_mgt?.authorized_edit || resultIsAdmin ? (
                          <>
                            <TableCell align='center' sx={{ minWidth: 120 }}>
                              <a href='#' style={{ color: 'grey' }}>
                                <PencilOutline
                                  onClick={() => {
                                    handleEdit(index)
                                  }}
                                />
                              </a>
                              <a href='#' style={{ color: 'grey', marginLeft: '5px' }}>
                                <TrashCanOutline
                                  onClick={() => {
                                    Swal.fire({
                                      title: 'Are you sure?',
                                      text: "You won't be able to revert this!",
                                      icon: 'warning',
                                      showCancelButton: true,
                                      confirmButtonColor: '#3085d6',
                                      cancelButtonColor: '#d33',
                                      confirmButtonText: 'Yes, delete it!'
                                    })
                                      .then(result => {
                                        if (result.isConfirmed) {
                                          removeContent(contentList.id)
                                            .then(result => {
                                              if (result) {
                                                setReload(!reload)
                                                Swal.fire('Deleted!', 'Your content has been deleted.', 'success')
                                              } else {
                                                Swal.fire('Somenthing went wrong!', 'Please try again.', 'error')
                                              }
                                            })
                                            .catch(ex => {
                                              if (ex) {
                                                Swal.fire(
                                                  'Somenthing went wrong!',
                                                  ex?.message ? ex?.message : 'Please try again.',
                                                  'error'
                                                )
                                              }
                                            })
                                        }
                                      })
                                      .catch(ex => {
                                        if (ex) {
                                          Swal.fire('Somenthing went wrong!', 'Please try again.', 'error')
                                        }
                                      })
                                  }}
                                />
                              </a>
                            </TableCell>
                          </>
                        ) : (
                          ''
                        )}
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

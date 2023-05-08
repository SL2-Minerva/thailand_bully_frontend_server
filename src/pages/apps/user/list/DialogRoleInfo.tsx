// ** React Imports
import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Autocomplete from '@mui/material/Autocomplete'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import axios from 'axios'
import authConfig from '../../../../configs/auth'
import { ReportListPermission } from 'src/services/api/users/role'
import { FormControl, FormControlLabel, FormHelperText, Switch } from '@mui/material'

// import { ReportOptions } from 'src/utils/const'

interface DialogRoleInfoProps {
  show: boolean
  setShow: any
  action: string
  current?: any
  tableData?: any
  table?: any
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const getReportIds = (data: any) => {
  if (data && data?.length === 0) return []

  const reportIds: any[] = []
  if (data?.length > 0) {
    for (let i = 0; i < data?.length; i++) {
      reportIds.push(data[i]?.id)
    }
  }

  return reportIds
}

const DialogRoleInfo = (props: DialogRoleInfoProps) => {
  const { show, setShow, action, current } = props

  const [roleName, setRoleName] = useState(current?.user_role_name ?? '')
  const [roleDescription, setDescription] = useState(current?.user_role_description ?? '')
  const [reportIds, setReportIds] = useState<any[]>()
  const { resultReportChartList } = ReportListPermission()
  const defaultValue: any[] = []
  const [errorRoleName, setErrorRoleName] = useState<boolean>(false)
  const [errorDescription, setErrorDescription] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean | number>(false)

  const [permission, setPermission] = useState<any>({
    user: {
      authorized_create: true,
      authorized_edit: true,
      authorized_delete: true,
      authorized_view: true,
      authorized_export: true
    },
    user_role: {
      authorized_create: true,
      authorized_edit: true,
      authorized_delete: true,
      authorized_view: true,
      authorized_export: true
    },
    organized_mgt: {
      authorized_create: true,
      authorized_edit: true,
      authorized_delete: true,
      authorized_view: true,
      authorized_export: true
    },
    organized_type_mgt: {
      authorized_create: true,
      authorized_edit: true,
      authorized_delete: true,
      authorized_view: true,
      authorized_export: true
    },
    organized_group_mgt: {
      authorized_create: true,
      authorized_edit: true,
      authorized_delete: true,
      authorized_view: true,
      authorized_export: true
    },
    campaign: {
      authorized_create: true,
      authorized_edit: true,
      authorized_delete: true,
      authorized_view: true,
      authorized_export: true
    },
    dashboard: {
      authorized_create: true,
      authorized_edit: true,
      authorized_delete: true,
      authorized_view: true,
      authorized_export: true
    },
    report: {
      authorized_create: true,
      authorized_edit: true,
      authorized_delete: true,
      authorized_view: true,
      authorized_export: true
    },
    activity_log: {
      authorized_create: false,
      authorized_edit: false,
      authorized_delete: false,
      authorized_view: false,
      authorized_export: false
    },
    sna_by_sentiment: {
      authorized_create: false,
      authorized_edit: false,
      authorized_delete: false,
      authorized_view: false,
      authorized_export: false
    },
    sna_by_bully_type: {
      authorized_create: false,
      authorized_edit: false,
      authorized_delete: false,
      authorized_view: false,
      authorized_export: false
    },
    sna_by_bully_level: {
      authorized_create: false,
      authorized_edit: false,
      authorized_delete: false,
      authorized_view: false,
      authorized_export: false
    },
    corpus: {
      authorized_create: false,
      authorized_edit: false,
      authorized_delete: false,
      authorized_view: false,
      authorized_export: false
    }
  })

  if (current?.authorized_report && current?.authorized_report?.length > 0) {
    const reports = current?.authorized_report
    const reportTitleIds: any[] = []
    for (let i = 0; i < reports?.length; i++) {
      const reportId = parseInt(reports[i]) - 1
      reportTitleIds.push(reportId)
    }

    ;(reportTitleIds || []).map(value => {
      defaultValue.push(resultReportChartList[value])
    })
  }

  useEffect(() => {
    setRoleName(current?.user_role_name ?? '')
    setDescription(current?.user_role_description ?? '')
    setErrorDescription(false)
    setErrorRoleName(false)
    setIsAdmin(current?.is_admin ?? false)

    if (action === 'edit') {
      setReportIds(defaultValue)
      if (current?.permission) {
        setPermission(current?.permission)
        const permissions = current?.permission

        if (!permissions?.user_role) {
          permissions.user_role = {
            authorized_create: true,
            authorized_edit: true,
            authorized_delete: true,
            authorized_view: true,
            authorized_export: true
          }
        }

        if (!permissions?.organized_mgt) {
          permissions.organized_mgt = {
            authorized_create: true,
            authorized_edit: true,
            authorized_delete: true,
            authorized_view: true,
            authorized_export: true
          }
        }

        if (!permissions?.organized_type_mgt) {
          permissions.organized_type_mgt = {
            authorized_create: true,
            authorized_edit: true,
            authorized_delete: true,
            authorized_view: true,
            authorized_export: true
          }
        }

        if (!permissions?.organized_group_mgt) {
          permissions.organized_group_mgt = {
            authorized_create: true,
            authorized_edit: true,
            authorized_delete: true,
            authorized_view: true,
            authorized_export: true
          }
        }

        if (!permissions?.activity_log) {
          permissions.activity_log = {
            authorized_create: false,
            authorized_edit: false,
            authorized_delete: false,
            authorized_view: false,
            authorized_export: false
          }
        }

        if (!permissions?.sna_by_bully_level) {
          permissions.sna_by_bully_level = {
            authorized_create: false,
            authorized_edit: false,
            authorized_delete: false,
            authorized_view: false,
            authorized_export: false
          }
        }

        if (!permissions?.sna_by_bully_type) {
          permissions.sna_by_bully_type = {
            authorized_create: false,
            authorized_edit: false,
            authorized_delete: false,
            authorized_view: false,
            authorized_export: false
          }
        }

        if (!permissions?.sna_by_sentiment) {
          permissions.sna_by_sentiment = {
            authorized_create: false,
            authorized_edit: false,
            authorized_delete: false,
            authorized_view: false,
            authorized_export: false
          }
        }

        if (!permissions?.corpus) {
          permissions.corpus = {
            authorized_create: false,
            authorized_edit: false,
            authorized_delete: false,
            authorized_view: false,
            authorized_export: false
          }
        }
      } else {
        setPermission({
          user: {
            authorized_create: true,
            authorized_edit: true,
            authorized_delete: true,
            authorized_view: true,
            authorized_export: true
          },
          user_role: {
            authorized_create: true,
            authorized_edit: true,
            authorized_delete: true,
            authorized_view: true,
            authorized_export: true
          },
          organized_mgt: {
            authorized_create: true,
            authorized_edit: true,
            authorized_delete: true,
            authorized_view: true,
            authorized_export: true
          },
          organized_type_mgt: {
            authorized_create: true,
            authorized_edit: true,
            authorized_delete: true,
            authorized_view: true,
            authorized_export: true
          },
          organized_group_mgt: {
            authorized_create: true,
            authorized_edit: true,
            authorized_delete: true,
            authorized_view: true,
            authorized_export: true
          },
          campaign: {
            authorized_create: true,
            authorized_edit: true,
            authorized_delete: true,
            authorized_view: true,
            authorized_export: true
          },
          dashboard: {
            authorized_create: true,
            authorized_edit: true,
            authorized_delete: true,
            authorized_view: true,
            authorized_export: true
          },
          report: {
            authorized_create: true,
            authorized_edit: true,
            authorized_delete: true,
            authorized_view: true,
            authorized_export: true
          },
          activity_log: {
            authorized_create: false,
            authorized_edit: false,
            authorized_delete: false,
            authorized_view: false,
            authorized_export: false
          },
          sna_by_sentiment: {
            authorized_create: false,
            authorized_edit: false,
            authorized_delete: false,
            authorized_view: false,
            authorized_export: false
          },
          sna_by_bully_type: {
            authorized_create: false,
            authorized_edit: false,
            authorized_delete: false,
            authorized_view: false,
            authorized_export: false
          },
          sna_by_bully_level: {
            authorized_create: false,
            authorized_edit: false,
            authorized_delete: false,
            authorized_view: false,
            authorized_export: false
          },
          corpus: {
            authorized_create: false,
            authorized_edit: false,
            authorized_delete: false,
            authorized_view: false,
            authorized_export: false
          }
        })
      }
    } else {
      setPermission({
        user: {
          authorized_create: true,
          authorized_edit: true,
          authorized_delete: true,
          authorized_view: true,
          authorized_export: true
        },
        user_role: {
          authorized_create: true,
          authorized_edit: true,
          authorized_delete: true,
          authorized_view: true,
          authorized_export: true
        },
        organized_mgt: {
          authorized_create: true,
          authorized_edit: true,
          authorized_delete: true,
          authorized_view: true,
          authorized_export: true
        },
        organized_type_mgt: {
          authorized_create: true,
          authorized_edit: true,
          authorized_delete: true,
          authorized_view: true,
          authorized_export: true
        },
        organized_group_mgt: {
          authorized_create: true,
          authorized_edit: true,
          authorized_delete: true,
          authorized_view: true,
          authorized_export: true
        },
        campaign: {
          authorized_create: true,
          authorized_edit: true,
          authorized_delete: true,
          authorized_view: true,
          authorized_export: true
        },
        dashboard: {
          authorized_create: true,
          authorized_edit: true,
          authorized_delete: true,
          authorized_view: true,
          authorized_export: true
        },
        report: {
          authorized_create: true,
          authorized_edit: true,
          authorized_delete: true,
          authorized_view: true,
          authorized_export: true
        },
        activity_log: {
          authorized_create: false,
          authorized_edit: false,
          authorized_delete: false,
          authorized_view: false,
          authorized_export: false
        },
        sna_by_sentiment: {
          authorized_create: false,
          authorized_edit: false,
          authorized_delete: false,
          authorized_view: false,
          authorized_export: false
        },
        sna_by_bully_type: {
          authorized_create: false,
          authorized_edit: false,
          authorized_delete: false,
          authorized_view: false,
          authorized_export: false
        },
        sna_by_bully_level: {
          authorized_create: false,
          authorized_edit: false,
          authorized_delete: false,
          authorized_view: false,
          authorized_export: false
        },
        corpus: {
          authorized_create: false,
          authorized_edit: false,
          authorized_delete: false,
          authorized_view: false,
          authorized_export: false
        }
      })
    }
  }, [current])

  const handleChangeAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.checked ? 1 : 0)
  }

  const handleSubmit = () => {
    if (roleName && roleDescription) {
      if (action === 'create') {
        axios
          .post(
            authConfig.createRole,
            {
              role_name: roleName,
              role_description: roleDescription,
              permission: permission,
              authorized_report: getReportIds(reportIds),
              is_admin: isAdmin
            },
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
              }
            }
          )
          .then(() => {
            // console.log('res', res)
            onClose()

            // setShow(false);
          })
      } else {
        axios
          .put(
            authConfig.updateRole,
            {
              id: current?.id,
              role_name: roleName,
              role_description: roleDescription,
              permission: permission,
              authorized_report: getReportIds(reportIds),
              status: current?.status,
              is_admin: isAdmin
            },
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
              }
            }
          )
          .then(() => {
            // console.log('res', res)
            onClose()

            // setShow(false)
          })
      }
    } else {
      if (!roleName) {
        setErrorRoleName(true)
      }

      if (!roleDescription) {
        setErrorDescription(true)
      }
    }
  }

  const handleChecked = (e: any, row: any, key: any) => {
    let permissionNew = permission

    permissionNew = {
      ...permissionNew,
      [row.toLowerCase()]: { ...permissionNew[row.toLowerCase()], [`authorized_${key}`]: e.target.checked }
    }
    setPermission(permissionNew)
  }

  const onClose = () => {
    setShow(false)
    setReportIds([])
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={onClose}
        TransitionComponent={Transition}
        onBackdropClick={onClose}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              {action === 'edit' ? 'Edit Role ' : 'Create New Role'}
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label='Role Name'
                placeholder='Role Name'
                value={roleName}
                onChange={e => {
                  setRoleName(e.target.value)
                  if (!e.target.value) {
                    setErrorRoleName(true)
                  } else {
                    setErrorRoleName(false)
                  }
                }}
                error={errorRoleName ? true : false}
              />
              {errorRoleName && <FormHelperText sx={{ color: 'error.main' }}>Role Name is required</FormHelperText>}
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label='Description'
                placeholder='description'
                value={roleDescription}
                onChange={e => {
                  setDescription(e.target.value)
                  if (!e.target.value) {
                    setErrorDescription(true)
                  } else {
                    setErrorDescription(false)
                  }
                }}
                error={errorDescription ? true : false}
              />
              {errorDescription && (
                <FormHelperText sx={{ color: 'error.main' }}>Description is required</FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Menu Authorized</TableCell>
                      <TableCell align='left'>Create</TableCell>
                      <TableCell align='left'>Edit</TableCell>
                      <TableCell align='left'>View</TableCell>
                      <TableCell align='left'>Export</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {permission &&
                      Object.keys(permission).map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component='th' scope='row'>
                            {row}
                          </TableCell>
                          <TableCell align='left'>
                            <Checkbox
                              checked={
                                permission[row].authorized_create === 1
                                  ? true
                                  : permission[row].authorized_create
                                  ? true
                                  : false
                              }
                              onChange={e => handleChecked(e, row, 'create')}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </TableCell>
                          <TableCell align='left'>
                            <Checkbox
                              checked={
                                permission[row].authorized_edit === 1
                                  ? true
                                  : permission[row].authorized_edit
                                  ? true
                                  : false
                              }
                              onChange={e => handleChecked(e, row, 'edit')}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </TableCell>
                          <TableCell align='left'>
                            <Checkbox
                              checked={
                                permission[row].authorized_view === 1
                                  ? true
                                  : permission[row].authorized_view
                                  ? true
                                  : false
                              }
                              onChange={e => handleChecked(e, row, 'view')}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </TableCell>
                          <TableCell align='left'>
                            <Checkbox
                              checked={
                                permission[row].authorized_export === 1
                                  ? true
                                  : permission[row].authorized_export
                                  ? true
                                  : false
                              }
                              onChange={e => handleChecked(e, row, 'export')}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                disableCloseOnSelect
                multiple
                id='autocomplete-grouped'
                groupBy={resultReportChartList => resultReportChartList?.groupName}
                getOptionLabel={resultReportChartList => resultReportChartList?.title}
                renderInput={params => <TextField {...params} label='Reports' />}
                options={resultReportChartList}
                value={reportIds}
                onChange={(event: any, newValue: any) => {
                  setReportIds(newValue)
                }}
                defaultValue={defaultValue}
              />
            </Grid>

            <Grid item sm={6} xs={12} mt={3}>
              <FormControl>
                <FormControlLabel
                  control={<Switch checked={isAdmin == 1 ? true : false} onChange={handleChangeAdmin} />}
                  label='Is Admin ? '
                  labelPlacement='start'
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleSubmit()}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={onClose}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogRoleInfo

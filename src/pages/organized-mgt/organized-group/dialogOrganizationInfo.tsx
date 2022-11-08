// ** React Imports
import { Ref, forwardRef, ReactElement, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select  from '@mui/material/Select'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import SourceList from 'src/services/api/source/SourceApi'
import DomainList from 'src/services/api/domains/DomainAPI'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FormHelperText from '@mui/material/FormHelperText'
import axios from 'axios'
import authConfig from '../../../configs/auth'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
  show: boolean
  setShow: any
  action: string
  current?: any
}



const DialogOrganizationInfo = (props: DialogInfoProps) => {
  const { show, setShow, action, current } = props;
  console.log(current);

  const { result_domain_list } = DomainList()

  const { result_source_list } = SourceList()



  useEffect(() => {
    setValue('organization_group_description', current?.organization_group_description || '')
    setValue('organization_group_name', current?.organization_group_name || '')
    setValue('total_keyword', current?.total_keyword || '')
    setValue('keyword_condition', current?.keyword_condition || '')
    setValue('msg_transaction', current?.keyword_condition || '')
    setValue('platform', current?.platform || '')
    setValue('total_user', current?.total_user || 0)

    setValue('domains', current?.domains || [])
    setValue('platform', current?.platform || [])
    setValue('customer_service', current?.customer_service ? true : false)
    setValue('status', current?.status ? true : false )
    if (action === 'edit') {
      setValue('id', current?.id)
    }
  }, [current])

  const schema = yup.object().shape({
    organization_group_name: yup.string().required()
  })

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    shouldUnregister: false,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: any) => {

    if (action === 'create') {
      axios
      .post(authConfig.createOrgGroup, data, {
        headers: {
          Authorization:`Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
        }
      })
      .then(res => {
        console.log('res', res);
        setShow(false);
      });
    } else {
      axios
      .put(authConfig.updateOrgGroup, data, {
        headers: {
          Authorization:`Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
        }
      })
      .then(res => {
        console.log('res', res);
        setShow(false);
      });
    }
  }


  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton
              size='small'
              onClick={() => setShow(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Close />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                {action === 'edit' ? 'Edit Organization Group ' : 'Create Organization Group'}
              </Typography>
            </Box>
            <Grid container spacing={6}>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='organization_group_name'
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        value={value}
                        onBlur={onBlur}
                        label='Organization Type'
                        onChange={onChange}
                        placeholder='Organization Type'
                        error={errors?.organization_group_name ? true : false}
                      />
                    )}
                  />
                  {errors.organization_group_name && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.organization_group_name.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='organization_group_description'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={value}
                        label='description'
                        onChange={onChange}
                        placeholder='description'
                        error={errors?.organization_group_description ? true : false}
                      />
                    )}
                  />
                  {errors.organization_group_description && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.organization_group_description.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='organization_group_description'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Number of Keyword'
                        type='number'
                        onChange={onChange}
                        placeholder='Number of Keyword'
                        error={errors?.organization_group_description ? true : false}
                      />
                    )}
                  />
                  {errors.organization_group_description && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.organization_group_description.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {/* <Grid item sm={12} xs={12}>
              <FormControl fullWidth>
                <Typography>Keyword Condition</Typography>
                    <RadioGroup row aria-label='controlled' name='controlled' value={value} onChange={handleChange}>
                    <FormControlLabel value='controlled-checked' control={<Radio />} label='Include/Exclude' />
                    <FormControlLabel value='controlled-unchecked' control={<Radio />} label='none' />
                </RadioGroup>
              </FormControl>
            </Grid> */}
              <Grid item sm={12} xs={12}>
                <Controller
                  name='msg_transaction'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Number of Message Transaction'
                      type='number'
                      fullWidth
                      onChange={onChange}
                      placeholder='Number of Message Transaction'
                      error={errors?.msg_transaction ? true : false}
                    />
                  )}
                />
                {errors.msg_transaction && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.msg_transaction.message}</FormHelperText>
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                <Typography sx={{ mb: 2, fontWeight: 500 }}>Domains</Typography>
                <FormControl fullWidth>
                  <InputLabel id='demo-multiple-name-label'>Domain</InputLabel>

                  <Controller
                    name='domains'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        displayEmpty
                        value={value}
                        multiple
                        label='Domain'
                        onChange={onChange}
                        name='domains'
                        id='demo-multiple-name'
                        labelId='demo-multiple-name-label'
                      >
                        {result_domain_list &&
                          result_domain_list.map((domain: any) => (
                            <MenuItem key={domain.id} value={domain.name}>
                              {domain.name}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Typography sx={{ mb: 2, fontWeight: 500 }}>Social Visualization</Typography>
                <FormControl fullWidth>
                  <InputLabel id='demo-multiple-name-label'>Platform</InputLabel>
                  <Controller
                    name='platform'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        displayEmpty
                        value={value}
                        multiple
                        label='platform'
                        onChange={onChange}
                        name='platform'
                        id='demo-multiple-name'
                        labelId='demo-multiple-name-label'
                      >
                        {result_source_list &&
                          result_source_list.map((sns_platform: any) => (
                            <MenuItem key={sns_platform.id} value={sns_platform.name}>
                              {sns_platform.name}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item sm={12} xs={12}>
                <Controller
                  name='total_user'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Number of Users'
                      type='number'
                      fullWidth
                      onChange={onChange}
                      placeholder='Number of Users'
                      error={errors?.total_user ? true : false}
                    />
                  )}
                />
                {errors.total_user && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.total_user.message}</FormHelperText>
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <Typography>Customer Services</Typography>
                  <Controller
                    name='customer_service'
                    control={control}
                    render={({ field: { value, onChange } }) => {

                      return(
                        <RadioGroup row aria-label='controlled' name='controlled' value={value} onChange={onChange}>
                          <FormControlLabel value={true}control={<Radio />} label='Customer Service' />
                          <FormControlLabel value={false} control={<Radio />} label='None' />
                        </RadioGroup>
                      )
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl>
                  <Controller
                    name='status'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <FormControlLabel
                        name={'status'}
                        control={<Switch checked={value} onChange={onChange} />}
                        label='Status : '
                        labelPlacement='start'
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
              Discard
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Card>
  )
}

export default DialogOrganizationInfo

import { Ref, useState, forwardRef, ReactElement,SyntheticEvent, useEffect  } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography, { TypographyProps } from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import { styled } from '@mui/material/styles'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import { EditorState } from 'draft-js'

// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

interface DialogInfoProps {
  show: boolean
  setShow: any
  action: string
  current?: any
  table?: any
}

const DialogContents = (props: DialogInfoProps) => {
  const { show, setShow, action, current } = props

  const [date, setDate] = useState<Date | null>(new Date())

  const [contentName, setContentName] = useState<string>('')
  const [topic, setTopic] = useState<string>('')
  const [description, setDescription] = useState(EditorState.createEmpty())

  // ** State
  const [files, setFiles] = useState<File[]>([])

  // ** Hook
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const handleLinkClick = (event: SyntheticEvent) => {
    event.preventDefault()
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
  }

  const img = files.map((file: FileProp) => (
    <div key={file.name} style={{ display: 'flex', justifyContent:'center' }}>
      <img key={file.name} alt={file.name} style={{ width: 400, height: 300 }} src={URL.createObjectURL(file as any)} />
      <IconButton onClick={() => handleRemoveFile(file)} size="small">
          <Close fontSize='large'/>
      </IconButton>
    </div>
  ))

  function handleContentName(event: any) {
    setContentName(event.target.value)
  }

  function handleTopic(event: any) {
    setTopic(event.target.value)
  }

  function closeDialogBox() {
    setShow(false)
    setFiles([])
    acceptedFiles.length = 0
  }

  useEffect(() => {
    if (action === 'edit') {
      if (current) {
        
        setContentName(current.content_name)
        setDescription(current.description)
        setDate(new Date(current.date))
        setTopic(current.topic)
      }  
    } else { 
      setContentName('');
      setDescription(EditorState.createEmpty());
      setTopic('');
      setDate(null);
    }
  },[current, action])

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={closeDialogBox}
        TransitionComponent={Transition}
        onBackdropClick={closeDialogBox}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={closeDialogBox} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              {action === 'edit' ? 'Edit Content Information ' : 'Create Content Information'}
            </Typography>
          </Box>
          <div id={`content-master`}>
            <Grid container spacing={6}>
              <Grid item sm={12} xs={12}>
                <TextField
                  fullWidth
                  label='Topic'
                  value={topic}
                  onChange={handleTopic}
                  placeholder=''
                />
              </Grid>

              <Grid item sm={12} xs={12}>
                <TextField
                  fullWidth
                  label='Campaign Name'
                  value={contentName}
                  onChange={handleContentName}
                  placeholder=''
                />
              </Grid>
              <Grid item sm={12} xs={12} mt={4} style={{ border: '1px solid #4c4e6430', borderRadius: '1.3rem', marginLeft: '1.2rem' }}>
                <InputLabel> Description </InputLabel>
                <ReactDraftWysiwyg editorState={description} onEditorStateChange={data => setDescription(data)} />
              </Grid>

              <Grid item sm={12} xs={12}  mt={4} style={{ border: '1px solid #4c4e6430', borderRadius: '1.3rem', marginLeft: '1.2rem' }}>
                <Box {...getRootProps({ className: 'dropzone' })} sx={acceptedFiles.length ? { height: 320 } : {}}>
                    <input {...getInputProps()} />
                    {files.length ? (
                      img
                    ) : (
                    <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                      <Img width={200} alt='Upload img' src='/images/misc/upload.png' />
                      <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                        <HeadingTypography variant='h5'>Drop image file here or click to upload.</HeadingTypography>
                        <Typography color='textSecondary'>
                          Drop image file here or click{' '}
                          <Link href='/' onClick={handleLinkClick}>
                            browse
                          </Link>{' '}
                          thorough your machine
                        </Typography>
                        <Typography color='textSecondary'>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>
              
              <Grid item sm={6} xs={12} mt={3}>
                <FormControl>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label='Content Status : '
                    labelPlacement='start'
                  />
                </FormControl>

              
              </Grid>

              <Grid item sm={6} xs={12}>
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
            </Grid>
          </div>

        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 2 }} onClick={closeDialogBox}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={closeDialogBox}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogContents

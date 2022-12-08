import { Grid, Card, CardHeader, CardContent, FormControl,
     TextField, InputLabel, Select, MenuItem, SelectChangeEvent, Box, 
     Button, TableContainer, Paper, Table, TableHead, TableRow,
     TableCell, TableBody } from '@mui/material'
import React, { useCallback, useState } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Switch from '@mui/material/Switch'
import { ContentLists } from 'src/services/api/content/ContentAPI';
import DialogContents from './DialogContents';
import { PencilOutline } from 'mdi-material-ui';

const ContentManagement = () => {

    const [ contentName, setContentName ] = useState<string>('');
    const [ content, setContent ] = useState<string>('');
    const [ status, setStatus ] = useState<string>('');
    const [date, setDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(new Date())
    const [action, setAction] = useState<string>('create')
    const [showCreate, setShowCreate] = useState<boolean>(false)
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [current, setCurrent] = useState<any>({})

    const {resultContents} = ContentLists();

    const handleStatusChange = useCallback((e: SelectChangeEvent) => {
        setStatus(e.target.value)
      }, [])

    const handleCotent = useCallback((e: SelectChangeEvent) => {
        setContent(e.target.value)
      }, [])
    
    const handleChange = (index: number, i: number,event: React.ChangeEvent<HTMLInputElement>) => {
        const values = [...resultContents]
        values[index].status = event.target.checked

        //     setTableData(values)
        //     setReload(!reload)

    };

    function handleEdit(i: number) {
        setAction('edit')
        setShowEdit(true)
        setCurrent(resultContents[i])
    }
    
    const toggleCreate = () => {
        setAction('create')
        setShowCreate(!showCreate)
    }

    return(
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
                                    {/* {list &&
                                        list.map((item: any, index: number) => {
                                        return (
                                            <MenuItem key={index} value={item.id}>
                                            {item.name}
                                            </MenuItem>
                                        )
                                        })} */}
                                        <MenuItem value=""> ALL </MenuItem>
                                        <MenuItem value="1"> content 1 </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <FormControl fullWidth>
                                    <TextField id='contentName' label='Content Name' value={contentName} onChange={(e) =>{setContentName(e.target.value)}} />
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
                                <MenuItem value='2'>Pending</MenuItem>
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
                                    label='Start Date'
                                    value={date}
                                    onChange={newValue => setDate(newValue)}
                                    renderInput={params => <TextField {...params} />}
                                />
                                </LocalizationProvider>
                            </FormControl>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label='End Date'
                                    value={endDate}
                                    onChange={newValue => setEndDate(newValue)}
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
                                <TableCell>Content Name</TableCell>
                                <TableCell>Picture</TableCell>
                                <TableCell align='center'>Status</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell align='center'>Action</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {resultContents && resultContents.map((contentList: any, index: number) => (
                                <TableRow
                                key={index}
                                sx={{
                                    '&:last-of-type td, &:last-of-type th': {
                                    border: 0
                                    }
                                }}
                                >
                                    <TableCell>
                                        {contentList.id}
                                    </TableCell>
                                    <TableCell>
                                        {contentList.topic}
                                    </TableCell>
                                    <TableCell>
                                        {contentList.content_name}
                                    </TableCell>
                                    <TableCell>
                                        {contentList.picture}
                                    </TableCell>
                                    <TableCell align='center'>
                                    <Switch key={index} 
                                    
                                        checked={contentList.status}
                                        onChange={e => handleChange(index, contentList.id, e)}
                                    />
                                    </TableCell>
                                    <TableCell>
                                        {contentList.date}
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

export default ContentManagement;
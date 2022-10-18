// ** React Imports
import { Ref, useState, forwardRef, ReactElement, useCallback, SyntheticEvent, useEffect } from 'react'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import Grid, { GridProps } from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CardContent, { CardContentProps } from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import Repeater from 'src/@core/components/repeater'
import Collapse from '@mui/material/Collapse'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'
import Close from 'mdi-material-ui/Close'
import { RepeaterProps } from 'src/@core/components/repeater/types'


interface KeywordRepeaterProps {
    index: number
}

const KeywordRepeater = (props: RepeaterProps) => {
    const { count, tag, children } = props
        // ** Custom Tag
    const Tag = tag || 'div'

    // ** Default Items
    const items = []

    // ** Loop passed count times and push it in items Array
    for (let i = 0; i < count; i++) {
        items.push(children(i))
    }

    return <Tag {...props}>{items}</Tag>
}

export default KeywordRepeater
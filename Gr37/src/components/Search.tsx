import React, { useState, Fragment } from "react"
import { Select, MenuItem, TextField, Button, Grid, FormControl, InputLabel, Box } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DateRangePicker, DateRange } from '@mui/lab';

export default function Search() {
    const [value, setValue] = useState('');
    const [dates, setDates] = useState<DateRange<Date>>([null, null]);


    const onSearch = () => {
        console.log(dates, value)
    }

    return (
        <Grid
            container
            rowSpacing={1}
            columnSpacing={1}
            justifyContent='center'
            alignItems='center'
            padding={2}>
            <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                    <InputLabel id="select-label">Action</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={value}
                        label="Action"
                        onChange={(event) => {
                            setValue(event.target.value as string)
                        }} >
                        <MenuItem value={'Issues'}>Issues</MenuItem>
                        <MenuItem value={'Commits'}>Commits</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            disableFuture
                            calendars={1}
                            value={dates}
                            onChange={(newValue) => {
                                setDates(newValue);
                            }}
                            renderInput={(startProps, endProps) => (
                                <Fragment >
                                    <TextField fullWidth {...startProps} />
                                    <Box sx={{ mx: 1 }}> to </Box>
                                    <TextField fullWidth {...endProps} />
                                </Fragment>
                            )}
                        />
                    </LocalizationProvider>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={1} marginRight={1}>
                <Button variant="contained" onClick={onSearch}>Search</Button>
            </Grid>
        </Grid>
    )
}
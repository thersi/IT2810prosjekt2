import React, { useState } from "react"
import { Card, Select, MenuItem, SelectChangeEvent, TextField, Button} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/lab';

export default function Search() {
    const [value, setValue] = useState('');
    const [fromDate, setFromDate] = useState<Date | null>(new Date())
    const [toDate, setToDate] = useState<Date | null>(new Date());


    const handleValueChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    }

    const handleFromDateChange = (newValue: Date | null) => {
        if (newValue != null) {
            if (toDate != null && newValue.getTime() <= toDate.getTime()) { 
                setFromDate(newValue);
            }
        console.log(fromDate)
    }
    }

    const handleToDateChange = (newValue: Date | null) => {
        if (newValue != null) {
            if (fromDate != null && newValue.getTime() >= fromDate.getTime()) { 
                setToDate(newValue);
            }
        console.log(toDate)
    }
    }

    const onSearch = () => {
        console.log(fromDate, toDate, value)
    }

    return (
        <Card>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Age"
                onChange={handleValueChange}
            >
                <MenuItem value={'Issues'}>Issues</MenuItem>
                <MenuItem value={'Commits'}>Commits</MenuItem>
            </Select>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="From"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    label="To"
                    value={toDate}
                    onChange={handleToDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button variant="contained" onClick={onSearch}>Search</Button>
        </Card>

    )

}
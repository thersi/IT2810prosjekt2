import React, { useState, Fragment, useEffect, Dispatch } from "react";
import {
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DateRangePicker, DateRange } from "@mui/lab";
import getEvents from "../Backend/api/GithubFetch";

export default function Search({
  setMemberKeys,
  setCommitNumbers,
  setChart,
}: {
  setMemberKeys: Dispatch<React.SetStateAction<string[]>>;
  setCommitNumbers: Dispatch<React.SetStateAction<number[]>>;
  setChart: Dispatch<React.SetStateAction<number>>;
}) {
  const d = localStorage.getItem("dates");
  const v = localStorage.getItem("value");
  const dflt_d = d !== null ? JSON.parse(d) : [null, null];
  const dflt_v = v !== null ? JSON.parse(v) : "";
  const [dates, setDates] = useState<DateRange<Date>>(dflt_d);
  const [value, setValue] = useState<string>(dflt_v);

  useEffect(() => {
    localStorage.setItem("dates", JSON.stringify(dates));
    localStorage.setItem("value", JSON.stringify(value));
  }, [dates, value]);

  const onSearch = () => {
    if (value === "Commits") {
      setChart(1);
    } else if (value === "Issues") {
      setChart(2);
    } else {
      setChart(0);
    }
    setMemberKeys(memberKeys);
    setCommitNumbers(commitNumbers);
  };
  const [getData, setData] = useState<any>([]);
  const fetchData = async () => {
    setData(await getEvents());
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (getData === undefined || getData.length === 0) {
    return <div>Loading....</div>;
  }

  let mergeMembers = new Map();
  const commits = getData
    .filter(
      (data: any) =>
        new Date(data.created_at).getTime() >= new Date(dates[0]!).getTime() &&
        new Date(data.created_at).getTime() <= new Date(dates[1]!).getTime()
    )
    .forEach((element: any) => {
      let member = element.author_username;
      mergeMembers.has(member)
        ? mergeMembers.set(
            member,
            mergeMembers.get(member) + element.push_data.commit_count
          )
        : mergeMembers.set(member, 1);
    });

  let memberKeys: any = Array();
  let commitNumbers: any = Array();

  //const [memberKeys, setMemberKeys] = useState<string[]>([]);
  //const [commitNumbers, setCommitNumbers] = useState<number[]>([]);

  mergeMembers.forEach((value: any, key: string) => {
    // let mk = memberKeys
    // mk.push(key)
    // setMemberKeys(mk);
    // let cm = commitNumbers
    // cm.push(value)
    // setCommitNumbers(cm);
    memberKeys.push(key);
    commitNumbers.push(value);
  });

  // console.log(memberKeys);
  // console.log(commitNumbers);

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={1}
      justifyContent="center"
      alignItems="center"
      padding={2}
    >
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel id="select-label">Action</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={value}
            label="Action"
            onChange={(event) => {
              setValue(event.target.value as string);
            }}
          >
            <MenuItem value={"Issues"}>Issues</MenuItem>
            <MenuItem value={"Commits"}>Commits</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              disableFuture
              calendars={1}
              value={dates}
              onChange={(newValue) => {
                setDates(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <Fragment>
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
        <Button variant="contained" onClick={onSearch}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
}

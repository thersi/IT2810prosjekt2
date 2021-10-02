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
import getEvents, { getMerge } from "../Backend/api/GithubFetch";
import { Merge, Event } from "../Models/event";
import { getDate } from "date-fns";

const getDateTimeFix = (date: Date): number => {
  return new Date(date).getTime();
};

type DateFilter = (merge_data: Merge) => boolean;
const makeFilter = (start_date: Date, end_date: Date): DateFilter => {
  const start_time = getDateTimeFix(start_date);
  const end_time = getDateTimeFix(end_date);
  console.log(start_time);
  console.log(end_time);
  return (data: Merge) =>
    getDateTimeFix(data.created_at) >= start_time &&
    getDateTimeFix(data.created_at) <= end_time;
};

const Search = ({
  setXAxis,
  setYAxis,
  setChart,
}: {
  setXAxis: Dispatch<React.SetStateAction<string[]>>;
  setYAxis: Dispatch<React.SetStateAction<number[]>>;
  setChart: Dispatch<React.SetStateAction<number>>;
}) => {
  const d = localStorage.getItem("dates");
  const v = localStorage.getItem("value");
  const dflt_d = d !== null ? JSON.parse(d) : [null, null];
  const dflt_v = v !== null ? JSON.parse(v) : "";
  const [dates, setDates] = useState<DateRange<Date>>(dflt_d);
  const [value, setValue] = useState<string>(dflt_v);
  const [eventsLoaded, setEventsLoaded] = useState<boolean>(false);
  const [mergesLoaded, setMergesLoaded] = useState<boolean>(false);

  const [xAxisCommits, setXAxisCommits] = useState<string[]>([]);
  const [yAxisCommits, setYAxisCommits] = useState<number[]>([]);
  const [xAxisMerges, setXAxisMerges] = useState<string[]>([]);
  const [yAxisMerges, setYAxisMerges] = useState<number[]>([]);

  useEffect(() => {
    localStorage.setItem("dates", JSON.stringify(dates));
    localStorage.setItem("value", JSON.stringify(value));
  }, [dates, value]);

  const onSearch = () => {
    if (value === "Commits") {
      console.log("y commit: ", yAxisCommits);
      console.log("x commits: ", xAxisCommits);
      setXAxis(xAxisCommits);
      setYAxis(yAxisCommits);
      setChart(1);
    } else if (value === "Issues") {
      console.log("y merge: ", yAxisMerges);
      console.log("x merge: ", xAxisMerges);
      setXAxis(xAxisMerges);
      setYAxis(yAxisMerges);
      setChart(2);
    } else {
      setChart(0);
    }
  };

  //
  useEffect(() => {
    getEvents().then((events) => {
      let commitMembers = new Map();
      events
        .filter(makeFilter(dates[0]!, dates[1]!))
        .forEach((element: Event) => {
          let member = element.author.id;
          if (commitMembers.has(member)) {
            commitMembers.set(
              member,
              commitMembers.get(member) + element.push_data.commit_count
            );
          } else {
            commitMembers.set(member, 1);
          }
        });
      let memberKeys: string[] = [];
      let commitNumbers: number[] = [];
      commitMembers.forEach((value: number, key: string) => {
        memberKeys.push(key);
        commitNumbers.push(value);
      });

      setXAxisCommits(memberKeys);
      setYAxisCommits(commitNumbers);
      setEventsLoaded(true);
    });
  }, [dates, setEventsLoaded]);

  useEffect(() => {
    getMerge().then((mergeData) => {
      let membersMergeRequests = new Map();
      let start: Date = dates[0]!;
      let end: Date = dates[1]!;
      for (let date = start; date <= end && date >= start; date.getDate + 1) {
        membersMergeRequests.set(date, 0);
      }
      mergeData
        .filter(makeFilter(dates[0]!, dates[1]!))
        .map((element: Merge) => {
          return element.created_at;
        })
        .forEach((date: Date) => {
          membersMergeRequests.set(date, membersMergeRequests.get(date) + 1);
        });
      let memberMergeKeys: string[] = [];
      let mergeNumbers: number[] = [];
      membersMergeRequests.forEach((value: number, key: string) => {
        memberMergeKeys.push(key);
        mergeNumbers.push(value);
      });
      setXAxisMerges(memberMergeKeys);
      setYAxisMerges(mergeNumbers);
      setMergesLoaded(true);
    });
  }, [dates, setMergesLoaded]);

  if (!mergesLoaded || !eventsLoaded) {
    return <div>Loading....</div>;
  }

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
            <MenuItem value={"Issues"}>Merge Data</MenuItem> // TODO: Endre til
            mergel elns
            <MenuItem value={"Commits"}>Commit Data</MenuItem>
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
};

export default Search;

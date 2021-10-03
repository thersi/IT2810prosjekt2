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

const getDateTimeFix = (date: Date): number => {
  return new Date(date).getTime();
};

//Used to filter the array with start and end date
type DateFilter = (merge_data: Merge) => boolean;
const makeFilter = (start_date: Date, end_date: Date): DateFilter => {
  const start_time = getDateTimeFix(start_date);
  const end_time = getDateTimeFix(end_date);
  return (data: Merge) =>
    getDateTimeFix(data.created_at) >= start_time &&
    getDateTimeFix(data.created_at) <= end_time;
};

/**
 * Component for making a search. The user fills in an action, start date and end date. The search extracts
 * the information from the backend functions and sends the axe-value to the parent node, App
 */
const Search = ({
  setXAxis,
  setYAxis,
  setChart,
  setKey,
}: {
  setXAxis: Dispatch<React.SetStateAction<string[]>>;
  setYAxis: Dispatch<React.SetStateAction<number[]>>;
  setChart: Dispatch<React.SetStateAction<number>>;
  setKey: Dispatch<React.SetStateAction<number>>;
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
  const [btnDisable, setBtnDisable] = useState<boolean>(true);

  /**
   * Function runs when the search button is clicked. It sends the search-result to App with the
   * set-functions that were sent as props.
   */
  const onSearch = () => {
    if (value === "commits") {
      setXAxis(xAxisCommits);
      setYAxis(yAxisCommits);
      setChart(1);
    } else if (value === "merges") {
      setXAxis(xAxisMerges);
      setYAxis(yAxisMerges);
      setChart(2);
      setKey(Math.floor(Math.random() * 100));
    } else {
      setChart(0);
    }
  };

  /**
   * The selected dates and action is stored locally on the website by use of HTML localStorage. The
   * dates are converted into a string and placed in a JSON file before they are stored. When called upon,
   * they are parsed back to its original format. The same applies to the action value. We use a useEffect
   * to perform the storing of the data on the site.
   */
  useEffect(() => {
    localStorage.setItem("dates", JSON.stringify(dates));
    localStorage.setItem("value", JSON.stringify(value));
    if (dates[0] !== null && dates[1] !== null && value !== "") {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [dates, value]);

  /**
   * Filters the commit data based on the search options and sets det x- and y-axis for commits.
   */
  useEffect(() => {
    getEvents().then((events) => {
      let commitsMap = new Map();
      events
        .filter(makeFilter(dates[0]!, dates[1]!))
        .forEach((element: Event) => {
          let member = element.author.id;
          if (commitsMap.has(member)) {
            commitsMap.set(
              member,
              commitsMap.get(member) + element.push_data.commit_count
            );
          } else {
            commitsMap.set(member, 1);
          }
        });
      let members: string[] = [];
      let commitsPerMember: number[] = [];
      commitsMap.forEach((value: number, key: string) => {
        members.push(key);
        commitsPerMember.push(value);
      });
      setXAxisCommits(members);
      setYAxisCommits(commitsPerMember);
      setEventsLoaded(true);
    });
  }, [dates, setEventsLoaded]);

  /**
   * Filters the merge data based on the search options and sets det x- and y-axis for merges.
   */
  useEffect(() => {
    getMerge().then((mergeData) => {
      let mergesMap = new Map();
      mergeData
        .filter(makeFilter(dates[0]!, dates[1]!))
        .forEach((element: Merge) => {
          let date = new Date(element.created_at);
          if (mergesMap.has(date.toDateString())) {
            mergesMap.set(
              date.toDateString(),
              mergesMap.get(date.toDateString()) + 1
            );
          } else {
            mergesMap.set(date.toDateString(), 1);
          }
        });
      let mergeDates: string[] = [];
      let mergeCounts: number[] = [];
      mergesMap.forEach((value: number, key: string) => {
        mergeDates.push(key);
        mergeCounts.push(value);
      });
      setXAxisMerges(mergeDates.reverse());
      setYAxisMerges(mergeCounts.reverse());
      setMergesLoaded(true);
    });
  }, [dates, setMergesLoaded]);

  /** Sets loading-screen before all dates are retrieved and processed */
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
            <MenuItem value={"merges"}>Merge Data</MenuItem>
            <MenuItem value={"commits"}>Commit Data</MenuItem>
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
        <Button disabled={btnDisable} variant="contained" onClick={onSearch}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default Search;

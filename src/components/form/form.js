import React, { useState } from "react";
import { Container, TextField, Typography } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { FormGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const ranges = [
  {
    value: "0-20",
    label: "0 to 20"
  },
  {
    value: "21-50",
    label: "21 to 50"
  },
  {
    value: "51-100",
    label: "51 to 100"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    flexBasis: 200
  }
}));
const Form = props => {
  const classes = useStyles();

  const sections = props.sections
    ? props.sections.map(section => (
        <MenuItem key={section} value={section}>
          {section}
        </MenuItem>
      ))
    : [""];

  return (
    <React.Fragment>
      <div>
        <br />
        <Typography variant="h4" gutterBottom>
          Advanced Search
        </Typography>
      </div>
      <Container maxWidth="lg">
        <div className={classes.root}>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <TextField
              label="Topic"
              value={props.query}
              inputProps={{
                name: "topic",
                id: "topicInput"
              }}
              onChange={event => props.topicHandler(event)}
              placeholder="Enter your search query..."
            />
          </FormControl>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <TextField
              label="Section"
              select
              value={props.section}
              onChange={event => props.sectionHandler(event)}
              inputProps={{
                name: "section",
                id: "sectionSelect"
              }}
            >
              {sections}
            </TextField>
          </FormControl>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <TextField
              label="Order By"
              select
              value={props.order}
              onChange={event => props.orderHandler(event)}
              inputProps={{
                name: "order",
                id: "orderSelect"
              }}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="relevance">Relevance</MenuItem>
            </TextField>
          </FormControl>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <TextField
              id="date"
              label="From"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              value={props.from}
              onChange={event => props.fromHandler(event)}
            />
          </FormControl>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <TextField
              id="date"
              label="To"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              value={props.to}
              onChange={event => props.toHandler(event)}
            />
          </FormControl>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Form;

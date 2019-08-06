import React from "react";
import { Container, TextField, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

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
      <br />

      <Container maxWidth="lg">
        <div>
          <Typography variant="h4" gutterBottom>
            Advanced Search
          </Typography>
        </div>
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
            {props.error ? (
              <Typography
                style={{ color: "red" }}
                variant="caption"
                display="block"
                gutterBottom
              >
                Invalid Character Detected
              </Typography>
            ) : null}
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

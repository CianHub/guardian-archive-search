import React from "react";
import { Container } from "@material-ui/core";
import Input from "@material-ui/core/Input";

const Form = props => {
  return (
    <Container maxWidth="lg">
      <Input
        fullWidth
        className={props.searchInput}
        value={props.query}
        inputProps={{
          "aria-label": "description"
        }}
        onChange={event => props.searchArticle(event)}
        placeholder="Enter your search query..."
      />
    </Container>
  );
};

export default Form;

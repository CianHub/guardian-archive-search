import React, { useEffect } from "react";
import { connect } from "react-redux";

const FrontPage = props => {
  useEffect(() => {
    console.log(props);
  });
  return (
    <div>
      <p>Hello</p>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    articles: state.articles
  };
};

export default connect(mapStateToProps)(FrontPage);

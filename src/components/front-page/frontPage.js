import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getArticles, getArticlesSearch } from "../../store/actions/actions";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

const FrontPage = props => {
  const [query, setQuery] = useState("a");

  useEffect(() => {
    props.getArticles();
  }, []);

  const searchArticle = () => {
    props.getSearchArticles(query + "&");
  };

  const articles = props.articles
    ? props.articles.map(article => {
        return <p key={article.id}>{article.webTitle}</p>;
      })
    : null;

  return (
    <div>
      <Input
        defaultValue={query}
        inputProps={{
          "aria-label": "description"
        }}
        onChange={event => setQuery(event.target.value)}
      />
      <Button variant="contained" color="primary" onClick={searchArticle}>
        Get Articles
      </Button>
      {articles}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    articles: state.articles
  };
};

const mapActionsToProps = dispatch => {
  return {
    getArticles: () => dispatch(getArticles()),
    getSearchArticles: query => dispatch(getArticlesSearch(query))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(FrontPage);

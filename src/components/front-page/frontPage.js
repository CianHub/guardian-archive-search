import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getArticles,
  getArticlesSearch,
  clearArticles,
  getArticlesNextPage
} from "../../store/actions/actions";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Header from "../header/header";
import { Container } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import styles from "./frontPage.module.css";
import { Article } from "../article/article";
import Grid from "@material-ui/core/Grid";
import { SyncLoader } from "react-spinners";

const FrontPage = props => {
  const [query, setQuery] = useState("");

  const isBottom = el =>
    el.getBoundingClientRect().bottom <= window.innerHeight;

  useEffect(() => {
    document.addEventListener("scroll", trackScrolling);
    return () => document.removeEventListener("scroll", trackScrolling);
  });

  const trackScrolling = () => {
    const wrappedElement = document.getElementById("grid");
    if (isBottom(wrappedElement)) {
      console.log("header bottom reached");
      if (props.articles.length > 0) {
        props.getNextPage(props.numberOfPages, props.currentPage, query);
      }
      document.removeEventListener("scroll", trackScrolling);
    }
  };

  const searchArticle = event => {
    setQuery(event.target.value);
    if (event.target.value.trim().length === 0) {
      props.clearArticles();
    } else {
      props.getSearchArticles(query + "&");
    }
  };

  const clearSearch = () => {
    props.clearArticles();
    setQuery("");
  };

  const getLatestNews = () => {
    setQuery("");
    props.getArticles();
  };

  const articles = props.articles
    ? props.articles.map(article => {
        return (
          <Grid key={article.id + 1} item xs={3}>
            <Article
              className={styles.Article}
              type={article.type}
              webTitle={article.webTitle}
              webUrl={article.webUrl}
              img={article.fields.thumbnail}
              headline={article.fields.headline}
              body={article.fields.trailText}
            />
          </Grid>
        );
      })
    : null;

  const body = props.loading ? (
    <div styles={{ flexGrow: 0.8 }}>
      <br />
      <SyncLoader color={"#589ae8"} />
      <br />
    </div>
  ) : (
    <Grid container spacing={3}>
      {articles}
    </Grid>
  );
  return (
    <Container maxWidth="xl">
      <br />
      <Container className={styles.Header} maxWidth="xl">
        <Header />
      </Container>
      <Divider variant="middle" />
      <Container maxWidth="lg">
        <Input
          fullWidth
          className={styles.searchInput}
          value={query}
          inputProps={{
            "aria-label": "description"
          }}
          onChange={event => searchArticle(event)}
          placeholder="Enter your search query..."
        />
      </Container>
      <Button
        style={{ marginRight: "1em" }}
        variant="outlined"
        onClick={getLatestNews}
      >
        Get the Latest News
      </Button>
      <Button variant="outlined" color="secondary" onClick={clearSearch}>
        Clear Results
      </Button>
      <br />
      <br />
      <br />
      {body}
      {props.loadingNextPage ? (
        <div styles={{ flexGrow: 0.8 }}>
          <br />
          <SyncLoader color={"#589ae8"} />
          <br />
        </div>
      ) : null}

      <div id="grid" />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    articles: state.articles,
    loading: state.loading,
    currentPage: state.currentPage,
    numberOfPages: state.numberOfPages,
    loadingNextPage: state.loadingNextPage
  };
};

const mapActionsToProps = dispatch => {
  return {
    getArticles: () => dispatch(getArticles()),
    getSearchArticles: query => dispatch(getArticlesSearch(query)),
    clearArticles: () => dispatch(clearArticles()),
    getNextPage: (numberOfPages, currentPage, query) =>
      dispatch(getArticlesNextPage(numberOfPages, currentPage, query))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(FrontPage);

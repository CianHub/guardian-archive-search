import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getArticles,
  getArticlesSearch,
  clearArticles,
  getArticlesNextPage,
  getSections
} from "../../store/actions/actions";
import Button from "@material-ui/core/Button";
import Header from "../header/header";
import { Container } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import styles from "./frontPage.module.css";
import { Article } from "../article/article";
import Grid from "@material-ui/core/Grid";
import { SyncLoader } from "react-spinners";
import Form from "../form/form";
import { AnimateOnChange } from "react-animation";
import { checkValidity } from "../utils/validation";

const FrontPage = props => {
  const [query, setQuery] = useState("");
  const [queryValid, setQueryValid] = useState(true);
  const [section, setSection] = useState("");
  const [order, setOrder] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const isBottom = el =>
    el.getBoundingClientRect().bottom <= window.innerHeight;

  useEffect(() => {
    document.addEventListener("scroll", trackScrolling);
    return () => document.removeEventListener("scroll", trackScrolling);
  });

  useEffect(() => {
    props.getSections();
  }, []);

  const trackScrolling = () => {
    const wrappedElement = document.getElementById("grid");
    if (isBottom(wrappedElement)) {
      if (
        props.articles &&
        props.articles.length > 0 &&
        !props.loadingNextPage
      ) {
        props.getNextPage(
          props.numberOfPages,
          props.currentPage,
          query,
          section,
          order,
          to,
          from,
          props.articles
        );
      }
      document.removeEventListener("scroll", trackScrolling);
    }
  };

  const searchArticle = () => {
    const trimQuery = query.trim(),
      trimSection = section.trim(),
      trimOrder = order.trim();
    const searchParams = {
      query: trimQuery.length > 0 ? trimQuery : false,
      section: trimSection.length > 0 ? trimSection : false,
      order: trimOrder.length > 0 ? trimOrder : false,
      fromDate: from,
      toDate: to
    };
    props.getSearchArticles(searchParams);
  };

  const topicHandler = event => {
    if (checkValidity(event.target.value, { pattern: true })) {
      setQueryValid(true);
      setQuery(event.target.value);
    } else {
      setQueryValid(false);
    }
  };

  const sectionHandler = event => {
    setSection(event.target.value);
  };

  const orderHandler = event => {
    setOrder(event.target.value);
  };

  const fromHandler = event => {
    setFrom(event.target.value);
  };

  const toHandler = event => {
    setTo(event.target.value);
  };

  const clearSearch = () => {
    props.clearArticles();
    resetFields();
  };

  const getLatestNews = () => {
    resetFields();
    props.getArticles();
  };

  const resetFields = () => {
    setQuery("");
    setSection("");
    setOrder("");
    setTo("");
    setFrom("");
  };

  const articles = props.articles
    ? props.articles.map(article => {
        let author = null;
        let authorURL = null;
        if (article.tags[0]) {
          author = article.tags[0].webTitle;
          authorURL = article.tags[0].webUrl;
        }
        return (
          <Grid key={article.id + 1} item xs={12} sm={6} md={3}>
            <Article
              className={styles.Article}
              type={article.type}
              webTitle={article.webTitle}
              webUrl={article.webUrl}
              img={article.fields.thumbnail}
              headline={article.fields.headline}
              body={article.fields.trailText}
              author={author}
              authorURL={authorURL}
              date={new Date(article.webPublicationDate).toLocaleString()}
              section={article.sectionName}
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
    <Container style={{ margin: "0" }} maxWidth="xl">
      <br />
      <Container className={styles.Header} maxWidth="xl">
        <Header />
      </Container>
      <Divider variant="middle" />
      <Container
        maxWidth="lg"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.23) ",
          paddingTop: "2em",
          paddingBottom: "2em",
          borderRadius: "4px",
          marginTop: "2em"
        }}
      >
        <Form
          sections={props.sections}
          query={query}
          section={section}
          order={order}
          from={from}
          to={to}
          error={!queryValid}
          searchInput={styles.searchInput}
          orderHandler={event => orderHandler(event)}
          toHandler={event => toHandler(event)}
          fromHandler={event => fromHandler(event)}
          topicHandler={event => topicHandler(event)}
          sectionHandler={event => sectionHandler(event)}
        />
        <div
          style={{
            marginTop: "1.5em"
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: "1em" }}
            onClick={searchArticle}
          >
            Search
          </Button>
          <Button variant="outlined" color="secondary" onClick={clearSearch}>
            Clear Results
          </Button>
        </div>
      </Container>

      <Button
        style={{
          marginTop: "2em",
          marginBottom: "2em"
        }}
        variant="outlined"
        onClick={getLatestNews}
      >
        Get the Latest News
      </Button>

      <AnimateOnChange
        animationIn="custom-animation-in 500ms ease-out forwards"
        animationOut="custom-animation-out 500ms ease-out forwards"
        durationOut={200}
      >
        {body}
      </AnimateOnChange>
      {props.loadingNextPage ? (
        <div styles={{ flexGrow: 0.8 }}>
          <br />
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
    loadingNextPage: state.loadingNextPage,
    sections: state.sections
  };
};

const mapActionsToProps = dispatch => {
  return {
    getArticles: () => dispatch(getArticles()),
    getSearchArticles: query => dispatch(getArticlesSearch(query)),
    clearArticles: () => dispatch(clearArticles()),
    getNextPage: (
      numberOfPages,
      currentPage,
      query,
      section,
      order,
      from,
      to,
      articles
    ) =>
      dispatch(
        getArticlesNextPage(
          numberOfPages,
          currentPage,
          query,
          section,
          order,
          from,
          to,
          articles
        )
      ),
    getSections: () => dispatch(getSections())
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(FrontPage);

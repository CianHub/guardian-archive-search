import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container, Link } from "@material-ui/core";
import * as img from "../../assets/No_image_3x4.png";
import stylesS from "./article.module.css";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

function openInNewTab(url) {
  const win = window.open(url, "_blank");
  win.focus();
}

export const Article = props => {
  const [clicked, setClicked] = useState(false);
  const classes = useStyles();
  const [styles, setStyles] = useState(classes.card);

  const clickHandler = () => {
    setClicked(true);
    setStyles([classes.card, stylesS.clicked].join(" "));
  };
  return (
    <Container maxWidth="md">
      <Card className={styles} onClick={clickHandler}>
        <CardActionArea onClick={() => openInNewTab(props.webUrl)}>
          {props.img ? (
            <CardMedia
              className={classes.media}
              image={props.img}
              title="article thumbnail"
            />
          ) : (
            <CardMedia
              className={classes.media}
              image={img}
              title="article thumbnail"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.headline}
            </Typography>
            <Typography gutterBottom variant="body2" component="p">
              By {props.author}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.body}
            </Typography>
            <br />
            <Typography variant="caption" display="block" gutterBottom>
              {props.section}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Date Published: {props.date.split("T")[0]}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant="outlined"
            style={{ margin: "auto" }}
            href={props.webUrl}
            target="_blank"
            size="small"
          >
            View Article
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

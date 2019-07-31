import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container, Link } from "@material-ui/core";

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
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Card className={classes.card}>
        <CardActionArea onClick={() => openInNewTab(props.webUrl)}>
          <CardMedia
            className={classes.media}
            image={props.img}
            title="article thumbnail"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.headline}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.body}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            style={{ margin: "auto" }}
            href={props.webUrl}
            target="_blank"
            size="small"
            color="#0d7cad"
          >
            View Article
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

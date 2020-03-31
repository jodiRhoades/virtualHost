import React, { Component } from "react";
import { Image, Segment, Grid } from "semantic-ui-react";
import Dashboard from "./dashboard.png";
import "./style.css";
import Events from "./Events/index.js";
import Booths from "./Booths/index.js";
import Notes from "./Notes/index.js";
import Favorites from "./Favorites/index.js";
import { StyledHeader } from "./styledComponents";
import API from "../../utils/API";
import queryString from "query-string";

class MyDashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.onLoad();
  }
  onLoad = () => {
    // figure out how to grab the ID from 
    const query = queryString.parse(window.location.search);
    console.log(query.extid);
    if (!query.extid) {
      console.log("Getting external ID, redirecting to user dashboard");
      API.getExternalUser({externalID: query.extid})
      .then(response => console.log(response))

    } else {
      console.log(query.id)
      const user = API.getDashboard({ _id: query.id });
      console.log("----Dash 25----\n", user);
    }
  };
  render() {
    return (
      <div id="container">
        <Image id="logo" src={Dashboard} />
        <Grid stackable columns={2} textAlign="center" verticalAlign="top">
          <Grid.Column width={7}>
            <Segment>
              <StyledHeader as="h1">My Events</StyledHeader>
              <Events />
            </Segment>
            <Segment>
              <StyledHeader as="h1">My Booths</StyledHeader>
              <Booths />
            </Segment>
          </Grid.Column>
          <Grid.Column width={9}>
            <Segment>
              <StyledHeader as="h1">My Notes</StyledHeader>
              <Notes />
            </Segment>
            <Segment>
              <StyledHeader as="h1">My Favorites</StyledHeader>
              <Favorites />
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default MyDashboard;

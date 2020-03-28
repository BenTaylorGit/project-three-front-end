import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Toot from '../components/toot/Toot';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import TootSkeleton from '../util/TootSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    tootIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const tootId = this.props.match.params.tootId;

    if (tootId) this.setState({ tootIdParam: tootId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { toots, loading } = this.props.data;
    const { tootIdParam } = this.state;

    const tootsMarkup = loading ? (
      <TootSkeleton />
    ) : toots === null ? (
      <p>No toots from this user</p>
    ) : !tootIdParam ? (
      toots.map((toot) => <Toot key={toot.tootId} toot={toot} />)
    ) : (
      toots.map((toot) => {
        if (toot.tootId !== tootIdParam)
          return <Toot key={toot.tootId} toot={toot} />;
        else return <Toot key={toot.tootId} toot={toot} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {tootsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
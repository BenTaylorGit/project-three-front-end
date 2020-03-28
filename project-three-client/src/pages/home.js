import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Toot from '../components/toot/Toot';
import Profile from '../components/profile/Profile';
import TootSkeleton from '../util/TootSkeleton.js';

import { connect } from 'react-redux';
import { getToots } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getToots();
  }
  render() {
    const { toots, loading } = this.props.data;
    let recentTootsMarkup = !loading ? (
      toots.map((toot) => <Toot key={toot.tootId} toot={toot} />)
    ) : (
      <TootSkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentTootsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getToots: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getToots }
)(home);
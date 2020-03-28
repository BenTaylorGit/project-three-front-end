import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeToot, unlikeToot } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedToot = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.tootId === this.props.tootId
      )
    )
      return true;
    else return false;
  };
  likeToot = () => {
    this.props.likeToot(this.props.tootId);
  };
  unlikeToot = () => {
    this.props.unlikeToot(this.props.tootId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedToot() ? (
      <MyButton tip="Undo like" onClick={this.unlikeToot}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeToot}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  tootId: PropTypes.string.isRequired,
  likeToot: PropTypes.func.isRequired,
  unlikeToot: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeToot,
  unlikeToot
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
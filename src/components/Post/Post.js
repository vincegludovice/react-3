import React, { Component } from 'react';
import {
  MdPersonOutline,
  MdMoreVert,
  MdChatBubbleOutline,
  MdFavoriteBorder,
  MdMailOutline,
} from 'react-icons/md';

import './Post.css';

import Edit from './Edit/Edit';

///////////// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

export default class Post extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
      showMasterMenu: false,
    };

    this.hideEdit = this.hideEdit.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.toggleMasterMenu = this.toggleMasterMenu.bind(this);
    this.hideMasterMenu = this.hideMasterMenu.bind(this);
  }

  // This puts the post into EDIT mode when the EDIT button is clicked from the drop-down
  showEdit() {
    this.setState({ editing: true, showMasterMenu: false });
  }

  // This puts the post back into normal viewing mode when the CANCEL button is clicked
  // This method is passed down to the <Edit /> component via props
  hideEdit() {
    this.setState({ editing: false });
  }

  // This toggles the drop-down when the three dots in the top right corner of a post are clicked
  toggleMasterMenu() {
    this.setState({ showMasterMenu: !this.state.showMasterMenu });
  }

  // This hides the drop-down when the post is clicked anywhere
  hideMasterMenu() {
    if (this.state.showMasterMenu === true) {
      this.setState({ showMasterMenu: false });
    }
  }

  render() {
    // This is destructuring! You can also think of it as being written as so:
    // const editing = this.state.editing
    // const showMasterMenu = this.state.showMasterMenu
    const { editing, showMasterMenu } = this.state;
    const { text, date, id, updatePostFn, deletePostFn } = this.props;

    return (
      // Main body of post
      <section className="Post__parent" onClick={this.hideMasterMenu}>
        {/* Three dots in top right corner */}
        <div className="Post__master-controls">
          <MdMoreVert onClick={this.toggleMasterMenu} />

          {/* Drop-down menu. Remember that the "showMasterMenu" variable has been destructured off of this.state */}
          <div
            className="Post__master-menu"
            style={{ display: showMasterMenu ? 'flex' : 'none' }}
          >
            <span onClick={this.showEdit}>Edit</span>
            <span onClick={() => deletePostFn(id)}>Delete</span>
          </div>
        </div>

        {/* This is where all the meta data of the post will go (who, when, where) */}
        <div className="Post__meta-data">
          <div className="Post__profile-picture">
            <MdPersonOutline />
          </div>

          <span className="Post__name">Vince Ludovice</span>
          <span className="Post__handle">@vince.ludovice</span>

          <span className="Post__date">- {date}</span>
        </div>

        {/* This is where the text goes. Notice the turnary statement. The turnary statement decides to display either the text OR the editor view
            You can also think of it as being written as so:
              if( this.state.editing === true ) {
                <Edit ... />
              } else {
                <span ... ></span>
              }
        */}
        <div className="Post__content">
          {// This has been pulled off of this.state via destructuring
          editing ? (
            <Edit 
                text={text}
                id={id}
                hideEdit={this.hideEdit}
                updatePostFn={updatePostFn} 
                deletePostFn={deletePostFn}/>
          ) : (
            <span className="Post__text">{text}</span>
          )}
        </div>

        {/* These are all of the cute little icons in the bottom left corner */}
        <div className="Post__user-controls">
          <MdChatBubbleOutline className="Post__control-icon" />
          <MdFavoriteBorder className="Post__control-icon" />
          <MdMailOutline className="Post__control-icon" />
        </div>
      </section>
    );
  }
}

import React, { Component } from "react";
import "./App.css";
import axios from "axios";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Post from "./Post/Post";

axios.defaults.headers.common["Content-Type"] = "application/json";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.searchPost = this.searchPost.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://practiceapi.devmountain.com/api/posts")
      .then(response => this.setState({ posts: response.data }));
  }

  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then(response => {
        const updatedPost = response.data;
        const updatedPosts = this.state.posts.map(post => {
          if (post.id === updatedPost.id) {
            return { post, ...updatedPost };
          } else {
            return post;
          }
        });

        this.setState({ posts: updatedPosts });
      });
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(response => {
        this.setState({
          posts: this.state.posts.filter(post => post.id !== id)
        });
      });
  }

  createPost(text) {
    axios
      .post("https://practiceapi.devmountain.com/api/posts", { text })
      .then(results => {
        this.setState({ posts: results.data });
      });
  }

  searchPost(text) {
    if (text) {
      axios
        .get(
          `https://practiceapi.devmountain.com/api/posts/filter?text=${text}`
        )
        .then(response => {
          this.setState({
            posts: response.data
          });
        });
    }
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPost={this.searchPost} />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map(post => (
            <Post
              key={post.id}
              id={post.id}
              text={post.text}
              date={post.date}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;

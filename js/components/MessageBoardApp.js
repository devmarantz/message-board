import MessageBoardAPI, { commentData } from "../MessageBoardAPI.js";

class MessageBoardApp extends HTMLElement {
  // Great place to define dependancies
  constructor() {
    super();

    this.api = new MessageBoardAPI(commentData);
    
    // this.toggleload = this.toggleload.bind(this);
    // set initial state
    this.state = {
      comments: [],
      loading: true
    };

    this.toggleload();


    this.addEventListener(
      "removeComment",
      this.handleRemoveComment
    );
  }

  get load() {
    return this.hasAttribute("load");
  }

  set load(isActive) {
    if (isActive) {
      this.setAttribute("load", "");
    } else {
      this.removeAttribute("load");
    }
  }

  // setState({ comments: updatedComments})
  // Takes in new piece of state
  setState(newState) {
    // for each piece of state
    Object.keys(newState).forEach(key => {
      // update the correct key
      this.state[key] = newState[key];
      // selects all child elements tracking this
      // element.setAttribute(key,newState[key])
      this.querySelectorAll(`[${key}]`).forEach(element => {
        // sets the attribute via the setter
        element[key] = newState[key];
      });
    });
  }

  connectedCallback() {
    
    this.api.getComments().then(comments => {
      // this.setState({comments: comments});
      this.setState({comments});
    });


    // this.state = {
    //   comments: this.api.getCommentsSortedByTime()
    // };

    this.render()
  }

  async render() {
    this.toggleload();
    this.innerHTML = /* html */ `
      <nav>
        <form>
          <input
            type="text"
            name="search"
            placeholder="Search"
          />
          <button type="submit">Search</button>
        </form>
      </nav>
      <img class = "loader" src="./loading.gif">
      <message-board-comment-list ></message-board-comment-list>
        <div class="add-comment">
          <form>
            <input
              type="text"
              name="comment"
              placeholder="Your opinion here"
            />
            <button type="submit">Comment</button>
          </form>
        </div>
    `;
    

    this.querySelector("message-board-comment-list").setAttribute(
      "comments",
      JSON.stringify(this.state.comments)
    );

    // add event listeners
    // Analogy:  Ears for the setState
    this.querySelector("nav form").addEventListener(
      "submit",
      this.handleSearchSubmit
    );
    this.querySelector(".add-comment form").addEventListener(
      "submit",
      this.handleAddComment
    );

    // this.addEventListener('likeComment', this.handleLikeComment);
    this.addEventListener('likeComment', this.toggleload);
    this.addEventListener('dislikeComment', this.handleDislikeComment);


    
  }

  handleSearchSubmit = async event => {
    event.preventDefault();
    const searchText = new FormData(event.target).get("search");
    const updatedComments = await this.api.filterCommentsByText(searchText);
    this.setState({ comments: updatedComments });
  };

  handleAddComment = async event => {
    event.preventDefault();
    const commentText = new FormData(event.target).get("comment");
    event.target.reset();
    const responseBody = await this.api.addComment(commentText);
    this.setState({ comments: responseBody.comments });
  };

  handleRemoveComment = async event => {
    console.log(event.target);
    event.preventDefault();
    const confirmed = window.confirm(`Really delete ${event.detail}?`);
    if (confirmed){
      const responseBody = await this.api.removeComment(event.target.comment.id);
      this.setState({comments: responseBody.comments});
    }
  };

  handleLikeComment = event => {
    event.preventDefault();
    this.api.likeComment(event.detail.commentId);
    const comments = this.api.getCommentsSortedByTime();
    this.setState({ comments });
  };

  handleDislikeComment = event => {
    event.preventDefault();
    this.api.dislikeComment(event.detail.commentId);
    const comments = this.api.getCommentsSortedByTime();
    this.setState({ comments });
  };

  toggleload() {
    this.load = !this.load;
  }
}

export default MessageBoardApp;

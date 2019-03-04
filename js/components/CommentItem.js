export default class CommentItem extends HTMLElement {
  // FROM HERE
  constructor() {
    super();
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  // TO HERE

  connectedCallback() {
    this.render();
  }



  get comment() {
    if (this.hasAttribute("comment")) {
      // transforms string attribute back into an array
      return JSON.parse(this.getAttribute("comment"));
    }
    return {
      text: '',
      timestamp: Date.now(),
      id: -1
    };
  }

  set comment(val){
    this.setAttribute('comment', JSON.stringify(val));
  }

  // FROM HERE
  get display() {
    return this.hasAttribute("display");
  }

  set display(isActive) {
    if (isActive) {
      this.setAttribute("display", "");
    } else {
      this.removeAttribute("display");
    }
  }
  // TO HERE

  render() {
    this.innerHTML = `
      <p>${this.comment.text}</p>
      <p class="timestamp">${this.comment.timestamp}</p>
      <div>
        <span id="like-rating" class="ratings">
          <i class="fas fa-thumbs-up"></i>
          <span class="rating-count">${this.comment.likes}
        </span>
        <span id="dislike-rating" class="ratings">
          <i class="fas fa-thumbs-down"></i>
          <span class="rating-count">${this.comment.dislikes}</span>
        </span>
      </div>
      <button type="button" class="delete-button">x</button>
      <button type="button" class="details-button">Details</button>
    `;

    // Create a custom event and emit it
    this.querySelector("button.delete-button").addEventListener("click", this.dispatchRemoveEvent);
    // ADDED
    this.querySelector("button.details-button").addEventListener("click", this.toggleDisplay);
    this.querySelector('#like-rating').addEventListener('click', this.dispatchLikeEvent);
    this.querySelector('#dislike-rating').addEventListener('click', this.dispatchDislikeEvent);
    }

    dispatchLikeEvent = () => {
      this.dispatchEvent(
        new CustomEvent('likeComment', {
          bubbles: true,
          detail: {
            commentId: this.comment.id,
          },
        }),
      );
    };
  
    dispatchDislikeEvent = () => {
      this.dispatchEvent(
        new CustomEvent('dislikeComment', {
          bubbles: true,
          detail: {
            commentId: this.comment.id,
          },
        }),
      );
    };
  

    dispatchRemoveEvent = () => {
      this.dispatchEvent(
        new CustomEvent('removeComment', {
        bubbles: true,
        detail: this.comment.text
        })
      );
    };

    // Toggles Timestamp
    toggleDisplay() {
      this.display = !this.display;
    }
  }

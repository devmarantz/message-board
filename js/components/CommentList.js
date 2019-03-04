export default class CommentList extends HTMLElement {
// this.comments
// this.name
/*
  {
    attributes: {

    }
  }

  this.getAttribute('comments');
  JSON.parse(this.getAttribute('comments'));

  this is a lot of code so we alias it to 'comments' with 
  get comment()

  now we can call it:
  this.comments
*/

  static get observedAttributes() {
    return ["comments"];
  }

  get comments() {
    if (this.hasAttribute("comments")) {
      // transforms string attribute back into an array
      return JSON.parse(this.getAttribute("comments"));
    }
    return [];
  }

  // ALlows us to set "comments" attribute by using this.comments = newVal
  set comments(val) {
    // transform array into string via JSON.stringify
    this.setAttribute("comments", JSON.stringify(val));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = ``;
    this.comments.forEach(comment => {
        // create a comment list element
        const newComment = document.createElement('message-board-comment-item');
        // check if the id is in openComments
        // if so, set the appropriate attribute on the element 


        // set its comment attribute
        // newComment.setAttribute('comment',JSON.stringify(comment))
        newComment.comment = comment;
        // append it to comment list
        this.append(newComment);
    })
    // ${this.comments.map(comment => `<message-board-comment-item></message-board-comment-item>`).join("")}
    

    /*
    0: {text: "Nice Nice Nice!", id: 5, timestamp: 1546903165}
    1: {text: "Ramen is my fav food ever", id: 4, timestamp: 1548976765}
    2: {text: "You are the best", id: 3, timestamp: 1549495165}
    3: {text: "Super good", id: 2, timestamp: 1549577965}
    4: {text: "Love this!", id: 1, timestamp: 1549581565}
    =====>>>>
    0: '<p>Nice Nice Nice!</p>'
    1: '<p>Ramen is my fav food ever</p>'
    2: '<p>You are the best</p>'




    */
  }

  // Listens for changes on the observed attributes
  attributeChangedCallback(attrName, oldVal, newVal) {
    // check display state of all children
    const openComments = {
      2: true
    }
    // create object that associates comment w/ display state
    // pass that to render
    this.render(openComments);
  }
}

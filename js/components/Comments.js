export default class Comments extends HTMLElement {
  static get observedAttributes() {
    return ["comments"];
  }

  get comments() {
    if (this.hasAttribute("comments")) {
      return JSON.parse(this.getAttribute("comments"));
    }
    return [];
  }

  //Avoid using
  set comments(val) {
    this.setAttribute("comments", JSON.stringify(val));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // const comments = JSON.parse(this.getAttribute("comments"));
    this.innerHTML = `
        ${this.comments.map(comment => `<p>${comment.text}</p>`).join("")}
    `;

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

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }
}

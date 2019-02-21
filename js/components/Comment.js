export default class Comment extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <p>Comment text</p>
      <button type="button" class="delete-button">x</button>
    `;

    this.querySelector("button.delete-button").addEventListener("click", () =>
      console.log("deleting comment...")
    );
  }
}

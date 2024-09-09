class Heading{
    constructor(){
        this.createHeading();
    }
    createHeading(){
        this.body = document.querySelector("body");
        this.heading = document.createElement("section");
        this.heading.classList.add("heading");
        this.body.appendChild(this.heading);

        this.title = document.createElement("h2");
        this.title.classList.add("heading__title");
        this.title.innerText = "Welcome skaters!";
        this.heading.appendChild(this.title);

        this.intro = document.createElement("h3");
        this.intro.classList.add("heading__intro");
        this.intro.innerText = "Customize our items yourself!";
    }
}
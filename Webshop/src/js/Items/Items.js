class Items{
    constructor(){
        this.data = new Fetch();
        this.createItems();
    }
    async createItems(){
        this.body = document.querySelector("body");

        this.main = document.createElement("main");
        this.main.classList.add("main");
        this.body.appendChild(this.main);

        this.items = document.createElement("section");
        this.items.classList.add("items");
        this.items.setAttribute("id", "products");
        this.main.appendChild(this.items);

        this.title = document.createElement("h2");
        this.title.classList.add("items__title");
        this.title.innerText = "Our items";
        this.items.appendChild(this.title);

        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("items__wrapper");
        this.items.appendChild(this.wrapper);

        const data = await this.data.fetch();
        for(let i = 0; i < data.products.length; i++){
            this.item = document.createElement("article");
            this.item.classList.add("item");
            this.wrapper.appendChild(this.item);

            this.image = document.createElement("img");
            this.image.classList.add("item__image");
            this.image.setAttribute("src", data.products[i].image);
            this.item.appendChild(this.image);

            this.name = document.createElement("h2");
            this.name.classList.add("item__title");
            this.name.innerText = data.products[i].name;
            this.item.appendChild(this.name);

            this.button = document.createElement("button");
            this.button.classList.add("item__button");
            this.button.setAttribute("id", data.products[i].id);
            this.button.innerText = "Customize";
            this.item.appendChild(this.button);
        }
        this.buttonClick();
    }
    async buttonClick(){
        this.getButtons = document.getElementsByClassName("item__button");
        for(let i = 0; i < this.getButtons.length; i++){
            this.getButtons[i].onclick = () => {
                this.id = this.getButtons[i].getAttribute("id");
                this.makeModal(this.id);
            }
        }
    }
    async makeModal(id){
        this.body = document.querySelector("body");

        this.modal = document.createElement("section");
        this.modal.classList.add("modal");
        this.body.appendChild(this.modal);

        this.body.style.overflow = "hidden";
        window.scrollTo(0, 0);

        const data = await this.data.fetch();

        this.close = document.createElement("button");
        this.close.classList.add("modal__close");
        this.close.innerText = "x";
        this.modal.appendChild(this.close);

        this.onClose();

        this.modalWrap = document.createElement("div");
        this.modalWrap.classList.add("modal__divWrapper");
        this.modal.appendChild(this.modalWrap);

        this.modalFigure = document.createElement("figure");
        this.modalFigure.classList.add("modal__figure");
        this.modalWrap.appendChild(this.modalFigure);

        this.modalImage = document.createElement("img");
        this.modalImage.classList.add("modal__image");
        this.modalImage.setAttribute("src", data.products[id].image);
        this.modalFigure.appendChild(this.modalImage);

        this.modalSymbol = document.createElement("img");
        this.modalSymbol.classList.add("modal__symbol");
        this.modalFigure.appendChild(this.modalSymbol);

        this.modalTitle = document.createElement("h2");
        this.modalTitle.classList.add("modal__title");
        this.modalTitle.innerText = data.products[id].name;
        this.modalWrap.appendChild(this.modalTitle);

        this.modalPrice = document.createElement("h3");
        this.modalPrice.classList.add("modal__price");
        this.modalPrice.innerText = "€" + data.products[id].price;
        this.modalWrap.appendChild(this.modalPrice);

        this.modalWrapper = document.createElement("span");
        this.modalWrapper.classList.add("modal__wrapper");
        this.modalWrap.appendChild(this.modalWrapper);

        this.blueImage = document.createElement("img");
        this.blueImage.classList.add("modal__wrapper--image");
        this.blueImage.setAttribute("src", data.products[id].blue);
        this.blueImage.setAttribute("id", "blauw");
        this.modalWrapper.appendChild(this.blueImage);

        this.goldImage = document.createElement("img");
        this.goldImage.classList.add("modal__wrapper--image");
        this.goldImage.setAttribute("src", data.products[id].gold);
        this.goldImage.setAttribute("id", "goud");
        this.modalWrapper.appendChild(this.goldImage);

        this.redImage = document.createElement("img");
        this.redImage.classList.add("modal__wrapper--image");
        this.redImage.setAttribute("src", data.products[id].red);
        this.redImage.setAttribute("id", "rood");
        this.modalWrapper.appendChild(this.redImage);

        this.silverImage = document.createElement("img");
        this.silverImage.classList.add("modal__wrapper--image");
        this.silverImage.setAttribute("src", data.products[id].silver);
        this.silverImage.setAttribute("id", "zilver");
        this.modalWrapper.appendChild(this.silverImage);

        this.colorClick(id);

        this.symbolWrapper = document.createElement("span");
        this.symbolWrapper.classList.add("modal__symbolWrapper");
        this.modal.appendChild(this.symbolWrapper);

        for(let i = 0; i < data.symbols.length; i++){
            this.symbol = document.createElement("img");
            this.symbol.classList.add("modal__symbols");
            this.symbol.setAttribute("src", data.symbols[i].image);
            this.symbolWrapper.appendChild(this.symbol);
        }

        this.symbolClick();
    }
    async onClose(){
        this.closeButton = document.getElementsByClassName("modal__close")[0];
        this.closeButton.onclick = () => {
            document.getElementsByClassName("modal")[0].remove();
            document.querySelector("body").style.overflowY = "scroll";
        }
    }
    async colorClick(id){
        this.getColors = document.getElementsByClassName("modal__wrapper--image");
        
        const data = await this.data.fetch();
        this.idName = data.products[id].name;

        for(let i = 0; i < this.getColors.length; i++){
            this.getColors[i].onclick = () => {
                this.colorId = this.getColors[i].getAttribute("id");
                this.srcName = "src/img/" + this.idName + "-" + this.colorId + ".png";
                this.getBigImage = document.getElementsByClassName("modal__image")[0];
                this.getBigImage.setAttribute("src", this.srcName);

                this.colorPrice = data.products[i][this.colorId];
                this.getPrice = document.getElementsByClassName("modal__price")[0];
                this.getPrice.innerText = "€" + this.colorPrice;
            }
        }
    }
    async symbolClick(){
        const data = await this.data.fetch();
        this.getSymbols = document.getElementsByClassName("modal__symbols");
        this.getSymbol = document.getElementsByClassName("modal__symbol")[0];
        for(let i = 0; i < this.getSymbols.length; i++){
            this.getSymbols[i].onclick = () => {
                this.getSymbol.setAttribute("src", data.symbols[i].image);
            }
        }
    }
}
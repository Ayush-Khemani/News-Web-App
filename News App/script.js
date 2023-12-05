const api_key = "630a607132414f33b33172ffba3c342a";
const url = "https://newsapi.org/v2/everything?q="



window.addEventListener("load", fetchnews("Pakistan"));

const logo = document.getElementById("logo");
logo.addEventListener("click", ()=>{
    window.addEventListener("load", fetchnews("Pakistan"));
})

async function fetchnews(query) {
    const response = await fetch(`${url}${query}&apiKey=${api_key}`);
    const data = await response.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {

    const cardContainer = document.getElementById("card-container");
    const templateContainer = document.getElementById("template-news-card");

    cardContainer.innerHTML = '';

    articles.forEach(article => {
        
        if(article.urlToImage == null || !article.urlToImage) return;

        const Clone = templateContainer.content.cloneNode(true);
        fillData(article, Clone);
        cardContainer.appendChild(Clone);

    });
}

function fillData(article, Clone) {
    const newsImg = Clone.querySelector("#news-img");
    newsImg.src = article.urlToImage;

    const newsTitle = Clone.querySelector("#news-title");
    newsTitle.innerHTML = article.title;

    const newsSource = Clone.querySelector("#news-source");
    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
    newsSource.innerHTML = `${article.source.name} • ${date}`;

    const descript = Clone.querySelector("#news-descript");
    descript.innerHTML = article.description;

    console.log(Clone.firstElementChild);

    Clone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    }); 
    
}


const cricketLink = document.getElementById("cricket-link");
const FinanceLink = document.getElementById("Finance-link");
const PoliticsLink = document.getElementById("Politics-link");
const TechLink = document.getElementById("Technology-link");


cricketLink.addEventListener("click", () => {
    fetchnews("Cricket");
})

FinanceLink.addEventListener("click", () => {
    fetchnews("Finance");
})

PoliticsLink.addEventListener("click", () => {
    fetchnews("Pakistani-Politics");
})

TechLink.addEventListener("click", ()=> {
    fetchnews("Technology");  
})


const Searchinput = document.getElementById("Search-input");
const SearchButton = document.getElementById("search-button");

SearchButton.addEventListener("click", ()=>{
    const query = Searchinput.value;
    if(!query) return;
    fetchnews(query);
})

Searchinput.addEventListener("keydown", (event) => {
    if(event.key == 'Enter') {
        const query = Searchinput.value;
        if(!query) return;
        fetchnews(query);
    }
})
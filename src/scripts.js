import './styles.css'

const apiKey = '3df5075467514cc3a31c7682e0d3b13d';
const container=document.getElementById('container');
let currentPosition=0;
let news={};
const filter=document.getElementById("filter");
const fabricArticle=(article)=>{
    if(article.urlToImage==null)
    article.urlToImage='https://ysia.ru/wp-content/uploads/2019/04/225353843_5b787050a10e5.jpg';
    return `<div class='article'><a href="${article.url}"><img src="${article.urlToImage}" /><h2>${article.title}</h2></a></div>`;
}
const fillOptions=(news)=>{
    let options= new Map();
    news.articles.forEach((article)=>{
    options.set(article.source.name, article.source.name);
    })
    filter.innerHTML="<option hidden>Select</option>";
    for (let option of options.keys()){
        let el=document.createElement("option");
        el.innerHTML=option;
        filter.appendChild(el);
    }
};

const init=()=>{
    currentPosition=5;
    let url= `https://newsapi.org/v2/top-headlines?country=ru&pageSize=40&apiKey=${apiKey}`;
    fetch(url).then((response)=>{
    return response.json();
}).then((data)=>{
    news=data;
    fillOptions(news);
    container.innerHTML='';
    for(let i=0; i<currentPosition; i++){
       let article = data.articles[i];
       let el=fabricArticle(article);
    container.innerHTML+=el;
    }
})
}

init();



const readMore=document.getElementById('readMore');
readMore.addEventListener('click', (e)=>{
e.preventDefault();
if(currentPosition>=news.articles.length || currentPosition>=40){
alert("Reached the end of the news feed");
}
else for(let i=currentPosition; i<currentPosition+5; i++){
    let article = news.articles[i];
       let el=fabricArticle(article);
    container.innerHTML+=el;
}
currentPosition+=5;
}, false);

const search=document.getElementById("search");
search.addEventListener('click', (e)=>{
e.preventDefault();
let input=document.getElementById("query");
let query=input.value;
let url=`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
fetch(url).then((response)=>{
    return response.json();
}).then((data)=>{
    news=data;
    container.innerHTML='';
    currentPosition=5;
    for(let i=0; i<currentPosition; i++){
       let article = data.articles[i];
       let el=fabricArticle(article);
    container.innerHTML+=el;
    }
})
}, false);


filter.addEventListener('change', (e)=>{
e.preventDefault();
let source=filter.value;
console.log(news);
let res = news.articles.filter(article=>
    article.source.name==source);
    container.innerHTML='';
    if (res.length==0)
    container.innerHTML='<h1>There are no articles matching your request</h1>';
    else 
res.forEach(article=>{
container.innerHTML+=fabricArticle(article);
})
})

const reset=document.getElementById("reset");
reset.addEventListener("click", (e)=>{
init();
}, false)
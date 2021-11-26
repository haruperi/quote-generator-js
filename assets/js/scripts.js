//Global Variables
let apiQuotes = [];
const quoteContainer = document.querySelector("#quote-container")
const quoteText = document.querySelector("#quote")
const authorText = document.querySelector("#author")
const twitterBtn = document.querySelector("#twitter-button")
const newQuoteBtn = document.querySelector("#new-qoute")
const loader = document.querySelector("#loader")


//Show Loading
function loading() {
    loader.hidden = false
    quoteContainer.hidden = true
}

//Hide Loading
function loadingComplete() {
    loader.hidden = true
    quoteContainer.hidden = false
}


//Show new quote
function newQuote() {
    loading()
    //Pick a random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    // Check if author is blank and replace with "unknown"
    if (!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author
    }
    
    //Check if quote is too long to change font size
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote")
    } else {
        quoteText.classList.remove("long-quote")
    }
    quoteText.textContent = quote.text
    loadingComplete()
    
}

// Get Quotes from API
async function getQuotes() {
    loading()
    const apiUrl = "https://type.fit/api/quotes"
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()

    } catch (error) {
        // Catch Error Here
    }
    
}

getQuotes()


newQuoteBtn.addEventListener('click', newQuote)
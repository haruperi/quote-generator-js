let quotesDB = [];
const quoteContainer = document.querySelector("#quote-container")
const quoteText = document.querySelector("#quote")
const authorText = document.querySelector("#author")
const twitterBtn = document.querySelector("#twitter-button")
const newQuoteBtn = document.querySelector("#new-qoute")
const loader = document.querySelector("#loader")


function showLoadingSpinner() {
    loader.hidden = false
    quoteContainer.hidden = true
}


function removeLoadingSpinner() {
    loader.hidden = true
    quoteContainer.hidden = false
}


//Show new quote
function newQuote() {
    showLoadingSpinner()
    //Pick a random quote
    const quote = quotesDB[Math.floor(Math.random() * quotesDB.length)]

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
    removeLoadingSpinner()
    
}


async function getQuotesFromAPI() {
    showLoadingSpinner()
    const apiUrl = "https://type.fit/api/quotes"
    try {
        const response = await fetch(apiUrl)
        quotesDB = await response.json()
        newQuote()

    } catch (error) {
        console.log("Whoops, API error", error)
        quotesDB = localQuotes
        newQuote()
    }
    
}

getQuotesFromAPI()


newQuoteBtn.addEventListener('click', newQuote)
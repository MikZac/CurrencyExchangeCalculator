const btn = document.querySelector('.exchange__btn')
const input = document.querySelector('.exchange__value')
const listBefore = document.querySelector('.before')
const listAfter = document.querySelector('.after')
const urlApi = `http://api.nbp.pl/api/exchangerates/rates/A/`

async function exchange  (){
    const inputValue = input.value;
    const currencyBefore = `https://api.nbp.pl/api/exchangerates/rates/A/${listBefore.value}/`
    const currencyAfter = `https://api.nbp.pl/api/exchangerates/rates/A/${listAfter.value}/`

    let firstCurrency;
    let secondCurrency;
    let firstCode = 'PLN';
    let secondCode = 'PLN';
    if(inputValue === "")
    {
        alert('Proszę podać kwotę!');
        return;
    }
    else 
    {
        if (listBefore.value === 'PLN' && listAfter.value !== 'PLN')
    {
        firstCurrency = 1;
        firstCode - 'PLN'
        try {
            const responseTwo = await fetch(currencyAfter);
        var rateSecond = await responseTwo.json();
        secondCurrency = (rateSecond.rates[0].mid);
        secondCode = rateSecond.code;
        }
        catch(error) {
            console.error('Błąd podczas pobierania danych:', error);
        }
        

    }
    else if (listAfter.value === 'PLN' && listBefore.value !== 'PLN')
    {   
        try{
            const responseOne = await fetch(currencyBefore);
        var rateFirst = await responseOne.json();
        firstCurrency = (rateFirst.rates[0].mid);
        secondCurrency = 1;
        firstCode = rateFirst.code;
        secondCode = 'PLN'
        }
        catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
        }
        
    }
    else if (listAfter.value === 'PLN' && listBefore.value === 'PLN')
    {
        firstCurrency = 1;
        secondCurrency = 1;
        firstCode = 'PLN'
        secondCode = 'PLN'
    }
    else {
        try {
            const responseOne = await fetch(currencyBefore);
        var rateFirst = await responseOne.json();
        firstCurrency = (rateFirst.rates[0].mid);
        firstCode = rateFirst.code

        const responseTwo = await fetch(currencyAfter);
        var rateSecond = await responseTwo.json();
        secondCurrency = (rateSecond.rates[0].mid);
        secondCode = rateSecond.code
        }
        catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
        }
        
    }
    }
    
    const factor = firstCurrency /secondCurrency;
    const answer = (inputValue * factor).toFixed(2);
    const valueFirstCodes = document.querySelectorAll('.first__code')
    valueFirstCodes.forEach(element => {
        element.textContent = firstCode;
    });
    const valueSecondCodes = document.querySelectorAll('.second__code')
    valueSecondCodes.forEach(element => {
        element.textContent = secondCode;
    });
    const amountBefore = document.querySelector('.amount-before')
    amountBefore.textContent = inputValue;
    const amountAfter = document.querySelector('.amount-after')
    amountAfter.textContent = answer;
    const Equal = document.querySelectorAll('.equal')
    Equal.forEach(element => {
        element.textContent = '=';
    });
    const ValueCurrency = document.querySelector('.value__currency')
    ValueCurrency.textContent = factor.toFixed(2);
    const info = document.querySelector('.info')
    info.textContent = 'według średniego kursu NBP'
    const firstValue = document.querySelector('.first__value')
    firstValue.textContent = '1.00'
     
    
    
   
}

btn.addEventListener('click', () => {;
    exchange();
})
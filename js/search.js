let input = document.querySelector('.search__input');
let searchContainer = document.querySelector('.search-container');
let searchArray = ['Coast Hotels', 'Kings Inn', 'Lustrio Inn', 'Moss View Hotel', 'Omni Hotels', 'Paramount Hotel', 'Primland', 'Roadside', 'Malibu Hotel', 'Happy Mornings Motel', 'Hillside Hotel', 'Small Town B & B', 'The Local B & B', 'Quaint Motel', 'Quality Hotels', 'Breeze Blows', 'La Parisienne', 'The Worldly Traveler', 'Quick Stop Hotel', 'Clean Convenience', 'Better And Better Hotel'];
let parant, count = 0;


function searchAutocomplete(query) {
    removeItem();

    if (!query) {
        return false;
    }

    if (count === 0) {
        parant = createContainer();
        searchContainer.appendChild(parant);
        count = 1;
    }

    let searchItems = createsearchItem(query, searchArray);
    searchItems.forEach((el) => {
        parant.appendChild(el);
    });

}

function createContainer() {
    let item = document.createElement('div');
    item.setAttribute('class', 'autocomplete');

    return item;
}

function createsearchItem(query, searchAr) {
    let item;
    let searchItem;
    let allItems = [];

    for (let i = 0; i < searchAr.length; i++) {

        let upQuery = query.toUpperCase();
        let upSearchKey = searchAr[i].toUpperCase();
        let htmlString;

        if (upSearchKey.includes(upQuery)) {

            // let n = Array.from(upSearchKey).findIndex((el) => el == Array.from(upQuery)[0]);

            // //search part
            // let searchPart = searchAr[i].substr(n, upQuery.length);

            // //remaning part
            // let remainingString = searchAr[i].substr((n + upQuery.length), searchAr[i].length);

            // //previous part
            // let iniPart = searchAr[i].substr(0, n + upQuery.length);
            // console.log(iniPart);
            // console.log(searchPart);
            // console.log(remainingString);

            // if (iniPart == searchPart) {
            //     //htmlString = iniPart+remainingString;
            //     htmlString = `<span><a href="#"><strong>${iniPart}</strong>${remainingString}</a></span>`;
            // }
            // else {
            //     //htmlString = iniPart + searchPart + remainingString;
            //     htmlString = `<span><a href="#">${iniPart}<strong>${Array.from(searchPart).splice(n,upQuery.length-1)}</strong>${remainingString}</a></span>`;

            // }

            // console.log(htmlString);

            //console.log(n);
            //console.log(searchAr[i],i);               

            searchItem = document.createElement('div');
            searchItem.setAttribute('class', 'autocomplete__search-term');
            searchItem.innerHTML = `<span><a href="#">${searchAr[i]}</a></span>`;
            searchItem.innerHTML += `<input type="hidden" value="${searchAr[i]}">`;

            searchItem.addEventListener('click',(e) => {
                input.value = e.target.textContent;
                removeItem();

            });
            
            allItems.push(searchItem);
        }
    }

    return allItems;
}

function removeItem() {
    let listItems = document.getElementsByClassName('autocomplete__search-term');
    let listArray = Array.from(listItems);

    listArray.forEach((el) => {
        //console.log(el);
        el.parentNode.removeChild(el);
    });

}

input.addEventListener('input', (e) => {
    searchContainer.classList.add('autocomplete__visible');

    searchAutocomplete(e.target.value);
});


document.addEventListener('click',(e) => {

         Array.from(searchContainer.childNodes).forEach(el=>{
             if (e.target != el && e.target != input)
            {
                removeItem();
            }
        });
});


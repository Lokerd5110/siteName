let filBtns = document.querySelectorAll(".filter-list li button");
let cards = document.querySelectorAll(".book-card");

let activeFilters = 0;
let btnFilters = [];
cards.forEach(()=>{
    btnFilters.push(0);
})

filBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (activeFilters === 0) {
            cards.forEach((card) => {
                card.classList.add('hidden');
            });
        }

        if (btn.classList.contains('active-button')) {
            btn.classList.remove('active-button');
            activeFilters--;
    
            if (activeFilters === 0) {
                cards.forEach((card) => {
                    card.classList.remove('hidden');
                });
            } else {
                for(let i = 0; i < cards.length; i++) {
                    if(cards[i].classList.contains(btn.className)){
                        btnFilters[i]--;
                        if(btnFilters[i] === 0) {
                            cards[i].classList.add('hidden');
                        }
                    }
                }
            }
        } else {
            for(let i = 0; i < cards.length; i++) {
                if(cards[i].classList.contains(btn.className)){
                    btnFilters[i]++;
                    cards[i].classList.remove('hidden');
                }
            }
    
            btn.classList.add('active-button');
            activeFilters++;
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Código para os produtos
    const sections = document.querySelectorAll('.produtos'); 

    sections.forEach(section => {
        const cards = section.querySelectorAll('.produto-group'); 
        const nextButton = section.querySelector('.next-button'); 
        const prevButton = section.querySelector('.prev-button'); 
        const dots = section.querySelectorAll('.dot'); 
        let currentIndex = 0; 

        function showCards(index) {
            cards.forEach((group, i) => {
                group.style.display = (i === index) ? 'flex' : 'none'; 
            });
            updateDots();
        }

        function updateDots() {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex); 
            });
        }

        nextButton.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                currentIndex++; 
            } else {
                currentIndex = 0; 
            }
            showCards(currentIndex); 
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--; 
            } else {
                currentIndex = cards.length - 1; 
            }
            showCards(currentIndex); 
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index; 
                showCards(currentIndex); 
            });
        });

        
        showCards(0);
    });

    
    const radios = document.querySelectorAll('input[name="carousel"]');
    let currentIndexBanner = 0;

    function changeSlide() {
        radios[currentIndexBanner].checked = true; 
        currentIndexBanner = (currentIndexBanner + 1) % radios.length; 
    }

    // Troca a imagem 
    setInterval(changeSlide, 3000); 

    // Código para o carrinho
    const carrinho = [];
    const totalDisplay = document.getElementById('total'); 
    const quantidadeDisplay = document.getElementById('quantidade'); 

    document.querySelectorAll('.produto-card button').forEach(button => {
        button.addEventListener('click', () => {
            const preco = parseFloat(button.parentElement.querySelector('p:nth-of-type(2)').innerText.replace('R$ ', '').replace(',', '.'));

            // Adiciona o produto no carrinho
            carrinho.push({ preco });
            atualizarCarrinho();
        });
    });

    function atualizarCarrinho() {
        let total = 0;
        let quantidade = carrinho.length;

        carrinho.forEach(produto => {
            total += produto.preco;
        });

        quantidadeDisplay.innerText = quantidade; 
        totalDisplay.innerText = `R$ ${total.toFixed(2)}`; 
    }
});

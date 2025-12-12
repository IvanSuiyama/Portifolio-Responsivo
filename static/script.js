const menuMobile = document.querySelector('.menu-mobile')
const body = document.querySelector('body')

menuMobile.addEventListener('click', () => {
    menuMobile.classList.contains("bi-list")
    ? menuMobile.classList.replace("bi-list", "bi-x")
    : menuMobile.classList.replace("bi-x", "bi-list");
    body.classList.toggle("menu-nav-active");
})

const navItem = document.querySelectorAll(".nav-item")

navItem.forEach(item => {
    item.addEventListener("click" , () =>{
        if (body.classList.contains("menu-nav-active")){
            body.classList.remove("menu-nav-active")
            menuMobile.classList.replace("bi-x", "bi-list")
        }
    })
})

// ===== SCROLL SUAVE PARA LINKS DO MENU =====
document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Remover active de todos os links
                menuLinks.forEach(l => l.classList.remove('active'));
                
                // Adicionar active no link clicado
                this.classList.add('active');
                
                // Remover classe visible dos elementos da seção para resetar animações
                const sectionElements = targetElement.querySelectorAll('.slide-up, .zoom-in, .cv-item, .portfolio-card, .progress');
                sectionElements.forEach(el => {
                    el.classList.remove('visible');
                    const progressBar = el.querySelector('.progress-bar');
                    if (progressBar) {
                        progressBar.classList.remove('animate');
                    }
                });
                
                // Fazer scroll primeiro
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Aguardar scroll terminar e depois disparar animações
                setTimeout(() => {
                    sectionElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('visible');
                            
                            // Animar barra de progresso se existir
                            if (el.classList.contains('progress')) {
                                const progressBar = el.querySelector('.progress-bar');
                                if (progressBar && !progressBar.classList.contains('animate')) {
                                    const targetWidth = progressBar.style.width;
                                    progressBar.style.setProperty('--target-width', targetWidth);
                                    progressBar.classList.add('animate');
                                }
                            }
                        }, index * 50); // Pequeno delay entre cada elemento
                    });
                }, 900); // Tempo para scroll terminar
            }
        });
    });
});

// ===== EFEITO DE DIGITAÇÃO (TYPEWRITER) =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    // Criar cursor
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    element.classList.add('typewriter');
    element.appendChild(cursor);
    
    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            const textNode = document.createTextNode(char);
            element.insertBefore(textNode, cursor);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.add('finished');
        }
    }
    
    type();
}

// Aplicar efeito de digitação ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Efeito no subtítulo da home
    const subtitle = document.querySelector('#subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 80);
        }, 500);
    }
    
    // Efeito de digitação na seção sobre (quando entrar no viewport)
    const sobreText = document.querySelector('#sobre-text');
    if (sobreText) {
        const originalText = sobreText.textContent.trim();
        const sobreObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.typed) {
                    entry.target.dataset.typed = 'true';
                    setTimeout(() => {
                        // Começar com metade da primeira linha (~80 caracteres)
                        const startPosition = Math.min(80, Math.floor(originalText.length * 0.15));
                        const initialText = originalText.substring(0, startPosition);
                        const remainingText = originalText.substring(startPosition);
                        
                        entry.target.textContent = initialText;
                        
                        // Continuar digitando o restante
                        let i = 0;
                        const cursor = document.createElement('span');
                        cursor.className = 'typewriter-cursor';
                        entry.target.classList.add('typewriter');
                        entry.target.appendChild(cursor);
                        
                        function type() {
                            if (i < remainingText.length) {
                                const char = remainingText.charAt(i);
                                const textNode = document.createTextNode(char);
                                entry.target.insertBefore(textNode, cursor);
                                i++;
                                setTimeout(type, 8);
                            } else {
                                entry.target.classList.add('finished');
                            }
                        }
                        
                        type();
                    }, 300);
                    sobreObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        sobreObserver.observe(sobreText);
    }
});

// ===== INTERSECTION OBSERVER PARA ANIMAÇÕES AO SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px 100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Se for barra de progresso, animar
            if (entry.target.classList.contains('progress')) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar && !progressBar.classList.contains('animate')) {
                    const targetWidth = progressBar.style.width;
                    progressBar.style.setProperty('--target-width', targetWidth);
                    progressBar.classList.add('animate');
                }
            }
        }
    });
}, observerOptions);

// Observar elementos quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    // Observar seção sobre
    const sobreElements = document.querySelectorAll('#sobre .slide-up, #sobre .zoom-in');
    sobreElements.forEach(el => observer.observe(el));
    
    // Observar barras de progresso
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => observer.observe(bar));
    
    // Observar items do currículo com observer otimizado
    const cvObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px 100px 0px'
    });
    
    const cvItems = document.querySelectorAll('.cv-item');
    cvItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
        cvObserver.observe(item);
    });
    
    // Observar cards do portfólio
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        const delay = card.getAttribute('data-delay') || '0';
        card.style.transitionDelay = `${delay}s`;
        observer.observe(card);
    });
    
    // Observar seção de contato
    const contatoElements = document.querySelectorAll('#contato .slide-up');
    contatoElements.forEach(el => observer.observe(el));
});

// ===== MODAL DE IMAGENS =====
document.addEventListener('DOMContentLoaded', () => {
    // Criar modal
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <div class="modal-content-image">
            <img src="" alt="Imagem ampliada">
        </div>
    `;
    document.body.appendChild(modal);
    
    const modalImg = modal.querySelector('.modal-content-image img');
    const closeBtn = modal.querySelector('.close-modal');
    
    // Adicionar evento de click em todas as imagens do portfólio
    const portfolioImages = document.querySelectorAll('#portifolio img');
    portfolioImages.forEach(img => {
        img.classList.add('clickable-image');
        img.addEventListener('click', () => {
            modal.classList.add('show');
            modalImg.src = img.src;
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Fechar modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    // Fechar ao clicar fora da imagem
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});

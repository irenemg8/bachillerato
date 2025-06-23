// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animación del icono hamburguesa
            hamburger.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Funcionalidad de acordeones para secciones de año
    const yearHeaders = document.querySelectorAll('.year-header');
    
    yearHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const yearSection = this.parentElement;
            const yearContent = yearSection.querySelector('.year-content');
            const toggle = this.querySelector('.year-toggle');
            
            // Toggle del contenido
            yearContent.classList.toggle('active');
            
            // Rotar icono
            if (yearContent.classList.contains('active')) {
                toggle.style.transform = 'rotate(180deg)';
            } else {
                toggle.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Funcionalidad de acordeones para temas
    const topicHeaders = document.querySelectorAll('.topic-header');
    
    topicHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const topicCard = this.parentElement;
            const topicContent = topicCard.querySelector('.topic-content');
            const toggle = this.querySelector('.topic-toggle');
            
            // Toggle del contenido
            topicContent.classList.toggle('active');
            
            // Rotar icono
            if (topicContent.classList.contains('active')) {
                toggle.style.transform = 'rotate(180deg)';
            } else {
                toggle.style.transform = 'rotate(0deg)';
            }
            
            // Cerrar otros acordeones abiertos (opcional)
            topicHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherContent = otherHeader.parentElement.querySelector('.topic-content');
                    const otherToggle = otherHeader.querySelector('.topic-toggle');
                    
                    if (otherContent.classList.contains('active')) {
                        otherContent.classList.remove('active');
                        otherToggle.style.transform = 'rotate(0deg)';
                    }
                }
            });
        });
    });

    // Funcionalidad de acordeones para subtemas
    const subtopicHeaders = document.querySelectorAll('.subtopic-header');
    
    subtopicHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const subtopicCard = this.parentElement;
            const subtopicContent = subtopicCard.querySelector('.subtopic-content');
            const toggle = this.querySelector('.subtopic-toggle');
            
            // Toggle del contenido
            subtopicContent.classList.toggle('active');
            
            // Rotar icono
            if (subtopicContent.classList.contains('active')) {
                toggle.style.transform = 'rotate(180deg)';
            } else {
                toggle.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Funcionalidad de búsqueda (si se añade en el futuro)
    function initializeSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const resourceItems = document.querySelectorAll('.resource-item');
                
                resourceItems.forEach(item => {
                    const title = item.querySelector('h4').textContent.toLowerCase();
                    const description = item.querySelector('p').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
    }

    // Smooth scroll para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Marcar enlace activo en navegación
    function updateActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    updateActiveNav();

    // Animación de entrada para las tarjetas
    function animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        const cards = document.querySelectorAll('.subject-card, .topic-card, .resource-item');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // Inicializar animaciones solo si hay elementos para animar
    if (document.querySelectorAll('.subject-card, .topic-card').length > 0) {
        animateOnScroll();
    }

    // Funcionalidad para abrir enlaces externos en nueva pestaña
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Tooltip simple para iconos (opcional)
    function addTooltips() {
        const icons = document.querySelectorAll('.resource-icon');
        icons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                // Aquí se puede añadir lógica para mostrar tooltips
            });
        });
    }

    // Función para mostrar notificaciones (para futuras funcionalidades)
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--accent-color);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: var(--shadow);
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Exportar funciones para uso global
    window.showNotification = showNotification;
    window.initializeSearch = initializeSearch;
});

// CSS para animaciones de notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style); 
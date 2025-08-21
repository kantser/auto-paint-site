// AutoPaint Pro - JavaScript Application
class AutoPaintApp {
    constructor() {
        this.isAdminLoggedIn = false;
        this.currentAdminSection = 'portfolio-admin';
        this.portfolioFilter = 'all';
        
        // Initialize data from provided JSON
        this.data = {
            services: [
                {
                    id: 1,
                    title: "Full painting of the car",
                    description: "Professional full painting of the body with a 3-year warranty. We use high-quality materials and modern equipment.",
                    price: "from 85 000 rub",
                    icon: "🚗",
                    features: ["Body preparation", "Grounding", "Painting in the chamber", "Polishing"]
                },
                {
                    id: 2,
                    title: "Local painting",
                    description: "Restoration of individual elements of the body: wings, doors, bumpers with precise color selection.",
                    price: "from 5 500 rub",
                    icon: "🎨",
                    features: ["Color selection", "Painting transition", "Quick execution"]
                },
                {
                    id: 3,
                    title: "Body repair",
                    description: "Removal of dents, scratches, rust with subsequent painting. Returning the car to its original appearance.",
                    price: "from 3 500 rub",
                    icon: "🔧",
                    features: ["Removal of dents", "Removal of rust", "Shpatlivanie", "Painting"]
                },
                {
                    id: 4,
                    title: "Disk painting",
                    description: "Restoration and painting of cast and stamped disks in any color. Porcelain painting with increased durability.",
                    price: "from 2 000 rub/disk",
                    icon: "⚙️",
                    features: ["Porcelain painting", "Any colors", "High durability"]
                },
                {
                    id: 5,
                    title: "Protective coatings",
                    description: "Application of protective coatings: antigravity, raptor, liquid resin for protecting the body from damage.",
                    price: "from 25 000 rub",
                    icon: "🛡️",
                    features: ["Antigravity protection", "Raptor coating", "Liquid resin"]
                },
                {
                    id: 6,
                    title: "Polishing",
                    description: "Restorative and protective polishing. Removal of scratches, giving shine and protecting lacquer coating.",
                    price: "from 8 000 rub",
                    icon: "✨",
                    features: ["Removal of scratches", "Restoration of shine", "Protective polishing"]
                }
            ],
            portfolio: [
                {
                    id: 1,
                    title: "Toyota Camry - Full painting",
                    type: "Full painting",
                    description: "Restoration after an accident with full repainting in the original color. All body damage has been removed.",
                    beforeImage: "https://pplx-res.cloudinary.com/image/upload/v1755619716/pplx_project_search_images/91eb051571c5d522ede288db60db35e9b61ca3dc.png",
                    afterImage: "https://pplx-res.cloudinary.com/image/upload/v1755619717/pplx_project_search_images/2cc3d7df723cb32ba32c4936acaf42403fd4c29f.png",
                    completedDate: "2024-01-15"
                },
                {
                    id: 2,
                    title: "BMW X5 - Local painting",
                    type: "Local painting",
                    description: "Removal of deep scratches on the front wing with transition painting.",
                    beforeImage: "https://pplx-res.cloudinary.com/image/upload/v1755619716/pplx_project_search_images/91eb051571c5d522ede288db60db35e9b61ca3dc.png",
                    afterImage: "https://pplx-res.cloudinary.com/image/upload/v1755619717/pplx_project_search_images/2cc3d7df723cb32ba32c4936acaf42403fd4c29f.png",
                    completedDate: "2024-01-20"
                },
                {
                    id: 3,
                    title: "Mercedes C-Class - Body repair",
                    type: "Repair",
                    description: "Removal of a dent on the rear door with subsequent repainting in the body color.",
                    beforeImage: "https://pplx-res.cloudinary.com/image/upload/v1755619716/pplx_project_search_images/91eb051571c5d522ede288db60db35e9b61ca3dc.png",
                    afterImage: "https://pplx-res.cloudinary.com/image/upload/v1755619717/pplx_project_search_images/2cc3d7df723cb32ba32c4936acaf42403fd4c29f.png",
                    completedDate: "2024-01-25"
                },
                {
                    id: 4,
                    title: "Audi A4 - Local painting",
                    type: "Local painting",
                    description: "Restoration of the front bumper after a minor accident with full repainting.",
                    beforeImage: "https://pplx-res.cloudinary.com/image/upload/v1755619716/pplx_project_search_images/91eb051571c5d522ede288db60db35e9b61ca3dc.png",
                    afterImage: "https://pplx-res.cloudinary.com/image/upload/v1755619717/pplx_project_search_images/2cc3d7df723cb32ba32c4936acaf42403fd4c29f.png",
                    completedDate: "2024-02-01"
                }
            ],
            gallery: [
                {
                    id: 1,
                    title: "Painting chamber",
                    description: "Modern painting chamber with air filtration system",
                    image: "https://pplx-res.cloudinary.com/image/upload/v1755619716/pplx_project_search_images/190a961758ae3c7698792f37eb864ac8b7953827.png"
                },
                {
                    id: 2,
                    title: "Painting process",
                    description: "Master applies paint following all technologies",
                    image: "https://pplx-res.cloudinary.com/image/upload/v1755619717/pplx_project_search_images/daca55eb2b84aca27aee3ed331baebc7336303a2.png"
                },
                {
                    id: 3,
                    title: "Body preparation",
                    description: "Careful preparation of the surface before painting",
                    image: "https://pplx-res.cloudinary.com/image/upload/v1755619716/pplx_project_search_images/bde962a40a5e485a55ec8ebb01d1c882e4b74678.png"
                },
                {
                    id: 4,
                    title: "Professional equipment",
                    description: "We use only modern equipment of high class",
                    image: "https://pplx-res.cloudinary.com/image/upload/v1755619716/pplx_project_search_images/392bf2e5f01abf6b36f13f69ebb6876a445c1fc8.png"
                },
                {
                    id: 5,
                    title: "Quality materials",
                    description: "We work only with verified brands of paints and materials",
                    image: "https://pplx-res.cloudinary.com/image/upload/v1755619716/pplx_project_search_images/d20074e547adda498e818ff8991c513b06d83c6e.png"
                }
            ],
            requests: []
        };

        this.init();
    }

    init() {
        this.renderServices();
        this.renderPortfolio();
        this.renderGallery();
        this.setupEventListeners();
        this.updateStats();
    }

    setupEventListeners() {
        // Navigation smooth scroll - Wait for DOM to be ready
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav__link');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }, 100);

        // Contact form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(e);
            });
        }

        // Admin login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAdminLogin(e);
            });
        }

        // Portfolio filters - Wait for DOM to be ready
        setTimeout(() => {
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.handlePortfolioFilter(e);
                });
            });
        }, 100);

        // Hero CTA button
        setTimeout(() => {
            const heroCTA = document.querySelector('.hero__cta');
            if (heroCTA) {
                heroCTA.addEventListener('click', () => {
                    const contactsSection = document.getElementById('contacts');
                    if (contactsSection) {
                        contactsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
        }, 100);
    }

    renderServices() {
        const servicesGrid = document.getElementById('services-grid');
        if (!servicesGrid) return;
        
        servicesGrid.innerHTML = '';

        this.data.services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card fade-in';
            serviceCard.innerHTML = `
                <div class="service-card__icon">${service.icon}</div>
                <h3 class="service-card__title">${service.title}</h3>
                <p class="service-card__description">${service.description}</p>
                <div class="service-card__price">${service.price}</div>
                <ul class="service-card__features">
                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            `;
            servicesGrid.appendChild(serviceCard);
        });
    }

    renderPortfolio() {
        const portfolioGrid = document.getElementById('portfolio-grid');
        if (!portfolioGrid) return;
        
        portfolioGrid.innerHTML = '';

        const filteredPortfolio = this.portfolioFilter === 'all' 
            ? this.data.portfolio 
            : this.data.portfolio.filter(item => item.type === this.portfolioFilter);

        filteredPortfolio.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item fade-in';
            portfolioItem.innerHTML = `
                <div class="portfolio-item__images">
                    <div class="portfolio-item__image" data-label="До">
                        <img src="${item.beforeImage}" alt="${item.title} - До" loading="lazy">
                    </div>
                    <div class="portfolio-item__image" data-label="После">
                        <img src="${item.afterImage}" alt="${item.title} - После" loading="lazy">
                    </div>
                </div>
                <div class="portfolio-item__content">
                    <h3 class="portfolio-item__title">${item.title}</h3>
                    <span class="portfolio-item__type">${item.type}</span>
                    <p class="portfolio-item__description">${item.description}</p>
                    <div class="portfolio-item__date">Завершено: ${new Date(item.completedDate).toLocaleDateString('ru-RU')}</div>
                </div>
            `;
            
            // Add click events to images for modal
            const beforeImage = portfolioItem.querySelector('.portfolio-item__image:first-child');
            const afterImage = portfolioItem.querySelector('.portfolio-item__image:last-child');
            
            if (beforeImage) {
                beforeImage.addEventListener('click', () => {
                    window.openModal(item.beforeImage, `${item.title} - До ремонта`);
                });
            }
            
            if (afterImage) {
                afterImage.addEventListener('click', () => {
                    window.openModal(item.afterImage, `${item.title} - После ремонта`);
                });
            }
            
            portfolioGrid.appendChild(portfolioItem);
        });
    }

    renderGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = '';

        this.data.gallery.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item fade-in';
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-item__overlay">
                    <h4 class="gallery-item__title">${item.title}</h4>
                    <p class="gallery-item__description">${item.description}</p>
                </div>
            `;
            
            // Add click event for modal
            galleryItem.addEventListener('click', () => {
                window.openModal(item.image, item.title);
            });
            
            galleryGrid.appendChild(galleryItem);
        });
    }

    handleContactForm(e) {
        const request = {
            id: Date.now(),
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
            date: new Date().toISOString()
        };

        this.data.requests.push(request);
        
        // Reset form
        e.target.reset();
        
        // Show success message
        alert('Your application has been successfully submitted! We will contact you soon.');
        
        this.updateStats();
    }

    handleAdminLogin(e) {
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;

        if (username === 'admin' && password === 'admin123') {
            this.isAdminLoggedIn = true;
            document.getElementById('admin-login').classList.add('hidden');
            document.getElementById('admin-dashboard').classList.remove('hidden');
            this.renderAdminSections();
        } else {
            alert('Invalid username or password!');
        }
    }

    handlePortfolioFilter(e) {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Update filter and re-render portfolio
        this.portfolioFilter = e.target.dataset.filter;
        this.renderPortfolio();
    }

    renderAdminSections() {
        this.renderAdminPortfolio();
        this.renderAdminGallery();
        this.renderAdminRequests();
        this.updateStats();
    }

    renderAdminPortfolio() {
        const container = document.getElementById('admin-portfolio-list');
        if (!container) return;
        
        container.innerHTML = '';

        this.data.portfolio.forEach(item => {
            const adminItem = document.createElement('div');
            adminItem.className = 'admin-item';
            adminItem.innerHTML = `
                <div class="admin-item__info">
                    <h4>${item.title}</h4>
                    <p>${item.type} • ${new Date(item.completedDate).toLocaleDateString('ru-RU')}</p>
                </div>
                <div class="admin-item__actions">
                    <button class="btn btn--sm btn--outline" onclick="app.editPortfolioItem(${item.id})">Edit</button>
                    <button class="btn btn--sm btn--danger" onclick="app.deletePortfolioItem(${item.id})">Delete</button>
                </div>
            `;
            container.appendChild(adminItem);
        });
    }

    renderAdminGallery() {
        const container = document.getElementById('admin-gallery-list');
        if (!container) return;
        
        container.innerHTML = '';

        this.data.gallery.forEach(item => {
            const adminItem = document.createElement('div');
            adminItem.className = 'admin-item';
            adminItem.innerHTML = `
                <div class="admin-item__info">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
                <div class="admin-item__actions">
                    <button class="btn btn--sm btn--outline" onclick="app.editGalleryItem(${item.id})">Edit</button>
                    <button class="btn btn--sm btn--danger" onclick="app.deleteGalleryItem(${item.id})">Delete</button>
                </div>
            `;
            container.appendChild(adminItem);
        });
    }

    renderAdminRequests() {
        const container = document.getElementById('admin-requests-list');
        if (!container) return;
        
        container.innerHTML = '';

        if (this.data.requests.length === 0) {
            container.innerHTML = '<p>No requests yet</p>';
            return;
        }

        this.data.requests.forEach(request => {
            const adminItem = document.createElement('div');
            adminItem.className = 'admin-item';
            adminItem.innerHTML = `
                <div class="admin-item__info">
                    <h4>${request.name} - ${request.service}</h4>
                    <p>Phone: ${request.phone} • Email: ${request.email || 'not specified'}</p>
                    <p>Message: ${request.message || 'not specified'}</p>
                    <p><small>Date: ${new Date(request.date).toLocaleString('ru-RU')}</small></p>
                </div>
                <div class="admin-item__actions">
                    <button class="btn btn--sm btn--danger" onclick="app.deleteRequest(${request.id})">Delete</button>
                </div>
            `;
            container.appendChild(adminItem);
        });
    }

    updateStats() {
        const portfolioCount = document.getElementById('portfolio-count');
        const galleryCount = document.getElementById('gallery-count');
        const requestsCount = document.getElementById('requests-count');
        
        if (portfolioCount) portfolioCount.textContent = this.data.portfolio.length;
        if (galleryCount) galleryCount.textContent = this.data.gallery.length;
        if (requestsCount) requestsCount.textContent = this.data.requests.length;
    }

    deletePortfolioItem(id) {
        if (confirm('Delete this work from portfolio?')) {
            this.data.portfolio = this.data.portfolio.filter(item => item.id !== id);
            this.renderAdminPortfolio();
            this.renderPortfolio();
            this.updateStats();
        }
    }

    deleteGalleryItem(id) {
        if (confirm('Delete this photo from gallery?')) {
            this.data.gallery = this.data.gallery.filter(item => item.id !== id);
            this.renderAdminGallery();
            this.renderGallery();
            this.updateStats();
        }
    }

    deleteRequest(id) {
        if (confirm('Delete this request?')) {
            this.data.requests = this.data.requests.filter(request => request.id !== id);
            this.renderAdminRequests();
            this.updateStats();
        }
    }

    editPortfolioItem(id) {
        const item = this.data.portfolio.find(p => p.id === id);
        if (!item) return;

        const formHtml = `
            <h3>Edit work</h3>
            <form id="edit-portfolio-form">
                <div class="form-group">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-control" name="title" value="${item.title}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Type of work</label>
                    <select class="form-control" name="type" required>
                        <option value="Full painting" ${item.type === 'Full painting' ? 'selected' : ''}>Full painting</option>
                        <option value="Local painting" ${item.type === 'Local painting' ? 'selected' : ''}>Local painting</option>
                        <option value="Repair" ${item.type === 'Repair' ? 'selected' : ''}>Repair</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" name="description" required>${item.description}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Photo "Before" (URL)</label>
                    <input type="url" class="form-control" name="beforeImage" value="${item.beforeImage}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Photo "After" (URL)</label>
                    <input type="url" class="form-control" name="afterImage" value="${item.afterImage}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Completion date</label>
                    <input type="date" class="form-control" name="completedDate" value="${item.completedDate}" required>
                </div>
                <div class="flex gap-16">
                    <button type="submit" class="btn btn--primary">Save</button>
                    <button type="button" onclick="window.closeFormModal()" class="btn btn--outline">Cancel</button>
                </div>
            </form>
        `;

        document.getElementById('form-modal-content').innerHTML = formHtml;
        document.getElementById('form-modal').classList.remove('hidden');

        document.getElementById('edit-portfolio-form').onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            Object.assign(item, {
                title: formData.get('title'),
                type: formData.get('type'),
                description: formData.get('description'),
                beforeImage: formData.get('beforeImage'),
                afterImage: formData.get('afterImage'),
                completedDate: formData.get('completedDate')
            });

            this.renderAdminPortfolio();
            this.renderPortfolio();
            window.closeFormModal();
        };
    }

    editGalleryItem(id) {
        const item = this.data.gallery.find(g => g.id === id);
        if (!item) return;

        const formHtml = `
            <h3>Edit photo</h3>
            <form id="edit-gallery-form">
                <div class="form-group">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-control" name="title" value="${item.title}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" name="description" required>${item.description}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Image (URL)</label>
                    <input type="url" class="form-control" name="image" value="${item.image}" required>
                </div>
                <div class="flex gap-16">
                    <button type="submit" class="btn btn--primary">Save</button>
                    <button type="button" onclick="window.closeFormModal()" class="btn btn--outline">Cancel</button>
                </div>
            </form>
        `;

        document.getElementById('form-modal-content').innerHTML = formHtml;
        document.getElementById('form-modal').classList.remove('hidden');

        document.getElementById('edit-gallery-form').onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            Object.assign(item, {
                title: formData.get('title'),
                description: formData.get('description'),
                image: formData.get('image')
            });

            this.renderAdminGallery();
            this.renderGallery();
            window.closeFormModal();
        };
    }
}

// Global functions that need to be available on window
window.showAdminLogin = function() {
    document.getElementById('admin-panel').classList.remove('hidden');
    document.getElementById('main-site').style.display = 'none';
}

window.hideAdminPanel = function() {
    document.getElementById('admin-panel').classList.add('hidden');
    document.getElementById('main-site').style.display = 'block';
}

window.logout = function() {
    if (window.app) {
        window.app.isAdminLoggedIn = false;
    }
    document.getElementById('admin-login').classList.remove('hidden');
    document.getElementById('admin-dashboard').classList.add('hidden');
    document.getElementById('admin-username').value = '';
    document.getElementById('admin-password').value = '';
}

window.showAdminSection = function(sectionId) {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.querySelectorAll('.admin-nav__btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
    
    // Find the button that was clicked and make it active
    const clickedButton = event.target;
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
    
    if (window.app) {
        window.app.currentAdminSection = sectionId;
    }
}

window.showAddPortfolioForm = function() {
    const formHtml = `
        <h3>Добавить новую работу</h3>
        <form id="add-portfolio-form">
            <div class="form-group">
                <label class="form-label">Название</label>
                <input type="text" class="form-control" name="title" required>
            </div>
            <div class="form-group">
                <label class="form-label">Тип работы</label>
                <select class="form-control" name="type" required>
                    <option value="">Выберите тип</option>
                    <option value="Полная покраска">Полная покраска</option>
                    <option value="Локальная покраска">Локальная покраска</option>
                    <option value="Ремонт">Ремонт</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Описание</label>
                <textarea class="form-control" name="description" required></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Фото "До" (URL)</label>
                <input type="url" class="form-control" name="beforeImage" required>
            </div>
            <div class="form-group">
                <label class="form-label">Фото "После" (URL)</label>
                <input type="url" class="form-control" name="afterImage" required>
            </div>
            <div class="form-group">
                <label class="form-label">Дата завершения</label>
                <input type="date" class="form-control" name="completedDate" required>
            </div>
            <div class="flex gap-16">
                <button type="submit" class="btn btn--primary">Добавить</button>
                <button type="button" onclick="window.closeFormModal()" class="btn btn--outline">Отмена</button>
            </div>
        </form>
    `;

    document.getElementById('form-modal-content').innerHTML = formHtml;
    document.getElementById('form-modal').classList.remove('hidden');

    document.getElementById('add-portfolio-form').onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newItem = {
            id: Date.now(),
            title: formData.get('title'),
            type: formData.get('type'),
            description: formData.get('description'),
            beforeImage: formData.get('beforeImage'),
            afterImage: formData.get('afterImage'),
            completedDate: formData.get('completedDate')
        };

        if (window.app) {
            window.app.data.portfolio.push(newItem);
            window.app.renderAdminPortfolio();
            window.app.renderPortfolio();
            window.app.updateStats();
        }
        window.closeFormModal();
    };
}

window.showAddGalleryForm = function() {
    const formHtml = `
        <h3>Добавить новое фото</h3>
        <form id="add-gallery-form">
            <div class="form-group">
                <label class="form-label">Название</label>
                <input type="text" class="form-control" name="title" required>
            </div>
            <div class="form-group">
                <label class="form-label">Описание</label>
                <textarea class="form-control" name="description" required></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Изображение (URL)</label>
                <input type="url" class="form-control" name="image" required>
            </div>
            <div class="flex gap-16">
                <button type="submit" class="btn btn--primary">Добавить</button>
                <button type="button" onclick="window.closeFormModal()" class="btn btn--outline">Отмена</button>
            </div>
        </form>
    `;

    document.getElementById('form-modal-content').innerHTML = formHtml;
    document.getElementById('form-modal').classList.remove('hidden');

    document.getElementById('add-gallery-form').onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newItem = {
            id: Date.now(),
            title: formData.get('title'),
            description: formData.get('description'),
            image: formData.get('image')
        };

        if (window.app) {
            window.app.data.gallery.push(newItem);
            window.app.renderAdminGallery();
            window.app.renderGallery();
            window.app.updateStats();
        }
        window.closeFormModal();
    };
}

window.openModal = function(imageSrc, caption) {
    document.getElementById('modal-image').src = imageSrc;
    document.getElementById('modal-caption').textContent = caption;
    document.getElementById('image-modal').classList.remove('hidden');
}

window.closeModal = function() {
    document.getElementById('image-modal').classList.add('hidden');
}

window.closeFormModal = function() {
    document.getElementById('form-modal').classList.add('hidden');
}

// Initialize application
window.app = null;

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AutoPaintApp();
    
    // Setup fade-in animation observer after a short delay
    setTimeout(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }, 500);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--color-white)';
            header.style.backdropFilter = 'none';
        }
    }
});
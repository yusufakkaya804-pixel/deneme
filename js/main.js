// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    
    // Welcome Screen Logic
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen) {
        setTimeout(() => {
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                welcomeScreen.style.visibility = 'hidden';
            }, 1000);
        }, 3000);
    }

    // SPA Navigation Logic
    const views = {
        home: document.getElementById('view-home'),
        category: document.getElementById('view-category'),
        product: document.getElementById('view-product')
    };

    function showView(viewName) {
        window.scrollTo(0, 0);
        for (let key in views) {
            if (views[key]) {
                views[key].classList.remove('active');
            }
        }
        if (views[viewName]) {
            views[viewName].classList.add('active');
        }
    }

    // Handle Category Clicks (Home -> Category)
    const categoryLinks = document.querySelectorAll('.open-category');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const catId = link.getAttribute('data-category');
            const catTitle = link.getAttribute('data-title');
            
            // Update Category View Title
            document.getElementById('cat-view-title').textContent = catTitle;
            
            // Hide all product lists, show the relevant one
            document.querySelectorAll('.product-list-container').forEach(list => {
                list.style.display = 'none';
            });
            const targetList = document.getElementById('list-' + catId);
            if (targetList) {
                targetList.style.display = 'flex';
            }
            
            showView('category');
        });
    });

    // Handle Product Clicks (Category -> Product)
    const productLinks = document.querySelectorAll('.open-product');
    productLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Populate Product Detail View
            document.getElementById('prod-detail-img').src = link.getAttribute('data-img');
            document.getElementById('prod-detail-title').textContent = link.getAttribute('data-title');
            document.getElementById('prod-detail-price').textContent = link.getAttribute('data-price') + ' ₺';
            document.getElementById('prod-detail-desc').innerHTML = link.getAttribute('data-desc');
            
            const allergens = link.getAttribute('data-allergens');
            const calories = link.getAttribute('data-calories');
            
            // Allergens
            const allergenContainer = document.getElementById('prod-detail-allergens');
            if (allergens) {
                allergenContainer.style.display = 'block';
                const arr = allergens.split(',');
                let html = '';
                arr.forEach(a => {
                    html += `<span class="badge bg-danger bg-opacity-75 border border-danger me-1">${a.trim()}</span>`;
                });
                document.getElementById('allergens-wrapper').innerHTML = html;
            } else {
                allergenContainer.style.display = 'none';
            }
            
            // Calories
            const calContainer = document.getElementById('prod-detail-calories');
            if (calories) {
                calContainer.style.display = 'block';
                document.getElementById('calories-val').textContent = calories;
            } else {
                calContainer.style.display = 'none';
            }

            // Sold Out Check
            const isSoldOut = link.getAttribute('data-soldout') === 'true';
            document.getElementById('prod-detail-soldout').style.display = isSoldOut ? 'flex' : 'none';

            showView('product');
        });
    });

    // Back Buttons
    document.getElementById('btn-back-home').addEventListener('click', (e) => {
        e.preventDefault();
        showView('home');
    });

    document.getElementById('btn-back-category').addEventListener('click', (e) => {
        e.preventDefault();
        showView('category');
    });
});

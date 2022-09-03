const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
}

const displayCategory = (categorys) => {
    console.log(categorys);
    const categoryContainer = document.getElementById('category-container');
    categorys.forEach(category => {
        console.log(category);
        const categoryDiv = document.createElement('div')
        // categoryDiv.classList.add( fs-4'fw-semibold')
        categoryDiv.innerHTML = `
        <a class="fs-5 fw-semibold">${category.category_name}</a>
        `;
        categoryContainer.appendChild(categoryDiv);
    });
}
loadCategory();
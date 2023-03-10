const loadCategory = () => {

    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error))
}

const displayCategory = (categorys) => {
    const categoryContainer = document.getElementById('category-container');
    categorys.forEach(category => {
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML = `
        <a class="fs-5 fw-semibold" onclick="loadCategoryNews('${category.category_id}')">${category.category_name}</a>
        `;
        categoryContainer.appendChild(categoryDiv);
    });
}

const loadCategoryNews = (categoryId) => {
    // spinner start
    toggleSpinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryNews(data.data))
}

const displayCategoryNews = (newsAll) => {
    const newsNumber = document.getElementById('newsNumber');
    newsNumber.innerText = `${newsAll.length} items found`

    // sorting
    newsAll.sort(function (a, b) {
        return b.total_view - a.total_view;
    });

    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML = '';
    newsAll.forEach(news => {
        const newsDiv = document.createElement('div')
        newsDiv.classList.add('card', 'mb-5')
        newsDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-3">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start p-4" alt="...">
            </div>
            <div class="col-md-9">
                <div class="card-body">
                    <h5 class="card-title fs-5 fw-bold my-3">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0, 300)}</p>

                    <div class="mt-4 d-flex justify-content-between fw-semibold">

                    <div class"d-flex justify-content-between">
                    <img src="${news.author.img}" style="height: 80px;" class="rounded-circle">
                    <span>
                    <p>Name : ${news.author.name ? news.author.name : 'Not found'}</p>
                    <p>Date : ${news.author.published_date ? news.author.published_date : 'Not found'}</p>
                    </span>
                    </div>

                    <div>
                    <p>view : ${news.total_view ? news.total_view : 'Not found'}</p>
                    </div>

                    <div>
                    <button class="btn btn-primary fw-bold px-4 py-2" onclick="loadNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsModal">Details</button>
                    </div>

                    </div>
                </div>
            </div>
        </div>
            `;
        newsContainer.appendChild(newsDiv)
    });
    // spinner end
    toggleSpinner(false)
}

const loadNewsDetails = (newsId) => {
    const url = ` https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displyNewsDetails(data.data[0]))
}

const displyNewsDetails = (newsDetails) => {

    const newsModalTitle = document.getElementById('newsModalLabel')
    newsModalTitle.innerText = newsDetails.title;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img class="w-100" src="${newsDetails.thumbnail_url}">
    <p class="mt-3 ms-2 text-dark fw-semibold fs-5">view : ${newsDetails.total_view}</p>
    `;

}

const toggleSpinner = isLoading => {
    const loder = document.getElementById('loder')
    if (isLoading) {
        loder.classList.remove('d-none')
    }
    else {
        loder.classList.add('d-none')
    }
}

loadCategory();

const blogs = () => {
    location.href = "blog.html";
}

"use strict";

// --------
movies.splice(100);
// ----------

const categoryOption = $("#category");
const moviesWrapper = $(".movies");
let inputSearch = $("#search");
let darkMode = $(".dark-btn");
let body = $("body")


// -------
const allMovies = movies.map((el) => {
  return {
    title: el.title,
    year: el.year,
    category: el.categories,
    id: el.imdbId,
    rating: el.imdbRating,
    time: `${Math.trunc(el.runtime / 60)} H , ${Math.trunc(el.runtime % 60)} m`,
    language: el.language,
    youtube: `https://www.youtube.com/embed/${el.youtubeId}`,
    summary: el.summary,
    minImage: el.smallThumbnail,
    maxImage: el.bigThumbnail,
  };
});

// -----------

function getCatecory(moviesList) {
  const category = [];

  if (moviesList.length) {
    moviesList.forEach((el) => {
      el.category.forEach((e) => {
        if (!category.includes(e)) {
          category.push(e);
        }
      });
    });
  }
  render(category);
}

getCatecory(allMovies);
// -----------

function render(data) {
  if (data.length) {
    data.sort();
    data.forEach((el) => {
      const option = createElement("option", "", el);

      categoryOption.appendChild(option);
    });
  }
}

// --------

function renderAllMovies(moviesList) {
  if (moviesList.length) {
    moviesList.forEach((el) => {
      const card = createElement(
        "div",
        "card",
        `
              
                          <img src="${el.minImage}" alt="smth">
                          <div class="card-body">
                            <h2>${
                              el.title.length > 10
                                ? el.title.substring(0, 12) + "..."
                                : el.title
                            }
                            </h2>
                              <ul>
                                  <li><strong>Year:</strong> ${el.year}</li>
                                  <li><strong>Categories:</strong>${
                                    el.category
                                  }</li>
                                  <li><strong>Rating:</strong>${el.rating}</li>
                                  <li><strong>Language:</strong>${
                                    el.language
                                  }</li>
                              </ul>
              
                              <div class="flex btn-wrappeer items-center gap-x-3">
              
                                  <button
                                      data-like=${el.id}
                                      class="grid hover:bg-red-700 hover:text-white duration-500 text-red-700 place-content-center p-4 border w-12 h-12 rounded-full darkMode-btn2">
                                      <i class="bi bi-suit-heart-fill "></i>
                                  </button>
              
                                  <a href="${
                                    el.youtube
                                  }" target="_blank" class="flex hover:bg-black hover:text-white duration-500  justify-center gap-x-2 text-xl items-center border min-w-24 px-3 h-12 rounded-full darkMode-btn1">
                                      <i class="bi bi-play-circle-fill"></i>
                                      <span>watch movie</span>
                                  </a>
                              </div>
              
                          </div>`
      );

      moviesWrapper.appendChild(card);
    });
  }
}

renderAllMovies(allMovies);


inputSearch.addEventListener('keyup', (e) => {
    moviesWrapper.innerHTML = "";
    searchProduct(e.target.value);
});

function searchProduct(searchTerm) {
    const searchResult = allMovies.filter((el) => 
      el.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    renderAllMovies(searchResult);
}


darkMode.addEventListener("click" , function(e){
    body.classList.toggle("dark-mode")
})
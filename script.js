const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.input-box');

// function to fetch movie details using OMDB API 
const getMovieInfo = async( movie ) =>{
    try{
        const Myapikey = '7632f9d5';
        const URL = `http://www.omdbapi.com/?apikey=${Myapikey}&t=${movie}`;
        const response = await fetch(URL);

        if(!response.ok){
            throw new Error("Unable to fetch Movie data..");
        }
        const data = await  response.json();
        showMovieData(data);
    }
    catch(error){
      showErrorMessage("No Movie found!!!");
    }
     
}

  // function to show movie data on screen  
     const showMovieData = (infodata)=>{

        movieContainer.innerHTML = "" ;
        movieContainer.classList.remove('NoBackground');
     const { Title , imdbRating , Genre , Released ,Runtime, Actors , Plot ,Poster } = infodata;

     const movieElement = document.createElement('div');
     movieElement.classList.add('movie-info');
     movieElement.innerHTML = `<h2>${Title}</h2>
                              <p> <strong> Rating: &#11088</strong>${imdbRating}</p>`;

   
     const movieGenreElement = document.createElement('div');
     movieGenreElement.classList.add('movie-genre');

     Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
     });

       movieElement.appendChild(movieGenreElement);
    
      movieElement.innerHTML += `<p> <strong> Released Date : </strong>${Released}</p>
                                 <p> <strong>Duration: </strong>${Runtime}</p>
                                 <p> <strong>Cost: </strong>${Actors}</p>
                                 <p> <strong>Plot: </strong>${Plot}</p>`;
     
     //creating div for movie poster
     const moviePosterElement = document.createElement('div');
     moviePosterElement.classList.add("movie-poster");
     moviePosterElement.innerHTML = `<img src="${Poster}" />`;

      movieContainer.appendChild(moviePosterElement);  
       
      movieContainer.appendChild(movieElement);    

}


//function to display error message 

const showErrorMessage = (message)=>{
    movieContainer.innerHTML = `<h2>${message}</h2>` ;
    movieContainer.classList.add('NoBackground');
}


// handle the form submition 
  
 const handleFormSubmission = (e)=>{
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !== '') {
        showErrorMessage("fatching movie information...");
        getMovieInfo(movieName);
    }
    else{
       showErrorMessage("Please Enter Movie Name To Get Movie Infomation");
    }
}

// adding event listner to search form
searchForm.addEventListener('submit' ,handleFormSubmission);
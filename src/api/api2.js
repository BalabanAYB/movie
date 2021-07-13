const API_KEY = "128d4a2b-b5a5-48b6-beeb-bdfb70407d2c"
const API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1"



   export async function getMovies() {
      const resp = await fetch("https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1", {
         headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
         }
      })
   }

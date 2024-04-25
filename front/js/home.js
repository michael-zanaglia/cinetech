$(document).ready(async function(){
    async function getMoviesTVs(relativeRoute, data){
        try {
           const response = await fetch("http://localhost:3000/api/"+relativeRoute+encodeURIComponent(data))
            if (!response.ok){
                return;
            }
            const datas = await response.json() 
            return datas;
        } catch(error) {
            console.log(error)
        }
    };

    async function getMostPopular(relativeRoute, data){
        try {
            const response = await fetch("http://localhost:3000/api/"+relativeRoute+encodeURIComponent(data))
             if (!response.ok){
                 return;
             }
             const datas = await response.json() 
             return datas;
         } catch(error) {
             console.log(error)
         }
    };
  

    function getMostRecent(mO){
        console.log(mO, "mo")
        let date = []
        for (let result of mO){
            console.log(result, "************************")
            for(let film of result){
                console.log(new Date(film.release_date || film.first_air_date).toISOString().split('T')[0])
                date.push(new Date(film.release_date || film.first_air_date))  
            }
            
        }
        let mostRecent = Math.max(...date)
        console.log(new Date(mostRecent), "est le plus recent")
        return mostRecent;
    };

    function foundMyRecentFilm(myObject, recentDate){
        let path= null;
        let name;
        myObject.forEach(result => {
            console.log(result,"++++++++++++++++")
            for(let film of result){
                console.log(film.title || film.name,"-----------------")
                if (film.release_date === recentDate || film.first_air_date === recentDate) {
                    //console.log(film.title || film.name, film.id)
                    path = film.backdrop_path
                    name = film.title || film.name, film.id
                    return {path,name} ;
                }
            }
        })
        return {path,name};
    };
    

    console.clear()
    const getDay = new Date()
    const today = getDay.toISOString().split('T')[0];
    //  Get recent Movie an Tv' show
    const moviesObject = await getMoviesTVs("movie/", today);
    const TVObject = await getMoviesTVs("tv/", today)
    console.log(moviesObject, TVObject)
    const myObject = [moviesObject.results, TVObject.results]


    const recentDate = new Date(getMostRecent(myObject)).toISOString().split('T')[0]
    const {path,name} = foundMyRecentFilm(myObject, recentDate)
    let recentFilmImg = "https://image.tmdb.org/t/p/w500" + path;

    //  Get most popular recently
    const popMovie = await getMostPopular("popM/", today);
    const popShow = await getMostPopular("popTv/", today);
    const popObj = [popMovie.results, popShow.results];
    console.log(popObj)
    let list_vote = [];
    for(let result of popObj){
        for(let film of result){
            list_vote.push(film.vote_average)
        }
    }
    list_vote.sort((a,b) => b - a);
    list_vote = list_vote.slice(0,5)
    let list_id = []
    for(let result of popObj){
        for(let index in result){
            if(list_vote.includes(result[index].vote_average)){
                console.log(result[index].title || result[index].name)
                list_id.push(result[index].poster_path)
            }
        }
    }

    for (let x = 0; x < 5; x++) {
        $(`#${x + 1}`).attr("src", `https://image.tmdb.org/t/p/w500${list_id[x]}`);
    }

    $("#entete").attr("src", recentFilmImg);
    $("h4").text(`Dernièrement, ${name}`)



});
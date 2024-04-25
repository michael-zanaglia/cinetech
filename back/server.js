const express = require('express');
const cors = require('cors');
const fetch = require("node-fetch");
const app = express()
const PORT = process.env.PORT || 3000
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWY3NjUzMjE5YmMwNDcwYWI2ZDNkM2ZiNWY1OGQ1NiIsInN1YiI6IjY2MjhkODEwZTI5NWI0MDE4NzlkZjRjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mBN17_1ueamRK_eY64Kkda1ptGr6jscxzP7akKz3aP4"
const options = {
    method : "GET",
    headers : {"Authorization": "Bearer " + TOKEN}
}
let year = new Date()
let firstDateofYears = new Date(year.getFullYear(),1,1)
firstDateofYears = firstDateofYears.toISOString().split('T')[0]

app.use(cors());
app.use(express.json())

app.get("/api/movie/:data", async (req,res) => {
    const data = req.params.data
    let URL = `https://api.themoviedb.org/3/discover/movie?include_video=false&language=fr-FR&page=1&primary_release_date.gte=${firstDateofYears}&primary_release_date.lte=${data}&sort_by=popularity.desc`;
    // CHERCHER LE NOM D'UN FILM -- let URL = "https://api.themoviedb.org/3/search/movie?query="+data
    // GENRE D'UN FILM -- let URL = "https://api.themoviedb.org/3/genre/movie/list?language=fr "
    console.log(URL)
    try {
        let response = await fetch(URL,options);
        if (!response.ok) {
            console.log(response.status)
            return;
        }
        let datas = await response.json()
        res.json(datas)
    }catch {
        console.log("ERROR LORS DU FETCH");
    } 
});

app.get("/api/tv/:data", async (req,res) => {
    const data = req.params.data
    let URL = `https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${firstDateofYears}&first_air_date.lte=${data}&include_null_first_air_dates=false&language=fr-FR&page=1&sort_by=popularity.desc`;
    // CHERCHER LE NOM D'UN FILM -- let URL = "https://api.themoviedb.org/3/search/movie?query="+data
    // GENRE D'UN FILM -- let URL = "https://api.themoviedb.org/3/genre/movie/list?language=fr "
    console.log(URL)
    try {
        let response = await fetch(URL,options);
        if (!response.ok) {
            console.log(response.status)
            return;
        }
        let datas = await response.json()
        res.json(datas)
    }catch {
        console.log("ERROR LORS DU FETCH");
    } 
});

app.get("/api/id/:data", async (req,res) => {
    const data = req.params.data
    let URL = `https://api.themoviedb.org/3/network/${data}/images`;
    // CHERCHER LE NOM D'UN FILM -- let URL = "https://api.themoviedb.org/3/search/movie?query="+data
    // GENRE D'UN FILM -- let URL = "https://api.themoviedb.org/3/genre/movie/list?language=fr "
    console.log(URL)
    try {
        let response = await fetch(URL,options);
        if (!response.ok) {
            console.log(response.status)
            return;
        }
        let datas = await response.json()
        res.json(datas)
    }catch {
        console.log("ERROR LORS DU FETCH");
    } 
});

app.get("/api/popM/:data", async (req,res) => {
    const data = req.params.data
    let URL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&primary_release_date.gte=${firstDateofYears}&primary_release_date.lte=${data}&sort_by=popularity.desc&vote_count.gte=5`;
    console.log(URL)
    try {
        let response = await fetch(URL,options);
        if (!response.ok) {
            console.log(response.status)
            return;
        }
        let datas = await response.json()
        res.json(datas)
    }catch {
        console.log("ERROR LORS DU FETCH");
    } 
});

app.get("/api/popTv/:data", async (req,res) => {
    const data = req.params.data
    let URL = `https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${firstDateofYears}&first_air_date.lte=${data}&include_adult=false&include_null_first_air_dates=false&language=fr-FR&page=1&sort_by=popularity.desc&vote_count.gte=5`;
    console.log(URL)
    try {
        let response = await fetch(URL,options);
        if (!response.ok) {
            console.log(response.status)
            return;
        }
        let datas = await response.json()
        res.json(datas)
    }catch {
        console.log("ERROR LORS DU FETCH");
    } 
});

app.listen(PORT, function() {
    console.log("Le serveur ecoute sur le port 3000!");
});
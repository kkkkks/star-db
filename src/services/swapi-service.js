export default class SwapiService {
    _apiBase = 'https://swapi.dev/api';
    _imageBase = 'https://starwars-visualguide.com/assets/img';

    getResource  = async(url) =>{
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok){
            throw new Error(`could not fetch ${this._apiBase}${url}, received ${res.status}`)
        }
        const body = await res.json();
        return body;
    }
    getAllPeople = async() =>{
        const res = await this.getResource(`/people/`);
        return res.results.map(this.transformPerson);
    }
    getAllPlanets = async() =>{
        const res = await this.getResource(`/planets/`);
        return res.results.map(this.transformPlanet);
    }
    getAllStarships = async() =>{
        const res = await this.getResource(`/starships/`);
        return res.results.map(this.transformStarship);
    }
    getStarship = async(id) =>{
        const starship = await this.getResource(`/starships/${id}/`);
        return this.transformStarship(starship)
    }
    getPerson = async(id) =>{
        const person = await this.getResource(`/people/${id}/`);
        return this.transformPerson(person);
    }
    getPlanet = async(id) =>{
        const planet = await this.getResource(`/planets/${id}/`);
        return this.transformPlanet(planet);
    }
    getPersonImage = ({id}) => {
        return `${this._imageBase}/characters/${id}.jpg`
    }
    getStarshipImage = ({id}) => {
        return `${this._imageBase}/starships/${id}.jpg`
    }
    getPlanetImage = ({id}) => {
        return `${this._imageBase}/planets/${id}.jpg`
    }
    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }
    transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }
    transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color
        }
    }
    transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity
        }
    }
}

/*
const swapi = new SwapiService();
swapi.getAllPeople()
    .then((people)=>console.log(people));

swapi.getPerson(3)
    .then((person)=>console.log(person));



/*fetch('https://swapi.dev/api/people/')
    .then((res)=> res.json())
    .then((body)=>console.log(body));*/


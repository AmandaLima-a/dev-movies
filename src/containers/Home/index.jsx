import Button from '../../components/Button'
import Slider from '../../components/Slider'
import api from '../../services/api'
import { getImages } from '../../utils/getImages'
import { Background, Info, Poster, Container, ContainerButtons } from './styles'
import { useState, useEffect } from 'react'

function Home(){
    const [movie, setMovie] = useState()
    const [topMovies, setTopMovies] = useState()
    const [topSeries, setTopSeries] = useState()
    const [cinemaMovies, setCinemaMovies] = useState()
    const [popularMovies, setPopularMovies] = useState()
    const [popularSeries, setPopularSeries] = useState()
    const [peopleList, setPeopleList] = useState()

    useEffect(() => {
        async function getMovies() {
            const { 
                data: { results }
            } = await api.get('/movie/popular')
    
            setMovie(results[0])
        }

        async function getTopMovies() {
            const { 
                data: { results }
            } = await api.get('/movie/top_rated')
    
            setTopMovies(results)
        }

        async function getTopSeries() {
            const { 
                data: { results }
            } = await api.get('/tv/top_rated')
    
            console.log(results)
            setTopSeries(results)
        }

        async function getCinemaMovies() {
            const { 
                data: { results }
            } = await api.get('/movie/now_playing')
    
            setCinemaMovies(results)
        }

        async function getPopularMovies() {
            const { 
                data: { results }
            } = await api.get('/movie/popular')
    
            setPopularMovies(results)
        }

        async function getPopularSeries() {
            const { 
                data: { results }
            } = await api.get('/tv/popular')
    
            setPopularSeries(results)
        }

        async function getPeopleList() {
            const { 
                data: { results }
            } = await api.get('/person/popular')
    
            console.log('Top artistas' + results)
            setPeopleList(results)
        }
    
        getMovies()
        getTopMovies()
        getTopSeries()
        getCinemaMovies()
        getPopularMovies()
        getPopularSeries()
        getPeopleList()
    }, [])
    

    return (
        <>
        {movie && (
        <Background img={getImages(movie.backdrop_path)}>
            <Container>
                <Info>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <ContainerButtons>
                        <Button red>Assista Agora</Button>
                        <Button>Assista o Trailer</Button>
                    </ContainerButtons>
                </Info>
                <Poster>
                    <img alt="capa-do-filme" src={getImages(movie.poster_path)}/>
                </Poster>
            </Container>
        </Background>
        )}
        {topMovies && <Slider info={topMovies} title={'Top Filmes'} />}
        {topSeries && <Slider info={topSeries} title={'Top Séries'} />}
        {cinemaMovies && <Slider info={cinemaMovies} title={'Filmes no Cinema'} />}
        {popularMovies && <Slider info={popularMovies} title={'Filmes Populares'} />}
        {popularSeries && <Slider info={popularSeries} title={'Séries Populares'} />}
        {peopleList && <Slider info={peopleList} title={'Artistas mais Populares'} />}
        </>
    )
}

export default Home  

export {removemovie} from '../reducers/movieSlice'
import axios from '../../utils/axios'
import { loadmovie } from '../reducers/movieSlice';

export const asyncloadmovie = (id) => async(dispatch)=>{
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalid = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
        const cast = await axios.get(`/movie/${id}/credits`);
        const director = await axios.get(`/movie/${id}/credits`);
        // console.log(director);
        
        let ultimateDetails = {
            detail:detail.data,
            externalid:externalid.data,
            recommendations:recommendations.data.results,
            similar:similar.data.results,
            videos:videos.data.results.find((m)=>m.type === "Trailer"),
            watchproviders:watchproviders.data.results.IN,
            cast:cast.data.cast,
            director:director.data.crew.find(person => person.job === 'Director'),
        }
        // console.log(ultimateDetails);
        dispatch(loadmovie(ultimateDetails))
        
    } catch (error) {
        console.log("Error = ",error);
        
    }
}

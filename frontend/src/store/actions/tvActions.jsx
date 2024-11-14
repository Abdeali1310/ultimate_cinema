export {removetv} from '../reducers/tvSlice'
import axios from '../../utils/axios'
import { loadtv } from '../reducers/tvSlice';

export const asyncloadtv = (id) => async(dispatch)=>{
    try {
        const detail = await axios.get(`/tv/${id}`);
        const externalid = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
        const cast = await axios.get(`/tv/${id}/credits`);
        let ultimateDetails = {
            detail:detail.data,
            externalid:externalid.data,
            recommendations:recommendations.data.results,
            similar:similar.data.results,
            videos:videos.data.results.find((m)=>m.type === "Trailer"),
            watchproviders:watchproviders.data.results.IN,
            cast:cast.data.cast,
        }
        // console.log(ultimateDetails);
        dispatch(loadtv(ultimateDetails))
        
    } catch (error) {
        console.log("Error = ",error);
        
    }
}

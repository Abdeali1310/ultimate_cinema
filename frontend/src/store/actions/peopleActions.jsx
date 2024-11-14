export {removeperson} from '../reducers/peopleSlice'
import axios from '../../utils/axios'
import { loadperson } from '../reducers/peopleSlice';

export const asyncloadperson = (id) => async(dispatch)=>{
    try {
        const detail = await axios.get(`/person/${id}`);
        const externalid = await axios.get(`/person/${id}/external_ids`);
        const credits = await axios.get(`/person/${id}/combined_credits`);
       
        
        let ultimateDetails = {
            detail:detail.data,
            externalid:externalid.data,
            credits:credits.data
        }
        // console.log(ultimateDetails);
        dispatch(loadperson(ultimateDetails))
        
    } catch (error) {
        console.log("Error = ",error);
        
    }
}

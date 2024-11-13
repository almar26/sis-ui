import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()
const BASE_URL = process.env.BASE_URL
 

export default defineEventHandler(async (event) => {
    try {
      const coursetype = getRouterParam(event, 'coursetype')
        const cookies = parseCookies(event);
        const token = cookies?.token
        const result = await axios.get(`${BASE_URL}/api/student/list/${coursetype}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
        )
        if (result) {
            return result.data;
        }
    } catch (err) {
        console.log(err);
    }
})
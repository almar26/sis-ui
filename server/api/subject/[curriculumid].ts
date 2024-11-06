import axios from 'axios'
const BASE_URL = process.env.BASE_URL

export default defineEventHandler(async (event) => {
  const curriculumid = getRouterParam(event, 'curriculumid')
  const cookies = parseCookies(event);
  const token = cookies?.token;

  try {
    const result = await axios.get(`${BASE_URL}/api/subject/list/${curriculumid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log(err);
  }
})

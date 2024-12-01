import axios from 'axios'
const BASE_URL = process.env.BASE_URL

export default defineEventHandler(async (event) => {
  const documentid = getRouterParam(event, 'documentid')
  const cookies = parseCookies(event);
  const token = cookies?.token
  try {
    const body = await readBody(event);
    const myPayload = {
      effective_sy: body.effective_sy,
      course_id: body.course_id
    }

    const result = await axios.put(`${BASE_URL}/api/curriculum/update/${documentid}`, myPayload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log(err);
  }
})

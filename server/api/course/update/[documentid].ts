import axios from 'axios'
const BASE_URL = process.env.BASE_URL

export default defineEventHandler(async (event) => {
  const documentid = getRouterParam(event, 'documentid')
  const cookies = parseCookies(event);
  const token = cookies?.token
  try {
    const body = await readBody(event);
    const myPayload = {
      course_code: body.course_code,
      course_code_duplicate: body.course_code_duplicate,
      course_desc: body.course_desc,
      major: body.major,
      year: body.year,
      course_type: body.course_type,
    }

    const result = await axios.put(`${BASE_URL}/api/course/update/${documentid}`, myPayload, {
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

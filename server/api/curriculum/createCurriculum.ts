import axios from 'axios'
const BASE_URL = process.env.BASE_URL

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies?.token;

  try {
    const body = await readBody(event);
    const myPayload = {
      course_id: body.course_id,
      course_code: body.course_code,
      course_desc: body.course_desc,
      major: body.major,
      effective_sy: body.effective_sy
    };

    console.log("CreateCurriculum: ", myPayload);

    const result = await axios.post(`${BASE_URL}/api/curriculum/create`, myPayload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log(err)
  }
})

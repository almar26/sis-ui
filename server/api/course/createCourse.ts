import axios from "axios"
// import * as dotenv from 'dotenv'
// dotenv.config()
const BASE_URL = process.env.BASE_URL
export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies?.token

  try {
    const body = await readBody(event)
    const myPayload = {
      course_code: body.course_code,
      course_description: body.course_description,
      major: body.major
    };

    const result = await axios.post(`${BASE_URL}/api/course/create`, myPayload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (result) {
      return result.data
    }
  } catch (err) {
    console.log(err)
  }
})

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
      course: body.course_desc,
      major: body.major,
      course_type: body.course_type,
      school_year: body.school_year,
      semester: body.semester,
      change_course: body.change_course

    }
    const result = await axios.put(`${BASE_URL}/api/student/update-course/${documentid}`, myPayload, {
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

import axios from "axios"
import * as dotenv from 'dotenv'
dotenv.config()
const BASE_URL = process.env.BASE_URL
export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies?.token
  try {
    const body = await readBody(event)
    const myPayload = {
      student_no: body.student_no,
      last_name: body.last_name,
      first_name: body.first_name,
      middle_name: body.middle_name,
      course: body.course,
      course_code: body.course_code,
      major: body.major,
      gender: body.gender,
      address: body.address,
      birthday: body.birthday,
      age: body.age,
      semester: body.semester,
      school_year_start: body.schoolyearstart,
      school_year_end: body.schoolyearend,
      course_type: body.course_type
    }

    const result = await axios.post(`${BASE_URL}/api/student/create`, myPayload, {
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

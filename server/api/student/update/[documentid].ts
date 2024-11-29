import axios from 'axios'
const BASE_URL = process.env.BASE_URL

export default defineEventHandler(async (event) => {
  const documentid = getRouterParam(event, 'documentid')
  const cookies = parseCookies(event);
  const token = cookies?.token
  try {
    const body = await readBody(event);
    const myPayload = {
      student_no: body.student_no,
      last_name: body.last_name,
      first_name: body.first_name,
      middle_name: body.middle_name,
      gender: body.gender,
      address: body.address,
      birthday: body.birthday,
      age: body.age,
      semester: body.semester,
      school_year_start: body.school_year_start,
      school_year_end: body.school_year_end,
    }
    const result = await axios.put(`${BASE_URL}/api/student/update/${documentid}`, myPayload, {
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

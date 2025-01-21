import axios from "axios";
const BASE_URL = process.env.BASE_URL;
export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies?.token;
  try {
    const body = await readBody(event);
    const myPayload = {
      student_id: body.student_id,
      course_code: body.course_code,
      course_description: body.course_desc,
      major: body.major,
      course_type: body.course_type,
      school_year: body.school_year,
      semester: body.semester,
    };

    const result = await axios.post(
      `${BASE_URL}/api/sy-history/student/create`,
      myPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (result) {
      return result.data;
    }
  } catch (err) {
    console.log(err);
  }
});

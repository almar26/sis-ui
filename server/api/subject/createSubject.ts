import axios from "axios"
const BASE_URL = process.env.BASE_URL

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies?.token

  try {
    const body = await readBody(event);
    const myPayload = {
      curri_id: body.curri_id,
      subj_code: body.subj_code,
      subj_title: body.subj_title,
      year_level: body.year_level,
      semester: body.semester,
      lec: body.lec,
      lab: body.lab,
      units: body.units,
      resultant: body.resultant,
      course_code: body.course_code,
      course_id: body.course_id
    };

    const result = await axios.post(`${BASE_URL}/api/subject/create`, myPayload, {
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

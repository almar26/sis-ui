import axios from "axios";
const BASE_URL = process.env.BASE_URL;

export default defineEventHandler(async (event) => {
  const documentid = getRouterParam(event, "documentid");
  const cookies = parseCookies(event);
  const token = cookies?.token;
  try {
    const body = await readBody(event);
    const myPayload = {
      curri_id: body.curri_id,
      subj_code: body.subj_code,
      subj_code_duplicate: body.subj_code_duplicate,
      subj_title: body.subj_title,
      year_level: body.year_level,
      semester: body.semester,
      lec: body.lec,
      lab: body.lab,
      units: body.units,
      resultant: body.resultant,
    };

    const result = await axios.put(
      `${BASE_URL}/api/subject/update/${documentid}`,
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

import axios from "axios"
import header from "../../utils/headerAuthorization"

async function getWorkplacesByTeacherId(id: number) {
  const teacherWorkplaces = await axios
    .get(
      `${process.env.REACT_APP_API_BASEURL}/teachers-workplaces/teacher/${id}`,
      {
        headers: header,
      }
    )
    .then((response) => {
      return response.data
    })
  return teacherWorkplaces
}

const teachersWorkplaces = {
  getWorkplacesByTeacherId,
}

export default teachersWorkplaces

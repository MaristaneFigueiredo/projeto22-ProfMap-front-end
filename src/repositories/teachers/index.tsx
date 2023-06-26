import axios from "axios";
import header from "../../utils/headerAuthorization";

export type teacher = {
    id: number,
    name: string
}

async function getTeacherById(id: number): Promise<teacher> {
    const teacher = await axios.get(`${process.env.REACT_APP_API_BASEURL}/teachers/${id}`, {
                                            headers: header,
                                    })
                                    .then((response) => {
                                        return response.data
                                    })
    return {
        id: teacher.id,
        name: teacher.name,
    }
}

const teachersRepository = {
    getTeacherById,
}

export default teachersRepository
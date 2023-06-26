import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import teachersRepository from "../repositories/teachers"
import axios from "axios"
import debounce from "lodash.debounce"
import ListResults from "../components/ListResults"
import header from "../utils/headerAuthorization"
import { styled } from "styled-components"
import teachersWorkplaces from "../repositories/teachers-workplaces"

export default function TeachersWorkplacesPage() {
  const [name, setName] = useState<string>("")
  const [idWorkplace, setIdWorkplace] = useState<number>(0)
  const [nameWorkplace, setNameWorkplace] = useState<string>("")
  const [results, setResults] = useState<Array<any>>([])
  const [teacherWorkplaces, setTeacherWorkplaces] = useState<Array<any>>([])

  type RouteParams = {
    idTeacher: string
  }

  const { idTeacher } = useParams<RouteParams>()

  useEffect(() => {
    teachersRepository.getTeacherById(Number(idTeacher)).then((response) => {
      setName(response.name)
      teachersWorkplaces
        .getWorkplacesByTeacherId(Number(idTeacher))
        .then((response) => {
          setTeacherWorkplaces(response)
        })
    })
  }, [idTeacher])

  useEffect(() => getTeackerWorkplaces(), [])

  const getTeackerWorkplaces = () => {
    teachersWorkplaces
      .getWorkplacesByTeacherId(Number(idTeacher))
      .then((response) => {
        setTeacherWorkplaces(response)
      })
  }

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    debounceListWorplaces(name)
  }

  const debounceListWorplaces = debounce((name: string) => {
    listWorkplace(name)
  }, 1000)

  async function listWorkplace(nameBusca: string) {
    await axios
      .get(`${process.env.REACT_APP_API_BASEURL}/workplaces/list`, {
        params: {
          name: nameBusca,
        },
        headers: header,
      })
      .then((response) => {
        setResults(response.data)
      })
      .catch((error) => {
        alert(error)
      })
  }

  async function getWorkplaceById(id: number) {
    const workplace = await axios
      .get(`${process.env.REACT_APP_API_BASEURL}/workplaces/${id}`, {
        headers: header,
      })
      .then((response) => {
        return response.data
      })
    setNameWorkplace(workplace.name)
    setIdWorkplace(workplace.id)
    setResults([])
  }

  async function createTeacherWorkplace() {
    if (idWorkplace === 0) return

    const data = {
      teacher_id: Number(idTeacher),
      workplace_id: idWorkplace,
    }
    await axios
      .post(`${process.env.REACT_APP_API_BASEURL}/teachers-workplaces`, data, {
        headers: header,
      })
      .then((response) => {
        setIdWorkplace(0)
        getTeackerWorkplaces()
        alert("Incluído com sucesso!")
      })
  }

  async function deleteTeacherWorkplace(id: number) {
    // eslint-disable-next-line no-restricted-globals
    let answer = confirm("Tem certeza de que deseja excluir o registro?")
    if (!answer) return
    await axios
      .delete(
        `${process.env.REACT_APP_API_BASEURL}/teachers-workplaces/${id}`,
        {
          headers: header,
        }
      )
      .then((response) => {
        getTeackerWorkplaces()
        return response.data
      })
  }

  return (
    <>
      <h1 className="text-lg font-light mt-4">
        Locais de trabalho do professor - cadastro
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createTeacherWorkplace()
        }}
      >
        <div className="mt-2">
          <div
            className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
            focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md"
          >
            <input
              type="text"
              value={idTeacher}
              disabled
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-2">
          <div
            className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
            focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md"
          >
            <input
              type="text"
              value={name}
              disabled
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-12">
          <div
            className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
            focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md"
          >
            <input
              type="search"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Pesquise aqui locais de trabalho para atribuir ao professor..."
              onChange={handleInputSearch}
            />
          </div>
          {results.length > 0 && (
            <ListResults data={results} setResult={getWorkplaceById} />
          )}
        </div>
        <div className="mt-2">
          {idWorkplace > 0 && (
            <div
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md"
            >
              <input
                type="text"
                disabled
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                    placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                value={`${idWorkplace} - ${nameWorkplace}`}
              />
            </div>
          )}
          <ButtonsArea>
            <button
              type="submit"
              className="bg-lime-600 h-50 w-100 p-5 text-white rounded-lg "
            >
              Salvar
            </button>
            <Link to={`/professores-cadastro`}>
              <button
                type="button"
                className="bg-gray-400 h-50 w-100 p-5 text-white rounded-lg "
              >
                Voltar
              </button>
            </Link>
            {/* {
                    (idWorkplace > 0)  &&
                    <button type="button" className="bg-red-500 h-50 w-100 p-5 text-white rounded-lg " onClick={deleteWorkplaceById}>Excluir</button>
                } */}
          </ButtonsArea>
        </div>
        <div className="bt-4 mt-4">
          <p>Locais de trabalho do professor</p>
        </div>
        <div>
          <table className="table-auto border border-slate-500">
            <thead>
              <tr className="p-5">
                <th className="border border-slate-600 p-5">ID</th>
                <th className="border border-slate-600 p-5">Nome</th>
                <th className="border border-slate-600 p-5"></th>
              </tr>
            </thead>
            <tbody>
              {teacherWorkplaces.map((w) => {
                return (
                  <tr key={w.id}>
                    <td className="border border-slate-600 px-5 py-1 text-left">
                      {w.workplaces.id}
                    </td>
                    <td className="border border-slate-600 px-5 py-1">
                      {w.workplaces.name}
                    </td>
                    <td className="border border-slate-600 px-5 py-1">
                      <button
                        className="bg-red-700 rounded-md px-3 py-2 
                                    text-white text-sm font-light
                                    hover:bg-red-500"
                        onClick={() => deleteTeacherWorkplace(Number(w.id))}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </form>
    </>
  )
}

const ButtonsArea = styled.div`
  display: flex;
  width: 30%;
  gap: 10px;
  margin-top: 10px;
`

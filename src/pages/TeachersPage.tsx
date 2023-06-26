import { styled } from "styled-components"
import { useState } from "react"
import { debounce } from "lodash"
import axios from "axios"
import dayjs from "dayjs"
import InputMask from "react-input-mask"
import header from "../utils/headerAuthorization"
import ListResults from "../components/ListResults"
import { Link } from "react-router-dom"

export default function TeachersPage() {
  const [results, setResults] = useState<Array<any>>([])
  const [teacherId, setTeacherId] = useState<number>(0)
  const [name, setName] = useState<string>("")
  const [cpf, setCpf] = useState<string>("")
  const [rg, setRg] = useState<string>("")
  const [birthDate, setBirthDate] = useState<string>()
  const [nationality, setNationality] = useState<string>("")
  const [cell, setCell] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [addressNumber, setAddressNumber] = useState<number>()
  const [complement, setComplement] = useState<string>("")
  const [district, setDistrict] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [uf, setUf] = useState<string>("")
  const [zipcode, setZipcode] = useState<string>("")

  const [email, setEmail] = useState<string>("")
  const [observation, setObservation] = useState<string>("")

  function cleanForm() {
    setName("")
    setCpf("")
    setRg("")
    setZipcode("")
    setBirthDate("")
    setNationality("")
    setCell("")
    setAddress("")
    setAddressNumber(0)
    setCity("")
    setUf("")
    setComplement("")
    setDistrict("")
    setEmail("")
    setObservation("")
    setTeacherId(0)
    setResults([])
  }

  async function searchZipcode() {
    if (!zipcode) return
    await axios
      .get(`http://viacep.com.br/ws/${zipcode}/json/`)
      .then((response) => {
        const { data } = response
        setAddress(data.logradouro)
        setCity(data.localidade)
        setUf(data.uf)
      })
      .catch((error) => alert("Falha ao recuperar endereço"))
  }

  async function createTeacher() {
    const data = {
      name,
      cpf,
      rg,
      birth_date: birthDate,
      nationality,
      cell,
      address,
      number: addressNumber,
      complement,
      district,
      city,
      state: uf,
      zip_code: zipcode,
      email,
      observation,
    }

    await axios
      .post(`http://localhost:4000/teachers`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("profmap-token")}`,
        },
      })
      .then(() => {
        alert("Salvo com sucesso")
        cleanForm()
      })
      .catch(() => {
        alert("erro")
      })
  }

  async function updateTeacher(id: number) {
    const data = {
      name,
      cpf,
      rg,
      birth_date: birthDate,
      nationality,
      cell,
      address,
      number: addressNumber,
      complement,
      district,
      city,
      state: uf,
      zip_code: zipcode,
      email,
      observation,
    }

    await axios
      .put(`${process.env.REACT_APP_API_BASEURL}/teachers/${id}`, data, {
        headers: header,
      })
      .then(() => {
        alert("Salvo com sucesso")
        cleanForm()
      })
      .catch(() => {
        alert("erro")
      })
  }

  async function deleteTeacherById() {
    // eslint-disable-next-line no-restricted-globals
    let answer = confirm("Tem certeza de que deseja excluir o registro?")
    if (!answer) return
    const teacher = await axios
      .delete(`${process.env.REACT_APP_API_BASEURL}/teachers/${teacherId}`, {
        headers: header,
      })
      .then((response) => {
        return response.data
      })
    cleanForm()
  }

  async function listTeachers(nameBusca: string) {
    const teachers = await axios
      .get(`${process.env.REACT_APP_API_BASEURL}/teachers/list`, {
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

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    debounceListTeachers(name)
  }

  const debounceListTeachers = debounce((name: string) => {
    listTeachers(name)
  }, 1000)

  async function getTeacherById(id: number) {
    const teacher = await axios
      .get(`${process.env.REACT_APP_API_BASEURL}/teachers/${id}`, {
        headers: header,
      })
      .then((response) => {
        return response.data
      })
    setName(teacher.name)
    setCpf(teacher.cpf)
    setRg(teacher.rg)
    setBirthDate(dayjs(teacher.birth_date, "YYYY-MM-DD").format("DD/MM/YYYY"))
    setNationality(teacher.nationality)
    setCell(teacher.cell)
    setZipcode(teacher.zip_code)
    setAddress(teacher.address)
    setAddressNumber(teacher.number)
    setCity(teacher.city)
    setUf(teacher.state)
    setComplement(teacher.complement)
    setDistrict(teacher.district)
    setEmail(teacher.email)
    setObservation(teacher.observation)
    setTeacherId(teacher.id)
    setResults([])
  }

  async function submit() {
    if (teacherId > 0) await updateTeacher(teacherId)
    else await createTeacher()
  }

  return (
    <>
      <h1 className="text-lg font-light mt-4">Professores - cadastro</h1>
      <div className="mt-2">
        <div
          className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
        focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md"
        >
          <input
            type="search"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
            placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Pesquisar..."
            onChange={handleInputSearch}
          />
        </div>
      </div>
      {results.length > 0 && (
        <ListResults data={results} setResult={getTeacherById} />
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <div className="space-y-4">
          <div className="sm:col-span-4 mt-4">
            <div className="mt-2">
              <div
                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                    focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md"
              >
                <input
                  type="text"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="nome completo"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="mt-2">
              <div
                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                    focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md"
              >
                <InputMask
                  type="text"
                  mask="999.999.999-99"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="CPF"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCpf(e.target.value)
                  }
                  value={cpf}
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
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 disabled:bg-gray-200"
                  placeholder="RG"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRg(e.target.value)
                  }
                  value={rg}
                />
              </div>
            </div>
            <div className="mt-2">
              <div
                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                    focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md"
              >
                <InputMask
                  type="text"
                  mask="99/99/9999"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Data de nascimento"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBirthDate(e.target.value)
                  }
                  value={birthDate}
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
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 disabled:bg-gray-200"
                  placeholder="Nacionalidade"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNationality(e.target.value)
                  }
                  value={nationality}
                />
              </div>
            </div>
            <div className="mt-2">
              <div
                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                    focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md"
              >
                <InputMask
                  type="text"
                  mask="(99) 99999-9999"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Celular"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCell(e.target.value)
                  }
                  value={cell}
                />
              </div>
            </div>
            <div className="mt-2">
              <div
                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                    focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md"
              >
                <InputMask
                  type="text"
                  mask="99999-999"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="CEP"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setZipcode(e.target.value)
                  }
                  value={zipcode}
                  onBlur={searchZipcode}
                />
              </div>
            </div>
            {address && (
              <div className="mt-2">
                <div
                  className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                                focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md"
                >
                  <input
                    type="text"
                    disabled
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                                    placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 disabled:bg-gray-200"
                    value={`${address}`}
                  />
                </div>
              </div>
            )}
            <div className="mt-2">
              <div
                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                    focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md"
              >
                <input
                  type="number"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  value={addressNumber}
                  placeholder="Nº"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAddressNumber(Number(e.target.value))
                  }
                />
              </div>
            </div>
            {city && (
              <div className="mt-2">
                <div
                  className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                                focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md"
                >
                  <input
                    type="text"
                    disabled
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                                    placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 disabled:bg-gray-200"
                    value={`${city} - ${uf}`}
                  />
                </div>
              </div>
            )}
            <div className="mt-2">
              <div
                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                    focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-600 sm:max-w-md"
              >
                <input
                  type="text"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  value={email}
                  placeholder="E-mail"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
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
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-0
                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  value={observation}
                  placeholder="Observações"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setObservation(e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <ButtonsArea>
            <button
              type="submit"
              className="bg-lime-600 h-50 w-100 p-5 text-white rounded-lg "
            >
              Salvar
            </button>
            {teacherId > 0 && (
              <button
                type="button"
                className="bg-red-500 h-50 w-100 p-5 text-white rounded-lg "
                onClick={deleteTeacherById}
              >
                Excluir
              </button>
            )}
            {teacherId > 0 && (
              <Link to={`/professores-locais-trabalho/${teacherId}`}>
                <button
                  type="button"
                  className="bg-lime-600 h-50 w-100 p-5 text-white rounded-lg "
                >
                  Locais de trabalho do professor
                </button>
              </Link>
            )}
          </ButtonsArea>
        </div>
      </form>
    </>
  )
}

const ButtonsArea = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`

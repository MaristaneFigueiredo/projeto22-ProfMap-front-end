import { styled } from "styled-components"
import { debounce } from "lodash"
import { useState } from "react"
import axios from "axios"
import header from "../utils/headerAuthorization"
import ListResults from "../components/ListResults"
import getLatitudeLongitude from "../utils/getLatitudeLongitude"
import InputMask from "react-input-mask"

export default function WorkspacesPage() {
  const [results, setResults] = useState<Array<any>>([])
  const [workplaceId, setWorkplaceId] = useState<number>(0)
  const [name, setName] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [addressNumber, setAddressNumber] = useState<number>()
  const [complement, setComplement] = useState<string>("")
  const [district, setDistrict] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [uf, setUf] = useState<string>("")
  const [zipcode, setZipcode] = useState<string>("")
  const [latitude, setLatitude] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0)
  const [email, setEmail] = useState<string>("")
  const [observation, setObservation] = useState<string>("")

  async function submit() {
    if (workplaceId > 0) await updateWorkplace(workplaceId)
    else await createWorkplace()
    cleanForm()
  }

  function cleanForm() {
    setName("")
    setZipcode("")
    setAddress("")
    setAddressNumber(0)
    setCity("")
    setUf("")
    setComplement("")
    setDistrict("")
    setEmail("")
    setLatitude(0)
    setLongitude(0)
    setObservation("")
    setWorkplaceId(0)
    setResults([])
  }

  async function searchZipcode() {
    const code = zipcode.replace(/[_-]/g, "")
    if (!code) return
    await axios
      .get(`${process.env.REACT_APP_VIACEP_URL}/${zipcode}/json/`)
      .then((response) => {
        const { data } = response
        setAddress(data.logradouro)
        setCity(data.localidade)
        setUf(data.uf)
      })
      .catch(() => alert("Falha ao recuperar endereço"))
  }

  async function createWorkplace() {
    const data = {
      name,
      address,
      number: addressNumber,
      complement,
      district,
      city,
      state: uf,
      zip_code: zipcode,
      latitude,
      longitude,
      email,
      observation,
    }
    const coordinates = await getLatitudeLongitude(
      `${address}, ${addressNumber} ${city} ${uf}`
    )
    data.latitude = coordinates.latitude
    data.longitude = coordinates.longitude

    await axios
      .post(`${process.env.REACT_APP_API_BASEURL}/workplaces`, data, {
        headers: header,
      })
      .then(() => {
        alert("Salvo com sucesso")
      })
      .catch(() => {
        alert("erro")
      })
  }

  async function updateWorkplace(id: number) {
    const data = {
      name,
      address,
      number: addressNumber,
      complement,
      district,
      city,
      state: uf,
      zip_code: zipcode,
      latitude,
      longitude,
      email,
      observation,
    }
    const coordinates = await getLatitudeLongitude(
      `${address}, ${addressNumber} ${city} ${uf}`
    )
    data.latitude = coordinates.latitude
    data.longitude = coordinates.longitude

    await axios
      .put(`${process.env.REACT_APP_API_BASEURL}/workplaces/${id}`, data, {
        headers: header,
      })
      .then(() => {
        alert("Salvo com sucesso")
      })
      .catch(() => {
        alert("erro")
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
    const workplaces = await axios
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
    setName(workplace.name)
    setZipcode(workplace.zip_code)
    setAddress(workplace.address)
    setAddressNumber(workplace.number)
    setCity(workplace.city)
    setUf(workplace.state)
    setComplement(workplace.complement)
    setDistrict(workplace.district)
    setEmail(workplace.email)
    setLatitude(workplace.latitude)
    setLongitude(workplace.longitude)
    setObservation(workplace.observation)
    setWorkplaceId(workplace.id)
    setResults([])
  }

  async function deleteWorkplaceById() {
    // eslint-disable-next-line no-restricted-globals
    let answer = confirm("Tem certeza de que deseja excluir o registro?")
    if (!answer) return
    const workplace = await axios
      .delete(
        `${process.env.REACT_APP_API_BASEURL}/workplaces/${workplaceId}`,
        {
          headers: header,
        }
      )
      .then((response) => {
        return response.data
      })
    cleanForm()
  }

  return (
    <>
      <h1 className="text-lg font-light mt-4">Locais de trabalho - cadastro</h1>
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
        <ListResults data={results} setResult={getWorkplaceById} />
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
                  placeholder="nome do local de trabalho"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              </div>
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
                value={complement}
                placeholder="Complemento"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setComplement(e.target.value)
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
          <ButtonsArea>
            <button
              type="submit"
              className="bg-lime-600 h-50 w-100 p-5 text-white rounded-lg "
            >
              Salvar
            </button>
            {workplaceId > 0 && (
              <button
                type="button"
                className="bg-red-500 h-50 w-100 p-5 text-white rounded-lg "
                onClick={deleteWorkplaceById}
              >
                Excluir
              </button>
            )}
          </ButtonsArea>
        </div>
      </form>
    </>
  )
}

const Title = styled.h1`
  font-size: 16px;
  font-weight: 300;
`

const Form = styled.form`
  margin-top: 15px;
  width: 100%;
  padding: 2px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ButtonsArea = styled.div`
  display: flex;
  width: 30%;
  gap: 10px;
`

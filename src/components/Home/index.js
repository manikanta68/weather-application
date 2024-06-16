import { useState , useEffect } from "react"
import "./index.css"

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE"
}

const Home = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null
  })

  const [userInput , setUserInput] = useState("")
  const [serachInput,setSearchInput] = useState("Hyderabad")
  const [toggle, setToggle] = useState(false)


  useEffect(() => {
    const renderWheatherInfoData  = async () => {
      console.log(userInput)
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${serachInput}&appid=${"e6a96b4edfdee01e9b54917f79d9ca39"}`
      const response = await fetch(url)   
      const Data = await response.json()
      if(response.ok === true){
        setApiResponse((prevApiResponse) => ({
          ...prevApiResponse,
          status: apiStatusConstants.success,
          data: Data
        }))
        console.log(Data)
      }else{
        console.log(response)
        setApiResponse((prevApiResponse) => ({
          ...prevApiResponse,
          status: apiStatusConstants.failure,
        }))
      
      }
    }
    renderWheatherInfoData()
  },[serachInput])

  const renderLoadingView = () => {
    return "Loading"
  }

  const renderSuccessView = () => {
    const {data} = apiResponse
    const CurrentDateTime = new Date()
    console.log(CurrentDateTime)
    return (<div>
      <div className="card">
           <p className="figers"> Current location:  <span className="current-location">{data.name}</span></p>
           <p className="figers"> Temperature:  <span className="temperature">{(Math.abs(data.main.temp - 273.15)).toFixed(2)}</span> </p>
           <p className="figers"> Date and time:  <span className="datetime">{CurrentDateTime.toLocaleString()}</span> </p>
           <p className="figers"> Humidity:  <span className="datetime">{data.main.humidity}%</span> </p>
           <p className="figers"> Wind Speed:  <span className="datetime">{data.wind.speed}</span> </p>
      </div>
    </div>)
  }

  const renderFailureView = () => {
    return <div> <p>Please Enter A valid City name!!</p> </div>
  }
  
  const renderWheatherInfo = () => {
    const { status } = apiResponse
    switch (status) {
      case apiStatusConstants.inProgress:
        
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null;
    }
  }

  const onChangeUserInput  = (event) => {
      setUserInput(event.target.value)
  }

  const onClickSearch = () => {
      setSearchInput(userInput)
  }

  const onChlickToggle = () => {
    setToggle((prevState) => (!prevState))
  }
  
  return (<div className={toggle ? "home-bg-black" : "home-page-bgcontainer"}  >
    <nav className= {toggle ? "nav nav-color" : "nav"} ><h1 className="nav-heading">Weather Information</h1> <button className="switch-button" onClick={onChlickToggle}> {toggle ? "Switch Light" : "Switch Dark" }</button></nav>
    <div className="searchbar-container">
      <div className="search-bar">
        <input className="input" onChange={onChangeUserInput} type="text" placeholder="Serach your city name" />
        <button onClick={onClickSearch} className="search-button">Search</button>
      </div>
    </div>
    <div className="wheather-bgcontainer">
    {renderWheatherInfo()}
    </div>
    </div> )
}

export default Home
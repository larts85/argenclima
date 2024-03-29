import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context/context';
import { Landing, Cards, Title } from "../styles/landingpage";
import { Spinner } from "../styles/spinner";
import { Star } from "../styles/star";
import { Link } from "react-router-dom";
import Unfav from '../images/unfav.svg'
import Faved from '../images/faved.svg'

const LandingPage = (props) => {
  const { data, setData, api, fixName, addToFav, deleteFav, getWikiExtract, removeAccents, getFavs, favorites } = useContext(Context);

  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(true)
  const ids = {
    from1to20: "3435907,3862286,3861887,3861244,3433955,3435214,3860255,3434137,3433896,3853404,3849574,3848949,3844419,3430657,3843122,3838830,3838231,3837152,3837029,3836350",
    from20to: "3836276,3835868,3834450,3833578"
  }

  const handleOnClick = (data) => {
    if (!favorites.matchFavs(data.id)) {
      addToFav(data);
    } else {
      deleteFav(data.id);
    }
  }

  useEffect(() => {
    const getInfo = () => {
      const prov = []
      fetch(
        `https://api.openweathermap.org/data/2.5/group?id=${ids.from1to20}&appid=${api}&units=metric`
      )
        .then((r) => r.json())
        .then((recurso) => {
          if (recurso.list !== undefined) {
            prov.push(...recurso.list)
          }
        })
        .then(() => {
          fetch(
            `https://api.openweathermap.org/data/2.5/group?id=${ids.from20to}&appid=${api}&units=metric`
          )
            .then((r) => r.json())
            .then((recurso) => {
              if (recurso.list !== undefined) {
                prov.push(...recurso.list)
              }
              setInfo(prov)
              setLoading(false)
            })
            .then(() => {
              setData({
                ...data,
                provincesRes: info
              })
            })
        })
    }
    getInfo();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setTimeout(() => {
      getFavs()
    }, 100)
    // eslint-disable-next-line
  }, [])

  return (
    <Landing>
      <Title>
        Provincias Argentinas
      </Title>
      <Cards>
        {loading ? (
          <Spinner></Spinner>
        )
          : info.map((p) => {
            const ciudad = {
              min: p.main.temp_min.toFixed(1),
              max: p.main.temp_max.toFixed(1),
              img: p.weather[0].icon,
              id: p.id,
              wind: p.wind.speed.toFixed(1),
              temp: p.main.temp,
              rf: p.main.feels_like.toFixed(1),
              name: removeAccents(p.name),
              weather: p.weather[0].main,
              clouds: p.clouds.all,
              lat: p.coord.lat,
              lon: p.coord.lon,
              humidity: p.main.humidity,
            };
            return (
              <div style={{ position: 'relative' }} key={p.id}>
                <Star
                  onClick={() => handleOnClick(ciudad)}
                  top='25px'
                  left='30px'
                >
                  <img
                    height={25}
                    alt={p.id}
                    src={favorites.matchFavs(p.id) ? Faved : Unfav}
                  />
                </Star>
                <Link
                  id='link'
                  to='/dashboard'
                  onClick={() => {
                    setData({
                      ...data,
                      currentProvince: ciudad,
                    })
                    getWikiExtract(ciudad.name)
                  }}
                >
                  <div
                    className='container'
                  >
                    <div className="title">
                      <h4 style={{ marginLeft: p.name === 'Santiago del Estero Province' ? 25 : p.name === 'Buenos Aires F.D.' ? 22 : 0 }}>
                        {fixName(p.name)}<br />
                      </h4>
                    </div>
                    <div className='info'>
                      <div id='text'>
                        <p>Temp <span>{p.main.temp.toFixed(1)}&#176;</span></p>
                        <p>St <span>{p.main.feels_like.toFixed(1)}&#176;</span></p>
                      </div>
                      <div id='images'>
                        <img src={`https://openweathermap.org/img/wn/${p.weather[0].icon}@2x.png`} alt='icon weather' id='icon' />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })
        }
      </Cards>
    </Landing>
  )
}

export default LandingPage;

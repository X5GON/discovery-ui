import React, { useState, useEffect } from "react"

import { Layout, Navbar } from "../components/layout"
import list from "../images/icons/list.svg"
import loadingIcon from "../images/icons/Loading.svg"

import CountUp from "react-countup"

const Provider = x => {
  const provider = x.provider
  if (provider.statistics.oer_materials.count) {
    return (
      <div className="row p-3 py-2 mb-3 bg-white mx-3">
        <div className="col">
          <a href={provider.provider_domain}>
            <p className="p2 mb-0">{provider.provider_name}</p>
          </a>
          <span className="d-block d-md-inline mb-1 mb-md-0">
            {provider.statistics.oer_materials.count} Materials
          </span>
          {provider.statistics.visits.count ? (
            <>
              <span className="text-green mx-3 d-none d-md-inline">/</span>
              <span className="d-block d-md-inline mb-1 mb-md-0">
                {provider.statistics.visits.text.number}
                {provider.statistics.visits.text.suffix} Visits
              </span>
            </>
          ) : null}
        </div>
        <div className="col-2 col-sm-1">
          <img src={list} alt="list" height={32} className="mt-3" />
        </div>
      </div>
    )
  }
  return null
}
const Stats = x => {
  const statistics = x.statistics
  return (
    <div className="row text-center p-64">
      <div className="col-sm-6 my-3 my-sm-0">
        <div className="stats">
          <h4 className="">
            <CountUp
              end={statistics.oer_materials.text.number}
              suffix={statistics.oer_materials.text.suffix}
              decimals={0}
            />
          </h4>
          <p className="stats__label">
            <span>OER materials</span>
          </p>
        </div>
      </div>
      <div className="col-sm-6 my-3 my-sm-0">
        <div className="stats">
          <h4 className="">
            <CountUp
              end={statistics.user_activities.text.number}
              suffix={statistics.user_activities.text.suffix}
              decimals={0}
            />
          </h4>
          <p className="stats__label">
            <span>User activities</span>
          </p>
        </div>
      </div>
    </div>
  )
}

const Repos = () => {
  const static_oer = {
    oer_providers: [
      {
        provider_id: 1,
        provider_name: "Videolectures.NET",
        provider_domain: "http://videolectures.net/",
        statistics: {
          oer_materials: {
            count: 27424,
            text: {
              number: "27.4",
              suffix: "k",
            },
          },
          visits: {
            count: 893774,
            text: {
              number: "894",
              suffix: "k",
            },
          },
        },
      },
      {
        provider_id: 3,
        provider_name: "UNIVERSITAT POLITÈCNICA DE VALÈNCIA",
        provider_domain: "https://media.upv.es",
        statistics: {
          oer_materials: {
            count: 4177,
            text: {
              number: "4.18",
              suffix: "k",
            },
          },
          visits: {
            count: 738618,
            text: {
              number: "739",
              suffix: "k",
            },
          },
        },
      },
      {
        provider_id: 5,
        provider_name: "Nantes University",
        provider_domain: "http://madoc.univ-nantes.fr/",
        statistics: {
          oer_materials: {
            count: 34,
            text: {
              number: 34,
              suffix: "",
            },
          },
          visits: {
            count: 1842,
            text: {
              number: "1.84",
              suffix: "k",
            },
          },
        },
      },
      {
        provider_id: 8,
        provider_name: "University Osnabrück",
        provider_domain: "https://www.virtuos.uni-osnabrueck.de/",
        statistics: {
          oer_materials: {
            count: 507,
            text: {
              number: 507,
              suffix: "",
            },
          },
          visits: {
            count: 285,
            text: {
              number: 285,
              suffix: "",
            },
          },
        },
      },
      {
        provider_id: 10,
        provider_name: "MIT OpenCourseWare",
        provider_domain: "https://ocw.mit.edu/",
        statistics: {
          oer_materials: {
            count: 46568,
            text: {
              number: "46.6",
              suffix: "k",
            },
          },
          visits: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
        },
      },
      {
        provider_id: 11,
        provider_name: "University of Bologna Digital Library",
        provider_domain: "http://campus.unibo.it",
        statistics: {
          oer_materials: {
            count: 10439,
            text: {
              number: "10.4",
              suffix: "k",
            },
          },
          visits: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
        },
      },
      {
        provider_id: 13,
        provider_name: "eUčbeniki",
        provider_domain: "https://eucbeniki.sio.si",
        statistics: {
          oer_materials: {
            count: 12539,
            text: {
              number: "12.5",
              suffix: "k",
            },
          },
          visits: {
            count: 24480405,
            text: {
              number: "24.5",
              suffix: "M",
            },
          },
        },
      },
      {
        provider_id: 22,
        provider_name: "OpenStax CNX",
        provider_domain: "https://cnx.org",
        statistics: {
          oer_materials: {
            count: 7925,
            text: {
              number: "7.92",
              suffix: "k",
            },
          },
          visits: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
        },
      },
      {
        provider_id: 23,
        provider_name: "OpenLearnWare",
        provider_domain: "https://www.openlearnware.de/",
        statistics: {
          oer_materials: {
            count: 698,
            text: {
              number: 698,
              suffix: "",
            },
          },
          visits: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
        },
      },
      {
        provider_id: 24,
        provider_name: "TIB AV-Portal",
        provider_domain: "https://av.tib.eu/",
        statistics: {
          oer_materials: {
            count: 53,
            text: {
              number: 53,
              suffix: "",
            },
          },
          visits: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
        },
      },
      {
        provider_id: 25,
        provider_name: "Engage NY",
        provider_domain: "https://www.engageny.org/",
        statistics: {
          oer_materials: {
            count: 4619,
            text: {
              number: "4.62",
              suffix: "k",
            },
          },
          visits: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
        },
      },
      {
        provider_id: 26,
        provider_name: "The Siemens Stiftung Media Portal",
        provider_domain: "https://medienportal.siemens-stiftung.org",
        statistics: {
          oer_materials: {
            count: 2130,
            text: {
              number: "2.13",
              suffix: "k",
            },
          },
          visits: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
        },
      },
      {
        provider_id: 33,
        provider_name: "OER Africa",
        provider_domain: "https://www.oerafrica.org/",
        statistics: {
          oer_materials: {
            count: 27,
            text: {
              number: 27,
              suffix: "",
            },
          },
          visits: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
        },
      },
      {
        provider_id: 35,
        provider_name: "eCampusOntario Open Library",
        provider_domain: "https://openlibrary.ecampusontario.ca/",
        statistics: {
          oer_materials: {
            count: 276,
            text: {
              number: 276,
              suffix: "",
            },
          },
          visits: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
        },
      },
      {
        provider_id: 15,
        provider_name:
          "https://rendering.oer-contentbuffet.info/playground/moodle",
        provider_domain:
          "https://rendering.oer-contentbuffet.info/playground/moodle",
        statistics: {
          oer_materials: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
          visits: {
            count: 16,
            text: {
              number: 16,
              suffix: "",
            },
          },
        },
      },
      {
        provider_id: 7,
        provider_name: "UOS Edu-Sharing",
        provider_domain: "https://vm222.rz.uni-osnabrueck.de/",
        statistics: {
          oer_materials: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
          visits: {
            count: 116,
            text: {
              number: 116,
              suffix: "",
            },
          },
        },
      },
      {
        provider_id: 31,
        provider_name: "CHAITECH",
        provider_domain: "https://moodle.chai.technology",
        statistics: {
          oer_materials: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
          visits: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
        },
      },
      {
        provider_id: 6,
        provider_name: "Opencast development test",
        provider_domain: "http://rolf.virtuos.uos.de:8080",
        statistics: {
          oer_materials: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
          visits: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
        },
      },
      {
        provider_id: 29,
        provider_name: "SHISU",
        provider_domain: "https://elearning.shisu.edu.cn",
        statistics: {
          oer_materials: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
          visits: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
        },
      },
      {
        provider_id: 4,
        provider_name: "Open Education Consortium",
        provider_domain: "http://www.oeconsortium.org/",
        statistics: {
          oer_materials: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
          visits: {
            count: 0,
            text: {
              number: 0,
              suffix: "",
            },
          },
        },
      },
    ],
    statistics: {
      oer_materials: {
        count: 117416,
        text: {
          number: "117",
          suffix: "k",
        },
      },
      user_activities: {
        count: 26115056,
        text: {
          number: "26.1",
          suffix: "M",
        },
      },
    },
  }

  const [providers, setProviders] = useState(static_oer)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = () => {
    fetch("https://platform.x5gon.org/api/v2/oer_providers")
      .then(res => res.json())
      .then(json => {
        setProviders(json)
        console.log(json)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setIsLoading(true)
    fetchData()
  }, [])

  return (
    <Layout>
      <Navbar light={true} />
      <div className="bg-light-gray p-128">
        <div className="maxer-880 mx-auto text-purple px-4 px-md-5 px-lg-0">
          <div className="col">
            <h2 className="">Database Statistics</h2>
            <Stats statistics={providers.statistics} />
            <p className="information">
              The basic X5GON database statistics - showing the number of OER
              materials, user activity data (visits) and number of unique users
              that accessed the registered OER repositories in the X5GON
              network.
            </p>
          </div>

          <div className="maxer mx-auto text-light-dark p-64">
            <h4 className="pl-1 maxer-800">Connected providers</h4>
            {isLoading ? (
              <>
                <div className="mx-auto text-center align-items-center pt-3">
                  <div className="mx-lg-1 px-4">
                    <span style={{ fontSize: "20px" }}>Updating data </span>
                    <img src={loadingIcon} alt="loading" height="65px" />
                  </div>
                </div>
              </>
            ) : null}
            <div className="mt-5">
              {providers.oer_providers.map(item => (
                <Provider provider={item} key={item} />
              ))}
            </div>
            <p className="mt-5">
              Check statistics about your database{" "}
              <a
                className="text-green"
                href="https://platform.x5gon.org/oer_provider/"
              >
                here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Repos

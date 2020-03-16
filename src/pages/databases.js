import React from "react"

import { Layout, Navbar } from "../components/layout"
import list from "../images/icons/list.svg"
import nantes from "../images/nantes.png"

import CountUp from "react-countup"

const Provider = provider => (
  <div className="row p-3 py-2 mb-3 bg-white mx-3">
    <div className="col">
      <a href={provider.provider.link}>
        <p className="p2 mb-0">{provider.provider.name}</p>
      </a>
      <p className="mb-0">{provider.provider.number_materials} Materials</p>
    </div>
    <div className="col-2 col-sm-1">
      <img src={list} alt="list" height={32} className="mt-3" />
    </div>
  </div>
)

const providers = [
  {
    name: "Videolectures.NET",
    link: "http://videolectures.net/",
    number_materials: 1260,
  },
  {
    name: "UNIVERSITAT POLITÈCNICA DE VALÈNCIA",
    link: "https://media.upv.es",
    number_materials: 1100,
  },
]

const Stats = () => {
  const stats = [
    {
      name: "OER Materials",
      value: 118,
      suffix: "k",
    },
    {
      name: "User Activities",
      value: 10.9,
      suffix: "M",
    },
    {
      name: "Unique Users",
      value: 2.25,
      suffix: "M",
    },
  ]
  return (
    <div className="row text-center p-64">
      {stats.map((stat, index) => {
        return (
          <div className="col-sm-4 my-3 my-sm-0">
            <div className="stats">
              <h4 className="">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  decimals={index}
                />
              </h4>
              <p className="stats__label">
                <span>{stat.name}</span>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const repos = () => (
  <Layout>
    <Navbar light={true} />
    <div className="bg-light-gray p-128">
      <div className="maxer-880 mx-auto text-purple px-4 px-md-5 px-lg-0">
        <div className="col">
          <h2 className="">Database Statistics</h2>
          <Stats />
          <p className="information">
            The basic X5GON database statistics - showing the number of OER
            materials, user activity data (visits) and number of unique users
            that accessed the registered OER repositories in the X5GON network.
          </p>
        </div>

        <div className="maxer mx-auto text-light-dark p-64">
          <h4 className="pl-1 maxer-800">Connected providers</h4>
          <div className="mt-5">
            {providers.map(item => (
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

export default repos

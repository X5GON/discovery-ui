import React from "react"

import { Layout, Navbar } from "../components/layout"
import list from "../images/icons/list.svg"
import nantes from "../images/nantes.png"

const Provider = provider => (
  <div className="row p-5 mb-3 bg-white">
    <div className="col-4">
      <img src={nantes} alt="list" height={64} className="my-auto" />
    </div>
    <div className="col">
      <p className="p2 mb-0">{provider.provider}</p>
      <p className="mb-0">1260 Materials</p>
    </div>
    <div className="col-1">
      <img src={list} alt="list" height={32} className="my-auto" />
    </div>
  </div>
)

const providers = [
  "Université de Nantes",
  "nantes",
  "farewell",
  "data",
  "through",
  "api",
]

const repos = () => (
  <Layout>
    <Navbar light={true} />
    <div className="bg-light-gray p-128">
      <div className="maxer mx-auto text-light-dark">
        <p className="text-ecosystem pb-0 mb-0 pl-1">CONNECTED DATABASES</p>
        <h2 className="py-4 text-black">Connected Databases</h2>
        <h4 className="pl-1 maxer-800">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet
          pretium ipsum.
        </h4>
        <div className="p-64">
          {providers.map(item => (
            <Provider provider={item} key={item} />
          ))}
        </div>
      </div>
    </div>
  </Layout>
)

export default repos

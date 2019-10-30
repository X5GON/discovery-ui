import React from "react"
import withLocation from "../components/withLocation"
import { Link } from "gatsby"

const CustomQueryStringComponent = ({ search }) => {
  console.log(search)
  var { custom } = search
  return (
    <p>
      Custom Value: {custom}
      <Link to={"/test?custom=pressed"}>Change me</Link>
    </p>
  )
}

export default withLocation(CustomQueryStringComponent)

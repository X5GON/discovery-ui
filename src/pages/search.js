import React from "react"
import "../css/search.css"
import "../css/bootstrap.css"
import "../css/main.css"
import "../css/images.css"
import ReactPaginate from "react-paginate"
import { navigate } from "gatsby"
import withLocation from "../components/withLocation"

import { Layout, Navbar, Footer } from "../components/layout"

import copy from "../images/icons/copy.svg"
import dve_crte from "../images/icons/dve_crte.svg"
import no_cash from "../images/icons/no_cash.svg"
import cc from "../images/icons/cc.svg"
import close from "../images/icons/close.svg"

import { isoFormatDMY, parseISOString } from "../components/functions"
import ISO6391 from "iso-639-1"

/*
this.state.api_search.metadata.count `je za celotno stevilo nefiltrirano oer elementov`
this.state.api_search.metadata.total_pages `je filtrirano`

*/

class Search extends React.Component {
  constructor(props) {
    super(props)
    // STATE
    console.log(String(props.search.type))

    this.state = {
      defaultSearch: true,
      search_key: String(props.search.q),
      type: props.search.type ? String(props.search.type) : "all", // "all" be default
      licenses: [],
      languages: [],
      current_page: 1,
      previous_page: 0,
      previous_search: "",
      api_search: {
        query: {},
        rec_materials: [],
        metadata: { total_pages: 0 },
      },
      isLoaded: true,
      showRecommendations: false,
      IsSearching: false,
      corsEnabled: false,
      site_api: "https://platform.x5gon.org/api/v2/", //upgraded to v2
      wordlist: [],
      loading: true,
      showFilter: true,
      search_error: false,
    }
  }

  componentDidMount = () => {
    if (this.state.defaultSearch && this.state.search_key !== "undefined") {
      this.searchComponent()
      this.setState({ defaultSearch: false })
    }
  }

  searchComponent = currentPage => {
    this.setState({
      previous_search: String(this.state.search_key),
      previous_page: parseInt(this.state.current_page),
      loading: true,
    })
    window.scrollTo(0, 0)
    // removed (this.state.search_key !== this.state.previous_search || this.state.previous_page !== currentPage) because of bugs
    if (this.state.search_key) {
      this.setState({
        isLoaded: false,
      })

      fetch(
        this.state.site_api +
          "search?text=" +
          this.state.search_key +
          "&page=" +
          currentPage +
          "&types=" +
          this.state.type +
          "&licenses=" +
          this.state.licenses.toString() +
          "&languages=" +
          this.state.languages.toString() +
          "&provider_ids=" +
          "&limit="
      )
        .then(res => res.json())
        .then(json => {
          console.log(json)
          if (json.status === "error") {
            this.setState({
              isLoaded: true,
              IsSearching: true,
              loading: false,
              search_error: true,
            })
          } else {
            this.setState({
              isLoaded: true,
              api_search: {
                query: json.query,
                rec_materials: json.rec_materials,
                metadata: json.metadata,
              },
              showRecommendations: false,
              IsSearching: true,
              loading: false,
              search_error: false,
            })
          }
        })
    }
  }
  ChangeSearchKey = value => {
    this.setState({
      search_key: value,
      showRecommendations: true,
    })
  }
  handleSearch = e => {
    this.setState({
      loading: true,
    })
    if (e) {
      e.preventDefault()
    }

    console.log("amazing")
    navigate(
      "/search?q=" +
        this.state.search_key +
        (this.state.type !== "all" ? "&" + "type" + "=" + this.state.type : "")
    )
    this.searchComponent()
  }
  AcceptRec = name => {
    this.setState({ search_key: name, showRecommendations: false })
  }
  ChangePage = data => {
    this.setState({ current_page: data.selected })
    console.log(data.selected)
    this.searchComponent(data.selected + 1)
  }
  /* PLUGIN FROM https://www.npmjs.com/package/react-paginate */
  BottomPagination = () => {
    if (this.state.api_search.metadata.total_pages) {
      return (
        <div className="mt-5">
          <p className="text-center text-ecosystem text-light-grey mb-4">
            PAGE
          </p>
          <ReactPaginate
            pageCount={this.state.api_search.metadata.total_pages}
            pageRangeDisplayed={0}
            marginPagesDisplayed={1}
            onPageChange={this.ChangePage}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"pagi-item"}
            pageLinkClassName={"pagi-item-link"}
            activeClassName={"pagi-item-link active"}
            breakLabel={"of"}
            breakClassName={"pagi-item"}
            breakLinkClassName={"pagi-item-break"}
            previousLabel={""}
            previousClassName={"pagi-previous"}
            previousLinkClassName={"pagi-previous-link"}
            nextLabel={""}
            nextClassName={"pagi-next"}
            nextLinkClassName={"pagi-next-link"}
            disabledClassName={"page-item disabled"}
          />
        </div>
      )
    } else {
      return null
    }
  }

  // JSX ELEMENTS
  Recommendations = () => {
    if (this.state.search_key !== "" && this.state.showRecommendations) {
      return (
        <ul className="recommendations">
          {this.state.wordlist
            .filter(word =>
              word.toLowerCase().startsWith(this.state.search_key.toLowerCase())
            )
            .map(item => (
              <li key={item}>
                <button
                  className="btn bg-transparent"
                  onClick={this.AcceptRec.bind(this, item)}
                >
                  {item}
                </button>
              </li>
            ))
            .slice(0, 6)}
        </ul>
      )
    } else {
      return null
    }
  }
  NrOfSearches = () => {
    if (this.state.IsSearching === true)
      return (
        <div className="p-64 text-center text-semi-light">
          <h4>
            {this.state.api_search.metadata.total_hits} Open Educational
            Resources Found
          </h4>
          <this.CCDisclaimer />
        </div>
      )
    else {
      return null
    }
  }

  FilterMultiComponent = propz => {
    const props = propz.props
    const Text = props.text
    const statename = props.statename
    const types = props.types
    const ModifyItem = item => {
      if (this.state[statename].includes(item)) {
        this.setState(
          {
            [statename]: this.state[statename].filter(sin => sin !== item),
          },
          () => this.searchComponent()
        )
      } else if (item === "") {
        this.setState(
          {
            [statename]: [],
          },
          () => this.searchComponent()
        )
      } else {
        this.setState(
          {
            [statename]: [...this.state[statename], item],
          },
          () => this.searchComponent()
        )
      }
    }
    if (props.disabled) {
      return null
    }
    return (
      <div className="col-sm-6 col-12 col-md-3">
        <div className={"filter mt-3 " + (props.style ? props.style : "")}>
          <div
            className="type-li"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {Text}
            {this.state[statename].length !== 0 ? (
              <span className="license-nr">
                {this.state[statename].length}
                <img src={close} alt="x" />
              </span>
            ) : null}
          </div>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {types.map((item, index) => (
              <button
                key={item}
                className={
                  "dropdown-item" +
                  (this.state[statename].includes(item) ? " active" : "")
                }
                onClick={() => ModifyItem(item)}
              >
                {props.displayTypes ? props.displayTypes[index] : item}
              </button>
            ))}
            {this.state[statename].length !== 0 ? (
              <button
                className={"dropdown-item clear-all mt-2"}
                onClick={() => ModifyItem("")}
              >
                Clear all ({this.state[statename].length})
              </button>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
  FilterTab = () => {
    const Type = () => {
      const types = ["Video", "Audio", "Text", "Image"]
      const ChangeType = type => {
        if (this.state.type === type) {
          type = "all"
        }
        this.setState(
          {
            type: type,
          },
          () => this.handleSearch()
        )
      }
      return (
        <div className="col-sm-6 col-12 col-md-3">
          <div className="filter mt-3">
            <div
              className="type-li"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {this.state.type !== "all" ? this.state.type : "Type"}
            </div>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {types.map(type => (
                <button
                  key={type}
                  className={
                    "dropdown-item" +
                    (this.state.type === type ? " active" : "")
                  }
                  onClick={() => ChangeType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }
    const licenses = {
      text: "Licenses",
      statename: "licenses",
      types: ["CC", "BY", "BY-NC", "BY-SA", "BY-ND", "BY-NC-ND", "BY-NC-SA"],
      displayTypes: [
        "CC",
        "CC BY",
        "CC BY-NC",
        "CC BY-SA",
        "CC BY-ND",
        "CC BY-NC-ND",
        "CC BY-NC-SA",
      ],
    }
    const languages = {
      text: "Languages",
      statename: "languages",
      types: ["en", "es", "sl", "pt", "de", "fr", "ca"],
      displayTypes: [
        "English",
        "Spanish",
        "Slovene",
        "Portugese",
        "German",
        "French",
        "Catalan",
      ],
      style: "ml-md-auto",
    }

    return (
      <div className="row">
        <Type />
        <this.FilterMultiComponent props={licenses} />
        <this.FilterMultiComponent
          props={{
            ...languages,
            disabled: this.state.type === "Image" ? true : false,
          }}
        />
      </div>
    ) //,disabled:(this.state.type === 'Image' ?true :false)
  }
  SearchBar = () => {
    const modifyfilter = () => {
      this.setState({
        showFilter: !this.state.showFilter,
      })
    }
    return (
      <div className="mx-1 mx-xl-0">
        <div className="row p-0 px-3">
          <form
            onSubmit={this.handleSearch}
            className={
              "search-input mx-0 col-10 col-sm-10 col-md-12" +
              (this.state.search_key ? " is-text" : "")
            }
          >
            <input
              type="text"
              value={this.state.search_key}
              onChange={e => this.ChangeSearchKey(e.target.value)}
              placeholder="Search"
              autoComplete="off"
            />
            <button type="submit" />
          </form>
          <div className="col-1 d-md-none">
            <button className="hide-mobile" onClick={modifyfilter} />
          </div>
        </div>
        <div
          className={"d-md-block " + (this.state.showFilter ? "" : "d-none")}
        >
          <this.FilterTab />
        </div>
      </div>
    )
  }
  SearchDIV = () => {
    return (
      <div className="py-4 my-lg-2 ds-default">
        <div className="maxer-880 mx-auto px-4 px-lg-0">
          <this.SearchBar />
        </div>
      </div>
    )
  }
  TinyIcons = lic_types => (
    <span className="tiny-icons">
      {lic_types.includes("sa") ? <img src={copy} alt="copy" /> : null}
      {lic_types.includes("nd") ? <img src={dve_crte} alt="dve_crte" /> : null}
      {lic_types.includes("nc") ? <img src={no_cash} alt="no_cash" /> : null}
      <img src={cc} alt="cc" />
    </span>
  )
  SearchItem = item => {
    let sitem = item
    if (sitem.description && sitem.description.length > 280) {
      sitem.description = sitem.description.substr(0, 280) + " ..."
    }
    const formurl_lg =
      sitem.website.substr(0, 95) + (sitem.website.length > 95 ? "..." : "")
    const formurl = sitem.website.substr(0, 33) + " ..."

    // if material is image, the response is completely different
    if (sitem.image_id) {
      return (
        <div
          key={sitem.material_url}
          className="col-lg-4 col-md-4 col-6 image mb-5"
        >
          <div className="mx-auto">
            <div className="image-container">
              <a href={sitem.material_url} target="_blank">
                <div
                  style={{ backgroundImage: `url(${sitem.material_url})` }}
                  className="rounded img"
                />
              </a>
              <span className="cc-left">
                {sitem.license.typed_name.includes("sa") ? (
                  <img src={copy} alt="copy" />
                ) : null}
                {sitem.license.typed_name.includes("nd") ? (
                  <img src={dve_crte} alt="dve_crte" />
                ) : null}
                {sitem.license.typed_name.includes("nc") ? (
                  <img src={no_cash} alt="no_cash" />
                ) : null}
                <img src={cc} alt="cc" />
              </span>
            </div>

            <div className="info">
              <span className="d-block mb-1 mb-md-0">
                <b>Provider:</b>{" "}
                <a href={sitem.website} className="text-black hover-green">
                  {sitem.source}
                </a>
              </span>

              <span className="d-block mb-1 mb-md-0">
                <b>Creator:</b>{" "}
                <a href={sitem.creator_url} className="text-black hover-green">
                  {sitem.creator}
                </a>
              </span>
              <span className=" mb-1 mb-md-0">
                <b>CC metadata:</b>{" "}
                <a
                  href={sitem.cc_metadata_url}
                  className="text-black hover-green"
                >
                  view
                </a>
              </span>
            </div>
          </div>
        </div>
      )
    }
    return (
      <li key={sitem.url} className="pb-3 mx-3 mx-lg-0">
        <div className="search-li px-lg-5 px-4">
          <div className="row p-0 mb-0">
            <div className="col-md-1 col-12 pb-3">
              <div className={"ml-md-3 ml-lg-0 search-img " + sitem.type}>
                <span
                  className="d-md-none d-inline text-ecosystem text-light-grey pt-auto pl-5 ml-4"
                  style={{ verticalAlign: "-50%" }}
                >
                  {sitem.type.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="col-md-9 col-12 pl-lg-3 pl-md-4">
              <a href={sitem.url} target="blank" className="d-inline-block">
                <h6 className="searched maxer-500 pb-0 hover-green">
                  {sitem.title}
                  <span className="link-img" />
                </h6>
              </a>
            </div>
            <div className="col-2 pl-0 d-none d-md-block mt-2">
              {sitem.license.typed_name
                ? this.TinyIcons(sitem.license.typed_name)
                : null}
            </div>
          </div>
          {sitem.description ? (
            <p className="search-description">{sitem.description}</p>
          ) : null}

          <div className="bg-light search-source">
            Source:{" "}
            <a className="text-muted hover-green" href={sitem.website}>
              <span className="d-md-inline d-none">{formurl_lg}</span>
              <span className="d-md-none">{formurl}</span>
            </a>
          </div>
          <div className="pt-4 info">
            <span className="d-block d-md-inline mb-1 mb-md-0">
              <b>Provider:</b>{" "}
              <a
                href={sitem.provider.domain}
                className="text-black hover-green"
              >
                {sitem.provider.name}
              </a>
            </span>
            <span className="text-green mx-3 d-none d-md-inline">/</span>
            <span className="d-block d-md-inline mb-1">
              <b>Language:</b> {ISO6391.getName(sitem.language)}
            </span>
            <span className="text-green mx-3 d-none d-md-inline">/</span>
            <span className="d-block d-md-inline">
              {sitem.creation_date ? (
                <>
                  <b>Created:</b>{" "}
                  {isoFormatDMY(parseISOString(sitem.creation_date))}
                </>
              ) : (
                <>
                  <b>Updated:</b>{" "}
                  {isoFormatDMY(parseISOString(sitem.retrieved_date))}
                </>
              )}
            </span>
          </div>
          <div className="col d-block d-md-none pt-4">
            {sitem.license.typed_name
              ? this.TinyIcons(sitem.license.typed_name)
              : null}
          </div>
        </div>
      </li>
    )
  }
  SearchItemsUL = item =>
    this.state.type === "Image" ? (
      <div className="row images mx-auto">
        {this.state.api_search.rec_materials.map(item => this.SearchItem(item))}
      </div>
    ) : (
      <ul className="searched-items mx-auto">
        {this.state.api_search.rec_materials.map(item => this.SearchItem(item))}
      </ul>
    )

  LoadingIcon = () => (
    <div className="d-relative">
      <div className="loading-icon mx-auto bg-none" />
    </div>
  )

  ErrorBar = () =>
    this.state.search_error ? (
      <div class="alert alert-danger" role="alert">
        Something went wrong
      </div>
    ) : null

  CCDisclaimer = () =>
    this.state.type === "Image" && this.state.isLoaded ? (
      <p className="text-muted mx-3 mt-3">
        DISCLAIMER: The results are gathered via{" "}
        <a className="hover-green" href="https://search.creativecommons.org">
          Creative Commons API
        </a>{" "}
      </p>
    ) : null

  // OTHER

  // RENDER VIEW
  render() {
    return (
      <Layout theme="bg-light">
        <Navbar light={true} />
        <this.SearchDIV />
        {this.state.loading ? <this.LoadingIcon /> : null}
        <div className="pb-5">
          <div className="maxer-880 mx-auto" id="search">
            {/* <this.Recommendations /> */}
            <this.ErrorBar />
            <this.NrOfSearches />
            <this.SearchItemsUL />
            <this.BottomPagination />
          </div>
        </div>
      </Layout>
    )
  }
}

export default withLocation(Search)

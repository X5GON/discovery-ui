import React from "react"
import "../css/search.css"
import "../css/bootstrap.css"
import "../css/main.css"
import ReactPaginate from "react-paginate"
import { navigate } from "gatsby"
import withLocation from "../components/withLocation"

import { Layout, Navbar } from "../components/layout"

import link_img from "../images/icons/link.svg"
import copy from "../images/icons/copy.svg"
import dve_crte from "../images/icons/dve_crte.svg"
import no_cash from "../images/icons/no_cash.svg"
import cc from "../images/icons/cc.svg"

/*
this.state.api_search.metadata.count `je za celotno stevilo nefiltrirano oer elementov`
this.state.api_search.metadata.total_pages `je filtrirano`

*/

class Search extends React.Component {
  constructor(props) {
    super(props)
    // STATE

    this.state = {
      defaultSearch: true,
      search_key: String(props.search.q),
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
      site_api: "https://platform.x5gon.org/api/v1/",
      wordlist: [],
      loading: true,
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
    if (
      this.state.search_key &&
      (this.state.search_key !== this.state.previous_search ||
        this.state.previous_page !== currentPage)
    ) {
      this.setState({
        isLoaded: false,
      })
      fetch(
        this.state.site_api +
          "search?text=" +
          this.state.search_key +
          "&page=" +
          currentPage
      )
        .then(res => res.json())
        .then(json => {
          console.log(json)
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
          })
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
    e.preventDefault()
    navigate("/search?q=" + this.state.search_key)

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
        <div>
          <p className="text-center text-ecosystem text-light-grey">PAGE</p>
          <ReactPaginate
            pageCount={this.state.api_search.metadata.total_pages}
            pageRangeDisplayed={0}
            marginPagesDisplayed={1}
            onPageChange={this.ChangePage}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"pagi-item"}
            pageLinkClassName={"pagi-item-link"}
            activeClassName={"pagi-item-link active"}
            breakLabel={"..."}
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
        </div>
      )
    else {
      return null
    }
  }
  SearchBar = () => {
    return (
      <div className="mx-3 mx-xl-0">
        <form onSubmit={this.handleSearch} className="search-input mx-0">
          <input
            /* ref={input => input && input.focus()} */
            type="text"
            value={this.state.search_key}
            onChange={e => this.ChangeSearchKey(e.target.value)}
            placeholder="Search"
            autoComplete="off"
          />
          <button type="submit" />
        </form>
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
  TinyIcons = (lic_types) => (
    <span className="tiny-icons">
      {lic_types.includes("sa") ? (<img src={copy} alt="copy" />) : null}
      {lic_types.includes("nd") ? (<img src={dve_crte} alt="dve_crte" />) : null}
      {lic_types.includes("nc") ? (<img src={no_cash} alt="no_cash" />) : null}
      <img src={cc} alt="cc" />
    </span>
  )
  SearchItem = item => {
    let sitem = item
    if (sitem.description && sitem.description.length > 280) {
      sitem.description = sitem.description.substr(0, 280) + " ..."
    }
    const formurl = sitem.url.substr(0, 33) + " ..."
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
            <div className="col-md-8 col-12 pl-md-5 pl-md-3">
              <a href={sitem.url} target="blank" className="d-inline-block">
                <h6 className="searched maxer-500 pb-0 hover-green">
                  {sitem.title}
                  <img src={link_img} height={36} alt="link" />
                </h6>
              </a>
            </div>
            <div className="col pl-0 d-none d-md-block pl-4 mt-2">
              {sitem.license.typed_name ? (this.TinyIcons(sitem.license.typed_name)) : null}
            </div>
          </div>
          {sitem.description ? (
            <p className="search-description">{sitem.description}</p>
          ) : null}

          <div className="bg-light search-source">
            Source:{" "}
            <a className="text-muted hover-green" href={sitem.url}>
              <span className="d-md-inline d-none">{sitem.url}</span>
              <span className="d-md-none">{formurl}</span>
            </a>
          </div>
          <div className="pt-3 info">
            <span className="d-block d-md-inline mb-2 mb-md-0">
              <b>Provider:</b> {sitem.provider.name}
            </span>
            <span className="text-green mx-3 d-none d-md-inline">/</span>
            <span className="d-block d-md-inline">
              <b>Language:</b> {sitem.language}
            </span>
          </div>
          <div className="col d-block d-md-none pt-4">
            {sitem.license.typed_name ? (this.TinyIcons(sitem.license.typed_name)) : null}
          </div>
        </div>
      </li>
    )
  }
  SearchItemsUL = item => {
    return (
      <ul className="searched-items mx-auto">
        {this.state.api_search.rec_materials.map(item => this.SearchItem(item))}
      </ul>
    )
  }
  LoadingIcon = () => (
    <div className="d-relative">
      <div className="loading-icon mx-auto bg-none" />
    </div>
  )

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
            <this.Recommendations />
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

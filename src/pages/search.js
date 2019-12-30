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
this.state.api_search.metadata.max_pages `je filtrirano`

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
        metadata: { max_pages: 0 },
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
    if (this.state.api_search.metadata.max_pages) {
      return (
        <div>
          <p className="text-center">PAGE</p>
          <ReactPaginate
            pageCount={this.state.api_search.metadata.max_pages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={this.ChangePage}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            activeClassName={"page-item active"}
            previousLabel={"<"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLabel={">"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
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
            {this.state.api_search.metadata.count * 10} Open Educational
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
            ref={input => input && input.focus()}
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
      <div className="p-64">
        <div className="maxer-880 mx-auto">
          <this.SearchBar />
        </div>
      </div>
    )
  }
  TinyIcons = () => (
    <span className="tiny-icons">
      <img src={copy} alt="copy" />
      <img src={dve_crte} alt="dve_crte" />
      <img src={no_cash} alt="no_cash" />
      <img src={cc} alt="cc" />
    </span>
  )
  SearchItem = item => {
    let sitem = item
    if (sitem.description && sitem.description.length > 280) {
      sitem.description = sitem.description.substr(0, 280) + " ..."
    }
    return (
      <li key={sitem.url} className="pb-3">
        <div className="search-li">
          <div className="row p-0">
            <div className="col-1">
              <div className={"search-img " + sitem.type} />
            </div>
            <div className="col-8">
              <a href={sitem.url} target="blank" className="d-inline-block">
                <p className="searched p2 maxer-500 pb-0 hover-green">
                  {sitem.title}
                  <img
                    src={link_img}
                    style={{ verticalAlign: "-32%" }}
                    height={36}
                    alt="link"
                  />
                </p>
              </a>
            </div>
            <div className="col">
              <this.TinyIcons />
            </div>
          </div>
          <p className="search-description">{sitem.description}</p>

          <div className="bg-light search-source">
            Source:{" "}
            <a className="text-muted hover-green" href={sitem.url}>
              {sitem.url}
            </a>
          </div>
          <div className="pt-3 info">
            <span>
              <b>Provider:</b> {sitem.provider}
            </span>
            <span className="text-green mx-3">/</span>
            <span>
              <b>Language:</b> {sitem.language}
            </span>
          </div>
        </div>
      </li>
    )
  }
  SearchItemsUL = item => {
    return (
      <ul className="searched-items">
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
      <Layout>
        <Navbar light={true} />
        <this.SearchDIV />
        {this.state.loading ? <this.LoadingIcon /> : null}
        <div className="bg-light">
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

import React from "react"
import "../css/search.css"
import "../css/bootstrap.css"
import "../css/main.css"
import ReactPaginate from "react-paginate"
import { navigate } from "gatsby"
import withLocation from "../components/withLocation"

import { Layout, Navbar } from "../components/layout"

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
    }
  }
  // FUNCTIONS
  /* componentWillMount = () => {
    fetch("/search/recommendation_words.json").then(async resp => {
      const data = await resp.json()
      this.setState({
        wordlist: data.words,
      })
    })
  } */
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
        <h4 className="p-64 text-center text-md-left ml-md-4">
          Found <b>{this.state.api_search.metadata.count * 10}</b> Open
          Educational Resources
        </h4>
      )
    else {
      return null
    }
  }
  SearchBar = () => {
    return (
      <div>
        <form onSubmit={this.handleSearch} className="search-input">
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
      <div className="p-64 bg-gray">
        <div className="maxer-880 mx-auto">
          <this.SearchBar />
        </div>
      </div>
    )
  }
  SearchItem = item => {
    let sitem = item
    if (sitem.description && sitem.description.length > 280) {
      sitem.description = sitem.description.substr(0, 280) + " ..."
    }
    return (
      <li key={sitem.url} className="pb-3">
        <div className="search-li">
          <a href={sitem.url} target="blank">
            <p className="searched p2 maxer-500">{sitem.title}</p>
          </a>

          <p>{sitem.description}</p>

          <a className="text-muted" href={sitem.url}>
            <div className="bg-light p-2">{sitem.url}</div>
          </a>
          <div className="pt-3 info">
            <p>Language: {sitem.language}</p>
            <p>Provider: {sitem.provider}</p>
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

  // OTHER

  // RENDER VIEW
  render() {
    return (
      <Layout>
        <Navbar light={true} />
        <this.SearchDIV />
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

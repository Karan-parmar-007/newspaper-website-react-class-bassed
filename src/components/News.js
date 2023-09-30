import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalixeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  constructor(props) {
  super(props);
  console.log("This is a new from news.js");
  this.state = {
      articals: [],
      loading: false,
      page: 1,
      totalResults: 0
  };
  document.title = `${this.capitalixeFirstLetter(this.props.category)} - NewsMonkey`
  }

  async updateStatus(){
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url);
    this.props.setProgress(30)
    let parseData = await data.json()
    this.props.setProgress(70)
    this.setState({ articals: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false 
    });
    this.props.setProgress(100)
  }

  async componentDidMount(){
    this.updateStatus()
  }  

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`
    this.setState({loading: true})
    let data =  await fetch(url);
    let parseData = await data.json()
    this.setState({ 
      articals: this.state.articals.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
      page: this.state.page +1,
      hasMore: this.state.articals.length < parseData.totalResults,
    });
  };

  render() {
    return (
      <div className='container my-3'>
      <h1 className="text-center" style={{margin: '35px 0px'}}>NewsMonkey Top Headlines from {this.capitalixeFirstLetter(this.props.category)} category</h1>
      <InfiniteScroll
          dataLength={this.state.articals.length}
          next={this.fetchMoreData}
          hasMore={this.state.articals.length < this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
            {
              this.state.articals.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ''}
                    description={element.description ? element.description.slice(0, 80) : ''}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    auther={element.author}
                    date={element.publishedAt}
                  />
                </div>
              ))}
          </div>
        </div>
      </InfiniteScroll>  
      </div>
    );
  }  
}

export default News
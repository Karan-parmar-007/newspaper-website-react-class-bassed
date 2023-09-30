import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description, imageUrl, newsUrl, auther, date} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
        <img src={imageUrl || "https://image.cnbcfm.com/api/v1/image/107159164-1669831872804-gettyimages-1445795074-img_0531_28a51d8a-76e6-41a2-92eb-7471fc68ef28.jpeg?v=1695744240&w=1920&h=1080"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"> <small className='text-muted'>By {!auther? "Unknown": auther} on {new Date(date).toGMTString()} </small> </p>
            <a href={newsUrl}  rel="noreferrer" target='_blank' className="btn btn-sm btn-primary">Read More...</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
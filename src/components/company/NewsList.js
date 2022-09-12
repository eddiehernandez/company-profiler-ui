const NewsList = ({newsList}) => {
    return (
        <div className="newList">
            {newsList.map(news => (
                <div className="news" key={news?.id}>
                    <div className="row my-3">
                        <div className="col-9">
                            <a href={news?.url} rel="noreferrer" target="_blank"><strong>{news?.headline}</strong></a><br />
                            <i>{news?.datetime}</i><br />
                            {news?.summary}<br />
                            Source: {news?.source}
                        </div>
                        <div className="col-3"><img className="img-fluid img-thumbnail" src={news?.image} alt="" /></div>
                    </div>
                </div>
            ))}
        </div>
      );
}
 
export default NewsList;
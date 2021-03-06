import React, { Component } from 'react';
import CollectionManager from '../modules/CollectionManager';
import WishlistManager from '../modules/WishlistManager';
import './VolumeDetails.css'

class VolumeDetail extends Component {
    state = {
        issues: [],
        title: "",
        volume: "",
        issueNumber: "",
        publishDate: "",
        description: "",
        coverImg: "",
        condition: "",
        rating: ""

    }

    componentDidMount() {
        //getIssueByVolume(id) from CollectionManager and hang on to the data; put it into state
        CollectionManager.getIssueByVolume(this.props.volumeId)
            .then((issues) => {
                this.setState({
                    issues: issues.results,
                    name: issues.name
                });
            });
    }

    createNewCollectionItem = (evt, id) => {
        evt.preventDefault()
        const selectedIssueObject = this.state.issues.find(issue => {
            return issue.id === id
        })
        const collectionObject = {
            title: selectedIssueObject.name,
            volume: selectedIssueObject.volume.name,
            issueNumber: selectedIssueObject.issue_number,
            publishDate: selectedIssueObject.cover_date,
            description: selectedIssueObject.description,
            coverImg: selectedIssueObject.image.small_url,
            condition: "",
            rating: "",
            userId: parseInt(sessionStorage.getItem("activeUser"))
        }

        CollectionManager.createNewCollectionItem(collectionObject)
            .then(() => alert('Issue successfully added to your collection!'))
    }

    createNewWishlistItem = (evt, id) => {
        evt.preventDefault()
        const selectedIssueObject = this.state.issues.find(issue => {
            return issue.id === id
        })
        const wishlistObject = {
            title: selectedIssueObject.name,
            volume: selectedIssueObject.volume.name,
            issueNumber: selectedIssueObject.issue_number,
            publishDate: selectedIssueObject.cover_date,
            description: selectedIssueObject.description,
            coverImg: selectedIssueObject.image.small_url,
            userId: parseInt(sessionStorage.getItem("activeUser"))
        }

        WishlistManager.createNewWishlistItem(wishlistObject)
            .then(() => alert('Issue successfully added to your wishlist!'))
    }

    render() {
        return (
            <>
            <div className='results-background-img'>
                <h2 className='page__heading'>Results</h2>
                <div className="card-container">
                    <div className="row hidden-md-up">
                        {this.state.issues.map(issue => (
                            <div className='card-block' key={issue.id}>
                                <img className='card-img-top' src={issue.image.small_url} alt="" />
                                <div className='card-body'>
                                    <p className='card-title'>Issue #{issue.issue_number} <br></br>{issue.name}</p>
                                    
                                </div>
                                <div className='btn-grp'>
                                    <button className='addCollection-btn' type="button" onClick={(evt) => this.createNewCollectionItem(evt, issue.id)}>Add to Collection</button>
                                    <button className='addWishlist-btn' type="button" onClick={(evt) => this.createNewWishlistItem(evt, issue.id)}>Add to Wishlist</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default VolumeDetail;
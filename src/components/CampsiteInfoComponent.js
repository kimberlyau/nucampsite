import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
/* 
    Presentational components that do not contain or manage state
    Render the view using props passed down from main components
*/

// campsite is a property of props, so we will destructure it by using {campsite}
function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {
                    comments.map(comment => {
                        return (
                            <div key={comment.id}>
                                <p>
                                    {comment.text}<br />
                                    -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                </p>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
    return <div />;
}

class CommentForm extends Component {
    constructor (props) {
        super(props);
        // Default state of modal
        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);

        this.handleSubmit =this.handleSubmit.bind(this);
    }

    toggleModal () {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleSubmit (values) {
        
    }

    render () {
        return (
            <Button outline>
                <i className='fa fa-pencil fa-lg'>Submit Comment</i>
            </Button>
        )
    }
}
// this keyword has been refactored out
function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}

export default CampsiteInfo;
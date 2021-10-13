// Import Modules
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { contextAPI } from '../Context.js';

// Courses Component - Renders all courses at the home '/' route
const CoursesDetail = () => {
        
    // Setting State
    const [ user, setUser] = useState({});
    const [ course, setCourseData ] = useState({});

    // Data from Context
    const context = useContext(contextAPI);
    const signedIn = context.authedUser;

    // URL History
    const history = useHistory();
    const { id } = useParams();
    
    // Fetching Course
    useEffect(() => {
      context.data.getCourseDetails(id)
        .then( res => {
          if (res) {
            setCourseData(res);
            setUser(res.User);              
          } else {
              history.push('/notfound')
          }
        })
        .catch( () => history.push('/error'));
    }, [id, context.data, history])

    return (
        <main>
        <div className="actions--bar">
            <div className="wrap">
                {/* Rendering the delete and update course button if the user has been authorized*/}
                { signedIn && signedIn.id === user.id ? (
                    <React.Fragment> 
                      <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                      <Link className="button" to={`/courses/${id}/delete`} > Delete Course</Link>
                      <Link className="button button-secondary" to="/">Return to List</Link>                    
                    </React.Fragment>
                ):(
                    <React.Fragment> 
                      <Link className="button button-secondary" to="/">Return to List</Link>                    
                    </React.Fragment>
                )}
            </div>
        </div>
        
        <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{course.title}</h4>
                        <p>By {user.firstName} {user.lastName}</p>
                        <ReactMarkdown>
                            {course.description}
                        </ReactMarkdown>
                    </div>
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{course.estimatedTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                        <ReactMarkdown className="course--detail--list">
                            {course.materialsNeeded}
                        </ReactMarkdown>
                    </div>
                </div>
            </form>
        </div>
    </main>
    )
}

export default CoursesDetail;
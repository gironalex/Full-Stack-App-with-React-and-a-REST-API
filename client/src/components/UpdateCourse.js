// Import Modules
import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { contextAPI } from '../Context.js';

// UpdateCourse Component
const UpdateCourse = () => {

    // Setting State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [errors, setErrors] = useState([]);

    // Data from Context
    const context = useContext(contextAPI);
    const signedIn = context.authedUser;
    const userId = signedIn.id;

    // URL History
    const history = useHistory();
    const { id } = useParams();

    // Fetching Course to Update
    useEffect(() => {
        context.data.getCourseDetails(id)
            .then(res => {
              if (!res) {
                  history.push('/notfound');
              } else if (res && res.userId === userId) {
                 setTitle(res.title);
                 setDescription(res.description);
                 setEstimatedTime(res.estimatedTime);
                 setMaterialsNeeded(res.materialsNeeded);
              } else {
                  history.push('/forbidden');
                  console.log(res);
              }
            })
            .catch( () => history.push('/error'));
    }, [id, userId, context.data, history])
    
    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Data to be passed to the database
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        };

        if (signedIn){
          // Posting course data to the database
          context.data.updateCourse(course, id, signedIn.emailAddress, signedIn.password)
            .then( (errors) => {
              if (errors.length) {
                setErrors(errors);
              } else {
                  history.push(`/courses/` + id)
                }
              })                      
            .catch((err) => {
              history.push('/error');
              console.log('Error with Updating Course', err);
          });             
        }
    }

    // Handle Cancel Button
    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/');
    }

    return (
      <main>
        <div className="wrap">
            <h2>Update Course</h2>
            { 
              errors.length ? 
                <div className="validation--errors">
                  <h3>Validation Errors</h3>
                    <ul>
                        {errors.map((error, index) => {
                            return (
                              <li key={index}>{error}</li>  
                            )
                        })}
                    </ul>
                </div>
                : 
                null
            }
        <form >
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={(e)=> setTitle(e.target.value)}></input>

              <p>By {signedIn.firstName} {signedIn.lastName}</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={(e)=> setEstimatedTime(e.target.value)}></input>

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={(e)=> setMaterialsNeeded(e.target.value)}></textarea>
            </div>
          </div>
            <button className="button" type="submit" onClick={handleSubmit}>Update Course</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </main>
    )
}

export default UpdateCourse;
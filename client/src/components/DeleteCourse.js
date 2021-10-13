// Import Modules
import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { contextAPI } from '../Context.js';

// DeleteCourse Component
const DeleteCourse = () => {

    // Setting State
    const [user, setUser] = useState({});
    const [courseData, setCourseData] = useState({});

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
              } else if (res & res.id === userId) {
                  setUser(res.User);
                  setCourseData(res);
              } else {
                  history.push('forbidden');
              }
            })
            .catch( () => history.push('/error'));
    }, [id, userId, context.data, history])

    // Handle Cancel Button
    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/');
    }

    // Handle Deletion of Course
    const handleDeleteCourse = () => {
        context.data.deleteCourse(id, signedIn.emailAddress, signedIn.password)
          .then( () => {
            history.push('/');
            console.log(`Course titled, '${courseData.title},' was successfully deleted`);
           })
          .catch( (error) => {
            history.push('/error');
            console.log(error);
          });
    }
    

    return (
      <main>
        <div className="wrap">
            <h2>Delete Course</h2>
            <p>{`Are you sure you want to delete ${courseData.title} by ${user.firstName} ${user.className}`}</p>
            <button className="button" type="submit" onClick={handleDeleteCourse}>Delete Course</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </div>
    </main>
    )
}

export default DeleteCourse;
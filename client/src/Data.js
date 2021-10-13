/********************************** 
  Data class - API requests handler
***********************************/

export default class Data {

  // api method constructs api requests, returns fetched data
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const apiBaseUrl = 'http://localhost:5000/api';
    const url = apiBaseUrl + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Checking if Authorization is required, setting Authorization header if true
    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  /************** 
    USER REQUESTS 
  ***************/

  // GET Request for retrieving an existing user's information [Authenticated & Authorized Users]
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
  
  // POST Request for creating a new user 
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors
      });
    } else {
      throw new Error();
    }
  }

  /**************** 
    COURSE REQUESTS 
  *****************/

  // GET Request to retrieve all the existing courses
  async getCourses() {
    const response = await this.api(`/courses`, 'GET');
    
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  // GET Request to retrieve the details of a particular course
  async getCourseDetails(id) {
    const response = await this.api(`/courses/${id}`, 'GET');
    
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  // POST Request to create new course [Authenticated Users]
  async createNewCourse(course, emailAddress, password) {
    const response = await this.api(`/courses`, 'POST', course, true, { emailAddress, password });
    
    if (response.status === 201) {
        return [];
      } else if (response.status === 400) {
          response.json().then(data => {
            return data.errors
        });
      } else {
        throw new Error();
      }
    }

  // PUT Request to update a particular course [Authenticated & Authorized Users]
  async updateCourse(id, course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password });

    if (response.status === 204) {
        return [];
      } else if (response.status === 400) {
        return response.json().then(data => data.errors);
      } else {
        throw new Error();
      }
    }

  // DELETE Request to delete a course [Authenticated & Authorized Users]
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password });

    if (response.status === 204) {
        return [];
      } else if (response.status === 400) {
        return response.json().then(data => data.errors);
      } else {
        throw new Error();
      }
    }

}

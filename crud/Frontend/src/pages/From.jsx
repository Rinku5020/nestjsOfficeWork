import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min'; 

function Form() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-muted text-dark ">
                <h2 className="mb-0 fs-5 text-center">Node.js Form</h2>
              </div>
              <div className="card-body">
                


                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName" className="form-label fw-bold">First Name</label>
                      <input type="text" className="form-control" id="fname" name="fname" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName" className="form-label fw-bold">Last Name</label>
                      <input type="text" className="form-control" id="lname" name="lname" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label fw-bold">Email</label>
                      <input type="email" className="form-control" id="email" name="email" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label fw-bold">Phone Number</label>
                      <input type="text" className="form-control" id="phone" name="phone" />
                    </div>
                  </div>




                  <div className="row">
                    <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Gender</label>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gender" id="male" value="male" />
                      <label className="form-check-label fw-semibold" htmlFor="male">Male</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gender" id="female" value="female" />
                      <label className="form-check-label fw-semibold" htmlFor="female">Female</label>
                    </div>
                    </div>
                    <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Hobbies</label>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="hobbies[]" id="reading" value="reading" />
                      <label className="form-check-labe fw-semibold" htmlFor="reading ">Reading</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="hobbies[]" id="playing" value="playing" />
                      <label className="form-check-label fw-semibold" htmlFor="playing">Playing</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="hobbies[]" id="traveling" value="traveling" />
                      <label className="form-check-label fw-semibold" htmlFor="traveling">Traveling</label>
                    </div>
                    </div>
                  </div>
  


  
                
                  <div className="row">
                    <div className="col-md-6 mb-3">
                    <label htmlFor="date" className="form-label fw-bold">Date of Birth</label>
                    <input type="date" className="form-control" id="date" name="birthdate" />
                    </div>
                    <div className="col-md-6 mb-3">
                    <label htmlFor="address" className="form-label fw-bold">Address</label>
                    <input type="text" className="form-control" id="address" name="address" />
                    </div>
                  </div>


                  <div className="col-md-6 mb-3">
                    <label htmlFor="image" className="form-label fw-bold">Profile Image</label>
                    <input className="form-control" type="file" id="image" name="Image" />
                  </div>

  
                  <div className="">
                    <button type="submit" className="btn btn-info">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Form;